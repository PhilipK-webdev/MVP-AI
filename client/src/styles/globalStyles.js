import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body{
    font-family:'Almoni', Ariel, serif;
    font-size:18px;
    padding:0;
    background: linear-gradient(to bottom, #8359A3, #573B8A, #2D1E5C);
    color: white;
    height: 100vh; 
}

html{
    box-sizing:border-box;
}

*,*::before, *::after{
 box-sizing:inherit
}
`;

export default GlobalStyles;
