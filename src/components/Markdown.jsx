import React from 'react';
import marked from 'marked';
import he from 'he';

export class Markdown extends React.Component {
  supportedElements = [
    'blockquote',
    'code',
    'heading',
    'hr',
    'html',
    'list',
    'paragraph',
    'br',
    'codespan',
    'del',
    'em',
    'image',
    'link',
    'listitem',
    'strong'
  ];

  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
    this.key = 0;
    this.elements = {};
    this.renderer = this.supportedElements.reduce((renderer, element) => {
      const handler = this[element];
      renderer[element] = (...args) => {
        this.elements[this.key] = handler(this.key, ...args);
        return `{${this.key++}}`;
      };
      return renderer;
    }, new marked.Renderer());
  }

  componentDidMount() {
    this.setState(state => ({
      value: marked(this.props.value, { renderer: this.renderer })
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.key = 0;
      this.setState(state => ({
        value: marked(this.props.value, { renderer: this.renderer })
      }));
    }
  }

  childrenFromText(text) {
    return text
      .split(/(\{\d*\})/)
      .filter(keyOrText => Boolean(keyOrText))
      .map(keyOrText => {
        const match = keyOrText.match(/{(\d+)}/) || [];
        const [key] = match.reverse();
        return key ? this.elements[key] : he.decode(keyOrText);
      });
  }

  blockquote = (key, text) => {
    const children = this.childrenFromText(text);
    return React.createElement('blockquote', { key }, children);
  };

  code = (key, text, language) => {
    const children = this.childrenFromText(text);
    return React.createElement('pre', { key, language }, children);
  };

  heading = (key, text, level) => {
    const children = this.childrenFromText(text);
    return React.createElement(`h${level}`, { key }, children);
  };

  hr = key => {
    return React.createElement('hr', { key });
  };

  list = (key, text, ordered) => {
    const children = this.childrenFromText(text);
    return React.createElement(ordered ? 'ol' : 'ul', { key }, children);
  };

  paragraph = (key, text) => {
    const children = this.childrenFromText(text);
    return React.createElement('p', { key }, children);
  };

  br = key => {
    return React.createElement('br', { key });
  };

  codespan = (key, text) => {
    const children = this.childrenFromText(text);
    return React.createElement('code', { key }, children);
  };

  del = (key, text) => {
    const children = this.childrenFromText(text);
    return React.createElement('del', { key }, children);
  };

  em = (key, text) => {
    const children = this.childrenFromText(text);
    return React.createElement('i', { key }, children);
  };

  image = (key, src, alt) => {
    return React.createElement('img', { key, src, alt });
  };

  link = (key, href, alt, text) => {
    const children = this.childrenFromText(text);
    return React.createElement('a', { key, href, alt }, children);
  };

  listitem = (key, text) => {
    const children = this.childrenFromText(text);
    return React.createElement('li', { key }, children);
  };

  strong = (key, text) => {
    const children = this.childrenFromText(text);
    return React.createElement('b', { key }, children);
  };

  render() {
    if (this.state.value) {
      return this.childrenFromText(this.state.value);
    }
    return null;
  }
}
