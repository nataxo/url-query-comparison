import Octocat from '../Icons/Octocat';

import {styles} from './styles'

const Footer = () => (
    <footer>
        <a
            href="https://github.com/nataxo/url-query-comparison"
            target="_blank"
            rel="nofollow noreferrer noopen"
            title="Github: nataxo/url-query-comparison"
        >
            <Octocat />
        </a>
        <style jsx>{styles}</style>
    </footer>
);

export default Footer;
