import React, { useState } from 'react'

const usePaging = () => {
  const [start, setStart] = useState(0)

  const isFirstPage = !!(start === 0)

  const setNextPage = () => {
    setStart((prevState) => {
      return +prevState + +process.env.REACT_APP_USERS_PER_PAGE
    })
  }

  return { start, isFirstPage, setNextPage }
}

export default usePaging
