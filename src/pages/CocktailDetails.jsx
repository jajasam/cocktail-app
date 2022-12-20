import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/CocktailDetails.css'

function CocktailDetails() {
  const cocktailId = useParams().id
  const [cocktailData, setCocktailData] = useState()
  const [ingredients, setIngredients] = useState([])
  const [measures, setMeasures] = useState([])
  const navigate = useNavigate();

  const { strAlcoholic, strCategory, strDrink, strDrinkThumb, strIBA, strGlass, strInstructions} = cocktailData ? cocktailData[0] : '';


  useEffect(() => {
    if(!cocktailId) return;

    //get cocktail's data by id
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
    .then(res => res.json())
    .then(data => setCocktailData(data.drinks))
  }, [cocktailId])

  useEffect(() => {
      cocktailData?.map(data => {
        for (const [key, value] of Object.entries(data)) {
          //set ingredients
          if (key.match(/^strIngredient/) && value) {
            setIngredients(prev => prev ? [
              ...prev,
              value
            ] : [value]
          )
        }

        //set measures
        if (key.match(/^strMeasure/) && value) {
          setMeasures(prev => prev ? [
            ...prev,
            value
          ] : [value]
        )
      }
    }
  })}, [cocktailData])
  
  return (
    <main>
      <p onClick={() => navigate(-1)} className="go-back-btn"><span>←</span><span>Go back</span></p>
      <div className="cocktail-details">
          <div className="cocktail-img">
            <img src={strDrinkThumb} alt={strDrink} />
          </div>
          <div className="cocktail-info">
            <h1>{strDrink}</h1>
            <p>{strCategory} {strAlcoholic} {strIBA} {strGlass}</p>
            <h2>Ingredients</h2>
            {
              ingredients?.map((ingredient, i) => <p key={i}>{measures[i]} {ingredient}</p>)
            }
            <h2>Preparation</h2>
            <p>{strInstructions}</p>
          </div>
        </div>
    </main>
  )
}

export default CocktailDetails