import styles from './styles.module.css';

type Props = {
    type: 'reset' | 'button' | 'submit' | 'reset';
    onClick?: () => void;
    children: React.ReactNode;
};

export default ({type, onClick, children}: Props) => (
    <button type={type} onClick={onClick} className={styles.button}>
        {children}
    </button>
);
