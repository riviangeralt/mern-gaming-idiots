import React from 'react'
import { Box } from '@mui/system'
import Logo from '../../assets/logo.png'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GamesIcon from '@mui/icons-material/Games';
import { Link } from 'react-router-dom';
const Footer = () => {


    const footer = [
        [
            { name: 'Instagram', icon: <InstagramIcon />, url: '/' },
            { name: 'Gmail', icon: <GoogleIcon />, url: '/' },
            { name: 'Facebook', icon: <FacebookIcon />, url: '/' },
        ],
        [
            { name: 'All Games', icon: <GamesIcon />, url: '/all' },
            { name: 'Linux', icon: <GoogleIcon />, url: '/linux' },
            { name: 'Nintendo', icon: <FacebookIcon />, url: '/nintendo' },
        ],
        [
            { name: 'Instagram', icon: <InstagramIcon />, url: '/' },
            { name: 'Gmail', icon: <GoogleIcon />, url: '/' },
            { name: 'Facebook', icon: <FacebookIcon />, url: '/' },
        ],
    ]
    return (
        <Box
            sx={{
                width: '100%',
                // height: 300,
                backgroundColor: '#FFF',
                position: 'relative',
                margin: '1rem 0 0 0 ',
                padding: '1rem',
            }}>
            <Box
                sx={{
                    width: '100%',
                    height: 100,
                    textAlign: 'center'
                }}
            >
                <img src={Logo} height={100} alt="responsive" />
            </Box>
            <Box
                sx={{
                    width: '100%',
                }}
            >
                <List dense={true} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr ', padding: 0 }}>
                    {/* {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(el => { */}
                    {footer.map(one =>
                        <List dense={false} style={{ padding: 0 }}>
                            {one.map(contact =>
                                <ListItem>
                                    <ListItemIcon>
                                        {contact.icon}
                                    </ListItemIcon>
                                    <Link to={contact.url}>
                                        <ListItemText
                                            primary={contact.name}
                                            // secondary={'Secondary text'}
                                            style={{ color: 'black' }}
                                        />
                                    </Link>
                                </ListItem>
                            )}
                        </List>
                    )
                    }

                    {/* )} */}
                </List>
            </Box>
        </Box>
    )
}

export default Footer
