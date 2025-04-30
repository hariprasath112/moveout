import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'
import Box from '../components/Box.jsx'
import '../style.css'
import { Users, table1, table2, table3, table4, table5, table6, table7, table8, table9, table10, table11, table12, table13, table14, table15, table16, table17, table18, table19
 } from '../components/Data.jsx'

function Categ() {
    const {passkey} = useParams()
    const userData = Users[passkey]
    
    let navigate = useNavigate();
    if (!userData) {
        return <h1>Invalid passkey</h1>
    }
    //keep a current state
    const [currentList, setCurrentList] = useState(table1);

    //handle box click
    const handleBoxClick = (item) =>{
      if (item.type==='end'){
          navigate(`/${passkey}/submit/${item.value}`);
          
      }else if(item.type === "lead") {
        switch (item.value){
          case 'table1':
            setCurrentList(table1);
            break;
          case 'table2':
            setCurrentList(table2);
            break;
          case 'table3':
            setCurrentList(table3);
            break;
            case 'table4':
              setCurrentList(table4);
              break;
            case 'table5':
              setCurrentList(table5);
              break;
            case 'table6':
              setCurrentList(table6);
              break;
            case 'table7':
              setCurrentList(table7);
              break;
            case 'table8':
              setCurrentList(table8);
              break;
            case 'table9':
              setCurrentList(table9);
              break;
            case 'table10':
              setCurrentList(table10);
              break;
            case 'table11':
              setCurrentList(table11);
              break;
            case 'table12':
              setCurrentList(table12);
              break;
            case 'table13':
              setCurrentList(table13);
              break;
            case 'table14':
              setCurrentList(table14);
              break;
            case 'table15':
              setCurrentList(table15);
              break;
            case 'table16':
              setCurrentList(table16);
              break;
            case 'table17':
              setCurrentList(table17);
              break;
            case 'table18':
              setCurrentList(table18);
              break;
            case 'table19':
              setCurrentList(table19);
              break;

          default:
            break;
        }
        
        }
    };
   
  return (
    <>
    <Navbar />
    <h2>&ensp;You are at {userData.name}</h2>
    <div className="grid-container">
        {currentList.map((item) => (
          <Box
            key={item.id}
            image={item.image}
            text={item.text}
            /* pass a click handler that calls handleBoxClick(item) */
            onClick={() => handleBoxClick(item)}
          />
        ))}
      </div>
    </>
  )
}
export default Categ

