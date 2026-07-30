import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./loader/loader";

export default function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  if (isRefreshing) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}
