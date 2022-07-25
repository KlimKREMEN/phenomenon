import * as React from 'react'
import { styled, Theme } from '@mui/material/styles'
import MuiTypography, { TypographyProps } from '@mui/material/Typography'

const markClassesMapping: {
  [index: string]: { [subindex: string]: string }
} = {
  center: {
    h1: '',
    h2: 'Typography-markedH2Center',
    h3: 'Typography-markedH3Center',
    h4: 'Typography-markedH4Center',
    h5: '',
    h6: '',
  },
  left: {
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    h5: '',
    h6: 'Typography-markedH6Left',
  },
  none: {
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    h5: '',
    h6: '',
  },
}

const styles = ({ theme }: { theme: Theme }) => ({
  [`& .${markClassesMapping.center.h2}`]: {
    height: 4,
    width: 73,
    display: 'block',
    margin: `${theme.spacing(1)} auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  [`& .${markClassesMapping.center.h3}`]: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)} auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  [`& .${markClassesMapping.center.h4}`]: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)} auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  [`& .${markClassesMapping.left.h6}`]: {
    height: 2,
    width: 28,
    display: 'block',
    marginTop: theme.spacing(0.5),
    background: 'currentColor',
  },
})

interface ExtraTypographyProps {
  marked?: 'center' | 'left' | 'none'
}

const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h2',
}

function Typography<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }> & ExtraTypographyProps
) {
  const { children, variant, marked = 'none', ...other } = props

  let markedClassName = ''
  if (variant && variant in markClassesMapping[marked]) {
    markedClassName = markClassesMapping[marked][variant]
  }

  return (
    <MuiTypography variantMapping={variantMapping} variant={variant} {...other}>
      {children}
      {markedClassName ? <span className={markedClassName} /> : null}
    </MuiTypography>
  )
}

export default styled(Typography)(styles)
