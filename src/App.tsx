import './styles/App.css'
import { PersonTable } from './components/Table'

function App() {
  return (
    <div className="App">
      <img src="/arco.jpeg" className="logo" alt="ARCO logo"/>
      <h1>ARCO Dataset Visualizer</h1>
      <h3>Sorting, Conditional Formatting</h3>
      <PersonTable />
    </div>
  )
}

export default App
