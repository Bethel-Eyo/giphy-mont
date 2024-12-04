import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="container px-6 py-4 mx-auto">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
