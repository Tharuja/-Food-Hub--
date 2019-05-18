import React from "react";
import { Nav } from 'react-bootstrap';
import { Link, NavLink ,withRouter} from "react-router-dom";
import food3 from './img/food 4.jpg';
import food1 from './img/fo.jpg';
import simplemern from './img/simplemern.jpg';
import food2 from './img/Food.jpg';
import foodtop from './img/foodie.jpg';
import phone from './img/phone.jpg';
import logo  from"./img/logo.jpg"
import capture from "./img/Capture.png"
import { Login } from "./Login";
import f9 from "./img/f9.jpg";
import del from "./img/del.jpg";
import res from "./img/anh-nguyen-466645-unsplash.jpg"

import Select from 'react-select';



export class Firstpage extends React.Component {



  constructor() { 
    super();
    
    this.state = {

      index: 0,
      direction: null,
      error: null,
      
      
      
      locationOptions : [],
      selectedLocation: null,
      selectedLocationAddress: null,

      shopOptions : [],
      selectedShop: null

    };

    this.searchOneBarStyle = {
      "margin": "auto",
      "width": "15%",
      "padding": "10px",
      "marginTop": "30px"
    }
    this.searchTwoBarStyle = {
      "margin": "auto",
      "width": "50%",
      "padding": "10px",
      "marginTop": "30px"
    }

    this.foodResultStyle = {
      "margin": "auto",
      "width": "84%",
      "padding": "10px",
      "display": "flex",
      "backgroundColor": "#efefeff2"
    }



  }

  componentDidMount() {
  


    this.loadShops();
    this.loadFoods();
  }

  authenticateUser = () => {
  }

  loadShops = () => {
    
console.log("loadShops")

    fetch('http://localhost:3000/reg/shops')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else {
          console.log("locGroup.shops")
          console.log(res.data)
             this.setState({ locationOptions: res.data.map(locGroup=>({ label: locGroup._id, value: locGroup.shops })) }) 
          }
      });
  }


  


  loadFoods = () => {

      function buildUrl(url, parameters) {
        let qs = "";
        for (const key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                const value = parameters[key];
                qs +=
                    encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
            }
        }
        if (qs.length > 0) {
            qs = qs.substring(0, qs.length - 1);
            url = url + "?" + qs;
        }
    
        return url;
    }
          
    }
  

  handleChangeLocation = (selectedLoca) => {

    this.setState({ shopOptions : [] });
    this.setState({ selectedShop : null });
    

    this.setState({ selectedLocation : selectedLoca.value });
 
    let shops = selectedLoca.value;  
    console.log(shops)
    this.setState({ shopOptions: shops.map(shop=>({ label: shop.shop_name, value: shop })) })
    

  }



  handleChangeShop = (selectedShp) => {
    console.log(selectedShp)
    this.setState({ selectedShop : selectedShp.value});
    console.log("selectedShp.value.shop_id")
    console.log(selectedShp.value.shop_id)
    this.props.history.push('/Shopprofile?shop_name=' + selectedShp.value.shop_id);
  }







    render(){

    const { selectedShop } = this.state;
    const { selectedLocation } = this.state;
    const { index, direction } = this.state;


    let shopElement;
    if(this.state.selectedShop){
     shopElement = this.state.selectedShop.items.map(i=>{
     return 

    //  <ProductCard key={i.item_name}
    //  photos={[i.image_url]}
    //  price={i.price}
    //  productName={i.item_name}
    //  description={"available_quantity : " + i.available_quantity}
    //  rating={"shop_id" + i.shop_id}
    //  url={"image_url : " + i.image_url}/>

         })
     }
     else
      {
           shopElement = <div style={{"margin": "auto", "fontStyle" : "italic" , "color": "#868080"}}>No result</div>
      }

        return(
            <div >
               
      
        
       
           <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="item active">
      <img class="d-block w-100" src={simplemern}  style={{width: 900, height: 600}} alt="First slide"/>
      <div class="carousel-caption">
          <h3 style={{fontStyle: 'italic', fontSize: '60px', margin:'300px'}}>Looking for food?</h3>
          <p style={{fontStyle: 'italic', fontSize: '25px'}}>Now delivering through Food Hub</p>
        </div>
    </div>
    <div class="item">
      <img class="d-block w-100" src={simplemern} style={{width: 900, height: 600}} alt="Second slide"/>
      <div class="carousel-caption">
          <h3 style={{fontStyle: 'italic', fontSize: '60px', margin:'300px'}}>Food Hub</h3>
          <p style={{fontStyle: 'italic', fontSize: '25px'}}>Feel the diffrence</p>
        </div>
    </div>
    <div class="item">
      <img class="d-block w-100" src={simplemern}  style={{width: 900, height: 600}} alt="Third slide"/>
      <div class="carousel-caption">
          <h3 style={{fontStyle: 'italic', fontSize: '60px', margin:'300px'}}>Find the best restaurants</h3>
          <p style={{fontStyle: 'italic', fontSize: '25px'}}>Find-Order-get Delivered</p>
        </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>




<div style={{"marginTop": "20px"}} className="container">
  <div className="row">
    <div className="col-sm-4">
    <Select
           value={selectedLocation}
           onChange={this.handleChangeLocation}
           options={this.state.locationOptions}
           placeholder={"Search for Location"}
          />
    </div>
    <div className="col-sm-8">
    <Select
           value={selectedShop}
           onChange={this.handleChangeShop}
           options={this.state.shopOptions}
           placeholder={"Search for resturants"}
          />
    </div>

  </div>
</div>

      
            <div style={this.foodResultStyle}>
                  {shopElement}        
            </div>
            <div>
            {this.state.error && <p>{this.state.error}</p>}
           </div>



            </div>

        );
    
      }
};
