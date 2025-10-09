import Footer from "../../components/Footer";
import Header from "../../components/Header";
import image from "../../assets/image-1.png";
import Filter from "./Filter";
import Projects from "./Projects";

const MainPage = () => {
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
              <button className="bg-blue-600 rounded px-6 py-1 text-white cursor-pointer mt-5">
                Explore projects
              </button>
            </div>
            <div className="max-w-4xl">
              <img src={image} height={1024} width={512} className="rounded" />
            </div>
          </div>
          <Filter />
          <Projects />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
