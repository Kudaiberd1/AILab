import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { PhotoContext, ProjectsContext, UserContext } from "../../App";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../api/api";

interface Project {
  id: number;
  title: string;
  photo: any[];
  description: string;
  about: string;
  status: number;
  tags: string[];
  stacks: string[];
  author: string[];
  link: string;
  started_date: string;
  ended_date: string;
}

const AddProject = () => {
  const { user } = useContext(UserContext);

  const [newProject, setNewProject] = useState<Project>();
  const [tag, setTag] = useState("");
  const [stack, setStack] = useState("");
  const [authorr, setAuthorr] = useState("");
  const { projects } = useContext(ProjectsContext);
  const { setProjects } = useContext(ProjectsContext);
  const { photos } = useContext(PhotoContext);
  const { setPhotos } = useContext(PhotoContext);
  const [phottos, setPhottos] = useState<string[]>([]);
  const [photoId, setPhotoId] = useState<number[]>([]);

  const navigate = useNavigate();

  const handleClickTag = () => {
    setNewProject({ ...newProject, tags: [...(newProject?.tags || []), tag] });
    setTag("");
  };

  const handleClickStack = () => {
    setNewProject({
      ...newProject,
      stacks: [...(newProject?.stacks || []), stack],
    });
    setStack("");
  };

  const handleClickAuthor = () => {
    setNewProject({
      ...newProject,
      author: [...(newProject?.author || []), authorr],
    });
    setAuthorr("");
  };

  const deleteClickedTag = (name: string) => {
    setNewProject({
      ...newProject,
      tags: newProject?.tags.filter((tag) => tag != name),
    });
  };

  const deleteClickedStack = (name: string) => {
    setNewProject({
      ...newProject,
      stacks: newProject?.stacks.filter((stack) => stack != name),
    });
  };

  const deleteClickedAuthor = (name: string) => {
    setNewProject({
      ...newProject,
      author: newProject?.author.filter((authorrr) => authorrr != name),
    });
  };

  const handleChange = (newProject: any) => {
    setProjects([...projects, newProject]);
    navigate("/");
  };

  const handleSavePhotos = (photo: File) => {
    const formData = new FormData();
    formData.append("photo", photo);
    console.log(formData, "Formated data");
    setPhottos([...phottos, photo.name]);

    api
      .post("/api/photo/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setPhotoId((prev) => [...prev, res.data.id]);
        //console.log(res.data, "res data");
      })
      .catch((err) => console.error("Error uploading photo:", err));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const projectToSend = { ...newProject, photo: photoId };
    console.log(projectToSend, "sending project with photo ids");

    api
      .post("/api/project/1/", projectToSend)
      .then(() => {
        console.log("Successfully sent!");
        handleChange(projectToSend);
      })
      .catch((err) => console.error("Error in sending:", err));
  };
  //console.log(photoId);

  return (
    <>
      {!user.is_staff && <Navigate to="/" />}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mt-25">
          <div className="max-w-4xl mx-auto pt-10 pb-25 px-5 w-full items-center">
            <h1 className="text-3xl font-bold pb-10 text-center">
              {" "}
              Add Project{" "}
            </h1>
            <div className="shadow w-full mt-5 px-10 py-10 rounded-lg">
              <h1 className="text-xl font-semibold pb-7"> Project details </h1>
              <form className="" onSubmit={handleSubmit}>
                <p className="pb-1"> Project name </p>
                <input
                  placeholder="Enter project name..."
                  value={newProject?.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  className="border px-3 py-1 rounded-lg w-full mb-5"
                />
                <p className="pb-1"> Short description </p>
                <textarea
                  value={newProject?.about}
                  onChange={(e) =>
                    setNewProject({ ...newProject, about: e.target.value })
                  }
                  placeholder="Enter short description..."
                  className="border px-3 py-1 rounded-lg w-full mb-5"
                />
                <p className="pb-1"> Description </p>
                <textarea
                  value={newProject?.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter description..."
                  className="border px-3 py-1 rounded-lg w-full mb-5"
                />

                <p className="pb-2"> Images </p>
                <label className="block">
                  <span className="sr-only">Choose photo</span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setNewProject({
                        ...newProject,
                        photo: [
                          ...(newProject?.photo || []),
                          e.target.files[0] || "",
                        ],
                      }),
                        setPhottos([...phottos, e.target.files[0].name || ""]);
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100 mb-5"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Choose photo</span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setNewProject({
                        ...newProject,
                        photo: [
                          ...(newProject?.photo || []),
                          e.target.files[0] || "",
                        ],
                      }),
                        setPhottos([...phottos, e.target.files[0].name || ""]);
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100 mb-5"
                  />
                </label>
                <label className="block mb-5">
                  <span className="sr-only">Choose photo</span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setNewProject({
                        ...newProject,
                        photo: [
                          ...(newProject?.photo || []),
                          e.target.files[0] || "",
                        ],
                      }),
                        setPhottos([...phottos, e.target.files[0].name || ""]);
                    }}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100 mb-5"
                  />
                </label>
                <p className="pb-1"> Status </p>
                <select
                  value={newProject?.status ?? ""}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      status: Number(e.target.value),
                    })
                  }
                  className="border px-3 py-1 rounded-lg w-full mb-5"
                >
                  <option value="">Select status</option>
                  <option value={0}>In progress</option>
                  <option value={1}>Sold</option>
                  <option value={2}>Ready to start</option>
                  <option value={3}>MVP</option>
                  <option value={4}>Finished</option>
                </select>
                <p className="pb-1"> Tags </p>
                <div className="flex space-x-2">
                  {newProject?.tags &&
                    newProject.tags.map((tag, index) => (
                      <p
                        key={index}
                        className={`border border-gray-800 rounded-2xl px-3 py-1 my-1 text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800`}
                        onClick={() => deleteClickedTag(tag)}
                      >
                        {" "}
                        {tag}{" "}
                      </p>
                    ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    placeholder="Enter tag..."
                    value={tag}
                    className="border px-3 py-1 rounded-lg mb-5"
                    onChange={(e) => setTag(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleClickTag()}
                    className="text-3xl font-bold pb-6"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>

                <p className="pb-1"> Stacks </p>
                <div className="flex space-x-2">
                  {newProject?.stacks &&
                    newProject.stacks.map((stack, index) => (
                      <p
                        key={index}
                        className={`border border-gray-800 rounded-2xl px-3 py-1 my-1 text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800`}
                        onClick={() => deleteClickedStack(stack)}
                      >
                        {" "}
                        {stack}{" "}
                      </p>
                    ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    placeholder="Enter stack..."
                    value={stack}
                    className="border px-3 py-1 rounded-lg mb-5"
                    onChange={(e) => setStack(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleClickStack()}
                    className="text-3xl font-bold pb-6"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>

                <p className="pb-1"> Authors </p>
                <div className="flex space-x-2">
                  {newProject?.author &&
                    newProject.author.map((authorrr, index) => (
                      <p
                        key={index}
                        className={`border border-gray-800 rounded-2xl px-3 py-1 my-1 text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800`}
                        onClick={() => deleteClickedAuthor(authorrr)}
                      >
                        {" "}
                        {authorrr}{" "}
                      </p>
                    ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    placeholder="Enter stack..."
                    value={authorr}
                    className="border px-3 py-1 rounded-lg mb-5"
                    onChange={(e) => setAuthorr(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleClickAuthor()}
                    className="text-3xl font-bold pb-6"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>

                <p className="pb-1"> Project name </p>
                <input
                  placeholder="Enter github link(not required)"
                  value={newProject?.link}
                  onChange={(e) =>
                    setNewProject({ ...newProject, link: e.target.value })
                  }
                  className="border px-3 py-1 rounded-lg w-full mb-5"
                />
                <p className="pb-1">Started Date</p>
                <input
                  type="date"
                  value={newProject?.started_date || ""}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      started_date: e.target.value,
                    })
                  }
                  className="border px-3 py-1 rounded-lg w-full mb-5"
                />

                <p className="pb-1">Ended Date</p>
                <input
                  type="date"
                  value={newProject?.ended_date || ""}
                  onChange={(e) =>
                    setNewProject({ ...newProject, ended_date: e.target.value })
                  }
                  className="border px-3 py-1 rounded-lg w-full mb-5"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AddProject;
