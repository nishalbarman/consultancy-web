import Navbar from "./Component/navbar/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import { useLocation } from "react-router-dom";
import Footer from "./Component/footer/Footer";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isPortalPage = ["/portal", "/portal/dashboard"].includes(location.pathname);
  const isPlainTextPage = ["/ads.txt", "/robots.txt", "/robot.txt"].includes(location.pathname);
  const isAdminPage = location.pathname === "/admin";
  const hideChrome = isPlainTextPage || isAdminPage || isPortalPage;

  return (
    <>
      {!hideChrome && <Navbar transparent={isHomePage} />}
      <AllRoutes />
      {!isPlainTextPage && !isAdminPage && !isPortalPage && <Footer />}
    </>
  );
}

export default App;
