import { useEffect, useState } from "react";
import api from "../../api/api";

export interface Tag {
  id: number;
  tag_name: string;
}

const Filter = () => {
  const [tags, setTags] = useState<Tag[]>();

  useEffect(() => {
    api
      .get("/api/tag/")
      .then((res) => {
        setTags(res.data);
        //console.log(res);
      })
      .catch((err) => console.log(err, "err tag"));
  }, []);

  return (
    <div className="flex max-w-5xl mx-auto mt-20">
      <div>
        <h1 className="text-2xl font-semibold"> Filter Projects </h1>
        <p className="pt-5"> By status: </p>
        <div className="flex space-x-3 flex-wrap mt-2">
          <p className="border border-gray-800 rounded-2xl px-3 py-1 my-1 text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800">
            {" "}
            In progress{" "}
          </p>
          <p className="border border-gray-800 rounded-2xl px-3 py-1 my-1 text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800">
            Finished
          </p>
          <p className="border border-gray-800 rounded-2xl px-3 py-1 my-1 text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800">
            Ready to start
          </p>
          <p className="border border-gray-800 rounded-2xl px-3 py-1 my-1 text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800">
            MVP
          </p>
          <p className="border border-gray-800 rounded-2xl px-3 py-1 my-1 text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800">
            Sold
          </p>
        </div>
        <p className="pt-5"> By tags: </p>
        <div className="flex space-x-3 flex-wrap mt-2">
          {tags?.map((tag) => (
            <p
              key={tag.id}
              className="border border-gray-800 rounded-2xl px-3 py-1 my-1 text-gray-800 cursor-pointer hover:text-white hover:bg-gray-800"
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
