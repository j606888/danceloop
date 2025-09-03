const ChoiseChips = ({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string } [];
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => (
        <div
          onClick={() => onChange(option.value)}
          className={`px-4 py-2.5 border-2 text-sm rounded-[10px] ${
            value === option.value
              ? "border-[#6784F6] text-[#6784F6] bg-[#6784F6]/15 font-medium"
              : "border-[#E5E5E5] text-[#454545] bg-white "
          }`}
          key={option.value}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default ChoiseChips;
