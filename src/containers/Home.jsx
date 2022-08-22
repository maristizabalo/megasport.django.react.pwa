import React from 'react'
import Layout from '../hocs/Layout'
import { connect } from 'react-redux'
import {get_products_by_arrival} from '../redux/actions/products'
import { useEffect } from 'react'
import Banner from '../components/home/Banner'
import ProductsArrival from '../components/home/ProductsArrival'

const Home = ({get_products_by_arrival, products_arrival}) => {

  useEffect(() => {
    window.scrollTo(0, 0)
    get_products_by_arrival()
  },[])

  return (
    <Layout>
        <h1 className='text-center font-sans text-9xl'>
          <Banner/>
          <ProductsArrival data={products_arrival}/>
        </h1>
    </Layout>
  )
}

const mapStateToProps = state => ({
  products_arrival: state.Products.products_arrival
})

export default connect(mapStateToProps,{
  get_products_by_arrival
})(Home)