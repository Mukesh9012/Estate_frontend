import React from 'react'
import { assets } from '../assets/assets'

function Teswtimonials() {
    return (
        <div className='m-15' id='testimonial'>
            <div className='flex items-center justify-center content-center mb-15 mt-15'>
                <div className="highlight  mx-2 px-2">
                    <p className='text-4xl font-bold m-2 '>Customer<span className='underline font-normal ml-2 text-3xl'>Testimonials</span></p>
                    <p className='font-extralight'>Real Stories From Those Who Found Home With Us</p>
                </div>
            </div>
            <div className="main flex flex-wrap justify-center items-stretch gap-10">
                <div className="card flex flex-col items-center border border-amber-500 w-70 min-h-90 p-6 shadow-amber-200 shadow-2xl">
                    <img src={assets.profile_img_1} className='h-24 w-24' alt="Aarav Mehta" />
                    <p className='mt-4 font-bold text-lg text-center'>Aarav Mehta</p>
                    <p className='mt-1 text-sm font-light text-center'>Marketing Director</p>
                    <div className='flex mt-4'>
                        <img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" />
                    </div>
                    <p className='mt-5 text-sm text-center'>The Estate team understood exactly what our family needed and guided us to a home we are proud to call our own.</p>
                </div>
                <div className="card flex flex-col items-center border border-amber-500 w-70 min-h-90 p-6 shadow-amber-200 shadow-2xl">
                    <img src={assets.profile_img_2} className='h-24 w-24' alt="Ananya Sharma" />
                    <p className='mt-4 font-bold text-lg text-center'>Ananya Sharma</p>
                    <p className='mt-1 text-sm font-light text-center'>Product Designer</p>
                    <div className='flex mt-4'>
                        <img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" />
                    </div>
                    <p className='mt-5 text-sm text-center'>The property search was clear, thoughtful, and stress-free. I found a beautiful apartment in the right neighborhood.</p>
                </div>
                <div className="card flex flex-col items-center border border-amber-500 w-70 min-h-90 p-6 shadow-amber-200 shadow-2xl">
                    <img src={assets.profile_img_3} className='h-24 w-24' alt="Rohan Iyer" />
                    <p className='mt-4 font-bold text-lg text-center'>Rohan Iyer</p>
                    <p className='mt-1 text-sm font-light text-center'>Business Owner</p>
                    <div className='flex mt-4'>
                        <img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" />
                    </div>
                    <p className='mt-5 text-sm text-center'>From the first viewing to the final paperwork, the team made every step feel organized and personal.</p>
                </div>




            </div>
        </div>

    )
}

export default Teswtimonials
