import { useEffect } from "react";
import floating_desk_1x from "../../assets/images/floating_desk_1x.png";
import floating_desk_2x from "../../assets/images/floating_desk_2x.png";
import floating_tab_1x from "../../assets/images/floating_tab_1x.png";
import floating_tab_2x from "../../assets/images/floating_tab_2x.png";
import css from "./WellDoneModal.module.css";

export default function WellDoneModal({
  onClose,

  mistakes,
  correctWords = [],
}) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();

    window.addEventListener("keydown", onEsc);

    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h2 className={css.title}>Well done!</h2>
        <div className={css.welldone}>
          <div className={css.correctBlock}>
            <p>Correct answers:</p>

            {correctWords.length ? (
              <ul>
                {correctWords.map((item) => (
                  <li key={`${item._id}_${item.task}`}>
                    {item.en} — {item.ua}
                  </li>
                ))}
              </ul>
            ) : (
              <p>0</p>
            )}
          </div>

          <div className={css.mistakes}>
            <p>Mistakes:</p>

            {mistakes.length ? (
              <ul>
                {mistakes.map((item) => (
                  <li key={`${item._id}_${item.task}`}>
                    {item.en} — {item.ua}
                  </li>
                ))}
              </ul>
            ) : (
              <p>0</p>
            )}
            <picture>
              <source
                media="(min-width: 1440px)"
                srcSet={`
                  ${floating_desk_1x} 1x,
                  ${floating_desk_2x} 2x
                `}
              />

              <source
                media="(min-width: 768px)"
                srcSet={`
                  ${floating_tab_1x} 1x,
                  ${floating_tab_2x} 2x
                `}
              />

              <img
                className={css.bookImg}
                src={floating_tab_1x}
                alt="Book_floating illustration"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}
