import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./loginSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slaces/authSlace";
import toast from "react-hot-toast";
import css from "./LoginForm.module.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/dictionary");
      } else {
        toast.error(resultAction.payload || "Login error");
      }
    } catch {
      toast.error("Login error");
    }
  };

  const getInputClass = (name) => {
    if (!touchedFields[name]) return css.input;
    if (errors[name]) return `${css.input} ${css.inputError}`;
    if (dirtyFields[name]) return `${css.input} ${css.inputDirty}`;
    return css.input;
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.formContainer}>
        <h1 className={css.title}>Login</h1>
        <p className={css.text}>
          Please enter your login details to continue using our service:
        </p>

        <label className={css.label}>
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            className={getInputClass("email")}
            {...register("email")}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </label>

        <label className={css.label}>
          <div className={css.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Password"
              className={getInputClass("password")}
              {...register("password")}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className={css.eyeBtn}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <svg className={css.icon} aria-hidden="true" focusable="false">
                <use
                  href={
                    showPassword
                      ? "/src/assets/icons/sprite.svg#icon-eye"
                      : "/src/assets/icons/sprite.svg#icon-eye-off"
                  }
                />
              </svg>
            </button>
          </div>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </label>

        <button type="submit" className={css.submitBtn}>
          Login
        </button>
        <p className={css.switchText}>
          <Link to="/register" className={css.link}>
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
