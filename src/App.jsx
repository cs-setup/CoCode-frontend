import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import useRouter from "./router";
import "antd/dist/reset.css";

function App() {
  const routes = useRouter();
  const routing = useRoutes(routes);
  return (
    <>
      <Layout>
        <Suspense>{routing}</Suspense>
      </Layout>
    </>
  );
}

export default App;
