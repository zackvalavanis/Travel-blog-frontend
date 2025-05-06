import { useEffect, useRef } from "react";

const HereMap = () => {
  const mapRef = useRef(null);
  const apiKey = import.meta.env.VITE_HERE_API_KEY;

  console.log(apiKey)

  useEffect(() => {
    if (!apiKey) {
      console.error("HERE API Key is missing.");
      return;
    }

    if (typeof window.H === "undefined") {
      console.error("HERE Maps API script is not loaded.");
      return;
    }

    const platform = new window.H.service.Platform({
      apikey: apiKey
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new window.H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 52.51, lng: 13.4 },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    // Resize map when the window is resized
    window.addEventListener("resize", () => map.getViewPort().resize());

    // Cleanup on unmount
    return () => {
      map.dispose();
      window.removeEventListener("resize", () => map.getViewPort().resize());
    };
  }, [apiKey]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "480px" }}
      id="mapContainer"
    ></div>
  );
};

export default HereMap;
