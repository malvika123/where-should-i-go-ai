import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // If using React Router

const AdComponent = () => {
  const location = useLocation(); // Detect route changes

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "www.highperformanceformat.com/ce6d37e3ff6a92f8b21959126d983f7a/invoke.js"; // Replace with actual Adsterra script URL
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, [location.pathname]); // Re-run when the route changes

  return <div class="sticky-ad"></div>;
};

export default AdComponent;
