import React from 'react'

import {SwiperSlide,Swiper} from "swiper/react"
import 'swiper/css'
import 'swiper/css/pagination'
import {Navigation,Pagination,Autoplay} from "swiper/modules"

const Home = () => {
  return (
    <div>
      <section className='w-full h-[91vh]  relative ' >
        <div className=' absolute inset-0 z-50 text-white flex flex-col gap-0 justify-center items-center'>
      <h1 className="text-8xl font-bold ">
  Explore the world 
</h1>

<h3 className="text-6xl font-bold ">
  Time to Dive in
</h3> </div>
<Swiper className='h-full' pagination={true}   autoplay={true} modules={[Pagination,Autoplay]}>
        <SwiperSlide className='h-full'>
          <img 
          className='h-full w-full object-cover '
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
         <SwiperSlide>
          <img className='h-full w-full object-cover ' 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1642&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='h-full w-full object-cover ' 
          src="https://plus.unsplash.com/premium_photo-1664303745597-44572ee427dc?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
         <SwiperSlide>
          <img className='h-full w-full object-cover ' 
          src="https://plus.unsplash.com/premium_photo-1691735665916-cf31006dffe3?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='h-full w-full object-cover ' 
          src="https://media.istockphoto.com/id/1374221694/photo/fulari-gumba-from-drone-point-of-view-nepal.jpg?s=1024x1024&w=is&k=20&c=p9B1WaQRD6QgA9799WN2XkhyK9nmCvafjCo_P8pEw3A=" alt="" />
        </SwiperSlide>
      </Swiper>
      </section>
      <section className='h-[100vh] w-full bg-amber-600'>

      </section>
    </div>
  )
}

export default Home