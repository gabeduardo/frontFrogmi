import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["md", "ml", "ms", "mw", "me", "mi", "mb", "mlg"];

export default function UISelect({ params, setParams, setCurrentPage }) {
  const [magType, setMagType] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMagType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    const newParams = new URLSearchParams(params);
    newParams.delete("mag_type");
    // Agrega cada valor del arreglo al parámetro
    magType.forEach((value) => {
      newParams.append("mag_type", value);
    });

    newParams.set("page", 1);
    setCurrentPage(1);

    setParams(newParams);

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newParams}`
    );
  }, [magType]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label" size="small">
          MagType
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={magType}
          onChange={handleChange}
          input={<OutlinedInput label="Mag_type" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          size="small"
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={magType.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
