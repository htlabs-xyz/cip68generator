import React from "react";
import LoadingAnimation from "./components/loading-animation";

const Loading = function () {
  return (
    <div
      id="preloader"
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-[#13161b]"
      aria-label="Loading..."
    >
      <LoadingAnimation />
    </div>
  );
};

export default Loading;
