import { useEffect, useState } from 'react'

import '../styles/Search.css'

function Search() {
  const [results, setResults] = useState()
  const [filters, setFilters] = useState([
    {
      category: 'Categories',
      param: 'c',
      subFilters: []
    },
    {
      category: 'Alcohols',
      param: 'a',
      subFilters: []
    },
    {
      category: 'Glasses',
      param: 'g',
      subFilters: []
    },
    {
      category: 'Ingredients',
      param: 'i',
      subFilters: []
    }
  ])

  useEffect(() => {
      //get random cocktails when there are no filters
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(data => setResults(data.drinks))
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    //set filters 
    filters.map(elem => fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${elem.param}=list`)
    .then(res => res.json())
    .then(data => setFilters(prev => [
      ...prev,
      {
        category: elem.category,
        param: elem.param,
        subFilters: data.drinks
      }
    ]
  )))}, [])

  const filtersElem = filters?.map((filter,i)  => <div key={i}>
    <p>{filter.category}</p>
    {
      filter.subFilters.map((el, i) => <p key={i}>{Object.values(el)}</p>)
    }
  </div>)

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
              {
                filtersElem &&
                filtersElem
              }
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