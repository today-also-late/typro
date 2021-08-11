import React from "react";
import { Button, Label } from "../atoms/index";

type PROPS = {};

const Header: React.FC<PROPS> = (props) => {
  return (
    <div className="w-screen fixed flex h-16 bg-gray-400">
      <div className="flex items-center justify-evenly w-2/5">
        <Label labelText="TyPro" href={"/"} />
        <Label labelText="概要" href={"/"} />
        <Label labelText="問題" href={"/"} />
        <Label labelText="ランキング" href={"/"} />
        <Label labelText="投稿" href={"/"} />
      </div>
      <div className="w-1/5"></div>
      <div className="flex items-center justify-evenly w-2/5">
        <Button buttonText="新規登録" href="/signup" />
        <Button buttonText="ログイン" href="/signin" />
      </div>
    </div>
  );
};

export default Header;
