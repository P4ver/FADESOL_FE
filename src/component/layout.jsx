import NavBar from "./navBar";
import SideBare from "./sideBare";
import { Outlet } from "react-router-dom"; // Import Outlet

const Layout = () => {
  return (
    <main className="flex items-start bg-gray-100">
      <SideBare />
      <div className="px-8 py-4 w-full overflow-x-hidden">
        <NavBar />
        <section className="text-slate-900 py-6">
          <Outlet /> {/* Render nested routes here */}
        </section>
      </div>
    </main>
  );
};

export default Layout;
