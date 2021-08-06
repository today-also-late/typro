import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider } from "react-redux";
import createStore from "../redux/store";

export const store = createStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}
export default MyApp;
