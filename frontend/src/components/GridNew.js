import React, { useEffect, useState } from 'react'
import { Grid, Box, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Pagination } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAsyncGames, setCurrentPage } from '../slices/gamesSlice'
import { SemipolarSpinner } from 'react-epic-spinners'

const useStyles = makeStyles({
    // headContainer: {
    //     padding: '8px 20px',
    //     position: 'relative',
    //     backgroundColor: '#105404',
    //     borderRadius: '3px 3px 0 0',
    //     borderBottom: '4px solid #727272',
    //     paddingLeft: '4.375rem'
    // },
    heading: {
        display: 'block',
        color: '#FFFFFF',
        fontSize: '1.1rem',
        borderRadius: '3px 3px 0 0 ',
        textTransform: 'uppercase',
    },
    spanLogo: {
        position: 'absolute',
        left: '0',
        top: '0',
        height: '100%',
        width: '2.5rem',
        backgroundColor: 'black',
    },
    tableHeadCell: {
        lineHeight: '0 !important',
        color: '#FFF !important',
        borderBottom: 'none !important',
        fontFamily: 'inherit !important',
        fontSize: '1rem !important'
    },
    tableBodyCell: {
        lineHeight: '0 !important',
        borderBottom: 'none !important',
        fontFamily: 'inherit !important',
        fontSize: '1rem !important',
        paddingRight: '0 !important'
    },
    pagination: {
        padding: '.5rem .8rem',
        backgroundColor: 'aliceblue',
        color: '#000',
        margin: '0 .2rem'
    }
})

const GridNew = (props) => {
    const dispatch = useDispatch()
    const { date } = props
    // const [page, setpage] = useState(1)
    const games = useSelector((state) => state.games.allGames)
    const load = useSelector((state) => state.games.loading)
    const page = useSelector((state) => state.games.currPage)
    useEffect(() => {
        dispatch(fetchAsyncGames(page))
    }, [dispatch, page]);
    const classes = useStyles()
    return (
        <>
            {load ?
                <Grid item lg={9.8} style={{ height: '15rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SemipolarSpinner color='#00ff00' />
                </Grid>
                :
                <Grid item lg={9.8}>
                    <Box className={classes.headContainer}>
                        <Box variant='h2' className={classes.heading}>{props.heading}</Box>
                        {props?.match.path !== '/gameinfo/:page/:id/:name' ? <span className={classes.spanLogo}><img src={props.image} /></span> : null}
                    </Box>
                    {props?.match.path !== '/gameinfo/:page/:id/:name' ? <><TableContainer>
                        <Table>
                            <TableHead className={classes.headContainer} style={{ backgroundColor: 'rgba(119,119,119,.6)', border: 'none' }}>
                                <TableRow>
                                    <TableCell className={classes.tableHeadCell} style={{ width: '35%' }}>Name</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Released</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Price</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Genres</TableCell>
                                    <TableCell className={classes.tableHeadCell}>Rating</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {games.length > 0 ? games.map((element) => <TableRow>
                                    <TableCell className={classes.tableBodyCell}>
                                        <img src={element.background_image} width='5%' style={{ marginRight: '.5rem' }} />
                                        <Link to={`/gameinfo/${page}/${element.id}/${element.slug}`}>{element.name}</Link>
                                    </TableCell>
                                    <TableCell className={classes.tableBodyCell}>{element.released}</TableCell>
                                    <TableCell className={classes.tableBodyCell}>Rs. {element.id}/-</TableCell>
                                    <TableCell className={classes.tableBodyCell}>{element.genres.map((genre) => `${genre.name},`)}</TableCell>
                                    <TableCell className={classes.tableBodyCell}>{element.rating}</TableCell>
                                </TableRow>) :
                                    <TableRow lg={12}>
                                        <TableCell lg={12}>No Results Found</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                        <Grid item lg={12} style={{ marginTop: '1.5rem' }}>
                            {page == '1' ? null : <Link to='/home' onClick={() => dispatch(setCurrentPage({ type: 'PREVIOUS' }))} className={classes.pagination}>Prev</Link>}
                            <Link to='/home' onClick={() => dispatch(setCurrentPage({ type: 'NEXT' }))} className={classes.pagination}>Next</Link>
                        </Grid>

                    </> :
                        null}
                </Grid>
            }
        </>
    )
}

export default withRouter(GridNew)
