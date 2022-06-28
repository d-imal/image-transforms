# Image Transform Functions

A simple library for transforming images in `ImageData` format. Works in all
modern browsers.

## Available Transforms

### `invert`

`invert(image: ImageData): ImageData`

Accepts an `ImageData` object and returns an `ImageData` object with the colors
inverted. Opacity values remain unchanged.

### `pixelate`

`pixelate(image: ImageData, gridSize: number): ImageData`

Accepts an image object and pixelates it, using `gridSize` to determine how
large the pixels are.

## Demo

To see the functions in action, run the demo server.

First, install the dependencies:

`yarn i`

Then start the server:

`yarn start`

It will start a server on http://localhost:8000/.

## Development

To implement new transform functions, add a file to the `/src/transforms`
directory for your transform and export it from `/src/transforms/index.ts`.

To see your work as you develop it, you can add another column to
`/demo/demo.html` for your transform, following the same pattern as the existing
transforms.

## Testing

Functions are tested using jest and
[fast-check](https://dubzzz.github.io/fast-check.github.com/) using
property-based tests. The idea behind property-based tests is that instead of
manually creating lots of example data and cases to test, you define certain
properties that must be true for your functionality to be considered correct.
Then, fast-check generates lots of random data as inputs to your test cases and
assertions. This avoids writing code that passes some narrow set of manually
created examples, but doesn't uphold the contract of the code. Here's a good
introduction to property-based tests, for the unfamiliar: [The lazy programmer's
guide to writing thousands of
tests](https://www.youtube.com/watch?v=IYzDFHx6QPY)
