import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList'
import { useAppContext } from '../../context/AppContext'
import PhotoItem from './PhotoItem'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import usePaging from '../../hooks/usePaging'
import photosService from '../../services/photosService'

import { IPhotoList } from '../../services/photosService'
import { useMediaQuery } from '@mui/material'
import theme from '../../theme'

const PhotosList = () => {
  const { setIsLoading, isLoading, setIsSearchVisible, searchQuery } =
    useAppContext()

  const [allData, setAllData] = useState<IPhotoList>([])
  const [filteredData, setFilteredData] = useState<IPhotoList>([])
  const { start, setNextPage } = usePaging()
  const [isLastPage, setIsLastPage] = useState(false)
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response: IPhotoList = await photosService.getData(
        start,
        process.env.REACT_APP_USERS_PER_PAGE
      )

      setAllData((prevState) => [...prevState, ...response])

      if (+response.length < +process.env.REACT_APP_USERS_PER_PAGE) {
        setIsLastPage(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [start])

  useEffect(() => {
    setIsLoading(true)
    !!searchQuery
      ? setFilteredData(
          allData.filter((data) => data.title.search(searchQuery) !== -1)
        )
      : setFilteredData(allData)
    setIsLoading(false)
  }, [allData, searchQuery])

  useEffect(() => {
    isLastPage || !!searchQuery || filteredData.length === 0
      ? setIsShowMoreVisible(false)
      : setIsShowMoreVisible(true)
  }, [isLastPage, searchQuery, filteredData])

  useEffect(() => {
    setIsSearchVisible(true)

    return () => {
      setIsSearchVisible(false)
    }
  }, [])

  const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'))
  const matchDownLg = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Container
      component='section'
      sx={{
        mt: 3,
        mb: 3,
      }}
    >
      <ImageList
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          margin: 0,
          marginBottom: 3,
          // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
          transform: 'translateZ(0)',
        }}
        rowHeight={200}
        gap={12}
        cols={matchDownMd ? 1 : matchDownLg ? 2 : 3}
      >
        {!!searchQuery && filteredData.length === 0 ? (
          <Box
            sx={{
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gridColumnEnd: matchDownMd
                ? 'span 1'
                : matchDownLg
                ? 'span 2'
                : 'span 3',
            }}
          >
            There are no results for this query
          </Box>
        ) : (
          filteredData.map((item) => {
            const cols = item.featured ? 2 : 1
            const rows = item.featured ? 2 : 1

            return (
              <PhotoItem key={item.id} item={item} cols={cols} rows={rows} />
            )
          })
        )}
      </ImageList>

      <Box
        sx={{
          display: isShowMoreVisible ? 'flex' : 'none',
          justifyContent: 'center',
          margin: '0 0 12px',
        }}
      >
        <LoadingButton
          onClick={setNextPage}
          loading={isLoading}
          disabled={isLoading}
          variant='outlined'
        >
          Show more
        </LoadingButton>
      </Box>
    </Container>
  )
}

export default PhotosList
