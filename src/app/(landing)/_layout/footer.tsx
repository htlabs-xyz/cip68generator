"use client";

import {} from "@/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import routers from "@/constants/routers";
import { FaMailBulk, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { appImage } from "@/public/images";
import router from "@/constants/routers";
import { appSocialMedia } from "@/constants";

const Footer = function () {
  return (
    <div className="px-auto pb-[50px] mt-[100px]">
      <div className="mx-auto my-0 w-full max-w-[1200px]">
        {/* subscribe-begin */}
        <section className="flex justify-between rounded-xl bg-slate-900 px-[100px] py-[45px] max-sm:flex-col max-sm:px-3 max-sm:py-7">
          <div className="mr-[100px] h-[150px] w-[150px] max-md:w-[100px] max-md:h-[100px]">
            <Image className="h-full w-full animate-pulse object-cover" src={appImage.logo} alt="" />
          </div>
          <div className="flex-1">
            <h2 className="text-[40px] leading-[50px] max-sm:text-[22px] max-md:text-[20px]">
              Subscribe To <span className="pl-4 text-[#ccc]">CIP68 Generator</span>
            </h2>
            <p className="mb-7 mt-4 text-gray-400 max-sm:text-[12px] max-md:mt-1">
              CIP68 Generator is a tool designed to simplify the creation, management, and burning of CIP68-compliant native assets on the Cardano
              platform.
            </p>
            <Button className="flex h-[35px] items-center gap-2 rounded-md max-md:text-[12px]">
              <span>Subcribe</span>
              <svg width="12" height="9" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.92652 0.198869L11.9459 4.51989C12.1925 4.78505 12.1925 5.21495 11.9459 5.48011L7.92652 9.80113C7.67987 10.0663 7.27998 10.0663 7.03334 9.80113C6.78669 9.53597 6.78669 9.10606 7.03334 8.8409L9.9745 5.67898H0.631579C0.282768 5.67898 0 5.37499 0 5C0 4.62501 0.282768 4.32102 0.631579 4.32102H9.9745L7.03334 1.1591C6.78669 0.893936 6.78669 0.464029 7.03334 0.198869C7.27998 -0.0662898 7.67987 -0.0662898 7.92652 0.198869Z"
                  fill="currentColor"
                ></path>
              </svg>
            </Button>
          </div>
        </section>
        {/* subscribe-end */}

        {/*  footer-begin */}
        <section className="mt-[100px] max-md:my-[50px] flex justify-between max-md:flex-col">
          <div className="flex w-[412px] flex-col">
            <Link className="relative flex items-center gap-[8px]" href={routers.landing}>
              <Image className="h-[35px] w-[35px] object-cover" src={appImage.logo} alt="Logo" />
              <span className="text-2xl">Generator</span>
            </Link>

            <p className="mx-0 mb-[12px] mt-[35px] text-[15px] leading-[25px] text-gray-300 max-md:mt-[15px] max-md:mb-[20px] max-md:leading-[16px] max-md:text-[12px]">
              CIP68 Generator is a tool designed to simplify the creation, management, and burning of CIP68-compliant native assets on the Cardano
              platform.
            </p>

            <p className={"text-[15px] leading-[22px] text-gray-500"}>cardano2vn@gmail.com</p>
          </div>

          <div className="flex gap-[45px] max-md:gap-6 leading-[20px] mt-[50px]">
            <ul>
              <h2 className="mb-9 max-md:mb-4 text-[19px] font-bold text-white max-md:text-[12px]">Explore</h2>
              <li className="mt-[25px] max-md:mt-2">
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={router.mint}>
                  Asset Minting
                </Link>
              </li>
              <li className="mt-[25px] max-md:mt-2">
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={router.document}>
                  Collections
                </Link>
              </li>
              <li className="mt-[25px] max-md:mt-2">
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={router.metadata}>
                  Metadata
                </Link>
              </li>
              <li className="mt-[25px] max-md:mt-2">
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={router.storages}>
                  Storage
                </Link>
              </li>
            </ul>

            <ul>
              <h2 className="mb-9 max-md:mb-4 text-[19px] font-bold text-white max-md:text-[12px]">Resources</h2>
              <li className="mt-[25px] max-md:mt-2">
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={router.document}>
                  Documentation
                </Link>
              </li>
              <li className={"mt-[25px] max-md:mt-2"}>
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={"/#"}>
                  Blog
                </Link>
              </li>
              <li className={"mt-[25px] max-md:mt-2"}>
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={"/#"}>
                  User guide
                </Link>
              </li>
              <li className={"mt-[25px] max-md:mt-2"}>
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={"/#"}>
                  Ambassador
                </Link>
              </li>
            </ul>

            <ul>
              <h2 className="mb-9 max-md:mb-4 text-[19px] font-bold text-whit  max-md:text-[12px]">Developers</h2>
              <li className="mt-[25px] max-md:mt-2">
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={"/#"}>
                  Bug Bounty
                </Link>
              </li>
              <li className={"mt-[25px] max-md:mt-2"}>
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={"/#"}>
                  User Feedback
                </Link>
              </li>
              <li className={"mt-[25px] max-md:mt-2"}>
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={"/#"}>
                  Term Of Service
                </Link>
              </li>
              <li className={"mt-[25px] max-md:mt-2"}>
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={"/#"}>
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <ul>
              <h2 className="mb-9 max-md:mb-4 text-[19px] font-bold text-white max-md:text-[12px]">Supports</h2>
              <li className={"mt-[25px] max-md:mt-2"}>
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px] " href={"/#"}>
                  About Us
                </Link>
              </li>
              <li className={"mt-[25px] max-md:mt-2"}>
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={"/#"}>
                  Contact Us
                </Link>
              </li>
              <li className={"mt-[25px] max-md:mt-2"}>
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={"/#"}>
                  FAQS
                </Link>
              </li>
              <li className={"mt-[25px] max-md:mt-2"}>
                <Link className="cursor-pointer text-[15px] leading-[20px] text-gray-400 max-md:text-[12px]" href={"/#"}>
                  CIP68 DApp
                </Link>
              </li>
            </ul>
          </div>
        </section>
        {/*  footer-end */}

        {/* bottom-begin */}
        <footer className="border-[rgb(238, 238, 238)] mt-10 flex items-center justify-between border-t-[1px] border-solid pt-8 max-md:mt-[20px] max-md:pt-[15px] max-md:overflow-hidden">
          <ul className="flex items-center">
            <strong className="mr-10 text-[16px] text-[rgb(153,153,153)] max-md:mr-[20px] max-md:text-[12px]">Community</strong>

            <div className="flex items-center gap-8 max-md:gap-1">
              <Link
                className="flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-[8px] max-md:p-2 max-md:border-none"
                target="_blank"
                href={appSocialMedia.telegram}
              >
                <FaTelegramPlane className="text-[19px] max-md:text-[16px]" />
              </Link>
              <Link
                className="flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-[8px] max-md:p-2 max-md:border-none"
                target="_blank"
                href={appSocialMedia.email}
              >
                <FaMailBulk className="text-[19px] max-md:text-[16px]" />
              </Link>
              <Link
                className="flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-[8px] max-md:p-2 max-md:border-none"
                target="_blank"
                href={appSocialMedia.youtube}
              >
                <FaYoutube className="text-[19px] max-md:text-[16px]" />
              </Link>
              <Link
                className="flex items-center justify-center rounded-full border-[1px] border-solid border-slate-500 p-[8px] max-md:p-2 max-md:border-none"
                target="_blank"
                href={appSocialMedia.x}
              >
                <FaXTwitter className="text-[19px] max-md:text-[16px]" />
              </Link>
            </div>
          </ul>
          <div className="text-[15px] text-[rgb(153,153,153)] max-md:text-[12px] max-md:whitespace-normal max-md:scale-[0.8] text-end">
            © 2024 Design & Develop With By Cardano2vn
          </div>
        </footer>
        {/* bottom-end */}
      </div>
    </div>
  );
};

export default Footer;
