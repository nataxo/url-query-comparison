import CopiableText from './CopiableText';

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

        <style jsx>{`
            table + h4 {
                margin-top: 24px;
            }
            
            table {
                border-spacing: 0;
                border-collapse: separate;
            }
            
            th {
                color: #666;
                background-color: #fafafa;
                font-size: 12px;
                font-weight: 400;
                text-transform: uppercase;
            }
            
            thead tr th:nth-child(1) {
                border-radius: 4px 0 0 4px;
                border-left: 1px solid #eaeaea;
                width: 20%;
            }
            
            thead tr th:last-child {
                border-radius: 0 4px 4px 0;
                border-right: 1px solid #eaeaea;
            }
            
            thead tr th {
                border-top: 1px solid #eaeaea;
                text-align: left;
            }
            
            td, th {
                white-space: pre-wrap;
                word-wrap: break-word;
            
                padding: 8px 12px;
            
                border-bottom: 1px solid #eaeaea;
                position: relative;
            }
        `}
        </style>
    </table>
);
