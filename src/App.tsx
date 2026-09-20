import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Basics from './pages/Basics'
import Learning from './pages/Learning'
import Glossary from './pages/Glossary'
import Architectures from './pages/Architectures'
import Inside from './pages/Inside'
import Path from './pages/Path'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basics" element={<Basics />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/architectures" element={<Architectures />} />
        <Route path="/inside" element={<Inside />} />
        <Route path="/path" element={<Path />} />
      </Routes>
    </Layout>
  )
}
