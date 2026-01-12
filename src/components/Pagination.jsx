export default function Pagination({
  currentPage,
  totalPhotos,
  photosPerPage,
  onPageChange
}) {
  const totalPages = Math.ceil(totalPhotos / photosPerPage)

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-4 my-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
