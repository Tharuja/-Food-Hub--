import React from "react";
import {BrowserRouter as Router,Route,Redirect ,Link,browserHistory,withRouter} from "react-router-dom"; 
import jwt_decode from 'jwt-decode';

import logo  from"./img/logo.jpg"

export class Navbar extends React.Component {

    editprofile()
    {
       this.props.history.push('/acc')
  
    }
 logout(){
  // this.props.authed=false 
   //localStorage.clear();
   localStorage.removeItem('Token');
  // this.props.history.push('/login');
 }
  deleteme(id)
  {
   const user ={
       _id:id
       }


    fetch('http://localhost:3000/reg/deactivateacc/',{
      method:"PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(user)
    })

    .then(function(response){ 
      if (response.status === 200) {
        window.alert('profile deactivated!');
        localStorage.removeItem('Token');

      }
     })

     .catch(function(error) {
      console.log(error);
      window.alert(error);

  });

  
  }

  wakeupme(id)
  {
   const user ={
      _id:id
      }


   fetch('http://localhost:3000/reg/wakeupacc/',{
     method:"PUT",
     headers: {
       "Content-Type": "application/json"
     },
     body:JSON.stringify(user)
   })

   .then(function(response){ 
     if (response.status === 200) {
       window.alert('profile Activated!')
       localStorage.removeItem('Token');
     }
    })

    .catch(function(error) {
     console.log(error);
     window.alert(error);
 });
  }

   render()
   {
    
    let listitem

    if (localStorage.Token) {

      var decoded = jwt_decode(localStorage.Token);
      
    if(decoded.details[0].type=="shop owner" && decoded.details[0].shopstatus=="Active")
    {
       
      listitem =  <ul class="nav nav-tabs navbar-right">
      <li class="dropdown">
         <a class="dropdown-toggle" data-toggle="dropdown" href="#"> <span class="glyphicon glyphicon-user"></span> {decoded.details[0].shop_owner_name}</a>
         <ul class="dropdown-menu">
            <li><a href="#"><Link to={"/shop/"+ decoded.details[0]._id}>View My Shop</Link></a></li>
            <li><a href="#"><Link to={"/acc/"+ decoded.details[0]._id}>Shop Details</Link></a></li>
            <li><a href="#"><Link to={"/del/"+ decoded.details[0].shop_id}>My Drivers </Link></a></li>
            <li><a href="#"  data-toggle="modal" data-target="#deactivate" >Deactivate my account </a></li>

            
            

            <div class="dropdown-divider"></div>  
            <li><a href="/login"  onClick={this.logout.bind(this)}><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>
         </ul>
      </li>
      <li class="nav-item">
         <Link to={"/invoice/"+ decoded.details[0].shop_id}>Invoices</Link>
      </li>
      <li><a href="#"><Link to={"/realshow/"+ decoded.details[0].shop_id}>My Food Items</Link></a></li>
   </ul>
    }
   //status no
else if(decoded.details[0].type=="shop owner" && decoded.details[0].shopstatus=="Deactive")
{
   listitem =  <ul class="nav nav-tabs navbar-right">
      <li class="dropdown">
         <a class="dropdown-toggle" data-toggle="dropdown" href="#"> <span class="glyphicon glyphicon-user"></span> {decoded.details[0].shop_owner_name}</a>
         <ul class="dropdown-menu">
            <li><a href="#"><Link to={"/shop/"+ decoded.details[0]._id}>View My Shop</Link></a></li>
            <li><a href="#"><Link to={"/acc/"+ decoded.details[0]._id}>Shop Details</Link></a></li>
            <li><a href="#"><Link to={"/del/"+ decoded.details[0].shop_id}>My Drivers </Link></a></li>
            <li><a href="#" onClick={() => this.wakeupme(decoded.details[0]._id)} >Activate my account </a></li>
            <div class="dropdown-divider"></div>  
            <li><a href="/login"  onClick={this.logout.bind(this)}><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>
         </ul>
      </li>
      <li class="nav-item">
         <Link to={"/invoice/"+ decoded.details[0].shop_id}>Invoices</Link>
      </li>
      <li><a href="#"><Link to={"/realshow/"+ decoded.details[0].shop_id}>My Food Items</Link></a></li>
   </ul>
    }        

    else
    {
     listitem = <ul class="nav nav-tabs navbar-right">
     <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#"> <span class="glyphicon glyphicon-user"></span> {decoded.details[0].customername} </a>
        <ul class="dropdown-menu">
           <li><a href="#"><Link to={"/customer/"+ decoded.details[0]._id}>Account Details</Link></a></li>
           <div class="dropdown-divider"></div>  
           <li><a href="/login"  onClick={this.logout.bind(this)}><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>
        </ul>
     </li>
  </ul>  
    } 

  }


  else {
      listitem = 
                 <ul class="nav nav-tabs navbar-right"> 
                  <li class="nav-item">
                  <Link to={"/login"}> Shop login</Link>
                   </li>
                   <li class="nav-item">
                  <Link to={"/cus_login"}> Customer login</Link>
                   </li>
                   </ul>;
  }
 return(


  <nav class="navbar navbar-default" style={{"box-shadow": "0 7px 7px -10px black", "background-color": "#ffffff"}}>
  <div class="container-fluid">

  <div class="modal fade" id="deactivate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLabel">WARNING!!</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <h3> Are you sure to deactivate your  account?? </h3>
                      </div>
                      <div class="modal-footer">

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                        <button type="submit" onClick={() => this.deleteme(decoded.details[0]._id)} class="btn btn-primary">Yes</button>


                      </div>
                    </div>
                  </div>
                </div>


  <div>FOODHUB</div>
  <img src="https://i.ibb.co/fxhBdkJ/orange.png" width="35px" />
    <div class="navbar-header">
    </div>
    <ul class="nav nav-tabs ">
      <li class="nav-item"  ><Link to={"/"}>Home</Link></li>
      {/* <li class="nav-item"><Link to={"/home"}>Shops and items</Link></li> */}
    </ul>
    {listitem}
  </div>
</nav>

      //   <div >  
      //   <div class="row">
      //     <div class="container-fluid">
      //       <nav  class="navbar navbar-inverse   navbar-fixed-top" style={{fontFamily:"Lucida Console"}}>    
                      
                      
                      
                      
      //                 <div class="navbar-header">
      //                       <img src={logo} style={{width: 100, height: 60}}  />   
      //                           <a class="navbar-brand" href="#"> F O O D  H U B</a>
      //                 </div>
      //                 <ul class="nav nav-tabs ">
      //                     <li class="nav-item"  ><Link to={"/"}>Home</Link></li>
      //                     <li class="nav-item"><Link to={"/home"}>Shops and items</Link></li>
      //                 </ul>
      //                 {listitem}
      //      </nav>
      //     </div>
      //   </div>
      // </div>






       );
   }
}


export default withRouter(Navbar)
