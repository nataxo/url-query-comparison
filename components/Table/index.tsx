import CopiableText from '../CopiableText';
import styles from './styles.module.css';

type ParamName = string;
type ParamValues = string[] | null | undefined;
type Values = [ParamName, ParamValues] | [ParamName, ParamValues, ParamValues];

type Props = {
    titles: string[],
    values: Values[],
};

export default ({titles, values}: Props) => (
    <table className={styles.table}>
        <thead className={styles.thead}>
            <tr className={styles.tr}>
                {titles.map((title, index) => <th key={index} className={styles.th}>{title}</th>)}
            </tr>
        </thead>
        <tbody className={styles.tbody}>
        {values.map((row, rowIndex) =>
            <tr key={rowIndex} className={styles.tr}>
                {row.map((col, colIndex) =>
                    <td key={colIndex} className={styles.td}>
                        {Array.isArray(col) && col.map((val, index) =>
                            <div className={styles.subRow} key={index}>
                                <CopiableText value={val}/>
                            </div>
                        )}
                        {!Array.isArray(col) && <CopiableText value={col} />}
                    </td>
                )}
            </tr>
        )}
        </tbody>
    </table>
);
