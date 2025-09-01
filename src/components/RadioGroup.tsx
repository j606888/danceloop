
const RadioGroup = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) => {

  return (
    <div>
      <label className="block text-[#444444] font-medium mb-2" htmlFor={label}>
        {label}
      </label>
      <div className="flex flex-wrap gap-5 mb-1">
        {options.map((option) => (
          <div
            key={option}
            className="flex items-center gap-2"
            onClick={() => onChange(option)}
          >
            <div
              className={`flex items-center justify-center w-4.5 h-4.5 bg-white rounded-full ${
                value === option ? "border-2 border-[#6784F6]" : ""
              }`}
            >
              {value === option && <div className="w-2.5 h-2.5 rounded-full bg-[#6784F6]" />}
            </div>
            <span className="text-base">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
