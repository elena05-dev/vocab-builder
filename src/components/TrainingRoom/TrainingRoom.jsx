import css from "./TrainingRoom.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useEffect } from "react";

export default function TrainingRoom({
  task,
  answer,
  setAnswer,
  onNext,
  currentIndex,
  total,
}) {
  const isEnTask = task?.task === "en";

  useEffect(() => {
    setAnswer("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task?._id]);
  if (!task) return null;

  return (
    <div className={css.room}>
      <div className={css.answerCard}>
        <p className={css.label}>
          {isEnTask
            ? "Введіть англійський переклад"
            : "Введіть український переклад"}
        </p>

        <input
          type="text"
          className={css.input}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        {currentIndex < total - 1 && (
          <div className={css.bottomRow}>
            <button className={css.nextBtn} onClick={onNext}>
              Next
              <svg className={css.icon} width="20" height="20">
                <use href={`${sprite}#icon-switch-horizontal-right`} />
              </svg>
            </button>
          </div>
        )}

        <span className={css.langUkr}>
          <svg className={css.flag} width="24" height="24" aria-hidden>
            <use
              href={
                isEnTask
                  ? `${sprite}#icon-united-kingdom`
                  : `${sprite}#icon-ukraine`
              }
            />
          </svg>

          <span className={css.country}>
            {isEnTask ? "English" : "Ukrainian"}
          </span>
        </span>
      </div>

      <div className={css.wordCard}>
        <p className={css.word}>{isEnTask ? task.ua : task.en}</p>

        <span className={css.langUk}>
          <svg className={css.flag} width="24" height="24" aria-hidden>
            <use
              href={
                isEnTask
                  ? `${sprite}#icon-ukraine`
                  : `${sprite}#icon-united-kingdom`
              }
            />
          </svg>
          <span className={css.country}>
            {isEnTask ? "Ukrainian" : "English"}
          </span>
        </span>
      </div>
    </div>
  );
}
