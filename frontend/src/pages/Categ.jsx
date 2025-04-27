import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'
import Box from '../components/Box.jsx'
import '../style.css'
import { Users, table1, table2 } from '../components/Data.jsx'

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

