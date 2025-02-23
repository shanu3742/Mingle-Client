


const Landing = () => {
  

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-pink-600 text-white">
      <div className="text-center">
        <img
          src="/image/mingle.png"
          alt="Mingle Logo"
          className="w-40 h-40 mx-auto mb-6 drop-shadow-xl"
        />
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Mingle</h1>
        <p className="text-lg mb-6 max-w-md mx-auto">
          Find your perfect match and start meaningful connections with people
          who share your interests.
        </p>
        <button className="bg-white text-pink-600 px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-pink-100 transition">
          Get Started
        </button>
      </div>
    </div>
    </>
  )
}

export default Landing
