import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import { type Author, type Project, type Stack } from "../MainPage/Projects";
import { PhotoContext } from "../../App";
import { status_dict } from "../../services/constants";
import { BsCalendar2Week } from "react-icons/bs";
import type { Tag } from "../MainPage/Filter";

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  //console.log(id);
  const { photos } = useContext(PhotoContext);
  const [tags, setTags] = useState<Tag[]>();
  const [stacks, setStacks] = useState<Stack[]>();
  const [authors, setAuthors] = useState<Author[]>();

  const navigate = useNavigate();

  const [project, setProject] = useState<Project>();

  useEffect(() => {
    console.log("Fetching project:", id);
    api
      .get(`/api/project/${id}/`)
      .then((res) => {
        setProject(res.data), console.log(res.data);
      })
      .catch((err) => console.log(err, "Project id"));
    api
      .get("/api/tag/")
      .then((res) => {
        setTags(res.data);
        //console.log(res);
      })
      .catch((err) => console.log(err, "err tag"));
    api
      .get("/api/stacks/")
      .then((res) => {
        setStacks(res.data);
        //console.log(res);
      })
      .catch((err) => console.log(err, "err stack"));
    api
      .get("/api/author/")
      .then((res) => {
        setAuthors(res.data);
        //console.log(res);
      })
      .catch((err) => console.log(err, "err stack"));
  }, [id]);

  return (
    <>
      {project ? (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow mt-25">
            <div className="max-w-5xl mx-auto rounded pt-10 pb-25 px-5">
              <div className="flex justify-between w-full">
                <h1 className="text-4xl font-bold max-w-lg">
                  {" "}
                  {project?.title}{" "}
                </h1>
                <div className="flex my-auto">
                  <button
                    className="border px-4 py-1 text-xs border-gray-300 text-gray-600 rounded hover:border-gray-800"
                    onClick={() => navigate("/")}
                  >
                    ← Back
                  </button>
                </div>
              </div>
              <div className="my-10">
                {project.photo[0] && (
                  <img
                    className="w-full h-150 rounded-2xl"
                    src={`http://localhost:8000${
                      photos?.find((p) => p.id === project.photo[0])?.photo
                    }`}
                  />
                )}
                <div className="flex gap-2 mt-1">
                  {project.photo[1] && (
                    <img
                      className="w-full rounded-2xl"
                      src={`http://localhost:8000${
                        photos?.find((p) => p.id === project.photo[1])?.photo
                      }`}
                    />
                  )}
                  {project.photo[2] && (
                    <img
                      className="w-full rounded-2xl"
                      src={`http://localhost:8000${
                        photos?.find((p) => p.id === project.photo[2])?.photo
                      }`}
                    />
                  )}
                </div>
              </div>
              <hr className="border-gray-300 mb-10" />
              <div className="flex gap-2 space-x-4">
                <div className="max-w-xl">
                  <h1 className="text-2xl font-semibold font-open-sans pb-4">
                    Detailed description.
                  </h1>
                  <p className="text-lg"> {project.description} </p>
                </div>
                <div className="max-w-lg w-full">
                  <div className="px-5 py-6 shadow-sm rounded-lg mb-7">
                    <h1 className="font-semibold text-lg pb-2">
                      {" "}
                      Status Project{" "}
                    </h1>
                    <div className="flex">
                      <p
                        className={`px-3 py-1 border border-${
                          status_dict[project.status].color
                        }-500 text-white bg-${
                          status_dict[project.status].color
                        }-500 rounded-4xl w-auto`}
                      >
                        {" "}
                        {status_dict[project.status].context}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 py-6 shadow-sm rounded-lg my-10">
                    <h1 className="font-semibold text-lg pb-5">Key details</h1>
                    {project.started_date && (
                      <>
                        <p className="text-lg pb-2"> Data </p>
                        <div className="flex my-auto space-x-1">
                          <BsCalendar2Week className="flex w-5 text-gray-700" />
                          <p className="text-gray-700 py-auto">
                            Started: {project.started_date}.
                          </p>
                        </div>
                        {project.ended_date && (
                          <div className="flex my-auto space-x-1">
                            <BsCalendar2Week className="flex w-5 text-gray-700" />
                            <p className="text-gray-700 py-auto">
                              Ended: {project.ended_date}.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                    <div className="mt-5">
                      <p className="text-lg pb-2"> Tags </p>
                      <div className="flex flex-wrap pt-3">
                        {project.tags
                          ? project.tags.map((tag, index) => (
                              <div className="flex" key={index}>
                                <p className="px-3 py-1 border boder-gray-200 bg-gray-200 mr-1 mb-2 rounded-4xl text-xs">
                                  {
                                    tags?.find((tagg) => tagg.id === tag)
                                      ?.tag_name
                                  }
                                </p>
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="max-w-lg w-full">
                    <div className="px-5 py-6 shadow-sm rounded-lg mb-7">
                      <h1 className="font-semibold text-lg pb-5">Tech Stack</h1>
                      <div className="pt-3">
                        {project.stacks
                          ? project.stacks.map((stack, index) => (
                              <div className="flex" key={index}>
                                <p className="px-3 py-1 border boder-gray-200 bg-gray-200 mr-1 mb-2 rounded-4xl text-xs">
                                  {
                                    stacks?.find(
                                      (stackk) => stackk.id === stack
                                    )?.stack_name
                                  }
                                </p>
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="max-w-lg w-full">
                    <div className="px-5 py-6 shadow-sm rounded-lg mb-7">
                      <h1 className="font-semibold text-lg pb-5">
                        Team Members
                      </h1>
                      <div className="pt-3">
                        {project.author
                          ? project.author.map((author, index) => (
                              <div className="flex" key={index}>
                                <p className="p-1 mr-1 text-lg">
                                  {
                                    authors?.find(
                                      (authorr) => authorr.id === author
                                    )?.name
                                  }{" "}
                                </p>
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                  </div>
                  {project?.link && (
                    <div className="max-w-lg w-full">
                      <div className="px-5 py-6 shadow-sm rounded-lg mb-7">
                        <h1 className="font-semibold text-lg pb-5">
                          External Resources
                        </h1>
                        <div className="flex">
                          <a
                            href={
                              project?.link?.startsWith("http")
                                ? project.link
                                : `https://${project?.link}`
                            }
                            target="_blank"
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              className="w-5 h-5"
                            >
                              <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.398 7.864 10.924.575.11.786-.25.786-.555 0-.275-.01-1.006-.015-1.977-3.2.695-3.877-1.542-3.877-1.542-.523-1.33-1.277-1.686-1.277-1.686-1.044-.714.08-.7.08-.7 1.153.08 1.76 1.184 1.76 1.184 1.027 1.758 2.695 1.25 3.35.957.104-.744.402-1.25.73-1.54-2.554-.29-5.24-1.277-5.24-5.68 0-1.256.45-2.283 1.184-3.09-.118-.29-.513-1.455.112-3.03 0 0 .967-.31 3.168 1.18a10.93 10.93 0 0 1 2.884-.388c.98.005 1.97.133 2.884.388 2.2-1.49 3.166-1.18 3.166-1.18.627 1.575.232 2.74.114 3.03.736.807 1.182 1.834 1.182 3.09 0 4.415-2.692 5.385-5.257 5.67.414.355.783 1.06.783 2.14 0 1.547-.014 2.795-.014 3.174 0 .308.207.67.792.554C20.21 21.394 23.5 17.08 23.5 12 23.5 5.648 18.352.5 12 .5Z" />
                            </svg>

                            <span>Repository GitHub</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      ) : (
        <div> No Project</div>
      )}
    </>
  );
};

export default ProjectPage;
