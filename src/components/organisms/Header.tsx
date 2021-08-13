import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/userSlice";
import { Button, Label } from "../atoms/index";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PrimaryButton from "../atoms/PrimaryButton";
import { signOutUser } from "../../../redux/slices/userSlice";

type PROPS = {};

const Header: React.FC<PROPS> = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;

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
        {user.isSignedIn ? (
          <AccountCircleIcon />
        ) : (
          <Button buttonText="新規登録" href="/signup" />
        )}
        {user.isSignedIn ? (
          <PrimaryButton
            label={"sign out"}
            onClick={() => dispatch(signOutUser())}
          />
        ) : (
          <Button buttonText="ログイン" href="/signin" />
        )}
      </div>
    </div>
  );
};

export default Header;
