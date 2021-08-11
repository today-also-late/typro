import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {
  auth,
  FirebaseTimestamp,
  db,
  fb,
} from "../../../src/firebase/firebase";
import Router from "next/router";

export type userState = {
  user: {
    uid: string;
    username: string;
    email: string;
    isSignedIn: boolean;
  };
};

export const initialState: userState = {
  user: {
    uid: "",
    username: "",
    email: "",
    isSignedIn: false,
  },
};
type userinfo = {
  email: string;
  password: string;
};

type adduser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// export const listenAuthState = createAsyncThunk(
//   "user/listenAuthState",
//   async () => {
//     const response = auth.currentUser;

//     console.log(response);
//     auth.onIdTokenChanged();

//     // const data: any = await (
//     //   await db.collection("users").doc(uid).get()
//     // ).data();

//     // return {
//     //   user: {
//     //     uid: uid,
//     //     username: data.username,
//     //     email: data.email,
//     //     isSignedIn: true,
//     //   },
//     // };
//   }
// );

export const signOutUser = createAsyncThunk("user/signOutUser", async () => {
  auth.signOut();

  return {
    user: {
      uid: "",
      username: "",
      email: "",
      isSignedIn: false,
    },
  };
});

export const addUser = createAsyncThunk(
  "user/addUser",
  async (adduser: adduser) => {
    // validation
    const { username, email, password, confirmPassword } = adduser;
    // if (username === '' || email === '' || password === '' || confirmPassword === ''){
    //     alert('必須項目が未入力です')
    //     return false
    // }

    // if (password !== confirmPassword){
    //     alert('パスワードが一致していません')
    //     return false
    // }

    auth.createUserWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();
        const userInitialData = {
          created_at: timestamp,
          email: email,
          uid: uid,
          updated_at: timestamp,
          username: username,
        };

        db.collection("users")
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            console.log("登録成功");
            return {
              user: userInitialData,
            };
          });
      }
    });
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userinfo: userinfo) => {
    const { email, password } = userinfo;

    //   if (email === '' || password === ''){
    //     alert('必須項目が未入力です')
    //     return false
    // }

    const responce: any = await auth.signInWithEmailAndPassword(
      email,
      password
    );

    const uid = responce.user.uid;
    const data: any = await (
      await db.collection("users").doc(uid).get()
    ).data();

    return {
      user: {
        uid: uid,
        username: data.username,
        email: data.email,
        isSignedIn: true,
      },
    };
  }
);

// State, Reducer, Action を一気に生成する
export const userSlice = createSlice({
  name: "user", //スライスの名前を設定
  initialState, //stateの初期値を設定
  reducers: {
    updateUserState: (state, action: any) => ({
      user: {
        ...state,
        ...action.payload,
      } /* もとの配列を展開して新しい配列を作る */,
    }),
  },
  extraReducers: (builder) => {
    // fetchUserというcreateAsyncThunkが正常終了した場合のReducer
    builder.addCase(fetchUser.fulfilled, (state, action: any) => {
      state.user = action.payload.user; // payloadCreatorでreturnされた値
      Router.push("/");
    });
    builder.addCase(signOutUser.fulfilled, (state, action: any) => {
      state.user = action.payload.user;
      alert("サインアウトしました。");
      Router.push("/");
    });
    // builder.addCase(listenAuthState.fulfilled, (state, action: any) => {
    //   console.log(action.payload);
    //   state.user = action.payload;
    //   Router.push("/");
    // });
    // builder.addCase(listenAuthState.rejected, (state, action: any) => {
    //   Router.push("/signin");
    // });
  },
});

export const { updateUserState } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice;
