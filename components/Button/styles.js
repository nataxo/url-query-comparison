import css from 'styled-jsx/css';

export const styles = css`
    button + button {
        margin-left: 20px;
    }
    
    button {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        text-transform: uppercase;
        text-align: center;
        white-space: nowrap;
        min-width: 100px;
        
        border-radius: 5px;
        border-width: 1px;
        border-style: solid;
    
        font-weight: 400;
        font-size: 12px;
        flex-shrink: 0;
    
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        padding: 8px 25px;
        transition: all 0.2s ease 0s;
        overflow: hidden;
    }
    
    button:active {
        top: 1px;
    }
    
    button[type="submit"] {
        background-color: #0076FF;
        border-color: #0076FF;
        color: #FAFBFC;
    }
    
    button[type="submit"]:hover {
        background-color: #FAFBFC;
        color: #0076FF;
    }
    
    button[type="reset"] {
        background-color: #fff;
        border-color: #eaeaea;
        color: #666;
    }
    
    button[type="reset"]:hover {
        background-color: #fff;
        border: 1px solid #000;
        color: #000;
    }
    
    @media screen and (max-width: 599px) {
        button {
            flex-grow: 1;
        }
        
        button + button {
            margin-left: 12px;
        }
    }
`;
