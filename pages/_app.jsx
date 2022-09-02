import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import Head from "next/head";
import MainLayout from "../components/MainLayout";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="icon" type="image/png" href="/fav.png" />
      </Head>
      <Toaster />
      <Hydrate state={pageProps.dehydratedState}>
        {Component.hideMainLayout ? (
          <Component {...pageProps} />
        ) : (
          <MainLayout isUserInfoVisible={Component.isUserInfoVisible}>
            <Component {...pageProps} />
          </MainLayout>
        )}
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// CHANGE env variable placement to yml file setup from github

export default MyApp;
