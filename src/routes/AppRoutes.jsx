import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";
import DictionaryPage from "../pages/Dictionary/DictionaryPage";
import RecommendPage from "../pages/Recommend/RecommendPage";
import TrainingPage from "../pages/Training/TrainingPage";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../components/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dictionary" />} />
        <Route path="dictionary" element={<DictionaryPage />} />
        <Route path="recommend" element={<RecommendPage />} />
        <Route path="training" element={<TrainingPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
