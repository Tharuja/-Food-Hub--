import React from "react";
import { render } from "react-dom";
import {BrowserRouter as Router,Route,Redirect,Switch ,browserHistory} from "react-router-dom"; 

import { Navbar } from "./Navbar";
import {Login} from "./Login";
import { Invoice } from "./Invoice";
import {Del} from "./Del";
import {Welcome} from "./Welcome";
import {Shop} from "./Shop";
import {Firstpage} from "./Firstpage";
import {Acc} from "./Acc";
import {Forgetpw} from "./Forgetpw"
import {Customer} from "./Customer"
import {Deledit} from "./Deledit"
import {Additems} from "./Additems"
import {Cus_login} from "./Cus_login"
import {Cus_forgetpw} from "./Cus_forgetpw"
import {Edititems} from "./Edititems"
import { Realshowitems } from "./Realshowitems"
import { GoogleMap } from "./Mapcompo"


import wall from "./img/wall.jpg";
import wall2 from "./img/anh-nguyen-466645-unsplash.jpg";
import { Viewinvoice } from "./Viewinvoice";
import {Shopprofile} from "./Shopprofile";
import {Map1} from "./Map1";
// import {StarRating} from "./StarRating";





class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            authed:false
                      
        }
    }


checkauth(){
    console.log("auth done")
    this.setState({
        authed:true
    })
     

}




// style={{backgroundImage: "url(" + wall2 + ")"}}
    render(){
      
        return(
              
            <div >
            
            <Router history={browserHistory}>

             <div>
            <Navbar authed={this.state.authed}/>
            <Switch>
            <Route path="/"   component={Firstpage} exact > </Route>
            <Route path="/Shopprofile"   component={Shopprofile} > </Route>
            <Route path="/Map1" component={Map1} > </Route>
            {/* <Route path="/StarRating"   component={StarRating}> </Route> */}
            
             <Route path="/acc/:id"  render={(props) => <Acc {...props} />}> </Route>
            <Route path="/shop/:id" component={Shop}></Route>
            <Route path="/invoice/:id" render={(props) => <Invoice {...props}   />}> </Route>
            <Route path="/del/:id" render={(props) => <Del {...props}   />}> </Route>
           <Route path="/forgetpw"  render={(props) => <Forgetpw {...props} checkauth={this.checkauth.bind(this)} />}> </Route>
           <Route path="/cus_forgetpw"  render={(props) => <Cus_forgetpw {...props} checkauth={this.checkauth.bind(this)} />}> </Route>

           <Route path="/login"  render={(props) => <Login {...props} checkauth={this.checkauth.bind(this)} />}> </Route>
           <Route path="/cus_login"  render={(props) => <Cus_login {...props} checkauth={this.checkauth.bind(this)} />}> </Route>
           <Route path="/map" component={GoogleMap}></Route>
           <Route path="/newpath"  render={(props) => <Welcome {...props}  />}> </Route>
           <Route path="/customer/:id"  render={(props) => <Customer {...props}  />}> </Route>
           <Route path="/deledit/:shopid/:id"  render={(props) => <Deledit {...props}  />}> </Route>
           <Route path="/additems/:id"  render={(props) => <Additems {...props}  />}> </Route>

           <Route path="/edititems/:id" component={Edititems}/>
           <Route path="/realshow/:id" component={ Realshowitems }/>
           <Route path="/viewinvoice/:id/:shopid/" component={Viewinvoice}/>

        
             </Switch>
         </div>
         
        </Router>
           

        </div>

    );
    }
}

render(<App/>,window.document.getElementById("app"));
