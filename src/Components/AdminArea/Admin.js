import React, {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';
import Icon from '../../Icon';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Product from '../Products/Product';



export default function Admin() {
  const [biz_name, setBiz_name] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [biz_id, setBiz_id] = useState('');
  const [firstname, setFirstname] = useState('');

const history = useNavigate()

const [matches, setMatches] = useState(
  window.matchMedia("(min-width: 820px)").matches
)


useEffect(() => {
  
  window
  .matchMedia("(min-width: 820px)")
  .addEventListener('change', e => setMatches( e.matches ));
}, []);
// ==============================Big Screen===============================================
const [productStatus,setProductStatus] = useState(false);
// ==============================Small Screen===============================================
const [menuStatusSmall,setMenuStatusSmall] = useState(false);
const [productStatusSmall,setProductStatusSmall] = useState(false);

useEffect(() => {
  const readLocation = window.location.pathname
  if(readLocation.match(/product.*/) ){
    setProductStatus(true);
    setProductStatusSmall(true);
  
  }
},[])

  useEffect(() => {

    const token = JSON.parse(localStorage.getItem('token'))
  
    const refreshToken = async (token) => {
      try {
          const response = await axios.get('http://localhost:8000/api/profile/',{
            headers: {
              Authorization : `Bearer ${token}`
            
            },
          
          })
        setBiz_id(response.data.biz_id);
          setBiz_name(response.data.biz_name);
          setImage(response.data.image);
          setEmail(response.data.email);
          setFirstname(response.data.firstname);
          
      } catch (error) {
          if (error.response) {
            console.log(error.response.data);
             history("/login");
              
          }
      }
  }
  
  
   refreshToken(token);
   
  }, [image, history]);

  const Logout = async (email) => {
    try {
        await axios.post('http://localhost:8000/api/logout',
      {email: email},
      {headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }},
        
        )
        localStorage.removeItem('token')
        history("/");
       
    } catch (error) {
        console.log(error);
    }
}


  return (
    <Container>
      {/* =================Big Screen=============== */}
        {matches && (

      <>
<Header>

<NavLink 

onClick={() =>{

            }}
            to={`/${firstname}/${biz_id}`} 
          >Home
 </NavLink>

 <AddProductBTN
            onClick={() =>{
              setProductStatus(true) ;
            
            }}
          
          >
            Add Product
</AddProductBTN>

      <LogoutWrap onClick={() =>{Logout(email)}} >
          Logout
      </LogoutWrap>


      </Header>
<Greeting>

  <ImgWrap>
  <img src={`http://localhost:8000/storage/user/image/${image}`}  alt={`${biz_name}`} />
  </ImgWrap>
  <h1>
  Welcome Back: {biz_name}
  </h1>
</Greeting>
<ContentMain>
<ProductWrap show = {productStatus}  > 
      <Product/>
</ProductWrap>
</ContentMain>


</>
        )}
{/* ====================Small Screen===Max-Width 820px===================== */}
{!matches && (
<>
<HeaderSmall show = {menuStatusSmall}>

<IconCloseWrap

onClick={() =>{
  setMenuStatusSmall(false);

}}
>
<Icon icon="cross" size={20} color="white" />
</IconCloseWrap>
<NavLink onClick={() =>{
             // setScreenStatusSmall(true) ;
            }}
            to={`/${firstname}/${biz_id}`} 
          >Home
 </NavLink>
 <AddProductBTNSmall
            onClick={() =>{
              setProductStatusSmall(true) ;
              setMenuStatusSmall(false);
            }}
          
          >
            Add Product
</AddProductBTNSmall>
 <LogoutWrapSmall onClick={() =>{Logout(email)}} >
          Logout
      </LogoutWrapSmall>
</HeaderSmall>
<GreetingSmall>
          <ImgWrapSmall>
          <img src={`http://localhost:8000/storage/user/image/${image}`}  alt={`${biz_name}`} />
  
  </ImgWrapSmall>
<h1>Welcome Back: {biz_name}</h1>

<IconOpenWrap
            
            onClick={() =>{
              setMenuStatusSmall(true) ;
            
            }}
            >
          <Icon icon="cross" size={20} color="white" />
          </IconOpenWrap>

</GreetingSmall>
<ContentMainSmall>
<ProductWrapSmall show = {productStatusSmall}  > 
      <Product/>
</ProductWrapSmall>
</ContentMainSmall>
      
</>)}
    </Container>
  )
}
// ==========================Big Screen========================
const Container = styled.div`
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
bottom:0;
right:0;
overflow-x:hidden;
overflow-y:hidden;
background:navy;


`

const NavLink = styled(Link)`  
color:#fff;
text-decoration:none;
width:8%
hight:3.5%
border-radius:8px;
box-shadow: 0 10px 50px #000;
padding:.9%;
outline:none;
cursor:pointer;
border:none;
background:blue;
margin-left:1%;
`

const ContentMain = styled.div`
position:absolute;
top:10%;
width: 90%;
height:90%;
margin-left: 5%;
box-shadow: 0 10px 50px #000;
background:navy;
z-index: 1;
overflow-y: scroll;
overflow-x: hidden;

`

const LogoutWrap = styled.button`
width:10%;
height:60%;
// position:absolute;
// top:2%;
// right:2%;
background:#fff;
cursor:pointer;


`

const Header = styled.div`
background:rgb(76, 0, 130);
box-shadow: 0 10px 50px #000;
position:sticky;
top:0;
 z-index:100;
width:100%;
height:10%;
margin-left: 0%;
margin-bottom: 10%;
border-radius: 1%;
display:flex;
align-items:center;
justify-content:space-between;
@media (max-width:820px) {
  width:90%;
  height:10%;

}

`

const Greeting = styled(Header)`
position:absolute;
top:11%;
z-index:2;
margin-left:40%;
width:50%;
color:#fff;
background:rgb(7, 0, 130);
display:flex;
align-items:center;
justify-content:space-between;
text-transform:uppercase;
@media (max-width:820px) {
  width:50%;
  height:10%;

}

`
const ImgWrap = styled.div`

width: 10% ;
height: 90%;
border-radius: 50%;
margin-top: 0%;
img{
  width: 100%;
  height: 100%;
  border-radius: 100%;

}

`

const AddProductBTN = styled.button`
width:8%
hight:3.5%
border-radius:8px;
box-shadow: 0 10px 50px #000;
padding:.9%;
color:#fff;
outline:none;
cursor:pointer;
border:none;
background:blue;
margin-left:1%;
transition: all .3s linear;
transform: ${props => props.show ? 'translateX(120%)': 'translateX(0)'};

&:hover{
  opacity:.5;
  transform:scale(1.05);
}
`

const ProductWrap = styled.div`
width:90%;
transition: all .3s linear;
z-index:30;
position:absolute;
top:10%;
transform: ${props => props.show ? 'translateX(0)': 'translateX(120%)'};
`
// ================Small Screen===========================================
const ContentMainSmall = styled.div`
position:absolute;
top:10.1%;
width:90%;
height:87%;
margin-left: 5%;
margin-right: 5%;
box-shadow: 0 10px 50px #000;
background:navy;
z-index: 1;
overflow-y: scroll;
overflow-x: hidden;
@media (max-width:820px) {
  width:90%;
  height:87%;

}
`

const HeaderSmall = styled.div`
background:rgb(76, 0, 130);
box-shadow: 0 10px 50px #000;
position:absolute;
top:2%;
right:0;
bottom:0;
z-index:100;
width:45%;
height:80%;
border-radius: 1%;
display:flex;
flex-direction:column;
overflow-Y:scroll;
align-items:start;
justify-content:space-around;
transition: all .3s linear;
transform: ${props => props.show ? 'translateX(0)': 'translateX(100%)'};
`
const IconOpenWrap = styled(MenuIcon)`
position:absolute;
top:20%;
right:4%;
corsor:pointer;
`
const IconCloseWrap = styled(CloseIcon)`
position:absolute;
top:0%;
right:8%;
corsor:pointer;
color:white;
`

const GreetingSmall = styled.div`
position:absolute;
top:0%;
z-index:1;
width:100%;
height:10%;
color:#fff;
background:rgb(7, 0, 130);
display:flex;
align-items:center;
justify-content:center;
text-transform:uppercase;

h1{
  font-size: .8rem; 
}
`
const ImgWrapSmall = styled.div`
position:absolute;
top:4%;
left:2%;
width: 15% ;
height: 90%;
border-radius: 50%;
margin-top: 0%;
img{
  width: 100%;
  height: 100%;
  border-radius: 100%;

}

`

const LogoutWrapSmall = styled.button`
width:100%;
height:6%;
right:2%;
background:#fff;
cursor:pointer;


`

const AddProductBTNSmall = styled.button`
width:8%
hight:3.5%
border-radius:8%;
box-shadow: 0 10px 50px #000;
padding:.9%;
color:#fff;
outline:none;
cursor:pointer;
border:none;
background:blue;
margin-left:1%;
transition: all .3s linear;
transform: ${props => props.show ? 'translateX(120%)': 'translateX(0)'};

&:hover{
  opacity:.5;
  transform:scale(1.05);
}

`
const ProductWrapSmall = styled.div`
width:90%;
transition: all .3s linear;
z-index:30;
position:absolute;
top:10%;
transform: ${props => props.show ? 'translateX(0)': 'translateX(120%)'};
`