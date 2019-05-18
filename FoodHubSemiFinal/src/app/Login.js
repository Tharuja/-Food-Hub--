import React from "react";
import {BrowserRouter as Router,Route,Redirect ,browserHistory,withRouter} from "react-router-dom"; 

import {Acc}from "./Acc"
import mywall from "./img/tharu.jpg";


 var a;

 

export class Login extends React.Component {
   constructor(props){
       super(props);
       this.state={
           email:'',
           password:'',
           signupemail:'abc',
           signuppassword:'def',
           signuppasswordtwo:'',
           signupname:'',
           signupaddress:'',
           signupmobile:'',
           signuptype:'customer',
           signupaltemail:'',
           signupcode:'',
           auth:false,
           
           
           

       }
       //this.onSignUpSubmit=this.onSignUpSubmit.bind(this);
      
   }
   
   componentDidMount(){
    
  if(localStorage.Token)
  { 
        
    this.props.history.push('/')
  }
   }  


   firstclickshow(e){
    e.preventDefault();
    const a=this.refs.emailref.value;
    console.log("clicked ")
    console.log(a)

    
    var emailcheck=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var test2=emailcheck.test(this.state.signupemail);
    var test4=emailcheck.test(this.state.signupaltemail);
    var test3=this.state.signuppassword.length<5
      var pwcheck = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    var test1 = pwcheck.test(this.state.signuppassword);
    
  
    if(!test2)
    {window.alert("invalid email");
   // inputEmail4.style.border="1px solid red";
 }

    else
    {
    if(test3)
    {window.alert("Password is Weak..make sure it has minimum of 5 characters");}
     else
     {
      if(!test1)
      {window.alert("Password is Weak..make sure it has all valid characters");}
      else
      {
         if(this.state.signuppassword!=this.state.signuppasswordtwo)
         {window.alert("please confirm your password correctly")}
         else
     {    
    /*   if(this.state.signupcode!="123FH&456$")
       {window.alert("please check your email and enter the verification code")}
       else
       { 
         */
     
      
    console.log(this.state);
    const user ={
      email:this.state.signupemail,
      pass:this.state.signuppassword,
      name:this.state.signupname,
      address:this.state.signupaddress,
      mobile:this.state.signupmobile,
    
  
      code:this.state.signupcode
    }
   
    fetch('http://localhost:3000/reg/abc',{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(user)
    })
    .then(function(response){ 
     // return response.json();
     if (response.status === 200) {
      console.log("ok");
      console.log(response.json());
    //  response.json().then(function(user) { console.log(user.type) });
      window.alert('Signed up successfully..!')

  } else if (response.status === 400) 
    {
      console.log("damn");
      window.alert('Email Exist..Use another email..!')
  }   
 else if (response.status === 500) 
    {
      console.log("damn");
      window.alert('Sign up failed...Please fill all correctly !')
  }  
  
     })
     .catch(function() {
      console.log('error handling');
      window.alert("something is going wrong..!!")
  });
   
}
     

}
}
}

   }
   /*
   onSignUpSubmit(){
    
      console.log(this.state);
      const user ={
        email:this.state.signupemail,
        pass:this.state.signuppassword
      }
     
      fetch('http://localhost:3000/reg/abc',{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
      })
      .then(function(response){ 
        return response.json();   
       })
       .then(function(data){ 
        
        console.log(data)
       });

    

   }
*/

   onEmailChange(event){
    this.setState({
      signupemail:event.target.value
    });


   }

   
   onAltEmailChange(event){
    this.setState({
      signupaltemail:event.target.value
    });
   }

   onPasswordChange(event){
     this.setState({
       signuppassword:event.target.value
     });
   }
   onPasswordtwoChange(event){
    this.setState({
      signuppasswordtwo:event.target.value
    });
  }
   onNameChange(event){
    this.setState({
      signupname:event.target.value
    });
   }

   onAddressChange(event){
    this.setState({
      signupaddress:event.target.value
    });
   }
   onMobileChange(event){
    this.setState({
      signupmobile:event.target.value
    });
   }
   onType1Change(event){
    this.setState({
      signuptype:"customer"
    });
   }
   onType2Change(event){
    this.setState({
      signuptype:"shop owner"
    });
   }
   onType3Change(event){
    this.setState({
      signuptype:"deliverer"
    });
   }

   onCodeChange(event){
    this.setState({
      signupcode:event.target.value
    });
   }



   signin(e){
       e.preventDefault();
       console.log(this.state.email);
       console.log(this.state.password);



       const user ={
            
        email:this.state.email,
        password:this.state.password
      }
      e.preventDefault();
      fetch("http://localhost:3000/reg/getuser",{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
      })
      .then(res => res.json()).then(data =>{
        if(data.success){
          window.alert('Login successfull!')
              this.props.history.push('/') //redirect
              this.setState({
               auth:true
             })
             localStorage.setItem('Token',data.Token)
             console.log(localStorage.Token)
              this.props.checkauth()
        }else{
          console.log("damn");
          window.alert('Login Failed!')
        }
      })
      //{   
         // if (response.status === 200) {
         //     console.log("ok");
          //    console.log(response.json()
          //  );
          //    localStorage.setItem('user', response.token);
            

            

            //  response.json().then(function(user) { console.log(user.type) });
            //  window.alert('Login successfull!')
             // this.props.history.push('/') //redirect
            //  this.setState({
             //   auth:true
             // })
             // this.props.checkauth()


         /* } else {
              console.log("damn");
              window.alert('Login Failed!')
         // }
     // })*/
 
      .catch(function() {
          console.log('error handling');
      });
     
    
   }
   getemail(event){
this.setState({
    email: event.target.value
})
   }


   verifyemail(e){
    e.preventDefault();
    var emailcheck=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var test2=emailcheck.test(this.state.signupemail);
    if(!test2)
    {window.alert("invalid email");
   // inputEmail4.style.border="1px solid red";
 }

    else{
    const user ={
            
      email:this.state.signupemail,
      altemail:this.state.signupaltemail
    }
    e.preventDefault();
    fetch("http://localhost:3000/reg/verifyemail",{
     method:"POST",
     headers: {
       "Content-Type": "application/json"
     },
     body:JSON.stringify(user)

   })

   .then(function(response){ 
    // return response.json();
    if (response.status === 400) {
     console.log("use another email");
     console.log(response.json());
   //  response.json().then(function(user) { console.log(user.type) });
     window.alert('Email Exist..Use another email..!')

 } else if (response.status === 200) 
   {
     console.log("damn");
     window.alert('Sending the email....check your email')
 }   
 
    })

   .catch(function() {
       console.log('error handling');
   });
  
  }
}
   


   
    render(){

      
        return(
          <div class="fluid"  style={{backgroundImage: "url(" + mywall + ")" , backgroundSize:"100%" , backgroundRepeat:"no-repeat",backgroundPosition:"fixed"}}>

            {/* <div class="row well"><br/><br/> <div class="col-md-3"></div><div class="col-md-7">
            <h1 style={{color:"#031730"}}>Log in first to get the experience of Food Hub</h1>
            <h1 style={{color:"#031730"}}>~~~~~~~Im a Shop Owner~~~~~~</h1>


            </div>

            </div> */}
          <div  class="row " >
          <div class="col-md-2">
          </div>
                <div class="col-md-4">
                             
                        
                        <form>
                          <div class=" well"  style={{border:'2px solid #0991F0',backgroundColor:'#031730', boxShadow:'2px 2px 2px #0991F0'}}  >
                          <div class="row">
                        <div class="form-group col-md-8 ">
                            <label for="exampleInputEmail1" style={{color:'white'}}>Email</label>
                           <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input type="email"  onChange={(event) => this.getemail(event)}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>

                            </div>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your information with anyone else.</small>

                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-8">
                            <label for="exampleInputPassword1" style={{color:'white'}}>Password</label>
                            <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input type="password" onChange={event => this.setState({password: event.target.value})} class="form-control" id="exampleInputPassword1" placeholder="Password"/>

                       </div>
               
                       <a href="/forgetpw">Can't remember password..?</a>
                        </div>
                        </div>
                         <div class="row">
                        <div class="col-xs-2">
                        <br/>
                       <button type="submit" onClick={this.signin.bind(this)} class="btn btn-primary">Sign In</button>
                       </div>
                            </div> 
                            <div class="row">                 
                        <div class="col-xs-12">
                        <br/>
        
        <p style={{color:'white'}}>No account? Then sign up here <span></span>
              <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleSignup">
         Sign up
       </button>
       </p>
       </div>
       </div>
       
               </div> 
                              
                        </form>
                        
<br/><br/><br/>


        
          <div class="modal fade"  id="exampleSignup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Sign up  here</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

    


  
      <form onSubmit={this.onSignUpSubmit}>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputEmail4">Email</label>
        <input type="email" class="form-control" onChange={(event)=>this.onEmailChange(event)} value={this.state.signupemail} id="inputEmail4" placeholder="abc@gmail.com" ref="emailref"/>
      </div>

       <div class="form-group col-md-6">
      
      </div>

      <div class="form-group col-md-6">
        <label for="inputPassword4">Password</label>
        <input type="password" class="form-control" id="inputPassword14" onChange={(event)=>this.onPasswordChange(event)} value={this.state.signuppassword} placeholder="123ABcd"/>
        <small  class="form-text text-muted">password should be with minimum of 5 characters and includes numbers,capital and simple letters  </small>

      </div>

       <div class="form-group col-md-6">
        <label for="inputPassword4">Confirm Password</label>
        <input type="password" class="form-control" id="inputPassword4" onChange={(event)=>this.onPasswordtwoChange(event)} value={this.state.signuppasswordtwo} placeholder="123ABcd"/>

      </div>
    
    </div>
    <div class="form-group">
      <label for="inputAddress">Your Name</label>
      <input type="text" class="form-control"  onChange={(event)=>this.onNameChange(event)} value={this.state.signupname} id="inputAddress" placeholder="k.m.t.sandeepanie" />
    </div>
    <div class="form-group">
      <label for="inputAddress2">Address</label>
      <input type="text" class="form-control" onChange={(event)=>this.onAddressChange(event)} value={this.state.signupaddress} id="inputAddress2" placeholder="2A,molpe road,katubadda"/>
    </div>
    <div class="form-row">
     
   {/*   <div class="form-group col-md-4">
        <label for="inputState">State</label>
        <select id="inputState" class="form-control ">
          <option selected>Customer</option>
          <option>Shop owner</option>
        </select>
      </div>
        */}

{/*
<div class="form-check-inline ">
  <label class="form-check-label">
    <input type="radio" onChange={(event)=>this.onType3Change(event)} value={this.state.signuptype} class="form-check-input" name="optradio"/>Deliverer
  </label>
</div>
*/}    
      <div class="form-group col-md-7">
        <label for="inputZip">Mobile number</label>
        <input type="text" class="form-control" onChange={(event)=>this.onMobileChange(event)} value={this.state.signupmobile} id="inputZip"/>
        <small  class="form-text text-muted">Please enter a valid mobile number</small>

      </div>

       
       <div class="form-group col-xs-10">
     
      <div class="alert alert-danger" role="alert">
      Please <a href="#" class="alert-link" onClick={this.verifyemail.bind(this)}>click here</a>to verify your email
      </div>
      </div>
      
       
      <div class=" col-xs-7">
        <label for="inputZip">Verification code</label>
        <input type="text" class="form-control" onChange={(event)=>this.onCodeChange(event)} value={this.state.signupcode} id="inputCode"/>
        <small  class="form-text text-muted">Please enter the verification code which we have sent to your email </small>
      </div>
      
      
      
    </div>
  
    
  </form>


      </div>
      <div class="modal-footer">

     
     

    
      
       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit"  onClick={this.firstclickshow.bind(this)}  class="btn btn-primary">Sign Up</button>

        
      </div>
    </div>
  </div>
</div>

                        


               
                      
                 
              </div> 
              <div class="col-md-6">
              <br/>
              <h1 style={{color:"#EEECEC", fontFamily:"bold" ,textShadow:" -1px 0 black, 0 5px black, 1px 0 black, 0 -1px black"}}>Log in first to get the <br/><br/> experience of Food Hub<br/><br/>as a Shop Owner</h1>
           </div>
              
             
         </div>
         <hr/>
         </div>
            
    );

    
    }
}
export default withRouter(Login)