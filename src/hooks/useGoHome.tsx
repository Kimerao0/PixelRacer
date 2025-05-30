import { useNavigate } from "react-router-dom";

export const useGoHome = () => {
  const navigate = useNavigate();
  return () => navigate("/");
};
