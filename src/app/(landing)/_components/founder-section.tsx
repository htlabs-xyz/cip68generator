"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  FaTwitter as TwitterIcon,
  FaLinkedinIn as LinkedinIcon,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Props = {
  id?: number;
  avatar: StaticImageData;
  company?: string;
  firstName: string;
  lastName: string;
  role: string;
  twitter: string;
  linkedin: string;
  description: string;
  index: number;
};
const Founder = function ({
  avatar,
  firstName,
  lastName,
  role,
  twitter,
  linkedin,
  description,
  index,
}: Props) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ y: 100, scale: 0.5, opacity: 0 }}
      animate={inView ? { y: 0, scale: 1, opacity: 1 } : {}}
      transition={{
        duration: 0.5 + index * 0.5,
        ease: "easeOut",
      }}
      className="flex flex-col items-center gap-5 rounded-2xl bg-slate-900 p-7 transition-all duration-300 ease-in-out"
    >
      <div className="bg-[rgba(0, 0, 0, 0.08)] relative h-[150px] w-[150px] overflow-hidden rounded-full transition-all duration-500">
        <Image
          className="absolute inset-0 h-full w-full object-cover text-transparent transition-all duration-500 ease-in-out hover:scale-150"
          src={avatar}
          alt="Avatar"
        />
        <div className="absolute bottom-0 left-0 right-0 flex h-12 justify-center gap-4 transition-all duration-500">
          {twitter && (
            <Link
              className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)] text-[16px] text-white"
              target="_blank"
              href={twitter}
            >
              <LinkedinIcon />
            </Link>
          )}
          {linkedin && (
            <Link
              className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)] text-[16px] text-white"
              target="_blank"
              href={linkedin}
            >
              <TwitterIcon />
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="text-center text-[16px] font-medium leading-[120%] text-white">
          {firstName + " " + lastName}
        </div>
        <div className="text-center text-[13px] font-medium leading-[120%] text-white">
          {role}
        </div>
        <div className="text-center text-[10px] font-normal leading-[120%] text-white">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

export default Founder;
