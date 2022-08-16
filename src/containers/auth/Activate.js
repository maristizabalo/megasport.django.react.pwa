import React from 'react'
import Layout from '../../hocs/Layout'
import { Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'
import { activate } from '../../redux/actions/auth'
import { Rings } from 'react-loader-spinner'

const Activate = ({activate, loading}) => {

  const params = useParams()
  const [activated, setActivated] = useState(false)

  const activate_account = () => {
    const uid = params.uid
    const token = params.token
    activate(uid, token)
    setActivated(true)
  }

  if (activated && !loading)
    return <Navigate to='/' />

  return (
    <Layout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto'>

          { loading ? <button
            type="button"
            className="inline-flex items-center mt-12 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Rings
              type="Oval"
              color="#fff"
              width={20}
              height={20}
            />
          </button> : <button
            onClick={activate_account}
            type="button"
            className="inline-flex items-center mt-12 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Activar cuenta
          </button>
          }

        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading
})


export default connect(mapStateToProps, {
  activate
})(Activate)