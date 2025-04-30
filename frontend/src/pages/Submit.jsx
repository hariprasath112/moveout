import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import '../style.css';
import { useParams } from 'react-router-dom';
import { itemDetails } from '../components/Data.jsx';

function Submit() {

  const { value } = useParams();
  const numvalue = Number(value);
  const currentItem =
    itemDetails.find(i => i.id === id) || {
      id: 0,
      name: 'error :(',
      image: 'https://hariprasath112.github.io/moveout/images/90.jpeg',
      weight: 0,
    };
    const [quantity, setQuantity] = useState(1);//change with data?
    const [weight, setWeight] = useState(currentItem.weight);
    const [isEditable, setIsEditable] = useState(false);
  
  return (
    <>
  <div className="submit-wrapper">
      <Navbar />

      <form className="item-form" onSubmit={handleSubmit}>
        {/* hidden fields */}
        <input type="hidden" name="user"         value={userkey}    readOnly />
        <input type="hidden" name="item_id"     value={currentItem.id} readOnly />
        <input type="hidden" name="product_name" value={currentItem.name} readOnly />

        <div className="item-header">
          <h1 className="item-title">{currentItem.name}</h1>
          <img
            src={currentItem.image}
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
