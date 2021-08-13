import React from "react";
import { PrimaryButton } from "../../components/atoms";
import Router, { useRouter } from "next/router";

// ファイル名は[uid].tsxに後から変更
const Selectlanguage = () => {
  const router = useRouter();

  const goToPlay = (selectedLevel: string) => {
    Router.push({
      pathname: "/users/play",
      query: {
        language: router.query["language"],
        level: selectedLevel,
      },
    });
  };

  return (
    <div className="w-full h-full">
      <div className="pt-72  flex items-center justify-center">
        <div className="w-1/3 h-1/3 text-center text-6xl">
          <PrimaryButton label={"1"} onClick={() => goToPlay("1")} />
          <PrimaryButton label={"2"} onClick={() => goToPlay("2")} />
          <PrimaryButton label={"3"} onClick={() => goToPlay("3")} />
        </div>
      </div>
    </div>
  );
};

export default Selectlanguage;
