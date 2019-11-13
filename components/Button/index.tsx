import styled from 'reshadow';
import styles from './styles.css';

type Props = {
    type: 'reset' | 'button' | 'submit' | 'reset';
    onClick?: () => void;
    children: React.ReactNode;
};

export default ({type, onClick, children}: Props) => styled(styles)(
    <button type={type} onClick={onClick}>
        {children}
    </button>
);
