import React, { useState } from "react";

interface Header {
  key: string;
  title: string;
}

interface TableData<T extends { id: number | string; name?: string; title?: string }> {
  headers: Header[];
  tableItems: T[];
}

interface DataTableProps<T extends { id: number | string; name?: string; title?: string }> {
  hideFooter?: boolean;
  tableData: TableData<T>;
  onEditItem?: (item: T) => void;
  onDeleteItem?: (item: T) => void;
  renderColumn?: (key: string, item: T) => React.ReactNode;
  children?: React.ReactNode;
}

const DataTable = <T extends { id: number | string; name?: string; title?: string }>({
  tableData,
  onEditItem,
  onDeleteItem,
  renderColumn,
  children,
}: DataTableProps<T>): JSX.Element => {

  if (!tableData || !tableData.headers || !tableData.tableItems) {
    return <div className="text-center text-grey-800">No data</div>;
  }

  return (
    <div className="w-full">
      {children && <div className="mb-4">{children}</div>}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              {tableData.headers.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2 text-left font-semibold cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>{col.title}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800 divide-y divide-gray-200">
            {tableData.tableItems.length === 0 ? (
              <tr>
                <td colSpan={tableData.headers.length} className="px-4 py-2 text-center">
                  No data available
                </td>
              </tr>
            ) : (
              tableData.tableItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {tableData.headers.map((col) => (
                    <td key={col.key} className="px-4 py-2">
                      {col.key !== "actions" ? (
                        renderColumn ? renderColumn(col.key, item) : (item as Record<string, any>)[col.key] ?? "N/A"
                      ) : (
                        <div className="flex gap-2">
                          <button
                            className="p-1 text-blue-600 hover:text-blue-800"
                            onClick={() => onEditItem?.(item)}
                            aria-label={`Edit ${item?.name || item.title || "item"}`}
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button
                            className="p-1 text-red-600 hover:text-red-800"
                            onClick={() => onDeleteItem?.(item)}
                            aria-label={`Delete ${item.name || item.title || "item"}`}
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M7 7h10m-9 3v8m4-8v8m4-8v8"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;