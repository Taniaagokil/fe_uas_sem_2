import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Memaksa browser kembali ke koordinat (0, 0) setiap kali path berubah
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;