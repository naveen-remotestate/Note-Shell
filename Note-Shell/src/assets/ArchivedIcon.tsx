function ArchivedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6667 3.33334H3.33341C2.41294 3.33334 1.66675 4.07954 1.66675 5.00001V5.83334C1.66675 6.75382 2.41294 7.50001 3.33341 7.50001H16.6667C17.5872 7.50001 18.3334 6.75382 18.3334 5.83334V5.00001C18.3334 4.07954 17.5872 3.33334 16.6667 3.33334Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33325 7.5V15C3.33325 15.442 3.50885 15.866 3.82141 16.1785C4.13397 16.4911 4.55789 16.6667 4.99992 16.6667H14.9999C15.4419 16.6667 15.8659 16.4911 16.1784 16.1785C16.491 15.866 16.6666 15.442 16.6666 15V7.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33325 10.8333H11.6666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArchivedIcon;
