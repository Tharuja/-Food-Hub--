import React from "react";
import image from './img/f7.jpg';
import { Link, NavLink ,withRouter} from "react-router-dom";
import jwt_decode from 'jwt-decode';




export class Customer extends React.Component {

  constructor(props){
    super(props);
    this.state={
        username:"",
        address:"",
        mobile:"",
        currerntpassword:"",
        newpassword:"",
        newpassword2:"",


    }
  }

  componentDidMount(){
    if(!localStorage.Token ||  jwt_decode(localStorage.Token).details[0].type!="customer" ||  jwt_decode(localStorage.Token).details[0]._id!=this.props.match.params.id)
     { this.props.history.push('/login')}
     
    fetch('http://localhost:3000/reg/cus_view/'+ this.props.match.params.id,{
      method:"GET",
      headers: {
        "Content-Type": "application/json"
      },
     // body:JSON.stringify(user)
    })
    .then(response =>{ 
     return  response.json();
       // console.log(response.json());
    //  response.json().then(function(user) { console.log(user.type) });
      //window.alert('City added.!')
  
     })
     .then(data =>{
        console.log(data.address);
      
        this.setState({
          username:data.customername,
          address:data.address,
          mobile:data.mobileno,
  
        })   
      
     })
     .catch(function() {
      console.log('error handling');
      window.alert("something is going wrong..!!")
  });
  
  
    }


  savechanges()
  {
    // this.props.history.push('/shop')
var mobcheck=/^\d{10}$/
var test1=mobcheck.test(this.state.mobile);

if(!test1 || this.state.mobile.length!=10 )
{
  window.alert("invalid mobile number");
}
else
{

    const user ={
    
    
      address:this.state.address,
      customername:this.state.username,
      mobileno:this.state.mobile



    }
 
    fetch('http://localhost:3000/reg/cus_edit/'+ this.props.match.params.id,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(user)
    })
    .then(function(response){ 
     // return response.json();
    
     
      console.log(response.json());
    //  response.json().then(function(user) { console.log(user.type) });
      window.alert('profile updated!')

  

  
     })
     .catch(function(error) {
      console.log(error);
      window.alert(error);
  });
   
}

  }

  savepassword(){

    var test3=this.state.newpassword.length<5
    var pwcheck = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
  var test1 = pwcheck.test(this.state.newpassword);
  if(test3 )
  {window.alert("Password is Weak..make sure it has minimum of 5 characters");}
else
{
  if(!test1)
      {window.alert("Password is Weak..make sure it has all valid characters");}
      else
      {
        if(this.state.newpassword!=this.state.newpassword2)
        {window.alert("please confirm your new password correctly")}

        else
        {
          const user={
            currerntpassword:this.state.currerntpassword,
            newpassword:this.state.newpassword

          }
          fetch('http://localhost:3000/reg/cus_changepassword/'+ this.props.match.params.id,{
            method:"PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify(user)
          })
          .then(function(response){ 
            if (response.status === 200) 
          {  window.alert('password changed!!') }
          else if (response.status === 400) 
         {  window.alert('current password is wrong!!') }

           })
           .catch(function(error) {
            console.log(error);
            window.alert(error);
        });
         
        }
      }
}



  }
   render()
   {

       return(
<div>
<div class="container">
    
    <h1 style={{color:'black'}}>Edit My Profile </h1>
    
  	<hr/>
	<div class="row">
     
      <div class=" well col-md-12" style={{backgroundColor:'#94a1fa'}}>
      <hr/>
      
    
  
 
      {/*  <div class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          <i class="fa fa-coffee"></i>
          This is an <strong>.alert</strong>. Use this to show important messages to the user.
       </div> */}
        <h3>Your Info  <span class="glyphicon glyphicon-pencil"></span>  </h3>
        
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">Your Name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value={this.state.username} onChange={event => this.setState({username: event.target.value})}/>
            </div>
          </div>
        
       
          <div class="form-group">
            <label class="col-lg-3 control-label">Address:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text"  value={this.state.address}  onChange={event => this.setState({address: event.target.value})}/>
            </div>
          </div>

         
          <div class="form-group">
            <label class="col-lg-3 control-label">Mobile No:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text"   value={this.state.mobile} onChange={event => this.setState({mobile: event.target.value})}/>
            </div>
          </div>
          {/*
          <div class="form-group">
            <label class="col-lg-3 control-label">Time Zone:</label>
            <div class="col-lg-8">
              <div class="ui-select">
                <select id="user_time_zone" class="form-control">
                  <option value="Hawaii">(GMT-10:00) Hawaii</option>
                  <option value="Alaska">(GMT-09:00) Alaska</option>
                  <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                  <option value="Arizona">(GMT-07:00) Arizona</option>
                  <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                  <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                  <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                  <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                </select>
              </div>
            </div>
          </div> */}


{/*
<h3>Change password<span class="glyphicon glyphicon-pencil"></span>  </h3>
<div class="form-group">
            <label class="col-lg-3 control-label">New password</label>
            <div class="col-lg-8">
              <input class="form-control" type="text"  value={this.state.city}  onChange={event => this.setState({city: event.target.value})}/>
            </div>
          </div>

           <div class="form-group">
            <label class="col-lg-3 control-label">Confirm new password</label>
            <div class="col-lg-8">
              <input class="form-control" type="text"  value={this.state.city}  onChange={event => this.setState({city: event.target.value})}/>
            </div>
          </div>
*/}
         

<hr/>


          
        


    



          
          <div class="form-group">
            <label class="col-md-3 control-label"></label>
            <div class="col-md-12">
              <button type="button" class="btn btn-danger btn-md" onClick={this.savechanges.bind(this)}>
              <span class="glyphicon glyphicon-ok-circle"></span> Save Changes 
                 </button> 
              <span></span>
              <input type="reset" class="btn btn-default" value="Cancel"/>
            </div>
          </div>

                  
<hr/>
              <h3>Change password<span class="glyphicon glyphicon-pencil"></span>  </h3>

                 <div class="form-group">
                <label class="col-lg-3 control-label">Current password</label>
                <div class="col-lg-8">
                     <input class="form-control" type="password"  value={this.state.currerntpassword}  onChange={event => this.setState({currerntpassword: event.target.value})}/>
                </div>
                </div>

                   <div class="form-group">
                <label class="col-lg-3 control-label">New password</label>
                <div class="col-lg-8">
                     <input class="form-control" type="password"  value={this.state.newpassword}  onChange={event => this.setState({newpassword: event.target.value})}/>
                </div>
                </div>

                   <div class="form-group">
                <label class="col-lg-3 control-label">Confirm new password</label>
                <div class="col-lg-8">
                     <input class="form-control" type="password"  value={this.state.newpassword2}  onChange={event => this.setState({newpassword2: event.target.value})}/>
                </div>
                </div>

                 <div class="col-md-12">
              <button type="button" class="btn btn-danger btn-md" onClick={this.savepassword.bind(this)}>
              <span class="glyphicon glyphicon-ok-circle"></span> Change password 
                 </button> 
              
            </div>
        </form>
      </div>
  </div>
</div>
<hr/>






</div>


       );
   }
}
