// src/pages/Submit.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate }            from 'react-router-dom';
import Navbar                                from '../components/Navbar.jsx';
import '../style.css';

export default function Submit() {





  const navigate = useNavigate();
  const { passkey, value } = useParams();
  const catId = Number(value);
  const userkey = passkey;

  // data.csv state
  const [categories, setCategories] = useState([]);
  const [subItems,   setSubItems]   = useState([]);
  const [loadingData, setLoadingData] = useState(true);



  // script.csv state
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

  // form state
  const [selection, setSelection] = useState('');
  const [quantity,  setQuantity ] = useState(1);
  const [weight,    setWeight   ] = useState('');
  const [submitting,setSubmitting] = useState(false);




  // after loadingData finishes...
const firstImage = categories[0]?.image || '';
useEffect(() => {
  // after everything has rendered…
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'    // or 'auto'
  });
}, []);


  const weightRef = useRef(null);

  // 1) load data.csv
  useEffect(() => {
    
    fetch('/data.csv')
      .then(res => res.text())
      .then(text => {
        const rows = text.trim().split('\n').slice(1);
        const cats = [], subs = [];
        rows.forEach(line => {
          const cols = line.split(',');
          const id   = Number(cols[0]);
          if (!id) return;
          cats.push({ id, image: cols[1].trim(), text: cols[2].trim() });
          cols.slice(3).forEach(cell => {
            if (cell.trim()) subs.push({ subof: id, text: cell.trim() });
          });
        });
        setCategories(cats);
        setSubItems(subs);
      })
      .catch(err => console.error('data.csv load error', err))
      .finally(() => setLoadingData(false));
  }, []);

  // 2) load script.csv
  useEffect(() => {
    fetch('/script.csv')
     .then(res => {
       if (!res.ok) throw new Error(`HTTP ${res.status}`);
       return res.text();
     })
     .then(text => {
       const lines = text
         .trim()
         .split(/\r?\n/)
         .map(l => l.trim())
         .filter(l => l);
       // first non-empty line is our URL:
       if (lines.length > 0) {
         setScriptUrl(lines[0]);
       }
     })
      .catch(err => console.error('script.csv load error', err))
      .finally(() => setLoadingScript(false));
  }, []);

  // default dropdown selection
  const mySubs = subItems.filter(s => s.subof === catId);
useEffect(() => {
  if (mySubs.length > 0 && selection === '') {
    setSelection(mySubs[0].text);
  }
}, [mySubs, selection]);

  useEffect(() => {
    if (weightRef.current) {
      weightRef.current.focus();
    }
  }, [loadingData, loadingScript]);

  if (loadingData || loadingScript) {
    return (
      <div className="submit-wrapper">
        <Navbar/>
        <p style={{ padding: '2rem' }}>Loading…</p>
      </div>
    );
  }

  // find current category or fallback
  const currentCat = categories.find(c => c.id === catId) || {
    id:    0,
    text:  'error',
    image: firstImage
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (currentCat.id === 0) {
      alert("Cannot submit: invalid item.");
      return;
    }
    if (!weight) {
      alert("Please enter a weight before submitting.");
      return;
    }
    if (!quantity || quantity < 1) {
      alert("Please enter a valid quantity before submitting.");
      return;
    }
    setSubmitting(true);

    const data = new URLSearchParams({
      user:         userkey,
      category:     currentCat.text,
      product_name: mySubs.length ? selection : currentCat.text,
      quantity,
      weight
    });

    try {
      const res  = await fetch(scriptUrl, {
        method: 'POST',
        mode:   'cors',
        headers:{ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', },
        body:   data.toString()
      });
      console.log(scriptUrl, data.toString());
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const json = await res.json();
      if (json.status === 'success') {
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
        <input type="hidden" name="user"         value={userkey}         readOnly/>
        <input type="hidden" name="item_id"      value={currentCat.id}   readOnly/>
        <input type="hidden" name="product_name" value={currentCat.text} readOnly/>

        <div className="item-header">
          <h1 className="item-title">{currentCat.text}</h1>

          {mySubs.length > 0 && (
            <div className="input-group">
              <select
                value={selection}
                onChange={e => setSelection(e.target.value)}
              >
                {mySubs.map((s,i) => (
                  <option key={i} value={s.text}>{s.text}</option>
                ))}
              </select>
            </div>
          )}

          <img
            src={currentCat.image}
            alt={currentCat.text}
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
