import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styles from "./custom_filters.module.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Box, Chip, Typography } from "@mui/material";

interface IProps {
  label: string;
  value: string | string[];
  handleChange: (e: SelectChangeEvent<string | string[]>) => void;
  menuItems: {
    label: string;
    value: string;
  }[];
  multiple?: boolean;
}

function CustomDropdown({
  label,
  handleChange,
  value,
  menuItems,
  multiple,
}: IProps) {
  return (
    <div className={styles.filterContainer}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          placeholder={label}
          onChange={(e) => handleChange(e)}
          multiple={multiple}
          renderValue={(selected) => {
            if (typeof selected === "string") {
              return <Typography>{selected}</Typography>;
            } else
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[])?.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              );
          }}
        >
          {menuItems.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CustomDropdown;
