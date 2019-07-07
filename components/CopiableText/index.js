import {useState} from 'react';

import {styles} from './styles'

const CopiableText = ({value}) => {
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
            <style jsx>{styles}</style>
       </span>
    );
};

export default CopiableText;
