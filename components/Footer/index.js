import Octocat from '../Icons/Octocat';
import styled from 'reshadow';
import styles from './styles.css';

const Footer = () => styled(styles)(
    <footer>
        <a
            href="https://github.com/nataxo/url-query-comparison"
            target="_blank"
            rel="nofollow noreferrer noopen"
            title="Github: nataxo/url-query-comparison"
        >
            <Octocat />
        </a>
    </footer>
);

export default Footer;
