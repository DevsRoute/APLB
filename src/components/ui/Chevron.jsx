const ROTATION = {
  down: 0,
  up: 180,
  left: 90,
  right: -90,
};

export default function Chevron({ direction = 'down', color = 'currentColor', className = '' }) {
  return (
    <svg
      width="12"
      height="7.21"
      viewBox="0 0 12 7.21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${ROTATION[direction]}deg)` }}
      className={className}
    >
      <path d="M0 0L6 7.21L12 0H0Z" fill={color} />
    </svg>
  );
}
