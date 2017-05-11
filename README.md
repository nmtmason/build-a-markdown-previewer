# [Build the Game of Life](https://www.freecodecamp.com/challenges/build-the-game-of-life)

Part of the [freecodecamp](https://www.freecodecamp.com) curriculum.

## Objective

Build a CodePen.io app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/JXrLLE/.

1. User Story: I can type GitHub-flavored Markdown into a text area.
2. User Story: I can see a preview of the output of my markdown that is updated as I type.

## Solution

* Built using [React](https://github.com/facebook/react), [marked](https://github.com/chjj/marked) and [Styled Components](https://github.com/styled-components/styled-components).
* The initial project is scaffolded with [create-react-app](https://github.com/facebookincubator/create-react-app).
* Rather than blindly converting markdown into HTML, this project allows you to use React components to render different elements of the markdown document.
* A custom markdown renderer is implemented, which converts the incoming markdown elements into React components.
* Each component is given a key and stored in a lookup table.
* A text string holds the structure of the document with placeholders for the key of each element. Elements contained within one another are turned into children of a React component.
* The user is able to provide custom components for the following markdown elements:
  * blockquote
  * code
  * heading
  * hr
  * html
  * list
  * paragraph
  * br
  * codespan
  * del
  * em
  * image
  * link
  * listitem'
  * strong
