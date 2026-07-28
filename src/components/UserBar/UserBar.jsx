import { useSelector } from "react-redux";
import css from "./UserBar.module.css";

export default function UserBar({ variant = "mobile" }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <div
      className={`${css.userBar} ${
        variant === "header" ? css.header : css.mobile
      }`}
    >
      <span className={css.userName}>{user.name}</span>

      <div className={css.avatarPlaceholder}>
        {user.name?.charAt(0).toUpperCase() || "U"}
      </div>
    </div>
  );
}
