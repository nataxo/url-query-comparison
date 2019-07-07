import {styles} from './styles';

export default ({children}) => (
    <div>
        {children}
        <style jsx>{styles}</style>
    </div>
);
