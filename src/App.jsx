import Header from './components/Header'
import ProductList from './pages/ProductList'
import { UIProvider } from './context/UiContext'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductDetailsPage from './pages/ProductDetailsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <BrowserRouter>
      <UIProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </UIProvider>
    </BrowserRouter>
  )
}

export default App
