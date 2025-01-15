import { motion } from "framer-motion";

const Example = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent px-4 py-24">
      <div className="absolute top-4 left-4 right-4 bg-yellow-200 text-yellow-800 text-sm font-medium px-4 py-2 rounded-md shadow-md mt-6">
        Disclaimer: If stuck at loading, please reload the website.
      </div>
      <BarLoader />
      <p className="mt-4 text-white text-lg font-medium">Loading...</p>
    </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
    </motion.div>
  );
};

export default Example;
