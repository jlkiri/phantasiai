---
title: Using Streams API in React applications
date: "2019-10-21"
spoiler: On what to take care of during implentation
language: en
tags:
  - programming
  - react
---

UPDATE: I fixed a bug in the previous version of code

It's been a while since [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) came to browsers. But how does it work with React? I hit a few walls when trying to implement it in my component logic, so here are a few tips.

## TL;DR

There are a lot of small things to look out for, so I abstracted all of them in one custom React hook. You can see the code in this gist:

https://gist.github.com/jlkiri/bc0a9bbf5d81c6f8bbe1cfd59a106380

I also created a demo. All it does is download a really big image (~12MB) and renders it. During the download, it shows how many percents of the image have been downloaded. You can see it here:

https://fetch-stream-hook-demo.jlkiri.now.sh/

## Details

In most cases, you can just use the examples from MDN. But there are a couples of things to look out for.

### Rendering

Usually, when we download something we only care about two states: loading and loaded. We render them accordingly, but Streams API allows us to have control over chunks of downloaded data. This can be used to show the user how much has been downloaded, especially if a file is very big.

However, if we update the progress the React way (by calling `setState`), it can result in a lot of CPU work, so in this particular case it may be better to use a `ref` and set its value manually. For example, we can divide the currently downloaded bytes by the total size of the file and calculate the percentage. Below is a minimal example of how to do it (the creation of `ref` and component logic is omitted):

```javascript
fetch(url)
  .then(response => {
    const contentLength = response.headers.get("content-length")

    let loaded = 0

    const stream = new ReadableStream({
      start(controller) {
        const reader = response.body.getReader()
        return pump()

        function pump() {
          return reader.read().then(({ done, value }) => {
            if (done) {
              controller.close()
              return
            }
            loaded += value.byteLength

            const percents = `${Math.round((loaded / contentLength) * 100)}%`

            ref.current.textContent = percents

            controller.enqueue(value)
            return pump()
          })
        }
      }
    })

    return new Response(stream)
  })
  .then(response => response.json())
  .then(data => console.log(data))
```

### File size

If the file is very big, you should provide the user with a way to stop the download. [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) and its `abort` function is a very handy tool to use in this case.

Moreover, before we start the download, we can check the user's connection environment with `navigator.connection.effectiveType` and decide whether we need to show the progress at all. Only if it is expected to take a lot of time, we can choose to show the progress bar.

### Other

Depending on a server or connection protocol, there may be no `Content-Length` header in the response. For example if HTTP/1.1's `Transfer-Encoding: chunked` is used, there is no `Content-Length` header. In this case you should either know the total byte size beforehand and set it as a constant or have a way to give up the stream logic.

## Full code

Here is the full code from the gist:

```javascript
import { useState, useEffect, useMemo } from "react"

const MIMETypes = {
  json: response => response.json(),
  text: response => response.text(),
  blob: response => response.blob(),
  arrayBuffer: response => response.arrayBuffer(),
  formData: response => response.formData()
}

export default function useFetchStream({
  url,
  onChunkLoaded,
  onError = undefined,
  onFinish = undefined,
  parseAs = undefined,
  byteLength = undefined,
  fetchOptions = Object.create(null)
}) {
  const [data, setData] = useState(null)

  // Handle error message in browsers that do not throw AbortError
  let fetchAborted = false

  // Prevent needless creation of AbortController on re-render
  const { signal, abort } = useMemo(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const abort = function abort() {
      fetchAborted = true
      abortController.abort()
    }
    return { signal, abort }
  }, [url])

  useEffect(() => {
    const fetchOpts = Object.assign({ signal: signal }, fetchOptions)

    const handleError = function handleError(error) {
      if (error.name == "AbortError" || fetchAborted) {
        console.warn("Fetch operation was aborted.")
        return
      }
      if (onError) return onError(error)
      return console.error(error)
    }

    fetchAborted = false

    fetch(url, fetchOpts)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Request error: ${response.status}: ${response.statusText}`
          )
        }

        const contentLength =
          byteLength || response.headers.get("content-length")

        // Fallback to simple fetch
        if (contentLength === null) {
          console.warn(
            "Content-Length header is absent. Falling back to simple fetch."
          )
          return new Response(response.body)
        }

        const contentType = response.headers.get("content-type")

        let loaded = 0

        const stream = new ReadableStream({
          start(controller) {
            const reader = response.body.getReader()

            return pump()

            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close()
                  return
                }

                loaded += value.byteLength

                onChunkLoaded({ loaded, total: contentLength })

                controller.enqueue(value)

                return pump()
              })
            }
          }
        })

        // Pass Content-Type to new response because original headers are lost
        return new Response(stream, {
          signal: signal,
          headers: { "Content-Type": contentType }
        })
      })
      .then(response => {
        const contentType = response.headers.get("content-type")

        const readBody = MIMETypes[parseAs] || selectBodyReader()

        function selectBodyReader() {
          const isJson = contentType && contentType.match(/json/i)
          const isText = contentType && contentType.match(/text/i)

          if (isJson) return MIMETypes.json
          if (isText) return MIMETypes.text
          return null
        }

        if (!readBody)
          throw new Error(
            "Read error: You must provide a parseAs option for MIME types other than JSON or text."
          )

        return readBody(response)
      })
      .then(data => {
        if (onFinish) onFinish(data)
        setData(data)
      })
      .catch(handleError)
  }, [url, onChunkLoaded, onError, onFinish, parseAs, byteLength])

  return { data: data, abort: abort }
}
```
