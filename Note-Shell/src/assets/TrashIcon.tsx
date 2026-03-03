import React from "react";

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 5H17.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8334 5V16.6667C15.8334 17.5 15.0001 18.3333 14.1667 18.3333H5.83341C5.00008 18.3333 4.16675 17.5 4.16675 16.6667V5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66675 4.99999V3.33332C6.66675 2.49999 7.50008 1.66666 8.33341 1.66666H11.6667C12.5001 1.66666 13.3334 2.49999 13.3334 3.33332V4.99999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TrashIcon;
