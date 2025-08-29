import { useState } from "react";

const RadioGroup = ({
  label,
  options,
}: {
  label: string;
  options: string[];
}) => {
  const [selected, setSelected] = useState<string | null>(null);

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
            onClick={() => setSelected(option)}
          >
            <div
              className={`flex items-center justify-center w-4 h-4 rounded-full bg-white ${
                selected === option ? "border-1 border-[#6784F6]" : "bg-white"
              }`}
            >
              {selected === option && <div className="w-2.5 h-2.5 rounded-full bg-[#6784F6]" />}
            </div>
            <span className="text-base">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
