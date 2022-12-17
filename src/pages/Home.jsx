import '../styles/Home.css'

function Home() {
  return (
    <div>
        {/* Video by Denys Gromov from Pexels: https://www.pexels.com/video/red-cocktail-preparation-5816529/ */}
        <div className="hero">
          <video autoPlay muted loop>
            <source 
            src={require('../assets/hero-video.mp4')} 
            type="video/mp4" 
            alt="Red Cocktail Preparation" 
            />
          </video>
        </div>
        <main>
            <section>Cocktail of the day</section>
        </main>
    </div>
  )
}

export default Home