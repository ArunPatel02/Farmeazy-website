import React, { useContext, useEffect, useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, styled } from '@material-ui/core';
import logo from '../asserts/images/logo.png'

import '../css/Header.css'
import { cartContax } from '../context/Cart';
import { Usercontext } from '../context/Userdata';
import Cookies from 'js-cookie';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      fontSize : '1rem',
      background:' var(--secondary-color)'
    },
  }));


const Header = ({productsearch , setsearch}) => {

    const {totalItem} = useContext(cartContax);
    const {getuser} = useContext(Usercontext);

    const [login, setlogin] = useState(false)
    const [username, setusername] = useState('')

   useEffect(() => {
    if(localStorage.getItem('token')){
        setlogin(true)
        getuser().then((data=>{
            console.log(data)
            console.log(localStorage.getItem('token'))
            setusername(data.result.username)
        }))
    }
   } , [getuser])

   const handlelogout = ()=>{
       
       document.querySelector(".usertoggle").classList.remove("active");
       setlogin(false);
   }

    const location =  useLocation()

    const handletoggle = ()=>{
        localStorage.clear();
        document.querySelector(".header_links").classList.toggle("toggle_on");
    }

    const handlemenu = (e)=>{
        const usertoggle = document.querySelector(".usertoggle");
        const user_avatar = document.querySelector(".user_avatar");
        // console.log(user_avatar.getComputedStyle("left"))
        const x = user_avatar.offsetLeft;
        if (window.innerWidth >600) {
            usertoggle.style.left = `${x}px`
        }
        usertoggle.classList.toggle("active")
    }

    const removetoggle = ()=>{
        document.querySelector(".header_links").classList.remove("toggle_on");
        document.querySelector(".usertoggle").classList.remove("active");
    }

    const togglesearch = ()=>{
        document.querySelector(".search").classList.toggle("active");
    }


    return (
        <>
        <div className="header_container">
            <div className="header">
                <div className="left_header">
                    <ul className="header_links">
                        <li className={location.pathname==='/'?"active":"link"} onClick={removetoggle}  ><Link to="/">Home</Link></li>
                        <li className={location.pathname==='/about'?"active":"link"} onClick={removetoggle} ><Link to="/about" >About</Link></li>
                        <li className={location.pathname==='/services'?"active":"link"} onClick={removetoggle} ><Link to="/services">Services</Link></li>
                        <li className={location.pathname==='/shop'?"active":"link"} onClick={removetoggle} ><Link to="/shop">Shop</Link></li>
                        <li className={location.pathname==='/blog'?"active":"link"} onClick={removetoggle} ><Link to="/blog">blog</Link></li>
                        <li className={location.pathname==='/contact'?"active":"link"} onClick={removetoggle} ><Link to="/contact">Contact</Link></li>
                    </ul>
                    <div className="togglem_menu" onClick={handletoggle}>
                    <MenuIcon />
                    </div>
                <div className="logo">
                    <img src={logo} alt="farmeazy" />
                </div>
                </div>
                <div className="right_header">
                    <div className="search_ico" onClick={togglesearch}><SearchIcon /> </div>
                    <div className="cart_ico"><Link to='/cart'><StyledBadge badgeContent={totalItem} color="secondary">
                            <ShoppingCartOutlinedIcon />
                        </StyledBadge></Link> </div>
                    <div className="user_ico">{login?<Avatar className="user_avatar"  src="/broken-image.jpg" onClick={handlemenu} />:<Link to='/login'><ExitToAppOutlinedIcon/></Link>}</div>
                    <div className="contact_detail">
                        <div className="phoneico">
                        <PhoneIcon />
                        </div>
                        <div>
                            <div className="head">call anytime</div>
                            <div className="number">987-654-3210</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="search">
            <input type="text" name="search" id="search_bar" placeholder="search" value={productsearch} onChange={(e)=>setsearch(e.target.value)}/>
        </div>
        <div className="usertoggle">
        <ul className="usermenu">
            <li onClick={removetoggle}>{username}</li>
            {/* <li onClick={removetoggle}>edit profile</li> */}
            <li onClick={removetoggle}><Link to="/orders">your orders</Link></li>
            {/* <li onClick={removetoggle}>setting</li> */}
            <li onClick={handlelogout}>logout</li>
        </ul>
    </div>
        </>
    )
}

export default Header
