import { injectGlobal } from 'styled-components'

// eslint-disable-next-line
injectGlobal`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, “Fira Sans”, “Droid Sans”, “Helvetica Neue”, Arial, sans-serif;
    font-size: 100%;
    line-height: 1.5;
    margin: 2rem;
    background-color: #eee;
  }
`
