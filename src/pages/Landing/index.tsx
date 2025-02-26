import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


const Landing = () => {
  

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-pink-600 text-white">
      <div className="text-center">
      <LazyLoadImage
      src="/image/mingle.png"
      alt="Mingle Logo"
      effect="blur"
      placeholderSrc="/image/mingle-xs.png" // Optional placeholder
      className="w-40 h-40 mx-auto mb-6 drop-shadow-xl"
    />
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Mingle</h1>
        <p className="text-lg mb-6 max-w-md mx-auto">
          Find your perfect match and start meaningful connections with people
          who share your interests.
        </p>
        {/* <button className="bg-white text-pink-600 px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-pink-100 transition">
          Get Started
        </button> */}
      </div>
    </div>
    </>
  )
}

export default Landing
