import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'
import Box from '../components/Box.jsx'
import '../style.css'
import { Users, categ
 } from '../components/Data.jsx'

function Categ() {
    const {passkey} = useParams()
    const navigate    = useNavigate()
    const userData = Users[passkey]
    
    if (!userData) {
        return <h1>Invalid passkey</h1>
    }
    //keep a current state
    // const [currentList, setCurrentList] = useState(table1);
    // //histroy view
    // const [historyStack,setHistoryStack] = useState([]);


//     useEffect(() => {
      
//       // Set the initial state to the first table
//       const onPop = () => {
//         setHistoryStack(stack => {
//           if (stack.length > 0) {
//             // pop the last list off the stack
//             const newStack = [...stack]
//             const prevList = newStack.pop()
//             // restore the prior view
//             setCurrentList(prevList)
//             return newStack
//           }
//           // if stack is empty, let the browser actually go back
//           window.removeEventListener('popstate', onPop)
//           navigate(-1)
//           return []
//         })
//       }
//       window.addEventListener('popstate', onPop)
//       return () => window.removeEventListener('popstate', onPop)
//     }, [navigate]);
//     //handle box click

// useEffect(() => {
//   // find the element that actually scrolls on all browsers
//   const scroller = document.scrollingElement
//                 || document.documentElement
//                 || document.body;
//   // jump right back to the top
//   scroller.scrollTop = 0;
//   scroller.scrollLeft = 0;
// }, [currentList]);

//     const handleBoxClick = (item) =>{
//       if (item.type==='end'){
//           navigate(`/${passkey}/submit/${item.value}`);
          
//       }else if(item.type === "lead") {
//         setHistoryStack(stack => [...stack, currentList])
//         let next=table1;
//         switch (item.value){
//           case 'table1':
//             setCurrentList(table1);
//             break;



//           default:
//             break;
//         }
//         setCurrentList(next);
        

//         window.history.pushState({}, '');
//         //window.scrollTo({ top: 0, behavior: 'smooth' });
//         }
//     };
   
  const handleBoxClick = (item) => {
    // each top-level item is type:"end", so just fire off submit URL
    navigate(`/${passkey}/submit/${item.value}`);
  };


  return (
    <>
    <Navbar />
    <h2>&ensp;You are at {userData.name}</h2>
    <div className="grid-container">
        {categ.map((item) => (
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

