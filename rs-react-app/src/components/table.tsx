import type { TableProps } from './type';

const Table = ({ dataPerYear, extraFields }: TableProps) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>year</th>
            <th>population</th>
            <th>co2</th>
            <th>co2_per_capita</th>
            {extraFields.map((element) => (
              <th key={element}>{element}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataPerYear.map((row) => (
            <tr key={row.year}>
              <td key={row.year}>{row.year}</td>
              <td key={row.population}>{row.population ?? 'N/A'}</td>
              <td key={row.co2}>{row.co2 ?? 'N/A'}</td>
              <td key={row.co2_per_capita}>{row.co2_per_capita ?? 'N/A'}</td>
              {extraFields.map((element) => (
                <td key={row[element]}>{row[element] ?? 'N/A'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
