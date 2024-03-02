import React from 'react'
import loadingspinner from '../../assets/image/loadingspin.gif';
const Loadingspin = () => {
  return (
    <img src={loadingspinner} alt="" className="d-block m-auto" style={({width : '200px'})}/>
    )
}

export default Loadingspin