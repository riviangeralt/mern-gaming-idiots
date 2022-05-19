import React from 'react'
import { Box } from '@mui/system'
import nat4 from '../../assets/nat-7.jpg'
import '../../justFonts.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'


const OfferBanner = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: 150,
                position: 'relative',
                padding: '1rem',
                backgroundImage: `url(${nat4})`,
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Typography component="h1" className="font-face-gm " style={{ fontSize: '4.5rem ', fontWeight: 'bold' }}>Get 50% off on all Games</Typography>
            <Link to='/all' className="font-face-gm" style={{ color: '#F1FF008A' }}>view games</Link>
            {/* <img src={nat2} height={243} style={{ boxShadow: '0 1.5rem 4rem rgb(0 0 0 / 40%)', right: '12%', top: '-2rem', position: 'absolute' }} />
            <img src={nat3} height={243} style={{ boxShadow: '0 1.5rem 4rem rgb(0 0 0 / 40%)', right: '8%', bottom: '-4%', position: 'absolute' }} />
            <img src={nat1} height={243} style={{ boxShadow: '0 1.5rem 4rem rgb(0 0 0 / 40%)', top: '3%', right: '-3%', position: 'absolute' }} /> */}

            {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span>This text will fade in when created in the DOM</span>
            </motion.div> */}
        </Box>
    )
}

export default OfferBanner
