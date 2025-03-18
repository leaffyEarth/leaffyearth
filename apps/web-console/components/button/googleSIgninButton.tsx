import React, { FC, MouseEventHandler } from 'react';
import { Button, ButtonProps } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { styled } from '@mui/material/styles';


export interface GoogleSignInButtonProps extends Omit<ButtonProps, 'startIcon' | 'children'> {
    label?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}


const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({
    label = 'Sign in with Google',
    onClick,
    ...muiButtonProps
}) => {

    const HoverButton = styled(Button)(() => ({
        textTransform: 'none',
        backgroundColor: 'white',
        color: '#737373',
        boxShadow: 'none',
        border: 'solid 1px #969696',
        minWidth: '300px',
        whiteSpace: 'nowrap'
    }));


    return (
        <HoverButton
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={onClick}
            {...muiButtonProps}
        >
            {label}
        </HoverButton>
    );
};

export default GoogleSignInButton;
