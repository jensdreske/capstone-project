import "./googleFonts.css";

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --darkest: hsl(230,50%,20%);

    --borderLine: 2px solid var(--darkest);
    --boxRadius: 6px;
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
    margin-bottom: 0.5rem;
}

.smallText {
    font-size: 0.75rem;
}

`;
