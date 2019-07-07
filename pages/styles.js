import css from 'styled-jsx/css';

export const global = css.global`
    * {
        box-sizing: border-box;
        font-size: 14px;
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #111111;
    }
    
    ::selection {
        background-color: #79FFE1;
    }

    html, body {
        width: 100vw;
        overflow-x: hidden;
        padding: 0;
        margin: 0;
    }    
`;

export const page = css`
    main {
        display: flex;
        flex-direction: column;
    
        padding: 24px;
        max-width: 100%;
    }
    
    h1, h2 {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 12px;
    }

    .buttonGroup {
        display: flex;
        margin-top: 24px;
    }
    
    .info {
        color: #666;
    }
    
    @media screen and (max-width: 599px) {
        main {
            padding: 12px 8px;
            width: 100%;
            overflow-x: hidden;
        }
        
        .buttonGroup {
            margin-top: 16px;
        }
    }
`;