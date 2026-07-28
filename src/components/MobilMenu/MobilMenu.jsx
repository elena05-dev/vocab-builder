import Navigation from "../Navigation/Navigation";
import heroMobile1x from "../../assets/images/hero_mob_1x.png";
import heroMobile2x from "../../assets/images/hero_mob_2x.png";
import UserBar from "../UserBar/UserBar";
import sprite from "../../assets/icons/sprite.svg";
import css from "./MobilMenu.module.css";

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div className={`${css.modMenu} ${isOpen ? css.open : ""}`}>
      <div className={css.userBtn}>
        <UserBar variant="mobile" />

        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg width="32" height="32">
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>
      </div>

      <nav className={css.nav}>
        <Navigation onItemClick={onClose} />

        <img
          className={css.heroImg}
          src={heroMobile1x}
          srcSet={`${heroMobile2x} 2x`}
          alt=""
          aria-hidden="true"
        />
      </nav>
    </div>
  );
}
