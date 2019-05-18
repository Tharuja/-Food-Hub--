import React from "react";
import person from './img/person.png';
import jwt_decode from 'jwt-decode';




export class Del extends React.Component {

  constructor(props){
    super(props);
    this.state={
  
        signupemail:'abc',
        signuppassword:'def',
        signuppasswordtwo:'',
        signupname:'',
        signupaddress:'',
        signupmobile:'',
        deliverers:[],
        signupcode:'',
        currentdel:''
    
    }
  }

  onEmailChange(event){
    this.setState({
      signupemail:event.target.value
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

   register(e){
    e.preventDefault();
    
    var emailcheck=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var test2=emailcheck.test(this.state.signupemail);
  
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

    console.log(this.state);
    const user ={
      email:this.state.signupemail,
      pass:this.state.signuppassword,
      name:this.state.signupname,
      address:this.state.signupaddress,
      mobile:this.state.signupmobile,
      shopid:this.props.match.params.id,
      code:this.state.signupcode
    
    }
   
    fetch('http://localhost:3000/reg/del',{
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
      window.alert('Registered successfully..!')
      window.location.reload()

  } else if (response.status === 400) 
    {
      console.log("damn");
      window.alert('Email Exist..Use another email..!')
  }   
 else if (response.status === 500) 
    {
      console.log("damn");
      window.alert('Register is  failed...Please fill all correctly !')
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

   onCodeChange(event){
    this.setState({
      signupcode:event.target.value
    });
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
    
    }
    e.preventDefault();
    fetch("http://localhost:3000/reg/del_verifyemail",{
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


   componentDidMount(){
    
      if(!localStorage.Token ||  jwt_decode(localStorage.Token).details[0].type!="shop owner" ||  jwt_decode(localStorage.Token).details[0].shop_id!=this.props.match.params.id)
       { this.props.history.push('/login')}
    let initialdels=[]
    
    fetch('http://localhost:3000/reg/showdel/'+ this.props.match.params.id ,{
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
      initialdels = data.map((del) => {
        return del
      
     })
     console.log(initialdels)
     this.setState({
       deliverers:initialdels
     })
    })
     .catch(function() {
      console.log('error handling');
      window.alert("something is going wrong..!!")
  });
     
  
    }
    deleteme(){

      console.log(this.state.currentdel);
  
      const driver={
        
          _id: this.state.currentdel
         
        }
       
            fetch('http://localhost:3000/reg/driver_delete',{
              method:"POST",
              headers: {
                "Content-Type": "application/json"
              },
              body:JSON.stringify(driver)
            })
            .then(function(response){ 
              return response.json();   
             })
             .then(function(data){ 
               
                window.alert("Driver Deleted Successfully!")
                window.location.reload()
             });
  
    }
     modalOnClick(id)
     {
      console.log(id);
      this.setState({
        currentdel:id
      })
     }
   

   render()
   {

    let delivererlist=this.state.deliverers.map((del,index)=> { 
      return(
               <div>
       
       <div class="media col-md-4">
  <img class="mr-3" src={del.imagepath}  style={{width: 100, height: 100}} alt="Generic placeholder image"/>
  <div class="media-body">
    <h3 class="mt-0">Deliverer {index+1}  
      <a href={'/deledit/'+this.props.match.params.id+'/'+ del.driverID}>    <span class="glyphicon glyphicon-pencil">  </span></a>

       {/* <button type="button" class="btn btn-danger btn-sm"  onClick={() =>this.deleteme(del._id)}>
              <span class="glyphicon glyphicon-trash"></span> 
                 </button>  */}
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete" onClick={() => this.modalOnClick(del._id)}>
                  delete me
       </button>

                <div class="modal fade" id="delete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLabel">WARNING!!</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <h3> Are you sure to delete this??? </h3>
                      </div>
                      <div class="modal-footer">

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                        <button type="submit" onClick={() => this.deleteme()} class="btn btn-primary">Yes</button>


                      </div>
                    </div>
                  </div>
                </div>



                 

     </h3>
    <h4><small>Deliverer's Name : </small>{del.driverName}</h4>
    <h4><small>Address: </small>{del.address}</h4>
    <h4><small>Mobile No : </small>{del.mobile}</h4>

    <hr/>
  </div>
</div>
<br/>

</div>  
      )
    })


       return(
    <div class="container">
    
   
    {/*  <div  class="well col-md-3"  style={{borderLeft:'2px solid #711F26'}}> */}
    <br/><hr/>
    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleSignup"> Register a new deliverer </button><br/>

 <div class="modal fade"  id="exampleSignup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Register here</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">


  
      <form >
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputEmail4">Email</label>
        <input type="email" class="form-control" onChange={(event)=>this.onEmailChange(event)} value={this.state.signupemail} id="inputEmail4" placeholder="abc@gmail.com" ref="emailref"/>
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
      <label for="inputAddress">Deliverer's Name</label>
      <input type="text" class="form-control"  onChange={(event)=>this.onNameChange(event)} value={this.state.signupname} id="inputAddress" placeholder="k.m.t.sandeepanie" />
    </div>
    <div class="form-group">
      <label for="inputAddress2">Address</label>
      <input type="text" class="form-control" onChange={(event)=>this.onAddressChange(event)} value={this.state.signupaddress} id="inputAddress2" placeholder="2A,molpe road,katubadda"/>
    </div>
    <div class="form-row">
       
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
        <button type="submit"  onClick={this.register.bind(this)}  class="btn btn-primary">Register</button>
      </div>
    </div>
  </div>
</div>

<br/>
    <div class="row well" >
    {delivererlist}
    </div>

</div>

    
       )
    }
}
