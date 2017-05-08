import React from 'react';
import marked from 'marked'

const supportedElements = [
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
]

class Markdown extends React.Component {
  constructor (props) {
    super(props)

    this.elements = []
    this.inlineElements = {}
    this.key = 0
    this.renderer = new marked.Renderer()
    supportedElements.forEach(element => {
      const handler = this[element]
      if (handler) {
        const Component = this.props[element]
        const handlerWithComponent = handler(Component)
        this.renderer[element] = (...args) => {
          return handlerWithComponent(this.key++, ...args)
        }
      }
    })
  }

  componentWillMount () {
    marked(this.props.text, { renderer: this.renderer })
  }

  componentWillReceiveProps (nextProps) {
    this.elements = []
    this.inlineElements = {}
    this.key = 0
    marked(nextProps.text, { renderer: this.renderer })
  }

  childrenFromText (text) {
    return text.split(/(\{\d*\})/).map(split => {
      const match = split.match(/{(\d+)}/)
      return match ? this.inlineElements[match[1]] : split
    })
  }

  blockquote = (Component) => (key, text) => {
    const children = this.childrenFromText(text)
    const element = React.createElement(
      Component || 'blockquote',
      { key },
      children
    )
    this.elements.push(element)
  }

  code = (Component) => (key, text, language) => {
    const children = this.childrenFromText(text)
    const element = React.createElement(
      Component || 'pre',
      { key, language },
      children
    )
    this.elements.push(element)
  }

  heading = (Component) => (key, text, level) => {
    const children = this.childrenFromText(text)
    const element = React.createElement(
      Component || `h${level}`,
      Component ? { key, level } : { key },
      children
    )
    this.elements.push(element)
  }

  hr = (Component) => (key) => {
    const element = React.createElement(
      Component || 'hr',
      { key }
    )
    this.elements.push(element)
  }

  list = (Component) => (key, text, ordered) => {
    const children = this.childrenFromText(text)
    const element = React.createElement(
      Component || ordered ? 'ol' : 'ul',
      Component ? { key, ordered } : { key },
      children
    )
    this.elements.push(element)
  }

  paragraph = (Component) => (key, text) => {
    const children = this.childrenFromText(text)
    const element = React.createElement(
      Component || 'p',
      { key },
      children
    )
    this.elements.push(element)
  }

  br = (Component) => (key) => {
    const element = React.createElement(
      Component || 'br',
      { key }
    )
    this.inlineElements[key] = element
    return `{${key}}`
  }

  codespan = (Component) => (key, text) => {
    const children  = this.childrenFromText(text)
    const element = React.createElement(
      Component || 'code',
      { key },
      children
    )
    this.inlineElements[key] = element
    return `{${key}}`
  }

  del = (Component) => (key, text) => {
    const children = this.childrenFromText(text)
    const element = React.createElement(
      Component || 'del',
      { key },
      children
    )
    this.inlineElements[key] = element
    return `{${key}}`
  }

  em = (Component) => (key, text) => {
    const children = this.childrenFromText(text)
    const element = React.createElement(
      Component || 'i',
      { key },
      children
    )
    this.inlineElements[key] = element
    return `{${key}}`
  }

  image = (Component) => (key, src, alt) => {
    const element = React.createElement(
      Component || 'img',
      { key, src, alt }
    )
    this.inlineElements[key] = element
    return `{${key}}`
  }

  link = (Component) => (key, href, alt, text) => {
    const children = this.childrenFromText(text)
    const element = React.createElement(
      Component || 'a',
      { key, href, alt },
      children
    )
    this.inlineElements[key] = element
    return `{${key}}`
  }

  listitem = (Component) => (key, text) => {
    const children = this.childrenFromText(text)
    const element = React.createElement(
      Component || 'li',
      { key },
      children
    )
    this.inlineElements[key] = element
    return `{${key}}`
  }

  strong = (Component) => (key, text) => {
    const children = this.childrenFromText(text)
    const element = React.createElement(
      Component || 'b',
      { key },
      children
    )
    this.inlineElements[key] = element
    return `{${key}}`
  }

  render () {
    return (
      <div>
        {this.elements}
      </div>
    )
  }
}

export default Markdown
