import React from 'react';
import { motion } from 'framer-motion';

const ReusableTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto font-['Montserrat']">
      <table className="w-full border-separate border-spacing-y-4">
        {/* Table Header */}
        <thead>
          <tr className="bg-[#D4B04C] text-white">
            {columns.map((col, index) => (
              <th 
                key={index} 
                style={{ width: col.width }}
                className="px-4 py-4 font-semibold text-center first:rounded-l-xl last:rounded-r-xl"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <motion.tr 
                key={rowIndex}
                // Animasi pas muncul (Pop-up effect)
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIndex * 0.1 }}
                // Animasi pas Hover
                whileHover={{ 
                  scale: 1.01, 
                  backgroundColor: "#f1f5f9",
                  transition: { duration: 0.2 }
                }}
                className="bg-[#F8F9FA] shadow-sm cursor-default"
              >
                {columns.map((col, colIndex) => (
                  <td 
                    key={colIndex} 
                    className="px-4 py-5 text-[#2D3E50] text-center first:rounded-l-xl last:rounded-r-xl font-bold text-sm border-y border-transparent"
                  >
                    <div className="flex justify-center items-center h-full">
                      {col.render ? col.render(row) : row[col.key]}
                    </div>
                  </td>
                ))}
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-10 text-gray-500">
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