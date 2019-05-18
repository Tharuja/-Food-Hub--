import React from "react";
import {BrowserRouter as Router,Route,Redirect ,browserHistory,withRouter} from "react-router-dom"; 



export class Forgetpw extends React.Component {
    constructor(props){
        super(props);
        this.state={
            show:false,
            email:"",
            code:""
    
    
        }
      }
      componentDidMount(){
    
        if(localStorage.Token)
        { 
              
          this.props.history.push('/')
        }
         }  
    

    emailsubmit(e)
    {
        e.preventDefault();
       
        const user ={
            
            email:this.state.email,
          }

        fetch("http://localhost:3000/reg/forgetpw",{
            method:"POST",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify(user)
       
          })
       
          .then(response =>{ 
           // return response.json();
           if (response.status === 400) {
            console.log("use another email");
            console.log(response.json());
          //  response.json().then(function(user) { console.log(user.type) });
            window.alert('No such profile with this email!')
       
        } else if (response.status === 200) 
          {
            console.log("damn");
            window.alert('new password is sent to ur email....check your email')
            this.props.history.push('/login') //redirect

            this.setState({
                show:true
            })
        }   
        
           })
       
          .catch(function() {
              console.log('error handling');
          });

      
    }

codesubmit(e)
{
    e.preventDefault();
       
    const user ={
        
        code:this.state.code,
        email:this.state.email 
      }

    fetch("http://localhost:3000/reg/forgetpw2",{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
   
      })
   /*
      .then(response =>{ 
       // return response.json();
       if (response.status === 400) {
        console.log(response.json());
      //  response.json().then(function(user) { console.log(user.type) });
        window.alert('Invalid Code!')
   
    } else if (response.status === 200) 
      {
        console.log("damn");
        window.alert('Login successfull..welcome')
        this.props.history.push('/') //redirect
        this.props.checkauth()

        
      
    }   
    
       })
   */
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
      .catch(function() {
          console.log('error handling');
      });

  
}



   render()
   { 
       let showitem
       if(this.state.show){
     showitem =   <form>
            

        <div class=" well"  style={{border:'2px solid #0991F0',backgroundColor:'#031730', boxShadow:'2px 2px 2px #0991F0'}}  >
        <div class="row">
      <div class="form-group col-md-8 ">

          <label for="exampleInputEmail1" style={{color:'white'}}>Enter the new password</label>
         <div class="input-group">
          <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
          <input  class="form-control" id="exampleInputCode" aria-describedby="emailHelped" placeholder="Enter the code"  onChange={event => this.setState({code: event.target.value})}/>

          </div>

      </div>
      </div>
 
       <div class="row">
      <div class="col-xs-6">
      <br/>
     <button type="submit" class="btn btn-primary  btn-block" onClick={this.codesubmit.bind(this)} >Submit</button>
     </div>
          </div> 


</div> 
            
      </form>

       }

       else{
showitem=
        <form>
                    <div class=" well"  style={{border:'2px solid #0991F0',backgroundColor:'#031730', boxShadow:'2px 2px 2px #0991F0'}}  >
        <div class="row">
      <div class="form-group col-md-8 ">
          <label for="exampleInputEmail1" style={{color:'white'}}>Enter Your Email</label>
         <div class="input-group">
          <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
          <input type="email"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  onChange={event => this.setState({email: event.target.value})}/>

          </div>

      </div>
      </div>
 
       <div class="row">
      <div class="col-xs-6">
      <br/>
     <button type="submit" class="btn btn-primary  btn-block"  onClick={this.emailsubmit.bind(this)}>Submit</button>
     </div>
          </div> 


</div> 
            
      </form>

       }
       return(
    <div>

 <div class="fluid" style={{backgroundColor:'#A6C4E9'}}>

<div class="row"><br/><br/> <div class="col-md-3"></div><div class="col-md-7">
<h2 style={{color:"#031730"}}>Forget your password..??</h2><hr/><br/>
</div>

</div>
<div  class="row" >
<div class="col-md-4">
</div>
    <div class="col-md-4">
                 
            
           {showitem}
            
<br/><br/><br/>

</div>

    </div>
    </div>
    </div>
       );
   }
}


export default withRouter(Forgetpw)