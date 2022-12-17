import { useEffect, useState } from 'react';

import '../styles/Home.css'


function Home() {
  const [featuredCocktails, setFeaturedCocktails] = useState(['', '', '', '' , ''])
  const [featuredAlcohols, setFeaturedAlcohols] = useState(['gin', 'vodka', 'rum', 'tequila'])
  const [fruitsBackground, setFruitsBackground] = useState(['strawberries', 'cantaloupe', 'watermelon', 'kiwi', 'mango'])

  const featuredCocktailsElem = featuredCocktails.map(item =>
    <div className="cocktail"> 
      <img 
        src='https://www.thecocktaildb.com/images/media/drink/svuvrq1441208310.jpg' 
        alt=""
        width="200px"
        height="200px"
      />
      <p className="cocktail-name">Midnight Mint</p>
    </div>
    )

  const featuredAlcoholsElem = featuredAlcohols.map(item =>
  <div> 
    <img src={`https://www.thecocktaildb.com/images/ingredients/${item}.png`} alt={item} width="150px" height="150px" />
    <svg viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="100" />
    </svg>
    <p>{item}</p>
  </div>
  )

  const fruitsBackgroundElems = fruitsBackground.map(ingredient => <img src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`} alt={ingredient} width="100px" height="100px" className="fruit" />)

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
        </section>
        <main>
          <section className="intro">
            <h1>Welcome to the cocktail lab</h1>
            <p>Variety of delicious cocktail recipes, ranging from classic cocktails to modern twists on traditional favorites.</p>
            <button>Discover cocktail</button>
          </section>
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