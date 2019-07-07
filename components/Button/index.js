import {styles} from './styles';

export default ({type, onClick, children}) => (
    <button type={type} onClick={onClick}>
        {children}
        <style jsx>{styles}</style>
    </button>
)
