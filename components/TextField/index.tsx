import styles from './styles.module.css';

type Props = {
  id: string,
  label: string,
  value: string,
  onChange: (e: string) => void,
  placeholder: string,
  autofocus?: boolean,
  rows?: number,
};

export default ({ id, label, value, onChange, placeholder, autofocus, rows = 2 }: Props) => (
    <div className={styles.wrapper}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        <textarea
            id={id}
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            autoFocus={autofocus}
            className={styles.textarea}
        />
    </div>
);
