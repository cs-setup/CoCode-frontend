import { useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import useRouter from './router'
import 'antd/dist/reset.css';

function App() {
  const routes = useRouter()
  const routing = useRoutes(routes);
  return (
    <>
      <Layout>
          {routing}
      </Layout>
    </>
  );
}

export default App;
