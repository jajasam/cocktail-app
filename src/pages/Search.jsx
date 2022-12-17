import { useEffect, useState } from 'react'

import '../styles/Search.css'

function Search() {
  const [results, setResults] = useState(null)

  useEffect(() => {
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(data => setResults(data.drinks))
      .catch(err => console.error(err))
  }, []);
  console.log(results)

  return (
    <>
      <section className="search-banner">
          {/* Photo by Kaizen Nguyễn on Unsplah */}  
          <img 
          src={require('../assets/search-banner-2.jpg')} 
          alt="Cocktails"
          />
      </section>
      <main>
        <section className="search">
          <h1>Cocktails</h1>
          <input type="text" placeholder="Rechercher" />
          <select name="Categories" id="">
          </select>
        </section>
        <section className="results">
          <div className="filters">
            <div className="filter">
              Alcohol
            </div>
            <div className="filter">
              Ingredients
            </div>
            <div className="filter">
              Glasses
            </div>
            <div className="filter">
              Category
            </div>
          </div>
          <div className="cocktails">
            <div className="cocktail"></div>
            <div className="cocktail"></div>
            <div className="cocktail"></div>
            <div className="cocktail"></div>
            <div className="cocktail"></div>
            <div className="cocktail"></div>
          </div>
        </section>
    </main>
  </>
  )
}

export default Search