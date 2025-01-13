import React from "react";
import useMeasure from "react-use-measure"; // => Used to measure the drawer height dynamically
import {
  useDragControls, // => Provides control over drag events
  useMotionValue, // => Tracks the motion value of the drag
  useAnimate, // => Used to create animations
  motion, // => Provides animated components
} from "framer-motion";
import "./style.css";

const DragCloseDrawerExample = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate(); // => Scope for animations and the animate function
  const [drawerRef, { height }] = useMeasure(); // => Measures the height of the drawer
  const y = useMotionValue(0); // => Tracks the drag Y-position
  const controls = useDragControls(); // => Drag control initializer

  const handleClose = async () => {
    animate(scope.current, { opacity: [1, 0] }); // => Fades out the overlay
    const yStart = typeof y.get() === "number" ? y.get() : 0; // => Retrieves the current Y value

    await animate("#drawer", { y: [yStart, height] }); // => Animates the drawer sliding down
    setOpen(false); // => Closes the drawer
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope} // => Animation scope for overlay
          initial={{ opacity: 0 }} // => Initial overlay opacity
          animate={{ opacity: 1 }} // => Animate to full opacity
          onClick={handleClose} // => Handles overlay click to close the drawer
          className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0"
        >
          <motion.div
            id="drawer"
            ref={drawerRef} // => Ref to measure drawer height
            onClick={(e) => e.stopPropagation()} // => Prevents clicks inside the drawer from closing it
            initial={{ y: "100%" }} // => Initial position of the drawer
            animate={{ y: "0%" }} // => Animates drawer into view
            transition={{ ease: "easeInOut", duration: 0.4 }} // => Smooth animation transition
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900 shadow-2xl"
            style={{ y }} // => Links motion value to drawer position
            drag="y" // => Enables vertical dragging
            dragControls={controls} // => Attaches drag controls
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose(); // => Closes drawer if dragged down beyond threshold
              }
            }}
            dragListener={false} // => Prevents default drag listener
            dragConstraints={{ top: 0, bottom: 0 }} // => Restricts drag range
            dragElastic={{ top: 0, bottom: 0.5 }} // => Adds elastic behavior at the bottom
          >
            {/* Symbol Above Drawer */}
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e); // => Initializes drag on pointer down
                }}
                className="symbol h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button>
            </div>
            {/* Drawer Content */}
            <div className="relative z-0 h-full overflow-y-auto p-6 pt-16 text-neutral-200 text-left">
              {children} {/* => Content inside the drawer */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default DragCloseDrawerExample;
