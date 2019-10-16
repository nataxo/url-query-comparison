import styled from 'reshadow';
import styles from './styles.css';

const Snippet = ({children}) => styled(styles)(
    <wrapper>
        {children}
    </wrapper>
);

export default Snippet;
