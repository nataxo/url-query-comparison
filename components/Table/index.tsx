import styled from 'reshadow';
import CopiableText from '../CopiableText';
import styles from './styles.css';

type Props = {
    titles: string[],
    values: (string | null)[][],
};

export default ({titles, values}: Props) => styled(styles)(
    <table>
        <thead>
            <tr>
                {titles.map((title, index) => <th key={index}>{title}</th>)}
            </tr>
        </thead>
        <tbody>
        {values.map((row, rowIndex) =>
            <tr key={rowIndex}>
                {row.map((value, colIndex) =>
                    <td key={colIndex}>
                        <CopiableText value={value}/>
                    </td>
                )}
            </tr>
        )}
        </tbody>
    </table>
);
