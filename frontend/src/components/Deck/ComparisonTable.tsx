/**
 * ComparisonTable: Simple table with headers and rows
 */
export const ComparisonTable: React.FC<{
  headers: string[];
  rows: string[][];
}> = ({ headers, rows }) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        {headers.map((h, idx) => (
          <th
            key={idx}
            className="px-4 py-2 text-left text-sm font-medium text-gray-700"
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {rows.map((row, rIdx) => (
        <tr key={rIdx}>
          {row.map((cell, cIdx) => (
            <td key={cIdx} className="px-4 py-2 text-sm text-gray-800">
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
