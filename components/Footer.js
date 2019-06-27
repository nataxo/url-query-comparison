import Octocat from './Octocat';

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
        <style jsx>{`
            footer {
                display: flex;
                justify-content: flex-end;
                
                padding: 24px;
            }
            
            a {
                display: inline-block;
            }
                                
            @media screen and (max-width: 599px) {
                footer {
                    padding: 12px 8px;
                    width: 100%;
                }
            }
        `}
        </style>
    </footer>
);
export default Footer;
