import Octocat from '../Icons/Octocat';
import styles from './styles.module.css';

const Footer = () => (
    <footer className={styles.footer}>
        <a
            href="https://github.com/nataxo/url-query-comparison"
            target="_blank"
            rel="nofollow noreferrer noopen"
            className={styles.a}
            title="Github: nataxo/url-query-comparison"
        >
            <Octocat />
        </a>
    </footer>
);

export default Footer;
