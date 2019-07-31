import {useState} from 'react';
import styled from 'reshadow';
import cn from 'classnames';

import styles from './styles.css';

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

    return styled(styles)(
        <button onClick={handleClick}>
            <span className={cn({[styles.copied]: copied})}>{value || '-'}</span>
        </button>
    );
};

export default CopiableText;
