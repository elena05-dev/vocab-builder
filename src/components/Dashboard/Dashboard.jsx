import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";
import Statistics from "../Statistics/Statistics";
import AddWordBtn from "../AddWordBtn/AddWordBtn";
import sprite from "../../assets/icons/sprite.svg";
import css from "./Dashboard.module.css";

export default function Dashboard({
  showAddWordBtn,
  search,
  setSearch,
  category,
  setCategory,
  verbType,
  setVerbType,
  onAddWordClick,
}) {
  return (
    <div className={css.dashboard}>
      <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        verbType={verbType}
        setVerbType={setVerbType}
      />
      <div className={css.stataction}>
        <Statistics />

        <div className={css.actions}>
          {showAddWordBtn && <AddWordBtn onClick={onAddWordClick} />}

          <Link
            to="/training"
            className={css.trainLink}
            aria-label="Go to training"
          >
            Train oneself
            <svg className={css.icon} width="20" height="20">
              <use href={`${sprite}#icon-switch-horizontal-right`} />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
