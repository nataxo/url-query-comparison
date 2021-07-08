import {useState} from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

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

    return (
        <button onClick={handleClick} className={styles.button}>
            <span className={cn(styles.text, copied && styles.copied)}>{value || '-'}</span>
        </button>
    );
};

export default CopiableText;
