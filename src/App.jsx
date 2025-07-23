import Header from './components/Header'
import ProductList from './components/pages/ProductList'
import { UIProvider } from './context/UiContext'
import './App.css'

function App() {

  return (
    <UIProvider>
      <Header />
      <div className="container mx-auto">
        <ProductList />
      </div>
    </UIProvider>
  )
}

export default App
