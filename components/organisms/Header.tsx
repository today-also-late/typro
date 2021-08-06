import React from "react";
import Label from "../atoms/Label";
import Button from "../atoms/Button";

type PROPS = {};

const Header: React.FC<PROPS> = (props) => {
  return (
    <div className="flex h-16 bg-gray-400 ">
      <div className="flex items-center justify-evenly w-2/5">
        <Label labelText="概要" />
        <Label labelText="問題" />
        <Label labelText="ランキング" />
        <Label labelText="投稿" />
      </div>
      <div className="w-1/5"></div>
      <div className="flex items-center justify-evenly w-2/5">
        <Button buttonText="新規登録" />
        <Button buttonText="ログイン" />
      </div>
    </div>
  );
};

export default Header;
