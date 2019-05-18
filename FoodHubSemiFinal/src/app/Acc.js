import React from "react";
import image from './img/f7.jpg';
import { Link, NavLink ,withRouter} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import FileBase64 from 'react-file-base64';
import Geosuggest from 'react-geosuggest';





export class Acc extends React.Component {

  constructor(props){
    super(props);
    this.state={
        username:"",
        shopname:"",
        shopdesc:"",
        address:"",
        city:"",
        mobile:"",
        currerntpassword:"",
        newpassword:"",
        newpassword2:"",
        files:null,
        imagepath:"",
        lati:"",
        longi:""


    }

    this.onSuggestSelect=this.onSuggestSelect.bind(this);
  }

  componentDidMount(){
  
    
      if(!localStorage.Token ||  jwt_decode(localStorage.Token).details[0].type!="shop owner" ||  jwt_decode(localStorage.Token).details[0]._id!=this.props.match.params.id )
       { this.props.history.push('/login')}
  
    fetch('http://localhost:3000/reg/view/'+ this.props.match.params.id,{
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
          username:data.shop_owner_name,
          shopname:data.shop_name,
          shopdesc:data.description,
          address:data.address,
          city:data.town,
          mobile:data.contact_no,
          imagepath:data.imagepath,
          lati:data.lat,
          longi:data.lng

  
        })   
      
     })
     .catch(function() {
      console.log('error handling');
      window.alert("something is going wrong..!!")
  });
  
  
    }



     /**
   * When the input receives focus
   */
  onFocus() {
    console.log('onFocus');
  }

  /**
   * When the input loses focus
   */
  onBlur(value) {
    console.log('onBlur', value);
    //console.log(value)
  //console.log(value.location.lat)
  }

  /**
   * When the input got changed
   */
  onChange(value) {
    //console.log('input changes to :' + value);
    // console.log('chiranga')
    // console.log(value)
  }

  /**
   * When a suggest got selected
   */
  onSuggestSelect(suggest) {
    // console.log('chiranga')
    // console.log(suggest.location.lat);
    // console.log(suggest.location.lng);

    this.setState({
      lati:Number(suggest.location.lat),
      longi:Number(suggest.location.lng)
    })

    
    console.log("HHHHHH")
    console.log(this.state.lati);
    console.log(this.state.longi);

// suggest.location.lat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      /lng
    
  }

  /**
   * When there are no suggest results
   */
  onSuggestNoResults(userInput) {
    console.log('onSuggestNoResults for :' + userInput);
  }
 
  savechanges()
  {
    // this.props.history.push('/shop')

    var myimage=this.state.imagepath;
        if(this.state.files==null){
           console.log("inside if")
            
        }else{
           myimage=this.state.files.base64
        }
var mobcheck=/^\d{10}$/
// var LATITUDE_PATTERN=/^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$/
// var LONGITUDE_PATTERN=/^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$/
var ll=/^[+-]?\d+(\.\d+)?$/
var test1=mobcheck.test(this.state.mobile);
var test2=ll.test(this.state.lati);
var test3=ll.test(this.state.longi);

if(!test1 || this.state.mobile.length!=10 )
{
  window.alert("Invalid Details");
}
else
{

  const data = new FormData();
        data.append('town',this.state.city);
        data.append('address',this.state.address);
        data.append('shop_owner_name',this.state.username);
        data.append('shop_name',this.state.shopname);
        data.append('contact_no',this.state.mobile);
        data.append('description',this.state.shopdesc);

        data.append('lat',this.state.lati);
        data.append('lng',this.state.longi);

        data.append('imagepath',myimage);

  
    fetch('http://localhost:3000/reg/edit/'+ this.props.match.params.id,{
      method:"PUT",
     
      body:data
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
          fetch('http://localhost:3000/reg/changepassword/'+ this.props.match.params.id,{
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


  


  getFiles(files){
    this.setState({ files: files })
  }

   render()
   {

    const fixtures = [
      {label: 'Old Elbe Tunnel, Hamburg', location: {lat: 53.5459, lng: 9.966576}},
      {label: 'Reeperbahn, Hamburg', location: {lat: 53.5495629, lng: 9.9625838}},
      {label: 'Alster, Hamburg', location: {lat: 53.5610398, lng: 10.0259135}}
    ]

       return(

         
<div>
<div class="container">
    
    <h1 style={{color:'black'}}>Edit my shop details </h1>
    
  	<hr/>
	<div class="row">
     
      <div class=" well col-md-12" style={{backgroundColor:'#eaf9f9'}}>
      <hr/>
        {/* <div class="text-center">
         <img  src={image} style={{width: 700, height: 400}}  alt="avatar"/> 
         
        </div> */}
      <hr/>

      
  
 
      {/*  <div class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          <i class="fa fa-coffee"></i>
          This is an <strong>.alert</strong>. Use this to show important messages to the user.
       </div> */}
        <h3>Shop Info  <span class="glyphicon glyphicon-pencil"></span>  </h3>
        
        <form class="form-horizontal" role="form">
        
          <div class="form-group">
            <label class="col-lg-3 control-label">Your Name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value={this.state.username} onChange={event => this.setState({username: event.target.value})}/>
            </div>
          </div>
        
          <div class="form-group">
            <label class="col-lg-3 control-label">Shop name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text"  value={this.state.shopname}  onChange={event => this.setState({shopname: event.target.value})}/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Address:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text"  value={this.state.address}  onChange={event => this.setState({address: event.target.value})}/>
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-3 control-label">City</label>
            <div class="col-lg-8">
              <input class="form-control" type="text"  value={this.state.city}  onChange={event => this.setState({city: event.target.value})}/>
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

          <div class="form-group">
            <label class="col-md-3 control-label" for="comment">Shop description:</label>
            <div class="col-md-8">
             <textarea class="form-control" rows="5" id="comment"  value={this.state.shopdesc}   onChange={event => this.setState({shopdesc: event.target.value})}></textarea>
            </div>
          </div>

          <small  class="form-text text-muted">To locate your shop on map :- </small>

          <div>
          <Geosuggest
            fixtures={fixtures}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onSuggestSelect={this.onSuggestSelect}
            onSuggestNoResults={this.onSuggestNoResults}
            location={new google.maps.LatLng(53.558572, 9.9278215)}
            radius="20"
          />
        </div>


          {/* <div class="form-group">
            <label class="col-lg-3 control-label">Latitude:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text"   value={this.state.lati} onChange={event => this.setState({lati: event.target.value})}/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Longitude:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text"   value={this.state.longi} onChange={event => this.setState({longi: event.target.value})}/>
            </div>
          </div> */}

          <div className="form-group">
                        <label className="control-label col-sm-2" >Image:</label>
                        <div className="col-sm-10">
                            <FileBase64
                                multiple={false}
                                onDone={this.getFiles.bind(this)}
                               />

                        </div>
                    </div>

                      <div  style={{textAlign:"center",margin:"5px 15px",height:"300px",width:"300px",borderLeft:" 1px solid gray",borderRight:" 1px solid gray",borderTop:"5px solid gray",borderBottom:"5px solid gray"}}>
                   <img style={{width:"100%",height:"100%" }} src={this.state.imagepath} alt="Please select an image to preview"/> 
            </div>

            <div class="form-group">
            <label class="col-md-3 control-label"></label>
            <div class="col-md-12">
              <button type="button" class="btn btn-primary btn-md" onClick={this.savechanges.bind(this)}>
              <span class="glyphicon glyphicon-ok-circle"></span> Save Changes 
                 </button> 
              
            </div>
          </div>
<hr/>
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
              <button type="button" class="btn btn-success btn-md" onClick={this.savepassword.bind(this)}>
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
