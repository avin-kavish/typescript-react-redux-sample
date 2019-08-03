import {css, Global} from '@emotion/core';

export const theme = {
  blue: '#018de5',
  yellow: '#FEBF00',
  background: {
    body: '#f2f3f8',
    td: '#fafcfb'
  },
  border: {
    popup: '#e5e6ea'
  },
  text: {
    anchor: '#3b79ac'
  }
}

export const globalCss = css`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    font-family: sans-serif;
    background-color: ${theme.background.body};
    color: #404e5b;
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 300;
  }
`

const flexCss = css`display: flex;align-items: center;`
