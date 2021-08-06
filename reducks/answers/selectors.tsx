import { useSelector } from "react-redux";

export const getAnswersState = () => {
  return useSelector((state: { answers: string[] }) => state);
};
