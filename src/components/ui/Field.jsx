export default function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-[4px] block text-[12px] font-bold text-ap-text">{label}</span>
      {children}
    </label>
  );
}
