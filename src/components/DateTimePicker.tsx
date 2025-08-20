import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

export default function DateTimePicker({ datetime, onChange }: { datetime: string, onChange: (newValue: string) => void }) {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(datetime)
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    onChange(newValue?.toISOString() || "");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <MuiDateTimePicker
          label="Recorded At"
          format="YYYY-MM-DD HH:mm"
          value={value}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
