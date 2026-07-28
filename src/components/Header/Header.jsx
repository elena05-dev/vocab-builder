import { useState } from "react";
import Craftwork from "../../assets/icons/Craftwork.svg";
import MobileMenu from "../MobilMenu/MobilMenu";
import Navigation from "../Navigation/Navigation";
import UserBar from "../UserBar/UserBar";
import sprite from "../../assets/icons/sprite.svg";
import css from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleCloseMenu = () => setIsMenuOpen(false);
  return (
    <header className={css.header}>
      <div className={css.container}>
        <div className={css.logo}>
          <img src={Craftwork} alt="VocabBuilder logo" />
          <span className={css.logoName}>VocabBuilder</span>
        </div>

        <div className={css.desktopRight}>
          <Navigation />
          <UserBar variant="desktop" />
        </div>

        <div className={css.mobileRight}>
          <button
            className={css.burger}
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className={css.open} aria-hidden="true" focusable="false">
              <use href={`${sprite}#icon-Nav`} />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </header>
  );
}
