import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/CocktailDetail.css'

function CocktailDetail() {
  const cocktailId = useParams().id
  const [cocktailData, setCocktailData] = useState()

  useEffect(() => {
    if(!cocktailId) return;

    //get cocktail's data by id
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
    .then(res => res.json())
    .then(data => setCocktailData(data))
  }, [cocktailId])
  
  return (
    <main className="cocktail-detail">
      <div className="cocktail-img">

      </div>
      <div className="cocktail-info"></div>
    </main>
  )
}

export default CocktailDetail