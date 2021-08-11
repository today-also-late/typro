import { CommonInput } from "../components/atoms";
import { useCallback, useState } from "react";
import { fetchUser } from "../../redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/atoms/PrimaryButton";
import { getUser } from "../../redux/slices/user/userSlice";
import Link from "next/link";

const SignIn = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const fetchuser = { email: email, password: password };

  return (
    <div className="w-screen h-screen">
      <div className="h-1/6"></div>
      <h2 className="text-center text-4xl">サインイン</h2>
      <div className="w-1/3 container mx-auto">
        <div className="h-8" />
        <CommonInput
          fullWidth={true}
          label="メールアドレス"
          multiline={false}
          required={true}
          rows={1}
          value={email}
          type={"email"}
          onChange={inputEmail}
        />
        <div className="h-8" />
        <CommonInput
          fullWidth={true}
          label="パスワード"
          multiline={false}
          required={true}
          rows={1}
          value={password}
          type="password"
          onChange={inputPassword}
        />
        <div className="h-16" />
        <div className="flex items-center justify-center">
          <PrimaryButton
            label={"Sign In"}
            onClick={() => dispatch(fetchUser(fetchuser))}
          />
        </div>
        <div className="h-8" />
        <div className="text-center hover:text-blue-500">
          <Link href="/signup">アカウントをお持ちでない方はこちら</Link>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
