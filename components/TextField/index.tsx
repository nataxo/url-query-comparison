import styled from 'reshadow';
import styles from './styles.css';

type Props = {
  id: string,
  label: string,
  value: string,
  onChange: (e: string) => void,
  placeholder: string,
  rows?: number,
};


const Wrapper = 'div';

export default ({id, label, value, onChange, placeholder, rows = 2 }: Props) => styled(styles)(
    <Wrapper>
        <label htmlFor={id}>{label}</label>
        <textarea
            id={id}
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
        />
    </Wrapper>
);
