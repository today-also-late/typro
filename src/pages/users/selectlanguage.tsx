import React from "react";
import { PrimaryButton } from "../../components/atoms";
import Router from "next/router";

const goSelectLevel = (selectedLanguage: string) => {
  Router.push({
    pathname: "/users/selectlevel",
    query: {
      language: selectedLanguage,
    },
  });
};

// ファイル名は[uid].tsxに後から変更
const Selectlanguage = () => {
  return (
    <div className="w-full h-full">
      <div className="pt-72  flex items-center justify-center">
        <div className="w-1/3 h-1/3 text-center text-6xl">
          <PrimaryButton
            label={"おっPython"}
            onClick={() => goSelectLevel("Python")}
          />
        </div>
      </div>
    </div>
  );
};

export default Selectlanguage;
