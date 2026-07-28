import { useNavigate } from "react-router-dom";
import book_mob_1x from "../../assets/images/book_mob_1x.png";
import book_tab_1x from "../../assets/images/book_tab_1x.png";
import book_tab_2x from "../../assets/images/book_tab_2x.png";
import book_desk_1x from "../../assets/images/hero_desk_1x.png";
import book_desk_2x from "../../assets/images/book_desk_2x.png";
import css from "./TrainingEmpty.module.css";

export default function TrainingEmpty() {
  const navigate = useNavigate();

  const handleAddWord = () => {
    navigate("/dictionary", { state: { openAddModal: true } });
  };

  const handleCancel = () => {
    navigate("/dictionary");
  };

  return (
    <section className={css.empty}>
      <div className="container">
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={`
      ${book_desk_1x} 1x,
      ${book_desk_2x} 2x
    `}
          />

          <source
            media="(min-width: 768px)"
            srcSet={`
      ${book_tab_1x} 1x,
      ${book_tab_2x} 2x
    `}
          />

          <img
            className={css.bookImg}
            src={book_mob_1x}
            alt="Book illustration"
            loading="lazy"
          />
        </picture>

        <h2 className={css.title}>
          You’ve completed all available training words
        </h2>

        <p className={css.text}>
          You can repeat your training to reinforce what you’ve already learned
          or add new words to continue expanding your vocabulary.
        </p>
        <footer className={css.footerActions}>
          <button className={css.addBtn} onClick={handleAddWord}>
            Add word
          </button>

          <button className={css.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </footer>
      </div>
    </section>
  );
}
