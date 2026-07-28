import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../redux/slaces/authSlace";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return children;
}
