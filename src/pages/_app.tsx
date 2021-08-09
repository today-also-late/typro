import type { AppProps } from "next/app";
import "../../styles/globals.css";
import { Provider } from "react-redux";
import createStore from "../../redux/store";
import Header from "../components/organisms/Header";
import Auth from "../firebase/Auth";

export const store = createStore();

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <Auth>
        {" "}
        {/*子コンポーネントがストアに接続できるようにする */}
        <Header />
        <Component {...pageProps} />
      </Auth>
    </Provider>
  );
}
export default MyApp;
