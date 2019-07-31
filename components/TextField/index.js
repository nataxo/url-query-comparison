import styled from 'reshadow';
import styles from './styles.css';

export default ({id, label, value, onChange, placeholder, rows = 2 }) => styled(styles)(
    <div>
        <label htmlFor={id}>{label}</label>
        <textarea
            type="text"
            id={id}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
        />
    </div>
);
