import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/CocktailDetails.css'

function CocktailDetails() {
  const cocktailId = useParams().id
  const [cocktailData, setCocktailData] = useState()
  const [ingredients, setIngredients] = useState([])
  const [ingredientsImgs, setIngredientsImgs] = useState([])
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

  useEffect(() => {
    setIngredientsImgs(ingredients?.map((ing, i) => 
      <img src={`https://www.thecocktaildb.com/images/ingredients/${ing}-Small.png`} alt={ing} key={i} width="30px" height="30px" />
    ))
  }, [ingredients])
  
  return (
    <main>
      <p onClick={() => navigate(-1)} className="go-back-btn"><span>←</span><span>Go back</span></p>
      <div className="cocktail-overview">
        <div>
          <h1>{strDrink}</h1>
          <p className="tags">
            <span>{strCategory}</span>
            <span>{strAlcoholic}</span>
            {
              strIBA &&
              <span>{strIBA}</span>
            }
            <span>{strGlass}</span>
          </p>
        </div>
        <div className="ingredients-imgs">
          {
            ingredientsImgs && ingredientsImgs
          }
        </div>
      </div>
      <div className="cocktail-details">
          <div className="cocktail-img">
            <img src={strDrinkThumb} alt={strDrink} />
          </div>
            <div className="execution">
              <div className="ingredients">
                <h2>Ingredients</h2>
                {
                  ingredients?.map((ingredient, i) => 
                    <p key={i}>
                      <span>{measures[i] || ''}</span> 
                      <span>{ingredient}</span>
                    </p>)
                }
              </div>
              <div>
                <h2>Preparation</h2>
                <p>{strInstructions}</p>
              </div>
            </div>
        </div>
    </main>
  )
}

export default CocktailDetails