import React from 'react'
import Heading from './Heading'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Heading/>
    <Outlet/>
    </>
  )
}

export default Layout