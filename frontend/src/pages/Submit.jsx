import React, { useState,useRef,useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import '../style.css';
import { sub, itemDetails } from '../components/Data.jsx';

export default function Submit() {

  useEffect(() => {
    // for <html>
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
    // for <body>
    document.body.scrollTop = document.body.scrollHeight;
  }, []);
  const navigate = useNavigate();


  const {passkey, value } = useParams();
  const id = Number(value);
  const userkey = passkey;

  const currentItem =
    itemDetails.find(i => i.id === id) || {
      id: 0,
      name: 'error',
      image: 'https://hariprasath112.github.io/moveout/images/100.jpeg',
      weight: 0,
    };


  const subList = sub.filter(s => s.subof === id);

  // state for dropdown selection, default to first if any
  const [selection, setSelection] = useState(subList[0]?.text || '');

  // normalize to string so we can clear it easily
  const initialWeight = currentItem.weight ? String(currentItem.weight) : "";


  const [quantity,   setQuantity]   = useState(currentItem.quantity || 1);
//  const [weight,     setWeight]     = useState(currentItem.weight);
//  const [isEditable, setIsEditable] = useState(currentItem.weight === "");
  const [submitting, setSubmitting] = useState(false);

  const [weight,   setWeight]     = useState(initialWeight);
  const [isEditable, setIsEditable] = useState(initialWeight === "");

const weightRef = useRef(null);

  // whenever we enter edit-mode, clear & focus
  useEffect(() => {
    if (isEditable && weightRef.current) {
      weightRef.current.value = ""          // optional, dom sync
      weightRef.current.focus();            // drop cursor inside
    }
  }, [isEditable]);



  
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
   data.append('category',      currentItem.name);
    data.append('product_name', selection);
   // data.append('subcategory',   selection);
    data.append('quantity',     quantity);
    data.append('weight',       weight);

    try {
      const res = await fetch(
        'https://script.google.com/macros/s/AKfycbyTXcfnL8Y4ekefbZ8FpoEiGBlfu65hM85TSxm0wuyvqpxESu70oK60ID0G5k-VQ7y-1A/exec',
        
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
        <input type="hidden" name="item_id"     value={currentItem.id} readOnly />
        <input type="hidden" name="product_name" value={currentItem.name} readOnly />

       
       
       
       
       
        <div className="item-header">
          <h1 className="item-title">{currentItem.name}</h1>
          
         {subList.length > 0 && (
          <div className="input-group">
     
            <select
              id="subcat"
              name="subcategory"
              value={selection}
              onChange={e => setSelection(e.target.value)}
            >
              {subList.map((opt,i) => (
                <option key={i} value={opt.text}>
                  {opt.text}
                </option>
              ))}
            </select>
          </div>
        )}

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
                ref={weightRef}
                type="number"
                name="weight"
                value={weight}
                disabled={!isEditable}
                onChange={e => setWeight(e.target.value)}
              />
              <span>LB</span>
            </div>
          </div>
          <span className="edit-text" onClick={() => {setIsEditable(true);}}>
            edit
          </span>
        </div>
        {weight <= 0 && (
  <p style={{ color: 'red', textAlign:'center' }}>
    Please enter a non-zero weight
  </p>
)}

        <div className="slide-button">
          <button type="submit" disabled={submitting || weight <= 0}>
            {submitting ? 'Submitting…' : 'SUBMIT'}
          </button>
        </div>
        
      </form>
    </div>
  );
}