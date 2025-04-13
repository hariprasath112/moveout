import React from 'react'
import { useParams } from 'react-router-dom'
import { Users } from './Users.jsx'
import Navbar from '../components/Navbar.jsx'
import Box from '../components/Box.jsx'
import '../style.css'

function Categ() {
    const {passkey} = useParams()
    const userData = Users[passkey]
    if (!userData) {
        return <h1>Invalid passkey</h1>
    }
    const boxList = [
      { id: 1, image: "https://hogfurniture.co/cdn/shop/articles/Home_collection.png", text: "Category 1" },
      { id: 2, image: "https://static01.nyt.com/images/2019/09/25/dining/20cans1/merlin_160763178_71b0d03a-d399-4d81-ac4d-db47d601c594-videoSixteenByNineJumbo1600.jpg", text: "Category 2" },
      { id: 3, image: "https://www.eliteyachtcharters.com.au/wp-content/uploads/2013/06/IMG_0753.jpg", text: "Category 3" },
      { id: 4, image: "https://t4.ftcdn.net/jpg/03/64/41/07/360_F_364410756_Ev3WoDfNyxO9c9n4tYIsU5YBQWAP3UF8.jpg", text: "Category 4" },
      { id: 5, image: "https://m.media-amazon.com/images/I/71wwwTV16iL.jpg", text: "Category 5" },
      { id: 6, image: "https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg", text: "Category 6" },
      { id: 7, image: "https://m.media-amazon.com/images/I/61xxhaeUKIL.jpg", text: "Category 7" }
    ];
  return (
    <>
    <Navbar />
    <h2>&ensp;You are at {userData.name}</h2>
    <div className="grid-container">
        {boxList.map((item) => (
          <Box key={item.id} image={item.image} text={item.text} />
        ))}
      </div>
    </>
  )
}

export default Categ