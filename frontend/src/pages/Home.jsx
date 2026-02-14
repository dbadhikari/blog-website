import React from 'react'

import {SwiperSlide,Swiper} from "swiper/react"
import 'swiper/css'

import {Navigation,Pagination,Autoplay} from "swiper/modules"

const Home = () => {
  return (
    <div>
      <section className='w-full h-[91vh]  relative ' >
        <div className=' absolute inset-0 z-50 text-white flex flex-col gap-0 justify-center items-center'>
      <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
  Explore the world of AI
</h1>

<h3 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
  Time to Dive in
</h3> </div>
<Swiper className='h-full'  autoplay={true} modules={[Autoplay]}>
        <SwiperSlide className='h-full'>
          <img 
          className='h-full w-full object-cover '
          src="https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
         <SwiperSlide>
          <img className='h-full w-full object-cover ' 
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWl8ZW58MHx8MHx8fDA%3D" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='h-full w-full object-cover ' 
          src="https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFpfGVufDB8fDB8fHww" alt="" />
        </SwiperSlide>
         <SwiperSlide>
          <img className='h-full w-full object-cover ' 
          src="https://media.istockphoto.com/id/2207141986/photo/ai-governance-and-responsive-generative-artificial-intelligence-use-compliance-strategy-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=yuakWCY0HoikO0RURJnL-Yn68nLFjTuSklTrpBYlqkc=" alt="" />
        </SwiperSlide>
        
      </Swiper>
      </section>
      <section className='h-[100vh] w-full bg-amber-600'>

      </section>
    </div>
  )
}

export default Home