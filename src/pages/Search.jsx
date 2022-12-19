import { CategoryRounded } from '@material-ui/icons'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Search.css'

function Search() {
  const [results, setResults] = useState()
  const [filterCategories, setFilterCategories] = useState([
    {
      categoryName: 'Categories',
      param: 'c',
      subFilters: [],
      isVisible: false
    },
    {
      categoryName: 'Alcohols',
      param: 'a',
      subFilters: [],
      isVisible: false
    },
    {
      categoryName: 'Glasses',
      param: 'g',
      subFilters: [],
      isVisible: false
    },
    {
      categoryName: 'Ingredients',
      param: 'i',
      subFilters: [],
      isVisible: false
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
    Promise.all(
      filterCategories
      ?.map(filterCategory => 
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${filterCategory.param}=list`)))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => setFilterCategories(prev => 
          prev.map((filterCategoryData, i) => ({
              ...filterCategoryData,
              subFilters: data[i].drinks
            }
          )
        )
      ))
      .catch(err => console.error(err))
  }, [])

  
  function handleFiltersVisibility(categoryToUpdate) {
    // update filters visibility when category is clicked
      setFilterCategories(prev => 
        prev.map(filterCategory => 
        filterCategory.categoryName === categoryToUpdate 
        ? { ...filterCategory, isVisible: !filterCategory.isVisible } 
        : filterCategory
      )
    );
  }

  const filterCategoriesElem  = filterCategories?.map((category, i) => {
      const { categoryName, isVisible, subFilters } = category;

      return <div key={i}>
          <p onClick={() => handleFiltersVisibility(categoryName)}>
            <span>{categoryName}</span>
            <span>⌄</span>
          </p>
          {
            isVisible && 
            subFilters?.map((el, i) => 
            <p key={i}>{Object.values(el)}</p>
            )
          }
        </div>
  })

  return (
    <>
      <section className="search-banner">
          {/* Photo by Kaizen Nguyễn on Unsplah */}  
          <img 
          src={require('../assets/search-banner-2.jpg')} 
          alt="Cocktails"
          />
          {/* Discover a world of flavors */}
      </section>
      <main>
        <section className="search">
          <h1>Cocktails</h1>
        </section>
        <section className="results">
          <div className="filters">
            {
              filterCategoriesElem && 
              filterCategoriesElem
            }
          </div>
          <div className="cocktails">
            <Link to="/cocktails/11007">
              <div className="cocktail"></div>
            </Link>
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