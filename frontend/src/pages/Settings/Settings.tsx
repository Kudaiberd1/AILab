import { Navigate, useNavigate } from "react-router-dom";
import { ProjectsContext, UserContext } from "../../App";
import { useContext } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import api from "../../api/api";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { projects } = useContext(ProjectsContext);
  const { setProjects } = useContext(ProjectsContext);

  const handleDelete = (id: number) => {
    setProjects(projects.filter((project) => project.id != id));
    api
      .delete(`/api/project/${id}/`)
      .then(() => console.log("Successfully deleted"))
      .catch((err) => console.log(err, "Delete err"));
  };

  return (
    <>
      {!user.is_staff && <Navigate to="/" />}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mt-18">
          <div className="max-w-6xl mx-auto pt-10 pb-25 px-5 w-full items-center">
            {projects?.map((project) => (
              <div className="flex shadow px-10 py-5 hover:shadow-md rounded justify-between mb-5">
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <p className="font-bold text-xl">{project.title}</p>
                </div>
                <div className="space-x-3">
                  <button
                    className="text-red-500"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this project?"
                        )
                      ) {
                        handleDelete(project.id);
                      }
                    }}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                  <button className="text-blue-500"> Edit </button>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Settings;
