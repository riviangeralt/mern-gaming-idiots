import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
export function useForm(intialvalue, validateOnChanges = false, validate) {
    const [values, setValues] = useState(intialvalue);
    const [error, setError] = useState({});
    const resetForm = () => {
        setValues(intialvalue);
        setError({});
    };
    return {
        values,
        setValues,
        error,
        setError,
        resetForm,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            width: "100%",
            //   margin: theme.spacing(1),
        },
    },
}));
export function CustomForm(props) {
    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    );
}
