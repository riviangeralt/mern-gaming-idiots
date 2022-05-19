import React from 'react'
// import GridNew from './GridNew'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearch } from '../slices/gamesSlice'
import { useForm } from 'react-hook-form'
import TextFieldController from '../control/TextFieldController'
import { FormGroup } from '@mui/material'
import ButtonController from '../control/ButtonController'


const SearchBar = (props) => {
    const page = useSelector((state) => state.games.currPage)

    const dispatch = useDispatch()

    const methods = useForm()
    return (
        <>
            <FormGroup style={props.search ? { backgroundColor: 'white', display: 'inline-block' } : { backgroundColor: 'white', display: 'inline-block', margin: '0 0 1rem 71%' }}>
                <TextFieldController
                    control={methods.control}
                    errors={methods.formState.errors}
                    name='search'
                    label='Enter Keyword'
                    register={methods.register}
                    variant='filled'
                    onChange={(e) => {
                        methods.setValue('search', e.target.value)
                    }}
                />
            </FormGroup>
            <ButtonController padding='1rem 22px' margin={`${props.search ? '0 0 0 .5rem' : '2rem 0 0 .5rem'}`} onClick={() => dispatch(fetchSearch({ 'term': methods.getValues('search'), 'page': page }))
            }>Search</ButtonController>
        </>
    )
}

export default SearchBar
