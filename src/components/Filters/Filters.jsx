import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/slaces/categoriesSlace";
import {
  selectCategoriesItems,
  selectCategoriesStatus,
  selectCategoriesError,
} from "../../redux/slaces/selectors/categoriesSelectors";
import Loader from "../loader/loader";
import css from "./Filters.module.css";

export default function Filters({
  search,
  setSearch,
  category,
  setCategory,
  verbType,
  setVerbType,
}) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesItems);
  const status = useSelector(selectCategoriesStatus);
  const error = useSelector(selectCategoriesError);
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (localSearch === search) return;

    const timer = setTimeout(() => {
      setSearch(localSearch.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, search, setSearch]);

  if (status === "loading") {
    return <Loader />;
  }
  if (status === "failed") {
    return <p>Error loading categories: {error?.message || error}</p>;
  }

  return (
    <section className={css.filters}>
      <div className={css.searchWrapper}>
        <svg className={css.searchIcon} width="20" height="20">
          <use href="/src/assets/icons/sprite.svg#icon-search" />
        </svg>
        <input
          type="text"
          placeholder="Find the word"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <div className={css.selectWrapper}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span>
          <svg className={css.selectIcon} width="20" height="20">
            <use href="/src/assets/icons/3d-mpr-toggle 2.svg" />
          </svg>
        </span>
      </div>

      {category === "verb" && (
        <div className={css.radioGroup}>
          <label className={css.radioLabel}>
            <input
              type="radio"
              name="verbType"
              value="regular"
              checked={verbType === "regular"}
              onChange={(e) => setVerbType(e.target.value)}
            />
            Regular
          </label>

          <label className={css.radioLabel}>
            <input
              type="radio"
              name="verbType"
              value="irregular"
              checked={verbType === "irregular"}
              onChange={(e) => setVerbType(e.target.value)}
            />
            Irregular
          </label>
        </div>
      )}
    </section>
  );
}
