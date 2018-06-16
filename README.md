# [Build a Markdown Previewer](https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer)

Part of the [freecodecamp](https://www.freecodecamp.com) curriculum.

## Objective

Build a CodePen.io app that is functionally similar to this: https://codepen.io/freeCodeCamp/full/GrZVVO

## Solution

- Built using [React](https://reactjs.org/) and [create-react-app](https://github.com/facebook/create-react-app).
- Rather than blindly converting markdown into HTML (and using `dangerouslySetInnerHTML`) this project uses a custom [marked](https://github.com/markedjs/marked) renderer to turn markdown into React components.
- Each component is given a unique key and stored in a lookup table.
- For small changes this allows React to only update the relevant section of the DOM.
- The renderer returns a string holding the structure of the document. This contains textual placeholders which are turned into components from their key.
- The following markdown elements are supported:
  - blockquote
  - code
  - heading
  - hr
  - html
  - list
  - paragraph
  - br
  - codespan
  - del
  - em
  - image
  - link
  - listitem
  - strong
