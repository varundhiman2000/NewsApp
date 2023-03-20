import React from 'react'
import Loading from "./Spinner-3.gif"
function Spinner() {
  return (
    <div className='text-center'>
      <img src={Loading} alt="Loading" />
    </div>
  )
}

export default Spinner
