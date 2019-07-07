import {styles} from './styles';

export default ({ label, value, onChange, placeholder, rows = 2 }) => (
    <div>
        <label htmlFor={label}>{label}</label>
        <textarea
            type="text"
            id={label}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
        />
        <style jsx>{styles}</style>
    </div>
);
