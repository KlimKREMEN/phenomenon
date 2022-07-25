import React from 'react'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'

function srcset(
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1
) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  }
}

const PhotoItem = ({ item, cols, rows }) => {
  return (
    <Link to={`/${item.id}`}>
      <ImageListItem cols={cols} rows={rows} style={{ overflow: 'hidden' }}>
        <img
          {...srcset(item.thumbnailUrl, 250, 200, rows, cols)}
          alt={item.title}
          loading='lazy'
          style={{ height: '100%' }}
        />
        <ImageListItemBar
          sx={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
              'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          }}
          title={item.title}
          position='top'
          actionIcon={
            <IconButton
              sx={{ color: 'white' }}
              aria-label={`star ${item.title}`}
            ></IconButton>
          }
          actionPosition='left'
        />
      </ImageListItem>
    </Link>
  )
}

export default PhotoItem
