type Props = {
  active?: boolean;
  className?: string;
};

function FavoritesIcon({ active, className }: Props) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={active ? "#FFD700" : "none"}
      stroke={active ? "#FFD700" : "currentColor"}
      strokeWidth="2"
    >
      <path d="M10.0001 1.66666L12.5751 6.88332L18.3334 7.72499L14.1667 11.7833L15.1501 17.5167L10.0001 14.8083L4.85008 17.5167L5.83341 11.7833L1.66675 7.72499L7.42508 6.88332L10.0001 1.66666Z" />
    </svg>
  );
}

export default FavoritesIcon;
