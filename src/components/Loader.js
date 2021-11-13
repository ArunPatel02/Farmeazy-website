import React from 'react'
import '../css/loader.css'

const Loader = ({loader}) => {
    return (
        <div className={loader===true?"loader active":"loader"}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader
