import Login from "./pages/Auth/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import NotFound from "./pages/NotFound";
import Register from "./pages/Auth/Register";
import { createContext, useContext, useEffect, useState } from "react";
import api from "./api/api";
import ProtectedRoute from "./api/ProtectedRoute";
import AddProject from "./pages/Project/AddProject";
import ProjectPage from "./pages/Project/ProjectPage";
import type { Photo, Project } from "./pages/MainPage/Projects";
import Settings from "./pages/Settings/Settings";

export const Authorized = createContext<any>(null);
export const UserContext = createContext<any>(null);
export const PhotoContext = createContext<any>(null);
export const ProjectsContext = createContext<any>(null);
export const FilteredProjects = createContext<any>(null);

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

function Logout() {
  localStorage.clear();
  const { setAuthorized } = useContext(Authorized);
  setAuthorized(false);
  return <Navigate to="/login" />;
}

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState<User>();
  const [photos, setPhotos] = useState<Photo[]>();
  const [projects, setProjects] = useState<Project[]>();
  const [fprojects, setFprojects] = useState<Project[]>();

  useEffect(() => {
    api
      .get("/api/projects/")
      .then((res) => {
        setProjects(res.data);
        setFprojects(res.data);
        console.log(res.data, "projects");
      })
      .then((err) => {
        console.log(err, "project err");
      });
    api
      .get("/api/my/")
      .then((res) => {
        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
        } else {
          localStorage.removeItem("user");
        }
        setAuthorized(true);
      })
      .catch((err) => {
        console.log(err, "in user");
        setAuthorized(false);
      });
    api
      .get("/api/photos/")
      .then((res) => {
        setPhotos(res.data);
        console.log(res.data, "photos");
      })
      .then((err) => {
        console.log(err, "project err");
      });
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Authorized.Provider value={{ authorized, setAuthorized }}>
          <ProjectsContext.Provider value={{ projects, setProjects }}>
            <FilteredProjects.Provider value={{ fprojects, setFprojects }}>
              <UserContext.Provider value={{ user, setUser }}>
                <PhotoContext.Provider value={{ photos }}>
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/setting"
                      element={
                        <ProtectedRoute>
                          <Settings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/add"
                      element={
                        <ProtectedRoute>
                          {" "}
                          <AddProject />{" "}
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/project/:id" element={<ProjectPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PhotoContext.Provider>
              </UserContext.Provider>
            </FilteredProjects.Provider>
          </ProjectsContext.Provider>
        </Authorized.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
