import React, { useEffect, useMemo, useState } from 'react';
import apiClient from '../services/api';

const Home = () => {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    apiClient
      .get('/home')
      .then((response) => {
        if (isMounted) {
          setFeed(response.data);
          setError('');
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

  const filters = feed?.filters ?? [];
  const categories = feed?.categories ?? [];
  const promotions = feed?.promotions ?? [];
  const testimonials = feed?.testimonials ?? [];
  const stats = feed?.stats ?? [];
  const hero = feed?.hero ?? {};
  const availableRestaurants = feed?.restaurants ?? [];

  const filteredRestaurants = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return availableRestaurants.filter((restaurant) => {
      const matchesFilter =
        activeFilter === 'all' ||
        (restaurant.tags && restaurant.tags.includes(activeFilter));

      const matchesSearch =
        !normalizedSearch ||
        restaurant.name.toLowerCase().includes(normalizedSearch) ||
        restaurant.specialty.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [availableRestaurants, activeFilter, search]);

  const handleFilter = (key) => {
    setActiveFilter(key);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setActiveFilter('all');
  };

  const greeting = feed?.greeting ?? 'Welcome to Food Delivery Web Pro';

  return (
    <section className="home-surface">
      <div className="hero-card">
        <div className="hero-copy">
          <p className="hero-overline">{hero.tag ?? 'Curated for you'}</p>
          <h1>{greeting}</h1>
          <p>{hero.tagline ?? 'Sign in to unlock curated restaurants and dishes.'}</p>
          <span className="cta-chip">{hero.cta ?? 'Login or register'}</span>
        </div>
        <div className="hero-actions">
          <form className="search-panel" onSubmit={handleSearchSubmit}>
            <input
              className="search-input"
              placeholder="Search for restaurants or dishes"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="search"
            />
            <button type="submit" className="primary mini">
              Search
            </button>
          </form>
          <div className="filter-chips">
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                className={`chip ${activeFilter === filter.key ? 'active' : ''}`}
                onClick={() => handleFilter(filter.key)}
              >
                <span className="chip-label">{filter.label}</span>
                <small>{filter.description}</small>
              </button>
            ))}
          </div>
        </div>
      </div>

      {promotions.length > 0 && (
        <div className="promo-section">
          {promotions.map((promo) => (
            <article className="promo-banner" key={promo.title}>
              <div>
                <p className="promo-tag">{promo.tag}</p>
                <h3>{promo.title}</h3>
                <p>{promo.subtitle}</p>
              </div>
              <button type="button" className="primary promo-cta">
                {promo.cta}
              </button>
            </article>
          ))}
        </div>
      )}

      {stats.length > 0 && (
        <div className="stat-grid">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      )}

      {categories.length > 0 && (
        <section className="category-section">
          <div className="section-heading">
            <div>
              <h2>Popular categories</h2>
              <p>Refine your cravings by cuisine or vibe.</p>
            </div>
            <span className="section-meta">Curated for your area</span>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.name}>
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {loading && <p>Loading feed…</p>}
      {error && <p className="error">{error}</p>}

      {feed && (
        <>
          <section className="section-heading">
            <div>
              <h2>Featured restaurants</h2>
              <p>Hand-picked kitchens ready to dispatch.</p>
            </div>
            <span className="section-meta">{filteredRestaurants.length} matches</span>
          </section>
          <div className="grid restaurant-grid">
            {filteredRestaurants.map((restaurant) => (
              <article className="restaurant-card" key={restaurant.name}>
                <header>
                  <h3>{restaurant.name}</h3>
                  <span>{restaurant.eta}</span>
                </header>
                <p>{restaurant.specialty}</p>
                <div className="restaurant-meta">
                  <span>{restaurant.price}</span>
                  <span>{restaurant.rating} ★</span>
                </div>
              </article>
            ))}
          </div>

          <section className="section-heading">
            <div>
              <h2>Featured dishes</h2>
              <p>Chef-selected bites ready to order.</p>
            </div>
            <span className="section-meta">Fresh today</span>
          </section>
          <div className="grid dish-grid">
            {feed.featured.map((item) => (
              <article className="dish-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </article>
            ))}
          </div>
        </>
      )}

      {testimonials.length > 0 && (
        <section className="testimonial-section">
          <div className="section-heading">
            <div>
              <h2>What people are saying</h2>
              <p>Community highlights from recent diners.</p>
            </div>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.quote}>
                <p>“{testimonial.quote}”</p>
                <footer>
                  <strong>{testimonial.customer}</strong>
                  <span>{testimonial.city}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default Home;
