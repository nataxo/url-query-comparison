import css from 'styled-jsx/css';

export const styles = css`
    footer {
        display: flex;
        justify-content: flex-end;
        
        padding: 24px;
    }
    
    a {
        display: inline-block;
    }
                        
    @media screen and (max-width: 599px) {
        footer {
            padding: 12px 8px;
            width: 100%;
        }
    }
`;
