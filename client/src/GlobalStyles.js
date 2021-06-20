import "./googleFonts.css";

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --darkest: #000;
}

* {
    box-sizing: border-box;
    margin:0;
    padding:0;
    line-height: 1.5em;
    color: var(--darkest);
    font-family: 'Poppins', sans-serif;
}

body {
    text-align: center;
}

a {text-decoration: none;
color: var(--darkest)}

input {
    border: 2px solid black;
    border-radius: 6px;
    padding: 0 1rem;
}

h3 {
    margin-bottom: 0.5rem;
}

.smallText {
    font-size: 0.75rem;
}

`;
