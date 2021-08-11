import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  userState,
  updateUserState,
} from "../../redux/slices/user/userSlice";
import { useRouter } from "next/router";
import { auth, db } from "./firebase";
import Router from "next/router";

const Auth = ({ children }: any) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const router = useRouter();

  useEffect(() => {
    // updateStateUser(user);
    if (router.pathname === "/guests/play") {
      if (!user.isSignedIn /*reduxのStateがfalseならば */) {
        auth.onAuthStateChanged((user) => {
          if (user) {
            const uid = user.uid;
            db.collection("users")
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
          } else {
            Router.push("/signin");
          }
        });
        // reduxのstateがリロードされてfalseになったけどfirebaseではログインしていることがあるためlistenAuthStateで調べる
      }
    }
  }, [router.pathname]);

  return children;
};
export default Auth;
