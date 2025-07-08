// src/pages/Categ.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate }      from 'react-router-dom';
import Navbar                           from '../components/Navbar.jsx';
import Box                              from '../components/Box.jsx';
import { fetchUsers, fetchData }       from './api';
import '../style.css';

export default function Categ() {
  const { passkey } = useParams();
  const navigate    = useNavigate();

  const [users,      setUsers]      = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');

  useEffect(() => {
    // load users.csv
  //   fetch('/users.csv')
  //     .then(res => res.text())
  //     .then(text => {
  //       const map = {};
  //       text.trim().split('\n').slice(1).forEach(line => {
  //         const [id, name] = line.split(',');
  //         if (id && name) map[id.trim()] = name.trim();
  //       });
  //       setUsers(map);
  //     })
  //     .catch(() => setUsers({}));

  //   // load data.csv
  //   fetch('/data.csv')
  //     .then(res => res.text())
  //     .then(text => {
  //       const lines = text.trim().split('\n').slice(1);
  //       const cats  = lines.map(line => {
  //         const [id, image, text] = line.split(',');
  //         return { id: Number(id), image: image.trim(), text: text.trim() };
  //       }).filter(c => c.id);
  //       setCategories(cats);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, []);
  fetchUsers()
      .then(rows => {
        // rows is an array of { id: '1234', name: 'Some Location' }
        const map = rows.reduce((m,u) => {
          m[u.id] = u.name;
          return m;
        }, {});
        setUsers(map);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load user');
      });

    // 2) load your categories
    fetchData()
      .then(rows => {
        // rows is [{ name: 'Bathroom', subs: [...] }, …]
        setCategories(rows);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load categories');
      })
      .finally(() => setLoading(false));
  }, []);


  if (loading || users === null) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="loginContainer">
          <p>Loading…</p>
        </div>
      </div>
    );
  }

    if (error) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div className="loginContainer">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  const locationName = users[passkey];
  if (!locationName) {
    return <h1 style={{ padding: '2rem' }}>Invalid passkey</h1>;
  }

  return (
    <>
      <Navbar />
      <h2>&ensp;You are at {locationName}</h2>
      <div className="grid-container">
        {categories.map((cat, idx) => (
          <Box
            key={idx}
            image={cat.image_url}  
            text={cat.name}
            onClick={() => navigate(`/${passkey}/submit/${cat.id}`)}
          />
        ))}
      </div>
    </>
  );
}
