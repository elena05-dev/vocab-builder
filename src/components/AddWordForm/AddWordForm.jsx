import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { addWord } from "../../redux/slaces/wordSlice";
import { fetchCategories } from "../../redux/slaces/categoriesSlace";
import { fetchStatistics } from "../../redux/slaces/wordSlice";
import { selectCategoriesItems } from "../../redux/slaces/selectors/categoriesSelectors";
import toast from "react-hot-toast";
import css from "./AddWordForm.module.css";

const EN_REGEX = /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/;
const UA_REGEX = /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u;
const IRREGULAR_VERB_REGEX = /^[A-Za-z]+-[A-Za-z]+-[A-Za-z]+$/;

export default function AddWordForm({ onCancel, onSuccess }) {
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [verbType, setVerbType] = useState("regular");
  const [en, setEn] = useState("");
  const [ua, setUa] = useState("");
  const [errors, setErrors] = useState({});
  const status = useSelector((state) => state.words.status);
  const error = useSelector((state) => state.words.error);
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesItems);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!category) {
      newErrors.category = "Select category";
    }
    if (!EN_REGEX.test(en)) newErrors.en = "Invalid English word";
    if (!UA_REGEX.test(ua)) newErrors.ua = "Invalid Ukrainian word";
    if (category === "verb" && verbType === "irregular") {
      if (!IRREGULAR_VERB_REGEX.test(en)) {
        newErrors.en = "Use format: go-went-gone";
      }
    }
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      await dispatch(
        addWord({
          category,
          en,
          ua,
          isIrregular:
            category === "verb" ? verbType === "irregular" : undefined,
        }),
      ).unwrap();

      dispatch(fetchStatistics());

      toast.success("Word added successfully!");

      setCategory("");
      setVerbType("regular");
      setEn("");
      setUa("");
      setErrors({});

      onSuccess?.();
      onCancel();
    } catch (err) {
      toast.error(
        typeof err === "string" ? err : err?.message || "Something went wrong",
      );
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h1 className={css.title}>Add word</h1>
      <p className={css.text}>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </p>
      <div className={css.selectWrap} ref={selectRef}>
        <div
          className={`${css.selected} ${errors.category ? css.errorBorder : ""}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          {category ? category : "Category"}
          <svg className={css.selectIcon} width="20" height="20">
            <use href="/src/assets/icons/sprite1.svg#icon-cheveron-down" />
          </svg>
        </div>
        {errors.category && <p className={css.error}>{errors.category}</p>}

        {open && (
          <ul className={css.options}>
            <li
              onClick={() => {
                setCategory("");
                setOpen(false);
              }}
            >
              Category
            </li>

            {categories.map((c) => (
              <li
                key={c}
                onClick={() => {
                  setCategory(c);
                  setOpen(false);

                  setErrors((prev) => ({
                    ...prev,
                    category: "",
                  }));
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
      {category === "verb" && (
        <div
          className={`${css.radioGroup} ${
            verbType === "regular" ? css.mb32 : ""
          }`}
        >
          <label className={css.radioLabel}>
            <input
              type="radio"
              name="verbType"
              value="regular"
              checked={verbType === "regular"}
              onChange={(e) => setVerbType(e.target.value)}
            />
            <span className={css.radioText}>Regular</span>
          </label>

          <label className={css.radioLabel}>
            <input
              type="radio"
              name="verbType"
              value="irregular"
              checked={verbType === "irregular"}
              onChange={(e) => setVerbType(e.target.value)}
            />
            <span className={css.radioText}>Irregular</span>
          </label>
        </div>
      )}
      {category === "verb" && verbType === "irregular" && (
        <p className={css.hint}>
          Such data must be entered in the format I form-II form-III form.
        </p>
      )}
      <label className={css.field}>
        <span className={css.lang}>
          <svg className={css.flag} width="24" height="24" aria-hidden>
            <use href="/src/assets/icons/sprite.svg#icon-ukraine" />
          </svg>
          <span className={css.country}>Ukrainian</span>
        </span>

        <input value={ua} onChange={(e) => setUa(e.target.value)} />
      </label>
      {errors.ua && <p className={css.error}>{errors.ua}</p>}
      <label className={css.field}>
        <span className={css.lang}>
          <svg className={css.flag} width="24" height="24" aria-hidden>
            <use href="/src/assets/icons/sprite.svg#icon-united-kingdom" />
          </svg>
          <span className={css.country}>English</span>
        </span>

        <input value={en} onChange={(e) => setEn(e.target.value)} />
      </label>
      {errors.en && <p className={css.error}>{errors.en}</p>}
      <div className={css.allBtn}>
        <button
          className={css.addBtn}
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Adding..." : "Add"}
        </button>
        <button className={css.cancelBtn} type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>{" "}
      {status === "failed" && (
        <p className={css.error}>
          {typeof error === "string" ? error : error?.message}
        </p>
      )}
    </form>
  );
}
