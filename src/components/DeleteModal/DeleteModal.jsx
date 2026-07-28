import css from "./DeleteModal.module.css";

export default function DeleteModal({ word, onConfirm, onClose }) {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <h2>Delete word</h2>

        <p>
          Are you sure you want to delete <strong>{word.en}</strong>?
        </p>

        <div className={css.actions}>
          <button className={css.deleteBtn} onClick={() => onConfirm(word)}>
            Delete
          </button>

          <button className={css.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
