import React from "react";
import { PrimaryButton } from "../../components/atoms";
import Play from "../guests/play";
import Router from "next/router";

const selectedLang = () => {
  Router.push({
    pathname: "/users/play",
    query: {
      language: "Python",
    },
  });
};

// ファイル名は[uid].tsxに後から変更
const Selectlanguage = () => {
  return (
    <div className="w-full h-full">
      <div className="pt-72  flex items-center justify-center">
        <div className="w-1/3 h-1/3 text-center text-6xl">
          <PrimaryButton label={"おっPython"} onClick={() => selectedLang()} />
        </div>
      </div>
    </div>
  );
};

export default Selectlanguage;
