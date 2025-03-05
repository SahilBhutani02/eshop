
export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: any) {

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center space-x-2 m-4">
      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-90 dark:bg-gray-800 dark:text-white text-black"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        {`<`}
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-4 py-2 ${
            currentPage === i + 1 ? "bg-blue-500 text-white dark:text-black" : "bg-gray-200 dark:bg-gray-800 dark:text-white text-black"
          } rounded`}
          onClick={() => handlePageClick(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-90 dark:bg-gray-800 dark:text-white text-black"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        {`>`}
      </button>
    </div>
  );
}
