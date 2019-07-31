import styled from 'reshadow';
import styles from './styles.css';

export default ({type, onClick, children}) => styled(styles)(
    <button type={type} onClick={onClick}>
        {children}
    </button>
);
