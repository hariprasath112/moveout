// src/pages/Submit.jsx
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import '../style.css';
import { itemDetails } from '../components/Data.jsx';

export default function Submit() {
  const navigate = useNavigate();
  const {passkey, value } = useParams();
  const id = Number(value);
  const userkey = passkey;

  const currentItem =
    itemDetails.find(i => i.id === id) || {
      id: 0,
      name: 'error',
      image: 'https://hogfurniture.co/cdn/shop/articles/Home_collection.png',
      weight: 0,
    };

  const [quantity,   setQuantity]   = useState(currentItem.quantity || 1);
  const [weight,     setWeight]     = useState(currentItem.weight);
  const [isEditable, setIsEditable] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // 1) Prevent posting if lookup failed
    if (currentItem.id === 0) {
      alert("Cannot submit: invalid item.");
      return;
    }

    setSubmitting(true);

    // 2) Build the form‐style payload
    const data = new URLSearchParams();
    data.append('user',         userkey);
    data.append('item_id',      currentItem.id);
    data.append('product_name', currentItem.name);
    data.append('quantity',     quantity);
    data.append('weight',       weight);

    try {
      const res = await fetch(
        'https://script.google.com/macros/s/AKfycbzg3qCqQpdm4iNpogvEv8M3Q14D6LygUFHLgNWZyBshrhZNrevWJ3upgnhxtcWWGYs2/exec',
        {
          method: 'POST',
          mode:   'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: data.toString(),
        }
      );
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const json = await res.json();
      if (json.status === 'success') {
        // Navigate back to your categ page (or wherever)
        navigate(`/${userkey}`);
      } else {
        throw new Error(json.message || 'Unknown server error');
      }
    } catch (err) {
      console.error(err);
      alert('Submission failed:\nPlease try again :(');
      setSubmitting(false);
    }
  };

  return (
    <div className="submit-wrapper">
      <Navbar />

      <form className="item-form" onSubmit={handleSubmit}>
        {/* hidden fields */}
        <input type="hidden" name="user"         value={userkey}    readOnly />
        <input type="hidden" name="product_name" value={currentItem.name} readOnly />

        <div className="item-header">
          <h1 className="item-title">{currentItem.name}</h1>
          <img
            src={currentItem.image}
            alt={currentItem.name}
            className="item-image"
          />
        </div>

        <div className="details-container">
          <div className="input-group">
            <label>QTY</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              min="1"
              onChange={e => setQuantity(e.target.value)}
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
                onChange={e => setWeight(e.target.value)}
              />
              <span>LB</span>
            </div>
          </div>
          <span className="edit-text" onClick={() => setIsEditable(true)}>
            edit
          </span>
        </div>

        <div className="slide-button">
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'SUBMIT'}
          </button>
        </div>
      </form>
    </div>
  );
}
