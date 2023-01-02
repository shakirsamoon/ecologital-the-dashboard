import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer.components";
import Sidebar from "../common/Sidebar.component";

function DashboardLayout() {
  return (
    <Layout>
      <Sidebar />
      <Layout
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <Outlet />
        <Footer />
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
