import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material";

const Select = ({ label, options, value, onChange }: { label: string; options: string[], value: string, onChange: (value: string) => void }) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        value={value || ""}
        label={label}
        onChange={(e) => onChange(e.target.value || "")}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
