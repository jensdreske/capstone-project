import "./googleFonts.css";

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --darkest: hsl(230,50%,20%);
    --brightest: #fffd;

    --borderLine: 2px solid var(--darkest);
    --boxRadius: 6px;
    --boxBackdropFilter: blur(3px);

    --backgroundTransparent: hsla(200, 100%, 90%, 0.5);
    --backgroundBright: hsla(0, 0%, 100%, 0.5);

    --smallText: 0.75rem;
}

* {
    box-sizing: border-box;
    margin:0;
    padding:0;
    line-height: 1.5em;
    font-family: 'Poppins', sans-serif;
}

body {
    text-align: center;
    color: var(--darkest);
}

a { 
    text-decoration: none;
    color: var(--darkest)
}

input {
    border: 2px solid black;
    border-radius: 6px;
    padding: 0 1rem;
}

h3 {
    font-size: 1.25rem;
    font-weight:700;
    margin-bottom: 0.125rem;
}

h4 {
    font-weight:600;
}

.smallText {
    font-size: 0.75rem;
}

`;
