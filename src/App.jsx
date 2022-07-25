import './App.css'
import { Route, Routes } from 'react-router-dom'
import PhotosList from './features/photosList/PhotosList'
import Photo from './features/photo/Photo'
import MainLayout from './components/layout/MainLayout'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<PhotosList />} />
        <Route path=':photoId' element={<Photo />} />
      </Route>
    </Routes>
  )
}

export default App
