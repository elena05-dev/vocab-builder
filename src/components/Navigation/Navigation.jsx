import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slaces/authSlace";
import sprite from "../../assets/icons/sprite.svg";
import css from "./Navigation.module.css";

export default function Navigation({ onItemClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li className={css.listItem}>
          <NavLink
            to="/dictionary"
            onClick={onItemClick}
            className={({ isActive }) =>
              isActive ? css.activeLink : css.navLink
            }
          >
            Dictionary
          </NavLink>
        </li>

        <li className={css.listItem}>
          <NavLink
            to="/recommend"
            onClick={onItemClick}
            className={({ isActive }) =>
              isActive ? css.activeLink : css.navLink
            }
          >
            Recommend
          </NavLink>
        </li>

        <li className={css.listItem}>
          <NavLink
            to="/training"
            onClick={onItemClick}
            className={({ isActive }) =>
              isActive ? css.activeLink : css.navLink
            }
          >
            Training
          </NavLink>
        </li>
        <li className={css.logoutItem}>
          <button
            type="button"
            className={css.logoutBtn}
            onClick={handleLogout}
          >
            <span>Log out</span>
            <svg className={css.logoutIcon} width="16" height="16">
              <use href={`${sprite}#icon-arrow-right-1`} />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
