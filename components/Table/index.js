import styled from 'reshadow';
import CopiableText from '../CopiableText';
import styles from './styles.css';

export default ({titles, values}) => styled(styles)(
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
