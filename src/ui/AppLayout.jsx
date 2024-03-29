import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Spinner from "../shared/Spinner";
import { BARS_HEIGHT } from "../utils/sharedData";

const AppLayout = () => {
  const { pathname } = useLocation();
  const navigation = useNavigation();

  const isOnLoginOrCreate = pathname.includes("/autentificare") || pathname.includes("/creeaza-cont");
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isOnLoginOrCreate && (
        <main className={`w-full h-full min-h-screen`}>{isLoading ? <Spinner /> : <Outlet />}</main>
      )}

      {isOnLoginOrCreate === false && (
        <>
          <Navbar />
          <main
            style={{ minHeight: `calc(100vh - ${BARS_HEIGHT.nav + BARS_HEIGHT.footer}px)` }}
            className={`w-full h-full bg-grey-100/95 overflow-hidden`}
          >
            {isLoading ? <Spinner /> : <Outlet />}
          </main>
          <Footer />
        </>
      )}
      <Toaster gutter={10} toastOptions={{ duration: 5000, style: { borderRadius: "6px", marginBottom: 10 } }} />
    </>
  );
};

export default AppLayout;
