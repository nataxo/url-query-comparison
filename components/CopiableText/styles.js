import css from 'styled-jsx/css';

export const styles = css`
    span {
       display: inline-block;
       max-width: 100%;
       word-break: break-all;
       word-wrap: break-word;
       position: relative;
       cursor: pointer;
    }
    
    .copied {
        visibility: hidden;
    }
    
    .copied:after {
        content: 'Copied!';
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        color: #0076FF;
        visibility: visible;
    
        word-break: normal;
        word-wrap: normal;
        overflow: visible;
    }
`;
