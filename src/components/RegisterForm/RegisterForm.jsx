import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "./RegisterSchema";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { registerUser } from "../../redux/slaces/authSlace";
import sprite from "../../assets/icons/sprite.svg";
import css from "./RegisterForm.module.css";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(registerUser(data));

      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("Registration successful!");
        navigate("/dictionary");
      } else {
        toast.error(resultAction.payload || "Registration failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
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
        <h1 className={css.title}>Register</h1>
        <p className={css.text}>
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </p>

        <label className={css.label}>
          <input
            type="text"
            autoComplete="name"
            placeholder="Name"
            className={getInputClass("name")}
            {...register("name")}
          />

          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </label>
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
              autoComplete="new-password"
              placeholder="Password"
              className={getInputClass("password")}
              {...register("password")}
            />
            <button
              type="button"
              className={css.eyeBtn}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <svg className={css.icon} aria-hidden="true" focusable="false">
                <use
                  href={
                    showPassword
                      ? `${sprite}#icon-eye`
                      : `${sprite}#icon-eye-off`
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
          Register
        </button>
        <p className={css.switchText}>
          <Link to="/login" className={css.link}>
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
