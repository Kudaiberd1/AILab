import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-12 py-4 border-t border-gray-100 bg-white mt-20">
      <p className="text-sm text-gray-700">SDU AI Lab</p>
      <div className="flex items-center space-x-6 text-gray-700">
        <a href="#" aria-label="LinkedIn" className="hover:text-blue-600">
          <FaLinkedinIn size={16} />
        </a>
        <a href="#" aria-label="Twitter" className="hover:text-sky-500">
          <FaTwitter size={16} />
        </a>
        <a href="#" aria-label="GitHub" className="hover:text-gray-900">
          <FaGithub size={16} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
