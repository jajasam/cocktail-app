import '../styles/Search.css'

function Search() {
  return (
    <div className="search-banner">
        {/* Photo by Anil Sharma on Unsplah */}
        <img 
         src={require('../assets/search-banner.jpg')} 
         alt="Cocktails"
        />
  
    </div>
  )
}

export default Search