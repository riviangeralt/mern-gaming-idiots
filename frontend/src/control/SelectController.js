import React from "react";
// import Select from "react-select";
import { Controller } from "react-hook-form";
import { FormHelperText, MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
const SelectController = (props) => {
  const {
    name,
    control,
    options,
    rules,
    errors,
    defaultValue,
    register,
    label,
    value,
    onChange,
    onChangeNew,
  } = props;
  const labelId = `${name}-label`;
  return (
    <>
      <FormControl variant="outlined" {...props}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Controller
          rules={rules}
          render={(new_props) => (
            <Select
              labelId={labelId}
              label={label}
              {...register(`${name}`, rules)}
              error={errors[name]?.message ? true : false}
              onChange={onChange}
              value={value}
              defaultValue={defaultValue}
            >
              {options.map((item, index) => (
                <MenuItem
                  key={item.key || `${item.id}-${index}`}
                  value={item.title}
                >
                  {item.title || item.label}
                </MenuItem>
              ))}
            </Select>
          )}
          name={name}
          defaultValue={value}
          control={control}
          onChange={onChange}
        />
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </>
  );
};

export default SelectController;
