import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";

function main({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default main;
