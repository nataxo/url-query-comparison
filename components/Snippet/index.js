import styled from 'reshadow';
import styles from './styles.css';

export default ({children}) => styled(styles)(
    <div>
        {children}
    </div>
);
