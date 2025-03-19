import React, { useContext } from "react";
import Header from "../components/Header/Header";
import Routers from "../routes/Routers";
import Footer from "../components/Footer/Footer";
import { authContext } from "../context/AuthContext";

const Layout = () => {
  const { token, role } = useContext(authContext);

  // For admin routes, don't show header/footer
  if (token && role === "admin" && window.location.pathname.startsWith("/admin")) {
    return (
      <main>
        <Routers />
      </main>
    );
  }

  // For all other cases, show header/footer
  return (
    <div>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
