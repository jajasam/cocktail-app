import '../styles/Footer.css'

function Footer() {
  return (
    <footer>
      <img 
          src={require('../assets/footer-img.jpg')} 
          alt="Cocktails view from top" 
          width="70%"
          height="400px"
        />
        <img 
          src={require('../assets/logo.png')} 
          alt="Cheers! Logo" 
          width="100px"
          height="100px"
        />
        <p>Discover a world of flavors</p> 
    </footer>
  )
}

export default Footer