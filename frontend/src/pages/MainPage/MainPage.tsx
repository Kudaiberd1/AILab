import Footer from "../../components/Footer";
import Header from "../../components/Header";
import image from "../../assets/image-1.png";
import Filter, { type Tag } from "./Filter";
import Projects from "./Projects";
import { createContext, useEffect, useRef, useState } from "react";
import api from "../../api/api";

export const TagContext = createContext<{
  tags: Tag[] | undefined;
  setTags: React.Dispatch<React.SetStateAction<Tag[] | undefined>>;
}>({
  tags: [],
  setTags: () => {},
});
export const SelectedTagContext = createContext<any>(null);
export const SelectedStatusContext = createContext<any>(null);

const MainPage = () => {
  const [tags, setTags] = useState<Tag[]>();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);

  const projectsRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mt-25">
          <div className="flex max-w-5xl mx-auto bg-blue-100 rounded pt-30 pb-25 px-5">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold">
                {" "}
                Expanding the boundaries of what’s possible with SDU AI Lab
                projects.{" "}
              </h1>
              <p className="text-gray-600 pt-5">
                Learn about advanced research and innovative solutions in
                artificial intelligence as well as other domains of information
                technology.
              </p>
              <button
                className="bg-blue-600 rounded px-6 py-1 text-white cursor-pointer mt-5"
                onClick={handleScrollToProjects}
              >
                Explore projects
              </button>
            </div>
            <div className="max-w-4xl">
              <img src={image} height={1024} width={512} className="rounded" />
            </div>
          </div>
          <TagContext.Provider value={{ tags, setTags }}>
            <SelectedTagContext.Provider
              value={{ selectedTags, setSelectedTags }}
            >
              <SelectedStatusContext.Provider
                value={{ selectedStatus, setSelectedStatus }}
              >
                <Filter />
                <span ref={projectsRef}>
                  <Projects />
                </span>
              </SelectedStatusContext.Provider>
            </SelectedTagContext.Provider>
          </TagContext.Provider>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
