import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset} //초기화
    
    a {
        text-decoration: none;
        color: black; //+ 아이콘
    }

    * {
        box-sizing: border-box;
    }

    html,body {
        height:100%;
    }

    #root {
        height: 100%;
    }

    input:focus {
        outline : none;
    }
`;

export default GlobalStyles;