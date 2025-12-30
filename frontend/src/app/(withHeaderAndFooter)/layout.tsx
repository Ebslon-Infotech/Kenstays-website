"use client"

import Footer from '@/layouts/footer'
import Header from '@/layouts/header'
import React from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <FollowUs/> */}
      <Header />
      {children}
      <Footer />
    </>
  )
}
