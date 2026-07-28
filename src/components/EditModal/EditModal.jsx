import { useState, useEffect } from "react";
import css from "./EditModal.module.css";

export default function EditModal({ word, onSave, onClose }) {
  const [form, setForm] = useState({
    en: word.en,
    ua: word.ua,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave({
      ...word,
      en: form.en,
      ua: form.ua,
    });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg width="24" height="24">
            <use href="/src/assets/icons/sprite.svg#icon-clos" />
          </svg>
        </button>

        <label className={css.field}>
          <span className={css.lang}>
            <svg className={css.flag} width="24" height="24" aria-hidden>
              <use href="/src/assets/icons/sprite.svg#icon-ukraine" />
            </svg>
            <span className={css.country}>Ukrainian</span>
          </span>
          <input name="ua" value={form.ua} onChange={handleChange} />
        </label>

        <label className={css.field}>
          <span className={css.lang}>
            <svg className={css.flag} width="24" height="24" aria-hidden>
              <use href="/src/assets/icons/sprite.svg#icon-united-kingdom" />
            </svg>
            <span className={css.country}>English</span>
          </span>
          <input name="en" value={form.en} onChange={handleChange} />
        </label>

        <div className={css.actions}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
