import * as cookie from "cookie";
import { QueryClient, dehydrate } from "react-query";
import { verifyAuth } from "../utils/api/user";

export default async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const cookies = parsedCookies;
  if (!cookies.l_auth) {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
  await queryClient.prefetchQuery("verifyAuth", () =>
    verifyAuth(cookies.l_auth)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
