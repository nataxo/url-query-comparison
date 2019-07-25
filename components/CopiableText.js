import {useState} from 'react';

const CopiableText  = ({value}) => {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        if (value === null || value === undefined) {
            return;
        }
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(value).then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1500);
            });
        }
    };

    return (
        <button onClick={handleClick}>
            <span  className={copied && 'copied'}>{value || '-'}</span>
            <style jsx>{`
                button {
                   display: inline-block;
                   max-width: 100%;
                   word-break: break-all;
                   word-wrap: break-word;
                   position: relative;
                   cursor: pointer;
                   
                   border: none;
                   text-decoration: none;
                   user-select: none;
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
                    color: #0366D6;
                    visibility: visible;
                
                    word-break: normal;
                    word-wrap: normal;
                    overflow: visible;
                }
           `}
           </style>
       </button>
    );
};

export default CopiableText;
