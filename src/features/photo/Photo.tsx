import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import photosService from '../../services/photosService'
import Typography from '../../components/typography/Typography'

import { IPhoto } from '../../services/photosService'

const initialState: IPhoto = {
  albumId: 0,
  id: 0,
  thumbnailUrl: '',
  title: '',
  url: '',
}

const Photo = () => {
  const { setIsLoading } = useAppContext()
  const { photoId } = useParams()
  const [photo, setPhoto] = useState<IPhoto>(initialState)

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      try {
        const response = await photosService.getPhoto(+photoId)

        setPhoto(response)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetch()
  }, [])

  return (
    <Container
      component='section'
      sx={{
        mt: { md: 18, xs: 3 },
        display: 'flex',
      }}
    >
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: '#F2751A',
              py: 8,
              px: 3,
              mb: { xs: 3 },
            }}
          >
            <Box component='form' sx={{ maxWidth: 400 }}>
              <Typography variant='h2' component='h2' gutterBottom>
                Album id - {photo.albumId}
              </Typography>
              <Typography variant='h5'>{photo.title}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: { md: 'block', xs: 'none' },
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '480px',
              height: '470px',
              zIndex: -1,
              background:
                'url(https://mui.com/static/themes/onepirate/productCTAImageDots.png)',
            }}
          />
          <Box
            component='img'
            src={photo.url}
            alt='call to action'
            sx={{
              position: { md: 'absolute', xs: 'relative' },
              top: { md: -28, xs: 0 },
              left: { md: -28, xs: 0 },
              right: 0,
              bottom: 0,
              width: { md: '480px', xs: '100%' },
              height: 'auto',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Photo
