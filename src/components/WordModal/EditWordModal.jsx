import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addWord } from "../../redux/slaces/wordSlace";
import toast from "react-hot-toast";
import css from "./EditWordModal.module.css";

const EN_REGEX = /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/;
const UA_REGEX = /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u;

export default function EditWordModal({ onCancel }) {
  const [verbType, setVerbType] = useState("regular");
  const [en, setEn] = useState("");
  const [ua, setUa] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const status = useSelector((state) => state.words.status);
  const error = useSelector((state) => state.words.error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!EN_REGEX.test(en)) newErrors.en = "Invalid English word";
    if (!UA_REGEX.test(ua)) newErrors.ua = "Invalid Ukrainian word";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      await dispatch(addWord({ verbType, en, ua })).unwrap();

      toast.success("Word added successfully!");

      setVerbType("regular");
      setEn("");
      setUa("");
      setErrors({});

      onCancel();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.field}>
        <span className={css.lang}>
          <svg className={css.flag} width="24" height="24" aria-hidden>
            <use href="/src/assets/icons/sprite.svg#icon-ukraine" />
          </svg>
          <span className={css.country}>Ukrainian</span>
        </span>

        <input value={ua} onChange={(e) => setUa(e.target.value)} />
      </label>
      {errors.ua && <p>{errors.ua}</p>}
      <label className={css.field}>
        <span className={css.lang}>
          <svg className={css.flag} width="24" height="24" aria-hidden>
            <use href="/src/assets/icons/sprite.svg#icon-united-kingdom" />
          </svg>
          <span className={css.country}>English</span>
        </span>

        <input value={en} onChange={(e) => setEn(e.target.value)} />
      </label>
      {errors.en && <p>{errors.en}</p>}
      <div className={css.allBtn}>
        <button
          className={css.addBtn}
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Saving..." : "Save"}
        </button>
        <button className={css.cancelBtn} type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>{" "}
      {status === "failed" && <p className={css.error}>{error}</p>}
    </form>
  );
}
