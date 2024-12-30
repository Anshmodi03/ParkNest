import React, { lazy, Suspense } from "react";

// Lazy load NeumorphismButton
const NeumorphismButton = lazy(() => import("./NeumorphismButton"));

const ButtonWrapper = () => {
  return (
    <div className="min-h-[220px] flex items-center justify-center -mt-16 -mb-14">
      <Suspense fallback={<div>Loading Button...</div>}>
        <NeumorphismButton />
      </Suspense>
    </div>
  );
};

export default ButtonWrapper;
