const RadioGroup = ({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}) => {
  const handleClick = (option: string) => {
    if (value === option) {
      onChange("");
    } else {
      onChange(option);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <div className="flex flex-wrap gap-2 pt-1">
        {options.map((option) => (
          <div
            key={option}
            className={`px-3 py-1.5 rounded-md  cursor-pointer text-sm ${
              value === option
                ? "border-1 border-[#6784F6] bg-[#6784F6]/20 text-[#6784F6] font-medium"
                : "border border-gray-200"
            }`}
            onClick={() => handleClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
