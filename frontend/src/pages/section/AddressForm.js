import React from 'react'
import { FormGroup, Grid } from '@mui/material'
import TextFieldController from '../../control/TextFieldController'
const AddressForm = (props) => {
    const { methods } = props
    return (
        <>
            <Grid container sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <FormGroup >
                    <TextFieldController
                        control={methods.control}
                        errors={methods.formState.errors}
                        name='address'
                        label='Address Line 1'
                        rules={{
                            required: 'This field is required',
                            // validate: (value) =>
                            //     /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
                            //         value
                            //     ) || "Please enter the valid email id",
                        }}
                        register={methods.register}
                    />
                </FormGroup>
                <FormGroup >
                    <TextFieldController
                        control={methods.control}
                        errors={methods.formState.errors}
                        name='address2'
                        label='Address Line 2'
                        rules={{
                            required: 'This field is required',
                            // validate: (value) =>
                            //     /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
                            //         value
                            //     ) || "Please enter the valid email id",
                        }}
                        register={methods.register}
                    />
                </FormGroup>

                <FormGroup >
                    <TextFieldController
                        control={methods.control}
                        errors={methods.formState.errors}
                        name='zip'
                        label='Zip Code'
                        // type='number'
                        rules={{
                            required: 'This field is required',
                            validate: (value) =>
                                /^[0-9\b]+$/.test(
                                    value
                                ) || "Please enter the valid zip code",
                        }}
                        register={methods.register}
                    />
                </FormGroup>
            </Grid>
        </>
    )
}

export default AddressForm
