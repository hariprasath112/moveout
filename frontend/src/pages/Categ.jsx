import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'
import Box from '../components/Box.jsx'
import '../style.css'
import { Users, table1, table2, table3, table4, table5, table6, table7, table8, table9, table10, table11, table12, table13, table14, table15, table16, table17, table18, table19
 } from '../components/Data.jsx'

function Categ() {
    const {passkey} = useParams()
    const navigate    = useNavigate()
    const userData = Users[passkey]
    
    if (!userData) {
        return <h1>Invalid passkey</h1>
    }
    //keep a current state
    const [currentList, setCurrentList] = useState(table1);
    //histroy view
    const [historyStack,setHistoryStack] = useState([]);


    useEffect(() => {
      // Set the initial state to the first table
      const onPop = () => {
        setHistoryStack(stack => {
          if (stack.length > 0) {
            // pop the last list off the stack
            const newStack = [...stack]
            const prevList = newStack.pop()
            // restore the prior view
            setCurrentList(prevList)
            return newStack
          }
          // if stack is empty, let the browser actually go back
          window.removeEventListener('popstate', onPop)
          navigate(-1)
          return []
        })
      }
      window.addEventListener('popstate', onPop)
      return () => window.removeEventListener('popstate', onPop)
    }, [navigate]);


    //handle box click
    const handleBoxClick = (item) =>{
      if (item.type==='end'){
          navigate(`/${passkey}/submit/${item.value}`);
          
      }else if(item.type === "lead") {
        setHistoryStack(stack => [...stack, currentList])
        let next=table1;
        switch (item.value){
          case 'table1':
            setCurrentList(table1);
            break;
          case 'table2':
            setCurrentList(table2);
            next=table2;
            break;
          case 'table3':
            setCurrentList(table3);
            next=table3;
            break;
            case 'table4':
              setCurrentList(table4);
              next=table4;
              break;
            case 'table5':
              setCurrentList(table5);
              next=table5;
              break;
            case 'table6':
              setCurrentList(table6);
              next=table6;
              break;
            case 'table7':
              setCurrentList(table7);
              next=table7;
              break;
            case 'table8':
              setCurrentList(table8);
              next=table8;
              break;
            case 'table9':
              setCurrentList(table9);
              next=table9;
              break;
            case 'table10':
              setCurrentList(table10);
              next=table10;
              break;
            case 'table11':
              setCurrentList(table11);
              next=table11;
              break;
            case 'table12':
              setCurrentList(table12);
              next=table12;
              break;
            case 'table13':
              setCurrentList(table13);
              next=table13;
              break;
            case 'table14':
              setCurrentList(table14);
              next=table14;
              break;
            case 'table15':
              setCurrentList(table15);
              next=table15;
              break;
            case 'table16':
              setCurrentList(table16);
              next=table16;
              break;
            case 'table17':
              setCurrentList(table17);
              next=table17;
              break;
            case 'table18':
              setCurrentList(table18);
              next=table18;
              break;
            case 'table19':
              setCurrentList(table19);
              next=table19;
              break;

          default:
            break;
        }
        setCurrentList(next);
        window.history.pushState({}, '');
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

