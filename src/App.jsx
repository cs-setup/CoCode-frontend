import { useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import routes from './router'
import 'antd/dist/reset.css';

function App() {
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
