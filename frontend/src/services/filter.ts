import { useContext } from "react";
import { SelectedTagContext } from "../pages/MainPage/MainPage";

const filter = (id: any) => {
  const { selectedTags } = useContext(SelectedTagContext);
  if (selectedTags.find((ell) => ell == id)) {
    return true;
  }
  return false;
};

export default filter;
