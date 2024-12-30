import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Header from "./Header";

export const TextParallaxContentExample = () => {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Header />
      <TextParallaxContent
        imgUrl="/Designer.jpeg"
        subheading="Modern"
        heading="Embrace the Future of Parking."
        contentTitle="Smart Solutions for a Modern Worlds"
        contentText="Efficient, accessible, and cutting-edge technology for urban parking."
        contentDetail=" With Parkme, parking is as smart as it is modern, utilizing the latest in tech to optimize every aspect of your experiences."
      />
      <TextParallaxContent
        imgUrl="/Parkme_insdie.jpeg"
        subheading="Collaborate"
        heading="Built for All of Us"
        contentTitle="A System for Seamless Parking Management"
        contentText="Empowering users to access convenient parking at the tap of a button."
        contentDetail="Parkme offers a collaborative approach to parking management, bringing together ease of use and advanced tracking to benefit every user."
      />
      <TextParallaxContent
        imgUrl="/smart-parking-system.jpeg"
        subheading="Quality"
        heading="Never Compromise."
        contentTitle="Designed with Security and Reliability"
        contentText="Your parking experience, prioritized with the highest standards."
        contentDetail="Parkme's system is built to provide a secure, reliable experience, ensuring every parking slot is managed with precision."
      />
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  contentTitle,
  contentText,
  contentDetail,
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      <ExampleContent
        title={contentTitle}
        text={contentText}
        detail={contentDetail}
      />
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        position: "relative",
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl text-white">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl text-white">
        {heading}
      </p>
    </motion.div>
  );
};

const ExampleContent = ({ title, text, detail }) => {
  const handleLearnMore = () => {
    window.open(
      "https://medium.com/@modiaastha01/a-comprehensive-overview-of-the-smart-parking-system-built-using-the-mern-stack-03e6116bed33",
      "_blank"
    );
  };

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12 -mt-52">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-white">
        {title}
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-white md:text-2xl">{text}</p>
        <p className="mb-8 text-xl text-neutral-400 md:text-2xl">{detail}</p>
        <button
          onClick={handleLearnMore}
          className="w-full rounded bg-neutral-900 px-9 py-3 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit"
        >
          Learn more <FiArrowUpRight className="inline -mt-3 " />
        </button>
      </div>
    </div>
  );
};
