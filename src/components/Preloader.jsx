import React from "react";
import preloader2 from "../assets/preloaderAnimation2.webm";
const Preloader = () => {
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        <video
          src={preloader2} // Update the path to your .webm file
          type="video/webm"
          autoPlay
          loop
          muted
          className="w-32 h-32"
        >
          Your browser does not support the video tag.
        </video>
      </div>
  );
};

export default Preloader;
