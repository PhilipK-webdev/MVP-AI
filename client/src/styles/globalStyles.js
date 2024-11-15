import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body{
    font-family: "Poppins", sans-serif;
    font-size:18px;
    padding:0;
    background: linear-gradient(180deg, #8359A3, #573B8A, #2D1E5C);
    background-attachment: fixed; 
    background-size: cover;
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
