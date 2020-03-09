import {useState} from 'react';
import styled, {use} from 'reshadow';

import styles from './styles.css';

const Text = 'span';

type Props = {
    value: string | null | undefined;
};

const CopiableText  = ({value}: Props) => {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        if (value == null) {
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
            <Text {...use({copied})}>{value || '-'}</Text>
        </button>
    );
};

export default CopiableText;
