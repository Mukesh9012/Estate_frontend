import React from 'react'
import { assets } from '../assets/assets'

function About() {
  return (
    <div className="justify-center items-center p-15" id="about">
      <div className="about justify-center items-center flex gap-5">
        <div className="my-6 mx-2">
          <p className="text-black text-4xl font-bold left-4 relative">
            About <span className="text-amber-700 text-2xl">Our Brand</span>
          </p>
          <p>Passionate About Properties, Dedicated to Your Vision</p>
        </div>
      </div>

      <div className="imageanddata flex justify-center items-center gap-10 my-7 mx-5">
        <div className="image h-1/3 w-1/3">
          <img src={assets.brand_img} alt="Our brand" />
        </div>

        <div className="data grid grid-cols-2 gap-7 font-serif">
          <div className="w-60"><p className="font-bold text-2xl">10+</p><p>Years of Experience</p></div>
          <div className="w-60"><p className="font-bold text-2xl">12+</p><p>Projects Completed</p></div>
          <div className="w-60"><p className="font-bold text-2xl">20+</p><p>Mn. Sq. Ft. Delivered</p></div>
          <div className="w-60"><p className="font-bold text-2xl">25+</p><p>Ongoing Projects</p></div>

          <div className="w-125 col-span-2">
            <p>Passionate about properties and dedicated to your vision.</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About
