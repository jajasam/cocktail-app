import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import '../styles/Home.css'


function Home() {
  const [featuredCocktails, setFeaturedCocktails] = useState(['', '', '', '' , ''])
  const [featuredAlcohols, setFeaturedAlcohols] = useState(['gin', 'vodka', 'rum', 'tequila'])
  const [fruitsBackground, setFruitsBackground] = useState(['strawberries', 'cantaloupe', 'watermelon', 'kiwi', 'mango'])

  const featuredCocktailsElem = featuredCocktails.map((item, i) =>
    <div className="cocktail" key={i}> 
      <img 
        src='https://www.thecocktaildb.com/images/media/drink/svuvrq1441208310.jpg' 
        alt=""
        width="200px"
        height="200px"
      />
      <p className="cocktail-name">Midnight Mint</p>
    </div>
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
        {/* Video by Denys Gromov from Pexels: https://www.pexels.com/video/red-cocktail-preparation-5816529/ */}
        <section className="hero">
          {/* <h1>Discover our cocktails</h1> */}
          <video autoPlay muted loop className="hero">
            <source 
            src={require('../assets/hero-video.mp4')} 
            type="video/mp4" 
            alt="Red Cocktail Preparation" 
            />
          </video>
          {/* Photo by Lefteris kallergis on Unsplash */}
          <img src={require('../assets/mobile-hero.jpg')} alt="Cocktail" height="450px" width="100%" />
        </section>
        <section className="intro">
            <h1>Welcome to <span>the cocktail lab</span></h1>
            <p>Variety of delicious cocktail recipes, ranging from classic cocktails to modern twists on traditional favorites.</p>
            <Link to="/search">Discover cocktails</Link>
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