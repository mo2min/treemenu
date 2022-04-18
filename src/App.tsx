import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import TreeMenu from './TreeMenu'


// as an array
const treeData = [
  {
    key: 'first-level-node-1',
    label: 'نموذج اول',

    nodes: [
      {
        key: 'second-level-node-1',
        label: 'نوذج رئيس',
        nodes: [
          {
            key: 'third-level-node-1',
            label: 'نموذج فرعي',
            nodes: [] // you can remove the nodes property or leave it as an empty array
          },
        ],
      },
    ],
  },
  {
    key: 'first-level-node-2',
    label: 'Node 2 at the first level',
  },
];
function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{direction:"rtl",width:"300px"}}>
      <TreeMenu data={treeData} isRtl={true} isOneLevel={true} searchPlaceholder="البحث عن"/>
    </div> 
  )
}

export default App
