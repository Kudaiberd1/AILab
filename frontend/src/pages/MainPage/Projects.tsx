import { useContext, useEffect, useState } from "react";
import { status_dict } from "../../services/constants";
import { FilteredProjects, TagContext } from "./MainPage";
import { useNavigate } from "react-router-dom";
import { PhotoContext } from "../../App";

export interface Ids {
  id: number;
}

export interface Photo {
  id: number;
  photo: string;
}

export interface Stack {
  id: number;
  stack_name: string;
}

export interface Author {
  id: number;
  name: string;
  surename: string;
}

export interface Project {
  id: number;
  title: string;
  photo: Ids[];
  description: string;
  about: string;
  status: number;
  tags: Ids[];
  stacks: Ids[];
  author: Ids[];
  link: string;
  started_date: string;
  ended_date: string;
}

const Projects = () => {
  const { fprojects } = useContext(FilteredProjects);
  const { photos } = useContext(PhotoContext);
  const { tags } = useContext(TagContext);
  const navigate = useNavigate();

  return (
    <div className="flex max-w-5xl mx-auto mt-20 bg-gray-100 rounded-lg">
      <div className="my-15 p-5">
        <h1 className="text-2xl font-semibold"> All Projects </h1>
        <div className="flex flex-wrap gap-3 pt-6">
          {fprojects?.map((project) => (
            <div
              key={project.id}
              className="items-center max-w-xs box shadow-sm bg-white rounded-xl cursor-pointer hover:shadow-lg"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <img
                className="rounded-xl h-50 w-full"
                height={192}
                src={`http://localhost:8000${
                  photos?.find((p) => p.id === project.photo[0])?.photo
                }`}
              />
              <div className="mx-6 my-5">
                <p
                  className="text-xl font-semibold"
                  onClick={() =>
                    console.log(
                      `http://localhost:8000${
                        photos?.find((p) => p.id === project.photo[0])?.photo
                      }`
                    )
                  }
                >
                  {project.title}
                </p>
                <p className="text-gray-700 pt-1 pb-3 text-sm">
                  {" "}
                  {project.about}{" "}
                </p>
                <div className="flex">
                  <p
                    className={`px-2 py-1 border text-xs border-${
                      status_dict[project.status].color
                    }-500 text-white bg-${
                      status_dict[project.status].color
                    }-500 rounded-4xl w-auto`}
                  >
                    {" "}
                    {status_dict[project.status].context}{" "}
                  </p>
                </div>
                <div className="flex flex-wrap pt-3 space-y-1">
                  {project.tags.map((tag, index) => (
                    <p
                      key={index}
                      className="px-3 py-1 border boder-gray-200 bg-gray-200 mr-2 rounded-4xl text-xs"
                    >
                      {tags?.find((tagg) => tagg.id === tag)?.tag_name}
                    </p>
                  ))}
                </div>
                <div className="flex justify-between pt-4 text-xs text-gray-600">
                  <p> {project.started_date} </p>
                  <p> {project.ended_date} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
