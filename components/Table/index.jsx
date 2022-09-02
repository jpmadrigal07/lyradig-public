import React from "react";

const Table = ({ columns, rows, pageCount, currentPage, setCurrentPage }) => {
  return (
    <>
      <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden lg:rounded-t-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {columns.map((column, index) => {
                return (
                  <th
                    key={index}
                    className="px-6 py-3 text-left bg-gray-50 text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    {column}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((transaction, index) => (
              <tr key={index} className="bg-white">
                {transaction.map((tr) => {
                  return (
                    <td
                      key={1}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {tr}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav
        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 lg:rounded-b-lg lg:shadow"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          {rows.length > 0 ? (
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {currentPage === 1 ? 1 : (currentPage - 1) * 10 + 1}
              </span>{" "}
              to <span className="font-medium">{currentPage * 10}</span> of{" "}
              <span className="font-medium">{pageCount}</span> results
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">No data to show</p>
          )}
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={currentPage === pageCount}
            onClick={() =>
              currentPage < pageCount && setCurrentPage(currentPage + 1)
            }
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </nav>
    </>
  );
};

export default Table;
