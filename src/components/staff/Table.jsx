import React from 'react';

const ReusableTable = ({ columns, data }) => {
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="w-full overflow-x-auto md:overflow-visible">
      <table className="w-full text-base text-left border-separate border-spacing-y-3">
        <thead className="bg-[#E6B331] text-white font-bold">
          <tr>
            {columns.map((col, index) => (
              <th 
                key={index} 
                style={{ width: col.width }}
                className={`px-6 py-4 ${index === 0 ? 'rounded-tl-lg' : ''} ${index === columns.length - 1 ? 'rounded-tr-lg' : ''} ${
                  col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safeData.length > 0 ? (
            safeData.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="bg-[#F1F3F4] hover:bg-slate-200/40 transition-all duration-150"
              >
                {columns.map((col, colIndex) => (
                  <td 
                    key={colIndex} 
                    style={{ width: col.width }}
                    className={`px-6 py-5 text-[#263959] ${colIndex === 0 ? 'font-bold rounded-l-lg' : 'font-medium'} ${
                      colIndex === columns.length - 1 ? 'rounded-r-lg' : ''
                    } ${
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {col.render ? col.render(row, rowIndex) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-10 text-slate-500 font-semibold text-sm">
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;