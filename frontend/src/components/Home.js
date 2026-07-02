import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';

const Home = () => {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    apiClient
      .get('/home')
      .then((response) => {
        if (isMounted) {
          setFeed(response.data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Please login to see the home feed.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="home-surface">
      <div className="hero-card">
        <h1>{feed?.greeting ?? 'Welcome to Food Delivery Web Pro'}</h1>
        <p>{feed?.hero?.tagline ?? 'Sign in to unlock curated restaurants and dishes.'}</p>
        <span className="cta-chip">{feed?.hero?.cta ?? 'Login or register'}</span>
      </div>
      {loading && <p>Loading feed…</p>}
      {error && <p className="error">{error}</p>}
      {feed && (
        <>
          <h2>Popular restaurants</h2>
          <div className="grid">
            {feed.restaurants.map((restaurant) => (
              <article className="restaurant-card" key={restaurant.name}>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.specialty}</p>
                <span>{restaurant.eta}</span>
              </article>
            ))}
          </div>
          <h2>Featured dishes</h2>
          <div className="grid">
            {feed.featured.map((item) => (
              <article className="dish-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
