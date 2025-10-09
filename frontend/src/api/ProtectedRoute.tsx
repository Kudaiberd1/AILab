import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "./api";
import { createContext, useEffect, useState } from "react";

export const authorizedContext = createContext<any>(null);

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const ACCESS_TOKEN = "access";
  const REFRESH_TOKEN = "refresh";

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    if (!refresh) {
      setIsAuthorized(false);
      return;
    }
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh,
      });
      console.log("Refresh response:", res.data);
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decode = jwtDecode(token);
    const tokenExpiration = (decode as { exp: number }).exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" replace />;
}
