import React from 'react';

import { Container } from './components/Container';
import { Pane } from './components/Pane';
import { Editor } from './components/Editor';
import { Content } from './components/Content';
import { Markdown } from './components/Markdown';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: initial };
  }

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  render() {
    return (
      <Container>
        <Pane backgroundColor="rgb(230, 230, 230)">
          <Editor onChange={this.handleChange} value={this.state.text} />
        </Pane>
        <Pane backgroundColor="rgb(255, 255, 255)">
          <Content>
            <Markdown value={this.state.text} />
          </Content>
        </Pane>
      </Container>
    );
  }
}

const initial = `
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
`;

export default App;
