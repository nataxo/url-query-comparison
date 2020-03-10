import styled from 'reshadow';
import CopiableText from '../CopiableText';
import styles from './styles.css';

type ParamName = string;
type ParamValues = string[] | null | undefined;
type Values = [ParamName, ParamValues] | [ParamName, ParamValues, ParamValues];

type Props = {
    titles: string[],
    values: Values[],
};

const SubRow = 'div';

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
                {row.map((col, colIndex) =>
                    <td key={colIndex}>
                        {Array.isArray(col) && col.map((val, index) =>
                            <SubRow key={index}>
                                <CopiableText value={val}/>
                            </SubRow>
                        )}
                        {!Array.isArray(col) && <CopiableText value={col} />}
                    </td>
                )}
            </tr>
        )}
        </tbody>
    </table>
);
