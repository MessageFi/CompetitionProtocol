import { ConnectButton } from "@rainbow-me/rainbowkit"
import Head from "next/head"
import Nav from "@/components/Nav"
import Overview from "@/components/Overview"
import { useRef, useState } from "react"
import Awards from "@/components/Awards"
import Teams from "@/components/Teams"

const Home = () => {
  const overViewRef=useRef(null)
  const awardsRef = useRef(null)
  const teamsRef = useRef(null)
  return (
    <div >
      <Nav 
      overViewRef={overViewRef}
      awardsRef={awardsRef}
      teamsRef={teamsRef}
      />
      <div ref={overViewRef}>
      <Overview/>
      </div>
      <div ref={awardsRef}>
      <Awards />
      </div>
      <div ref={teamsRef}>
      <Teams />
      </div>
    </div>
  )
}

export default Home
