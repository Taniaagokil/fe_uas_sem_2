import React from 'react';

const ReusableTable = ({ columns, data }) => {
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="w-full overflow-x-auto font-['Montserrat'] scrollbar-hide">
      <table className="w-full min-w-[800px] border-separate border-spacing-y-2">
        <thead>
          <tr style={{ backgroundColor: '#D4B04C', color: 'white' }}>
            {columns.map((col, index) => (
              <th 
                key={index} 
                style={{ 
                  width: col.width,
                  padding: '12px 8px',
                  fontWeight: 'bold',
                  textAlign: col.align || 'center',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  border: 'none',
                  paddingLeft: col.align === 'left' ? '24px' : '8px'
                }}
                className={`${index === 0 ? 'rounded-l-xl' : ''} ${index === columns.length - 1 ? 'rounded-r-xl' : ''}`}
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
                style={{ 
                  backgroundColor: '#F8F9FA',
                  transition: 'background-color 0.2s'
                }}
                className="hover:bg-gray-100 shadow-sm"
              >
                {columns.map((col, colIndex) => (
                  <td 
                    key={colIndex} 
                    style={{ 
                      padding: '12px 8px',
                      color: '#2D3E50',
                      textAlign: col.align || 'center',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      border: 'none',
                      paddingLeft: col.align === 'left' ? '24px' : '8px'
                    }}
                    className={`${colIndex === 0 ? 'rounded-l-xl' : ''} ${colIndex === columns.length - 1 ? 'rounded-r-xl' : ''}`}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: col.align === 'left' ? 'flex-start' : 'center', 
                      alignItems: 'center', 
                      height: '100%',
                      overflow: 'hidden'
                    }}>
                      {col.render ? col.render(row, rowIndex) : <span className="truncate w-full block">{row[col.key]}</span>}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
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