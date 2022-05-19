import React from 'react'
import { FormHelperText, Radio } from '@mui/material'
import { FormControlLabel, FormControl, RadioGroup, FormLabel } from '@mui/material'
import { Controller } from 'react-hook-form'
const RadioController = (props) => {
    const {
        options,
        name,
        rules,
        control,
        label,
        // register,
        errors
    } = props
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <Controller
                rules={rules}
                control={control}
                name={name}
                render={({ field }) => (
                    <RadioGroup row {...field}>
                        {options.map((val) => (
                            <FormControlLabel
                                value={val.value}
                                control={<Radio />}
                                label={val.label}
                                error={errors}
                            />))}
                        <FormHelperText> {errors[name]?.message}</FormHelperText>
                    </RadioGroup>
                )}
            />
        </FormControl>

    )
}

export default RadioController
