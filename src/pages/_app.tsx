import type { AppProps } from "next/app";
import "../../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Header from "../components/organisms/Header";
import Auth from "../firebase/Auth";

// export const store = createStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Auth>
        <Header />
        <Component {...pageProps} />
      </Auth>
    </Provider>
  );
}
export default MyApp;
