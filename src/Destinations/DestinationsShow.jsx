import { useLoaderData } from "react-router-dom"

export function DestinationsShow() { 
  const destinations = useLoaderData()

  console.log(destinations)
  
  return ( 
    <h1>Hello</h1>
  )
}