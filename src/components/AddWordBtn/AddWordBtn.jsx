import { useState } from "react";
import AddWordModal from "../AddWordModal/AddWordModal";
import css from "./AddWordBtn.module.css";

export default function AddWordBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={css.addWordBtn} onClick={() => setIsOpen(true)}>
        Add Word{" "}
        <svg className={css.iconPlus} width="20" height="20">
          <use href="/src/assets/icons/sprite.svg#icon-plus" />
        </svg>
      </button>
      {isOpen && <AddWordModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
