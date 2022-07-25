import React from 'react'
import logo from '../../assets/phenomenon_logo.svg'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Toolbar from '../toolbar/Toolbar'

import { useAppContext } from '../../context/AppContext'
import Navbar from '../navbar/Navbar'
import NavbarSearch from '../navbar/NavbarSearch'
import { Outlet } from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'

const MainLayout = ({ children }) => {
  const { setSearchQuery, isLoading, isSearchVisible } = useAppContext()

  return (
    <div className='App'>
      <Navbar position='sticky'>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: 'block',
            }}
          >
            <Link href='/'>
              <img src={logo} alt='' />
            </Link>
          </Box>

          {!!isSearchVisible ? (
            <NavbarSearch onChange={setSearchQuery} />
          ) : null}
        </Toolbar>
      </Navbar>
      <main>{children ? children : <Outlet />}</main>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default MainLayout
