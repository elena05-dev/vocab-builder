import css from "./WordsTable.module.css";
import CircularProgress from "../CircularProgress/CircularProgress";
import { Pencil, Trash2 } from "lucide-react";
import sprite from "../../assets/icons/sprite.svg";
import { useEffect, useState } from "react";

export default function WordsTable({
  words,
  openMenuId,
  setOpenMenuId,
  onEdit,
  onDelete,
  onAdd,
  variant = "dictionary",
  addedWords = [],
}) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = width >= 768;

  useEffect(() => {
    if (variant !== "dictionary") return;

    function handleClickOutside(event) {
      if (!event.target.closest(`.${css.menuWrapper}`)) {
        setOpenMenuId?.(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [variant, setOpenMenuId]);

  return (
    <section className={css.wordTable}>
      <div className={css.tableWrapper}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>Word</th>

              <th>Translation</th>

              {isDesktop && <th>Category</th>}

              {variant === "dictionary" && <th>Progress</th>}

              <th></th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => {
              const isAdded = addedWords.includes(word._id);

              return (
                <tr key={word._id}>
                  <td>{word.en}</td>

                  <td>{word.ua}</td>

                  {isDesktop && (
                    <td className={css.categoryCell}>{word.category}</td>
                  )}

                  {variant === "dictionary" && (
                    <td className={css.progressCell}>
                      {variant === "dictionary" && (
                        <div className={css.progressWrapper}>
                          {isDesktop && (
                            <span className={css.progressText}>
                              {word.progress || 0}%
                            </span>
                          )}

                          <CircularProgress value={word.progress || 0} />
                        </div>
                      )}
                    </td>
                  )}

                  <td className={css.actions}>
                    {variant === "dictionary" ? (
                      <div className={css.menuWrapper}>
                        <button
                          className={css.moreBtn}
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === word._id ? null : word._id,
                            )
                          }
                        >
                          …
                        </button>

                        {openMenuId === word._id && (
                          <div className={css.dropdown}>
                            <button
                              className={css.iconBtn}
                              onClick={() => {
                                onEdit(word);
                                setOpenMenuId(null);
                              }}
                            >
                              <Pencil size={18} />
                              Edit
                            </button>

                            <button
                              className={css.iconBtn}
                              onClick={() => {
                                onDelete(word);
                                setOpenMenuId(null);
                              }}
                            >
                              <Trash2 size={18} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        className={`${css.addBtn} ${isAdded ? css.addedBtn : ""}`}
                        type="button"
                        disabled={isAdded}
                        onClick={() => onAdd?.(word)}
                      >
                        {isAdded ? (
                          <span className={css.addedIcon}>✓</span>
                        ) : (
                          <svg className={css.icon} width="20" height="20">
                            <use
                              href={`${sprite}#icon-switch-horizontal-right`}
                            />
                          </svg>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
