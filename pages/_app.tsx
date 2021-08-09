import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Header from "../components/organisms/Header";

// export const store = createStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
