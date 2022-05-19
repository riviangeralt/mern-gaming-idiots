import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredGames, removeFilteredGames } from "../../slices/filterSlicer"
import { removeSearchedGame, setCurrentPage, fetchNewReleased, removeNewGames } from '../../slices/gamesSlice'
import ButtonController from '../../control/ButtonController'
import SearchBar from '../../components/SearchBar'
import CustomCard from '../../components/CustomCard'
import { SemipolarSpinner, HollowDotsSpinner } from 'react-epic-spinners'

const Games = (props) => {
    const dispatch = useDispatch()
    const filteredGame = useSelector(state => state.filteredGame.filtered)
    const loading = useSelector(state => state.filteredGame.loading)
    const searchedGame = useSelector(state => state.games.allGames)
    const page = useSelector(state => state.games.currPage)
    const newReleased = useSelector(state => state.games.newReleased)
    const myData = {
        'console': props?.match?.params?.name,
        'page': page
    }
    const nextPage = () => {
        // if (filteredGame.length > 0) {
        //     dispatch(setCurrentPage({ type: 'NEXT' }))
        //     dispatch(fetchSearch(data))
        // }
        // else {
        if (props?.match?.path === '/new') {
            dispatch(setCurrentPage({ type: 'NEXT' }))
            dispatch(fetchNewReleased({ order: 'new', page: page }))
        }
        if (props?.match?.path === '/rated') {
            dispatch(setCurrentPage({ type: 'NEXT' }))
            dispatch(fetchNewReleased({ order: 'rated', page: page }))
        }
        else {
            dispatch(setCurrentPage({ type: 'NEXT' }))
            dispatch(fetchFilteredGames(myData))
        }
        // }
    }
    useEffect(() => {
        props?.match?.path === '/new' ?
            dispatch(fetchNewReleased({ order: 'new', page: page })) :
            props?.match?.path === '/rated' ?
                dispatch(fetchNewReleased({ order: 'rated', page: page })) :
                dispatch(fetchFilteredGames(myData))

        return () => {
            dispatch(removeFilteredGames())
            dispatch(removeSearchedGame())
            dispatch(removeNewGames())
        }
        // eslint-disable-next-line
    }, [dispatch]);
    return (
        <>
            {!Object.values(filteredGame).length ?
                <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SemipolarSpinner color='#00ff00' />
                </div>
                :
                <>
                    <SearchBar />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
                        {props?.match?.path === '/new' ? newReleased.length > 0 ? newReleased?.flat().map(el =>
                            <CustomCard isSmall={true} element={el} height={300} type={props?.type} />
                        ) : props?.match?.path === '/rated' ? newReleased.length > 0 ? newReleased?.flat().map(el =>
                            <CustomCard isSmall={true} element={el} height={300} type={props?.type} />
                        ) : 'Not Found' : 'Not Found' :
                            searchedGame.length > 0 ? searchedGame.map(el =>
                                <CustomCard isSmall={true} element={el} height={300} type={props?.type} />
                            )
                                : filteredGame?.flat().map(el =>
                                    <CustomCard isSmall={true} element={el} height={300} type={props?.type} />
                                )}
                    </div>

                    {loading ?
                        <div style={{ margin: '1rem auto 0 auto', display: 'flex', justifyContent: 'center' }}>
                            <HollowDotsSpinner color='#00ff00' />
                        </div>
                        :
                        <ButtonController margin='1rem auto 0 auto' display='block' onClick={() => nextPage()}>
                            Load More</ButtonController>
                    }
                </>
            }

        </>
    )
}

export default withRouter(Games)
