import React from 'react';
import styled from 'styled-components'

import Markdown from './components/Markdown.jsx'

const initialText = `
Heading
=======

Sub-heading
-----------

### Another deeper heading

Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a
line break

Text attributes *italic*, **bold**,
monospace, ~~strikethrough~~ .

Shopping list:

* apples
* oranges
* pears

Numbered list:

1. apples
2. oranges
3. pears

The rain---not the reign---in  
Spain.

*[Herman Fassett](https://freecodecamp.com/hermanfassett)*
`

const Container = styled('div')`
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 940px;
  border: 1px solid #eee;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
  background-color: #fff;
`

const Left = styled('div')`
  width: 50%;
  padding: 1rem;
`

const Right = styled('div')`
  width: 50%;
  padding: 1rem;
`

const Textarea = styled('textarea')`
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  padding: 1rem;
  background-color: #444;
  color: #eee;
  outline: none;
  resize: none;

  &:active, &:hover {
    border: 1px solid lightblue;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.75);
  }
`

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { text: initialText }
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value })
  }

  render () {
    return (
      <Container>
        <Left>
          <Markdown
            text={this.state.text}
          />
        </Left>
        <Right>
          <Textarea
            onChange={this.handleChange}
            value={this.state.text}
          />
        </Right>
      </Container>
    )
  }
}

export default App;
