import React from "react";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/system";


const StyledButton = styled(MuiButton, {})({
    backgroundColor: '#105404',
    '&:hover': {
        backgroundColor: '#1eb104',
    }
})
export default function ButtonController(props) {
    const {
        text,
        size,
        color,
        variant,
        onClick,
        disabled,
        background,
        textColor,
        width,
        display,
        height,
        position,
        topMargin,
        style,
        margin,
        boxShadow,
        padding,
        ...other
    } = props;

    return (
        <StyledButton
            disableRipple={true}
            disabled={disabled || false}
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            // classes={{ root: classes.root, label: classes.label }}
            style={{
                //...style,
                background: background,
                color: textColor,
                ...(width ? { 'width': width } : undefined),
                ...(height ? { 'height': height } : undefined),
                ...(position ? { 'position': position } : undefined),
                ...(topMargin ? { 'top': topMargin } : undefined),
                ...(margin ? { 'margin': margin } : undefined),
                ...(boxShadow ? { 'boxShadow': boxShadow } : undefined),
                ...(padding ? { 'padding': padding } : undefined),
                ...(display ? { 'display': display } : undefined),

            }}
            {...other}
        >
            {props?.children || text}
        </StyledButton>
    );
}
