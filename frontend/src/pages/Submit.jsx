// src/pages/Submit.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate }            from 'react-router-dom';
import Navbar                                from '../components/Navbar.jsx';
import '../style.css';
import { fetchData, fetchScript } from './api.js';

export default function Submit() {





  const navigate = useNavigate();
  const { passkey, value } = useParams();
  const catId = Number(value);
  const userkey = passkey;

  // categories comes back as:
  // [{ id, name, image_url, subs: [ 'Sub A', 'Sub B', … ] }, …]
  const [categories, setCategories] = useState([]);
  const [loadingData, setLoadingData] = useState(true);


  // script endpoint returns something like { url: 'https://…' }
  const [scriptUrl, setScriptUrl]   = useState('');
  const [loadingScript, setLoadingScript] = useState(true);

  useEffect(() => {
     // only run when loading is complete
     if (!loadingData && !loadingScript) {
       window.scrollTo({
         top: document.documentElement.scrollHeight,
         behavior: 'auto'  // or 'auto' if you don’t want the animation
       });
     }
   }, [loadingData, loadingScript]);
  const weightRef = useRef(null);

  // form state
  const [selection, setSelection] = useState('');
  const [quantity,  setQuantity ] = useState(1);
  const [weight,    setWeight   ] = useState('');
  const [submitting,setSubmitting] = useState(false);




  // after loadingData finishes...
//const firstImage = categories[0]?.image || '';
useEffect(() => {
  // after everything has rendered…
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'    // or 'auto'
  });
}, []);

    
    // 1) fetch categories + subs from your API
  useEffect(() => {
    fetchData()
      .then(data => {
        console.log('sdf fetchData returned:', data); 
        setCategories(data);
      })
      .catch(err => {
        console.error('fetchData error', err);
        alert('Could not load categories.');
      })
      .finally(() => setLoadingData(false));
  }, []);

  // 2) fetch script URL from your API
  useEffect(() => {
    fetchScript()
      .then(({ url }) => {
        console.log('got script endpoint:', url);
        setScriptUrl(url);
      })
      .catch(err => {
        console.error('fetchScript error', err);
        alert('Could not load submission endpoint.');
      })
      .finally(() => setLoadingScript(false));
  }, []);

  // 3) once we know which category we’re on, set a default selection
  const currentCat = categories.find(c => c.id === catId) || null;
  useEffect(() => {
    if (currentCat && currentCat.subs.length && selection === '') {
      setSelection(currentCat.subs[0]);
    }
  }, [currentCat, selection]);

  // 4) focus weight input after data loads
  useEffect(() => {
    if (!loadingData && !loadingScript && weightRef.current) {
      weightRef.current.focus();
    }
  }, [loadingData, loadingScript]);

  // scroll to bottom once everything is in
  useEffect(() => {
    if (!loadingData && !loadingScript) {
      window.scrollTo({ top: document.documentElement.scrollHeight });
    }
  }, [loadingData, loadingScript]);

  if (loadingData || loadingScript) {
    return (
      <div className="submit-wrapper">
        <Navbar />
        <p style={{ padding: '2rem' }}>Loading…</p>
      </div>
    );
  }

  if (!currentCat) {
    return (
      <div className="submit-wrapper">
        <Navbar />
        <p style={{ padding: '2rem' }}>Invalid category.</p>
      </div>
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!weight) {
      alert("Please enter a weight before submitting.");
      return;
    }
    if (!quantity || quantity < 1) {
      alert("Please enter a valid quantity before submitting.");
      return;
    }
    setSubmitting(true);

  const payload = {
      user: userkey,
      category: currentCat.name,
      product_name: currentCat.subs.length ? selection : currentCat.name,
      quantity,
      weight
    };
    try {
      const res  = await fetch(scriptUrl, {
        method: 'POST',
        mode:   'cors',
        //headers: { 'Content-Type': 'application/json' },
        headers:{ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', },
        body:   payload.toString()
      });
if (!res.ok) throw new Error(`Status ${res.status}`);
      const json = await res.json();
      if (json.status === 'success') {
        navigate(`/${userkey}`);
      } else {
        throw new Error(json.message || 'Unknown server error');
      }
    } catch (err) {
      console.error(err);
      alert('Submission failed :( Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="submit-wrapper">
      <Navbar />

      <form className="item-form" onSubmit={handleSubmit}>
        {/* hidden fields */}
        <input type="hidden" name="user"         value={userkey}         readOnly/>
        <input type="hidden" name="item_id"      value={currentCat.id}   readOnly/>
        <input type="hidden" name="product_name" value={currentCat.name} readOnly/>

        <div className="item-header">
          <h1 className="item-title">{currentCat.name}</h1>

          {currentCat.subs.length > 1 && (
            <div className="input-group">
              <select
                value={selection}
                onChange={e => setSelection(e.target.value)}
              >
                {currentCat.subs.map((sub, i) => (
                  <option key={i} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          <img
            src={currentCat.image_url}
            alt={currentCat.name}
            className="item-image"
          />
        </div>

        <div className="details-container">
          <div className="input-group">
            <label>QTY</label>
            <input
              type="number"
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
                value={weight}
                onChange={e => setWeight(e.target.value)}
              />
              <span>LB</span>
            </div>
          </div>
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
