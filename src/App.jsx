import React from 'react'
import { useGlobalContext } from './context'

// components
import Navbar from './Navbar'
import CartContainer from './CartContainer'
// items

function App() {
	const { isLoading, isError } = useGlobalContext()
	if (isLoading) {
	  return (
	    <div className='loading'>
	      <h1>Loading...</h1>
	    </div>
	  )
	}
	if (isError) {
		return (
			<div className='loading'>
				<h1>Something went wrong...</h1>
			</div>
		)
	}
	return (
		<main>
			<Navbar />
			<CartContainer />
		</main>
	)
}

export default App
