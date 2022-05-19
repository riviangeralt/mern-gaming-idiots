import React, { useState } from 'react'
import { Grid, Paper, FormGroup } from '@mui/material'
import { useForm } from 'react-hook-form'
import { CustomForm } from '../../control/useForm'
import { Link, withRouter } from 'react-router-dom'
import TextFieldController from '../../control/TextFieldController'
import ButtonController from '../../control/ButtonController'
import instanceApi from '../../api/backend'
import logo from '../../assets/logo.png'
import { Snackbar, Alert } from '@mui/material'
import { authenticate } from '../../auth/Auth'

const Login = (props) => {
    const { control, formState: { errors }, handleSubmit, register } = useForm();
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState()

    const onSubmit = async (data) => {
        try {
            let res = await instanceApi.post('/login', { email: data.email, password: data.password })
            authenticate(res.data, res.data.user.role === 0 ? () => props?.history.push('/') : () => props?.history.push('/admin'))
            setSuccess(true)
        } catch (error) {
            setError(error.response.data.message)
            setSuccess(true)
        }
    }
    const handleClose = () => {
        setSuccess(false)
    }
    return (
        <>
            {success ?
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={success}
                    key={1 + 2}
                    autoHideDuration={3000}
                    direction="left"
                    onClose={handleClose}
                >
                    <Alert severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
                        {error ? error : "Login Success"}
                    </Alert>
                </Snackbar> : null}
            <Grid container component={Paper} style={{ height: 'auto  ', padding: '1.5rem', width: 'auto', margin: '0 auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <img src={logo} style={{ width: '6rem', height: '6rem', margin: '0 auto' }} alt='Gaming Idiots Logo' />
                <CustomForm onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
                    <FormGroup style={{ width: '100%', margin: '1rem 0' }}>
                        <TextFieldController
                            control={control}
                            errors={errors}
                            name='email'
                            label='Email'
                            rules={{
                                required: 'This field is required',
                                validate: (value) =>
                                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
                                        value
                                    ) || "Please enter the valid email id",
                            }}
                            register={register}
                        />
                    </FormGroup>
                    <FormGroup style={{ width: '100%', margin: '1rem 0' }}>
                        <TextFieldController
                            type='password'
                            control={control}
                            errors={errors}
                            name='password'
                            label='Password'
                            rules={{
                                required: 'This field is required',
                                // min
                            }}
                            register={register}
                        />
                    </FormGroup>
                    <ButtonController type='submit' label='Login' text='login' />
                    <span style={{ display: 'block', margin: '.5rem 0 0 0 ' }}>Dont have an account? <Link to='/signup' >Create Account</Link></span>
                </CustomForm>
            </Grid>
        </>
    )
}

export default withRouter(Login)
