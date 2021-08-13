import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getUser } from "../../../redux/slices/userSlice";
import Chart from "../../components/organisms/Chart";
import ImageArea from "../../components/molecules/ImageArea";

// このページをpublicにするなら
// あとからファイル名を[username].tsxにするかも

//進捗情報などを公開したい場合など

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(getUser).user;
  const [image, setImage] = useState({});

  // const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (user.image.path) {
      setImage(user.image);
    }
  }, []);

  return (
    <section className="w-full h-full flex items-center justify-center">
      {user && (
        <div className="pt-20">
          <ImageArea image={image} setImage={setImage} required={true} />

          <div className="text-center">
            <h2 className="text-5xl">{user.username}</h2>
            <p>{user.email}</p>
          </div>
          <Chart />
        </div>
      )}
    </section>
  );
};
export default Profile;
