import React from 'react'
import {Link} from 'react-router-dom'

function Header(){
    return (
        <header className="border-b p-3 flex justify-between items-center">
            <Link to="/" className="font-bold">
                Test React App - Cynthia
            </Link>   
        </header>
    )
}

export default Header