"use client";

import React from "react";
import Image from "next/image";
import { paginationIcon } from "@/public/icons";
import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/contexts/profile";

type Props = {
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  totalPages: number;
  className?: string;
};

const Pagination: React.FC<Props> = () => {
  const { totalPages, currentPage, setCurrentPage } = useProfileContext();

  return (
    <div className={`flex justify-center items-center mt-6 text-white `}>
      <Button
        className="bg-[#030711] border-0 rounded-[8px] text-white cursor-pointer flex items-center justify-center text-[16px] h-8 font-normal px-3 py-[1px] mx-2"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        <Image
          className="w-2 h-2 object-contain"
          src={paginationIcon.arrowLeftPagination}
          alt="First Page"
        />
        <span className="mx-1">First</span>
      </Button>
      <Button
        className="bg-[#030711] border-0 rounded-[8px] text-white cursor-pointer flex items-center justify-center text-[16px] h-8 font-normal px-3 py-[1px] mx-2"
        disabled={currentPage === 1}
        // onClick={() => setPage((prev) => (Math.max(prev - 1, 1))}
      >
        <Image
          className="w-2 h-2 object-contain"
          src={paginationIcon.arrowLeftPagination}
          alt="Previous Page"
        />
        <span className="mx-1">Previous</span>
      </Button>
      <span className="text-[16px] font-light leading-8 min-w-[110px] text-center">
        {currentPage} - {totalPages} of {totalPages} Pages
      </span>
      <Button
        className="bg-[#030711] border-0 rounded-[8px] text-white cursor-pointer flex items-center justify-center text-[16px] h-8 font-normal px-3 py-[1px] mx-2"
        disabled={currentPage === totalPages}
        // onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      >
        <span className="mx-1">Next</span>
        <Image
          className="w-2 h-2 object-contain"
          src={paginationIcon.arrowRightPagination}
          alt="Next Page"
        />
      </Button>
      <Button
        className="bg-[#030711] border-0 rounded-[8px] text-white cursor-pointer flex items-center justify-center text-[16px] h-8 font-normal px-3 py-[1px] mx-2"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
      >
        <span className="mx-1">Last</span>
        <Image
          className="w-2 h-2 object-contain"
          src={paginationIcon.arrowRightPagination}
          alt="Last Page"
        />
      </Button>
    </div>
  );
};

export default Pagination;
