import { useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout'

import './App.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

import ProList from './view/proList'

const DEFAULT_LAYOUT = [
  {i: 'proList', x: 0, y: 0, w: 1, h: 5, minW: 1, maxW: 100},
  {i: 'main', x: 0, y: 0, w: 5, h: 5, minW: 1, maxW: 100},
  // {i: 'c', x: 4, y: 0, w: 1, h: 2}
]

function App() {

  const [layout, setLayout] = useState(DEFAULT_LAYOUT)

  const handleChange = (e) => {
    localStorage.setItem('layout', JSON.stringify(e))
  }

  useEffect(() => {
    const layoutCache = JSON.parse(localStorage.getItem('layout'))
    setLayout(layoutCache)
  }, [])

  return (
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={50} width={1200} onDragStop={handleChange} onResize={handleChange}>
      <div key="proList"><ProList ></ProList></div>
      <div key="main">main</div>
    </GridLayout>
  )
}

export default App;
