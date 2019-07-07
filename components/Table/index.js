import CopiableText from '../CopiableText';

import {styles} from './styles';

export default ({titles, values}) => (
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

        <style jsx>{styles}</style>
    </table>
);
