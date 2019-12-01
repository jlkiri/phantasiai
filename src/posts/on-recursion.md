---
title: On non-recursive Merge
date: "2019-12-01"
spoiler: huh
language: en
---

This post was motivated by two recent papers: one [by Martins & Boeckx](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3000389) and another [by Berwick & Chomsky](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3000539).

Essentially, this is an argument about whether such thing as half-Merge is possible. Martin & Boeckx (M&B) suggest that External Merge and Internal Merge could be distinct steps in the evolution of human language capacity. The former builds "nested dependencies", and the latter allows "crossed dependencies". M&B argue that IM is more computationally complex (and so believe that out of two steps it is the second one). On the other hand, Berwick & Chomsky (B&C) point out that IM and EM can be seen as mere subcases of a single operation Merge. In fact, IM and EM as distinct operations would be more complex because they place restrictions (such as "must be distinct/subset of") on things merged. And even if they were distinct, as B&C notice, EM would be more computationally complex than IM, because it requires massive search through the lexicon.

Interestingly, M&B seem to agree that while half-Merge is possible, half-recursion is not. What does that mean?

## Not "Merge IS recursion", but "Merge AND recursion"

That means that M&B subscribe, accidentally or not, to the view that Merge itself is not recursive. In fact, even B&C imply the same in their paper in the part where they counter M&B's argument about complexity of nested and crossed dependencies:

> Merge-based systems do not even appear in the [Chomsky] hierarchy, and anything concluded from the study of the Chomsky hierarchy is totally irrelevant to the evolution of Merge-based systems

In other words, what was once used to explain potential infinity of syntactic structures (recursive context-free grammars) is now irrelevant because Merge does not even produce strings (with linear order), and Chomsky hierarchy does not apply to nested sets. This is what confused me first, but then I realized that all this time I've been taking for granted the vague concept of recursion in human language.

In literature, Merge is sometimes said to be recursive **because** it can be applied to its own output. While that is an important property that makes nesting (and potentially infinite nesting) possible, this is **not** what makes it recursive. In fact, if you look at the definitions of recursion in computer science or mathematics literature, no definition says that a function (and Merge is a function) is recursive when it can be applied to its own output.

Roughly speaking, a function is recursive when it is defined in terms of itself.

It is very easy to see the difference: the extremely simple _identity_ function (`λx.x` or `id(x) = x`) can be applied to its own output, but it is not recursive (= not defined in terms of itself):

```javascript
id(1) = 1
id(id(1)) = 1
id(id(id(1))) = 1
...
```

A good example of a function that is defined in terms of itself would be a function that calculates the nth power of a number:

```javascript
pow(num, 0) = 1
pow(num, n) = num * pow(num, n - 1)
```

Note that the base case is required in definitions of this sort to be correct. Above it means that the 0th power of any number is 1. So, as a result, the 3rd power of 3 would be calculated this way:

```javascript
pow(3, 3) = 3 * (3 * (3 * 1)) = 27
```

Importantly, `pow` **cannot** be applied to its own output alone. It outputs one number but requires 2 arguments! However, the repeated multiplication as a result of recursive application of `pow` above is what seems to be meant by recursion in linguistic literature. Merge can obviously be repeatedly applied:

```javascript
merge(a, merge(b, merge(c, merge(d, e)))) = {a, {b, {c, {d, e}}}};
```

But Merge here is more like multiplication in the example above: it is a mean to produce the output, once or many times, but it is **not defined in terms of itself**. Strictly speaking, then, **Merge alone is not enough to generate potentially infinitely nested structures**. There must be another function or whatever "routine" similar to `pow` above, that keeps applying Merge again and again until the base case is met. There must be recursion AND Merge to achieve what we observe in human syntax.

That is, of course, if we want to be really pedantic. But since the supposedly unique ability of humans to Merge again and again is brought up so much in discussions about the evolution of language, I think we need to be pedantic.

## Recursive data structures by non-recursive means

The structure that can be produced by repeated application of Merge _is_ formally recursive. Just like a tree can be composed of leaves or smaller trees, a structure produced by Merge can either contain two "atoms" (e.g. lexical items) or an atom and a set that itself contains two atoms (or an atom and another set) etc. In a programming language (e.g. Haskell) it can be defined like this:

```haskell
data SyntacticObject a = Atom a | Set a (SyntacticObject a)
-- where a is a type of an atom
```

However it is important to understand that procedures that are capable of building such a structure need not be recursive. If the way our brain computes is similar to how computers do their work then a syntactic structure may as well be built by some complex sequence of commands, that is not recursive at all and even uses a hypothetical `replace` function that I just came up with:

`1. Build {a, ∅}`  
`2. Build {b, ∅}`  
`3. Build {c, d}`  
`4. Replace ∅ in {b, ∅} with output of 3`  
`5. Replace ∅ in {a, ∅} with output of 4`

The above yields `{a, {b, {c, d}}}`. How do we know that syntactic structures are not built this way? We don't. All we know is that they are likely to be required to have a form defined above.
