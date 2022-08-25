import React from 'react'
import Layout from '../../hocs/Layout'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { get_product, get_related_products } from '../../redux/actions/products'
import { useEffect } from 'react'
import { useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import ImageGallery from '../../components/product/ImageGallery'

const product = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    images: [
        {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        // More images...
    ],
    colors: [
        { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
        { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
        { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],
    description: `
      <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    `,
    details: [
        {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
        // More sections...
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductDetails = ({
    get_product,
    get_related_products,
    product
}) => {
    const params = useParams()
    const productId = params.productId

    useEffect(() => {
        get_product(productId)
        get_related_products(productId)
    }, [])

    return (
        <Layout>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                        <ImageGallery photo={product && product.photo} />
                        {/* Product info */}
                        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product && product.name}</h1>

                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl text-gray-900">$ {product && product.price}</p>
                            </div>

                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>

                                <div
                                    className="text-base text-gray-700 space-y-6"
                                    dangerouslySetInnerHTML={{ __html: product && product.description }}
                                />
                            </div>

                            <form className="mt-6">

                                <div className="mt-10 flex sm:flex-col1">
                                    <button
                                        type="submit"
                                        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                                    >
                                        Add to bag
                                    </button>

                                    <button
                                        type="button"
                                        className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                    >
                                        <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                        <span className="sr-only">Add to favorites</span>
                                    </button>
                                </div>
                            </form>

                            <section aria-labelledby="details-heading" className="mt-12">

                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    product: state.Products.product
})


export default connect(mapStateToProps, {
    get_product,
    get_related_products
})(ProductDetails)