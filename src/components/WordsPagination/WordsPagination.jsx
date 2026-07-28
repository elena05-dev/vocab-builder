import css from "./WordsPagination.module.css";

export default function WordsPagination({
  totalPages = 20,
  currentPage,
  onPageChange,
}) {
  const handleClick = (page) => {
    if (page < 1 || page > totalPages) return;
    if (onPageChange) onPageChange(page);
  };
  const getPages = () => {
    const delta = 1;
    const pages = [];

    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (!pages.includes(1)) {
      if (pages[0] > 2) {
        pages.unshift("...");
      }
      pages.unshift(1);
    }

    if (!pages.includes(totalPages)) {
      if (pages[pages.length - 1] < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={css.pagination}>
      <button
        className={css.arrow}
        onClick={() => handleClick(1)}
        disabled={currentPage === 1}
      >
        «
      </button>

      <button
        className={css.arrow}
        onClick={() => handleClick(Number(currentPage) - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={index} className={css.dots}>
            ...
          </span>
        ) : (
          <button
            key={`${page}-${index}`}
            className={`${css.pageBtn} ${
              currentPage === page ? css.active : ""
            }`}
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={css.arrow}
        onClick={() => handleClick(Number(currentPage) + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>

      <button
        className={css.arrow}
        onClick={() => handleClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
}
