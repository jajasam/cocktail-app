import { useEffect, useState, useRef, createRef } from 'react';
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'

import '../styles/Home.css'


function Home() {
  const [randomCocktails, setRandomCocktails] = useState(['', '', '', '', '', ''])
  const [featuredAlcohols, setFeaturedAlcohols] = useState(['gin', 'vodka', 'rum', 'tequila'])
  const [fruitsBackground, setFruitsBackground] = useState(['strawberries', 'cantaloupe', 'watermelon', 'kiwi', 'mango'])
  const elementsRef = useRef(randomCocktails?.map(() => createRef()));
  const [isVisible, setIsVisible] = useState([])


  window.addEventListener('scroll', debounce(() => {
      const observer = new IntersectionObserver(entries => 
        entries.map((entry, i) => {
          setIsVisible(prev => ({ ...prev, [i] : entry.isIntersecting }))
        }), {threshold: 1})

        elementsRef?.current.map(el => observer.observe(el.current))
  }, 25))


  useEffect(() => {
    //Get random cocktails from The Cocktail DB API
    Promise.all(randomCocktails?.map(() =>
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')))
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(data => data.map((singleCocktailData, i) => {
      const { idDrink, strDrink, strDrinkThumb } = singleCocktailData.drinks[0]
      return setRandomCocktails(prev => 
        prev.map((prevEl, prevI) => 
          prevI == i ? {idDrink, strDrink, strDrinkThumb} : prevEl
      ))
    }))
  }, [])

  const randomCocktailsElem = randomCocktails?.map((item, i) => 
    <Link to={`/cocktails/${item.idDrink}`} key={i} className="cocktail">
      <img 
        src={item.strDrinkThumb} 
        alt={item.strDrink}
        width="200px"
        height="200px"
        ref={elementsRef.current[i]}        
        className={isVisible[i] ? 'visible' : ''}
      />
      <p className="cocktail-name">{item.strDrink}</p>
    </Link>
  )

  const featuredAlcoholsElem = featuredAlcohols.map((item, i) =>
  <div key={i}> 
    <img src={`https://www.thecocktaildb.com/images/ingredients/${item}.png`} alt={item} width="75px" height="75px" />
    <svg viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="100" />
    </svg>
    <p>{item}</p>
  </div>
  )

  const fruitsBackgroundElems = fruitsBackground.map((ingredient, i) => <img src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`} alt={ingredient} width="100px" height="100px" className="fruit" key={i} />)

  return (
    <div>
        <section className="hero">          
          {/* Photo by Lefteris kallergis on Unsplash */}
          <img src={require('../assets/mobile-hero.jpg')} alt="Cocktail" height="450px" width="100%" />
          <section className="intro">
            <div>
              <h1>Welcome to <span>the cocktail lab</span></h1>
              <p>Variety of delicious cocktail recipes, ranging from classic cocktails to modern twists on traditional favorites.</p>
              <Link to="/search">Discover cocktails</Link>
            </div>
          </section>
        </section>
        <main>
            <section className="featured-cocktails">
              <h2>Discover a world of <span>flavors</span></h2>
              <div className="cocktails">
                {
                  randomCocktailsElem &&
                  randomCocktailsElem
                }
              </div>
              <div className="fruits">
                {
                  fruitsBackgroundElems &&
                  fruitsBackgroundElems
                }
              </div>
            </section>
            {/* <section className="featured-alcohols">
              {
                featuredAlcoholsElem && featuredAlcoholsElem
              }
            </section> */}
        </main>
    </div>
  )
}

export default Home