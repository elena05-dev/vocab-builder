import { useEffect } from "react";
import AddWordForm from "../AddWordForm/AddWordForm";
import css from "./AddWordModal.module.css";

export default function AddWordModal({ onClose, onSuccess }) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg width="24" height="24">
            <use href="/src/assets/icons/sprite.svg#icon-clos" />
          </svg>
        </button>

        <AddWordForm onCancel={onClose} onSuccess={onSuccess} />
      </div>
    </div>
  );
}
