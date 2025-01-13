import React from "react";
import {
  SiAdobe,
  SiApple,
  SiFacebook,
  SiGoogle,
  SiLinkedin,
  SiShopify,
  SiSoundcloud,
  SiStackoverflow,
  SiMedium,
} from "react-icons/si";
import { useAnimate } from "framer-motion";

const Example = () => {
  return (
    <div className="bg-transparent px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <ClipPathLinks />
      </div>
    </div>
  );
};

const ClipPathLinks = () => {
  return (
    <div className="divide-y text-white border border-none">
      <div className="flex space-x-4">
        <LinkBox Icon={SiGoogle} href="https://www.google.com/" />
        <LinkBox Icon={SiShopify} href="https://www.shopify.com/in" />
      </div>
      <div className="flex space-x-4 mt-4">
        <LinkBox Icon={SiApple} href="https://www.apple.com/in/" />
        <LinkBox Icon={SiSoundcloud} href="https://soundcloud.com/" />
        <LinkBox Icon={SiAdobe} href="https://new.express.adobe.com/" />
        <LinkBox Icon={SiFacebook} href="https://www.facebook.com/" />
      </div>
      <div className="flex space-x-4 mt-4">
        <LinkBox Icon={SiMedium} href="https://medium.com/@modiaastha01" />
        <LinkBox Icon={SiStackoverflow} href="https://stackoverflow.com/" />
        <LinkBox
          Icon={SiLinkedin}
          href="https://www.linkedin.com/in/ansh-modi-/"
        />
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.target.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={(e) => {
        handleMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave(e);
      }}
      className="relative flex items-center justify-center h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36 bg-transparent"
    >
      <Icon className="text-xl sm:text-3xl lg:text-4xl text-white mt-4" />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Icon className="text-xl sm:text-3xl md:text-4xl mt-4" />
      </div>
    </a>
  );
};

export default Example;
