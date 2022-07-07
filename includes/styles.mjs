import {css} from "lit"

export default css`
  *, *::before, *::after {
    box-sizing: border-box;
    touch-action: pan-x pan-y;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  .header-padding {
    padding-top: var(--header-height)
  }

  .root-padding {
    padding-left: var(--root-padding-left);
    padding-right: var(--root-padding-right);
  }

`
