export default function Home() {
  return (
    <div 
      className="font-sans w-screen h-screen bg-cover bg-top bg-left bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/bg%201-01.svg)'
      }}
    >
      {/* Navigation Menu */}
      <nav className="absolute top-20 right-8 md:right-16 3xl:right-48 z-10 font-arabic">
        <ul className="flex space-x-4 md:space-x-10 3xl:space-x-16 text-right">
          <li>
            <a href="#education" className="text-gray-700 hover:text-white hover:bg-gray-900 hover:scale-105 font-regular transition-all duration-300 px-2 py-1 3xl:px-8 3xl:py-4 rounded-md text-base 4xl:text-xl">
              آموزش
            </a>
          </li>
          <li>
            <a href="#about" className="text-gray-700 hover:text-white hover:bg-gray-800 hover:scale-105 font-regular transition-all duration-300 px-2 py-1 3xl:px-8 3xl:py-4 rounded-md text-base 4xl:text-xl">
              درباره
            </a>
          </li>
          <li>
            <a href="#contact" className="text-gray-700 hover:text-white hover:bg-gray-800 hover:scale-105 font-regular transition-all duration-300 px-2 py-1 3xl:px-8 3xl:py-4 rounded-md text-base 4xl:text-xl">
              تماس با ما
            </a>
          </li>
          <li>
            <a href="#services" className="text-gray-700 hover:text-white hover:bg-gray-800 hover:scale-105 font-regular transition-all duration-300 px-2 py-1 3xl:px-8 3xl:py-4 rounded-md text-base 4xl:text-xl">
              خدمات
            </a>
          </li>
          <li>
            <a href="#home" className="text-gray-700 hover:text-white hover:bg-gray-800 hover:scale-105 font-regular transition-all duration-300 px-2 py-1 3xl:px-8 3xl:py-4 rounded-md text-base 4xl:text-xl">
              خانه
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Main Content */}
      <div className="absolute top-120 right-12 md:right-20 3xl:right-56 transform -translate-y-1/2 text-right max-w-xs md:max-w-lg 2xl:max-w-4xl 3xl:max-w-7xl font-arabic">
          <h1 className="font-bold text-teal-700 mb-4 3xl:mb-12 leading-tight text-4xl 4xl:text-6xl">
            سفر شما به سوی سلامت روان
            <br />
           .از امروز شروع میشود
          </h1>
        <p className="text-gray-700 mb-6 3xl:mb-12 leading-relaxed font-regular text-base 4xl:text-2xl">
          .در محیطی امن و حرفه ای همراه شما هستیم 
        </p>
        <div className="flex flex-col sm:flex-row gap-2 3xl:gap-8 justify-center">
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-light px-4 py-2 3xl:px-12 3xl:py-6 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-lg text-base 4xl:text-2xl">
            رزرو نوبت
          </button>
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-light px-4 py-2 3xl:px-12 3xl:py-6 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-lg text-base 4xl:text-2xl">
            مشاوره فوری
          </button>
        </div>
      </div>
    </div>
  );
}
