import { useEffect, useState, useRef, createRef } from 'react';
import { Link } from 'react-router-dom'

import '../styles/Home.css'


function Home() {
  const [featuredCocktails, setFeaturedCocktails] = useState(['', '', '', '' , ''])
  const [featuredAlcohols, setFeaturedAlcohols] = useState(['gin', 'vodka', 'rum', 'tequila'])
  const [fruitsBackground, setFruitsBackground] = useState(['strawberries', 'cantaloupe', 'watermelon', 'kiwi', 'mango'])
  const elementsRef = useRef(featuredCocktails.map(() => createRef()));
  const [isVisible, setIsVisible] = useState([])

  window.addEventListener('scroll', () => {
    const elementsVisibility = elementsRef.current.map((el, i )=> {
      const top = el.current.getBoundingClientRect().top
      return top >= 0 + window.innerHeight && top - window.innerHeight <= window.innerHeight
    })

    setIsVisible(elementsVisibility)
  })


  const featuredCocktailsElem = featuredCocktails.map((item, i) => {
    return <div className="cocktail" key={i}> 
      <img 
        src='https://www.thecocktaildb.com/images/media/drink/svuvrq1441208310.jpg' 
        alt='{item}'
        width="200px"
        height="200px"
        ref={elementsRef.current[i]}        
        className={isVisible[i] ? 'visible' : ''}
      />
      <p className="cocktail-name">Midnight Mint</p>
    </div>
  })

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
        {/* Video by Denys Gromov from Pexels: https://www.pexels.com/video/red-cocktail-preparation-5816529/ */}
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
              <div className="cocktails">
                {
                  featuredCocktailsElem &&
                  featuredCocktailsElem
                }
              </div>
              <div className="fruits">
                {
                  fruitsBackgroundElems &&
                  fruitsBackgroundElems
                }
              </div>
            </section>
            <video muted loop className="cocktails">
              <source 
              src={require('../assets/cocktails.mp4')} 
              type="video/mp4" 
              alt="Cocktails" 
              />
            </video>
            <section className="featured-alcohols">
              {
                featuredAlcoholsElem && featuredAlcoholsElem
              }
            </section>
        </main>
    </div>
  )
}

export default Home