import {useState} from 'react';

const CopiableText  = ({value}) => {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        if (value === null || value === undefined) {
            return;
        }
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1500);
        });
    };

    return (
        <span onClick={handleClick} className={copied && 'copied'}>
           {value || '-'}
            <style jsx>{`
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
           `}
           </style>
       </span>
    );
};

export default CopiableText;
