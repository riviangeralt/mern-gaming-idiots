import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";


const TextFieldController = (props) => {
  const { name, label, errors, disabled, control, defaultValue, readOnly, rules, register, variant, onChange } = props
  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue || ''}
        rules={rules}
        render={(new_props) => {
          return (
            <TextField
              name={name}
              {...new_props}
              label={label}
              {...props}
              InputProps={{
                readOnly: readOnly
              }}
              disabled={disabled || false}
              error={errors[name]?.message ? true : false}
              {...register(`${name}`, rules)}
              helperText={errors[name]?.message}
              variant={variant || 'outlined'}
              onChange={onChange || null}
            />
          )
        }}
      />
    </>
  )
}

export default TextFieldController
