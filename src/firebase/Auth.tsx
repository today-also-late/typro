import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUserState } from "../../redux/slices/userSlice";
import { useRouter } from "next/router";
import { auth, db } from "./firebase";
import Router from "next/router";

const Auth = ({ children }: any) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/users/play") {
      if (!user.isSignedIn /*reduxのStateがfalseならば */) {
        Router.push("/signin"); // signinページに飛ばす
      }
    }
  }, [router.pathname]);

  useEffect(() => {
    if (!user.isSignedIn /*reduxのStateがfalseならば */) {
      // updateStateUser(user);
      /* firebaseでログインしているかどうか調べてしていなければsigninに返す関数 */
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const uid = user.uid;
          await db
            .collection("users")
            .doc(uid)
            .get()
            .then((snapshot) => {
              const data: any = snapshot.data();
              dispatch(
                updateUserState({
                  uid: uid,
                  username: data.username,
                  isSignedIn: true,
                  email: data.email,
                })
              );
            });
        }
      });
    }
    // reduxのstateがリロードされてfalseになったのをもとに戻す。
  }, [user]);

  return children;
};
export default Auth;
