import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import '../style.css';
import { useParams } from 'react-router-dom';
import { itemDetails } from '../components/Data.jsx';

function Submit() {

  const { value } = useParams();
  const numvalue = Number(value);
  const currentItem =
    itemDetails.find((item) => item.id === numvalue) || {
      name: "Default Item",
      image: "https://hogfurniture.co/cdn/shop/articles/Home_collection.png",
      weight: 99,
    };
    const [quantity, setQuantity] = useState(1);//change with data?
    const [weight, setWeight] = useState(currentItem.weight);
    const [isEditable, setIsEditable] = useState(false);
  
  return (
    <>
  <div className="submit-wrapper">
      <Navbar />

      <form
        className="item-form"
        action="https://example.com/submit" /* add endpoint */
        method="POST"
      >
        {/* Header: Title on left, Image on right (desktop) */}
        <div className="item-header">
          <h1 className="item-title">{currentItem.name}</h1>
          <img
              src={currentItem.image}
              alt={currentItem.name}
              className="item-image"
            />
        </div>

        {/* Details Section */}
        <div className="details-container">
          <div className="input-group">
            <label>QTY</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>ESTIMATED WEIGHT</label>
            <div className="weight-input">
              <input
                type="number"
                name="weight"
                value={weight}
                disabled={!isEditable}
                onChange={(e) => setWeight(e.target.value)}
              />
              <span>LB</span>
            </div>
          </div>

          <span className="edit-text" onClick={() => setIsEditable(true)}>
            edit
          </span>
        </div>

        {/* Submit Button */}
        <div className="slide-button">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
      </div>
    </>
  );
}

export default Submit;
