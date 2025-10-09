import { useContext, useEffect, useState } from "react";
import {
  FilteredProjects,
  ProjectsContext,
  SelectedStatusContext,
  SelectedTagContext,
  TagContext,
} from "./MainPage";

export interface Tag {
  id: number;
  tag_name: string;
}

const Filter = () => {
  const { tags } = useContext(TagContext);
  const { selectedTags } = useContext(SelectedTagContext);
  const { setSelectedTags } = useContext(SelectedTagContext);
  const { selectedStatus } = useContext(SelectedStatusContext);
  const { setSelectedStatus } = useContext(SelectedStatusContext);
  const { projects } = useContext(ProjectsContext);
  const { setFprojects } = useContext(FilteredProjects);
  const { fprojects } = useContext(FilteredProjects);

  const handleClick = (context: any, id: any) => {
    if (context == "s") {
      if (selectedStatus.find((element) => element == id) == id) {
        setSelectedStatus(selectedStatus.filter((status) => status != id));
      } else {
        setSelectedStatus([...selectedStatus, id]);
      }
    } else {
      if (selectedTags.find((element) => element == id)) {
        setSelectedTags(selectedTags.filter((tag) => tag != id));
      } else {
        setSelectedTags([...selectedTags, id]);
      }
    }
  };

  useEffect(() => {
    if (!projects || projects.length === 0) return;
    //console.log(selectedTags, fprojects);
    setFprojects(
      projects.filter((project) => {
        if (selectedTags.length === 0) return true;
        return project.tags.some((tagId) => selectedTags.includes(tagId));
      })
    );
  }, [selectedTags]);

  useEffect(() => {
    if (!projects) return;
    console.log(selectedStatus, fprojects);
    setFprojects(
      projects.filter((project) => {
        if (selectedStatus.length === 0) return true;
        return (
          selectedStatus.find((ell) => ell == project.status) == project.status
        );
      })
    );
  }, [selectedStatus]);

  return (
    <div className="flex max-w-5xl mx-auto mt-20">
      <div>
        <h1 className="text-2xl font-semibold"> Filter Projects </h1>
        <p className="pt-5"> By status: </p>
        <div className="flex space-x-3 flex-wrap mt-2">
          <p
            className={`border border-gray-800 rounded-2xl px-3 py-1 my-1 ${
              selectedStatus.find((element) => element == 0) == 0 &&
              "bg-gray-900 text-white"
            } text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800`}
            onClick={() => handleClick("s", 0)}
          >
            {" "}
            In progress{" "}
          </p>
          <p
            className={`border border-gray-800 rounded-2xl px-3 py-1 my-1 ${
              selectedStatus.find((element) => element == 4) == 4 &&
              "bg-gray-900 text-white"
            } text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800`}
            onClick={() => handleClick("s", 4)}
          >
            Finished
          </p>
          <p
            className={`border border-gray-800 rounded-2xl px-3 py-1 my-1 ${
              selectedStatus.find((element) => element == 2) == 2 &&
              "bg-gray-900 text-white"
            } text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800`}
            onClick={() => handleClick("s", 2)}
          >
            Ready to start
          </p>
          <p
            className={`border border-gray-800 rounded-2xl px-3 py-1 my-1 ${
              selectedStatus.find((element) => element == 3) == 3 &&
              "bg-gray-900 text-white"
            } text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800`}
            onClick={() => handleClick("s", 3)}
          >
            MVP
          </p>
          <p
            className={`border border-gray-800 rounded-2xl px-3 py-1 my-1 ${
              selectedStatus.find((element) => element == 1) == 1 &&
              "bg-gray-900 text-white"
            } text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800`}
            onClick={() => handleClick("s", 1)}
          >
            Sold
          </p>
        </div>
        <p className="pt-5"> By tags: </p>
        <div className="flex space-x-3 flex-wrap mt-2">
          {tags?.map((tag) => (
            <p
              key={tag.id}
              className={`border border-gray-800 rounded-2xl px-3 py-1 my-1 text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800 ${
                selectedTags.find((element) => element == tag.id) &&
                "bg-gray-900 text-white"
              }`}
              onClick={() => handleClick("t", tag.id)}
            >
              {" "}
              {tag.tag_name}{" "}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
