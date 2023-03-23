import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import routes from './router'
import 'antd/dist/reset.css';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          {routes.map((route) => (
            <Route
              exact
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
