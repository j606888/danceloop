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
      <label className="block text-[#444444] text-sm font-medium mb-1" htmlFor={label}>
        {label}
      </label>
      <div className="flex gap-4">
        {options.map((option) => (
          <div
            key={option}
            className="flex items-center gap-1.5"
            onClick={() => setSelected(option)}
          >
            <div
              className={`flex items-center justify-center w-4 h-4 rounded-full bg-white ${
                selected === option ? "border-1 border-[#6784F6]" : "bg-white"
              }`}
            >
              {selected === option && <div className="w-2.5 h-2.5 rounded-full bg-[#6784F6]" />}
            </div>
            <span className="text-sm">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
