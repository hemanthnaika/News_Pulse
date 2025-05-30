import React from 'react'
import Hero from '../components/hero'
import LatestNews from '../components/LatestNews'
import CategoryNews from '../components/CategoryNews'
import TrendingNews from '../components/TrendingNews'
import NewsCarousel from '../components/NewsCarousel'
import EditorsPicks from '../components/EditorsPicks'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestNews/>
      <TrendingNews/>
      <CategoryNews/>
      <NewsCarousel/>
      <EditorsPicks/>
    </div>
  )
}

export default Home
