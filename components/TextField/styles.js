import css from 'styled-jsx/css';

export const styles = css`
    div {
        overflow: hidden;
    }
    
    div + div {
        margin-top: 16px;
    }
    
    @media screen and (max-width: 599px) {
        div + div {
            margin-top: 12px;
        }
    }

    label {
        display: block;
        
    }
    
    label + textarea {
        margin-top: 4px;
    
    }

    textarea {
        border-radius: 5px;
        border-width: 1px;
        border-style: solid;
        
        width: 100%;
        max-width: 100%;
        padding: 8px 8px;
        box-sizing: border-box;
        border-color: #E1E1E1;
        transition: border 0.2s ease 0s, color 0.2s ease 0s;
        outline: none;
    }
    
    textarea:focus {
        border-color: #7D7D7D;
    }
    
    textarea::placeholder {
        color: #999999;
    }
`;
