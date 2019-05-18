import React from "react";
import image from './img/f7.jpg';
import { Link, NavLink ,withRouter} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import SimpleMap from "./SimpleMap"
import StarRatingComponent from 'react-star-rating-component';


export class Shop extends React.Component {
  constructor(props){
    super(props);
    this.state={
        username:"",
        shpimagepath : "",
        shop_id : "",
      shopname:"",
        shopdesc:"",
        address:"",
        city:"",
        mobile:"",
        itemid: "",
        description: "",
        itemname: "",
        qty: "",
        price: "",
        imagepath: "",
        items : [],
        lat : "",
        lng : "",
        rating: "",
        starrating : 1




    }
  }


  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }


  componentDidMount(){
    if(!localStorage.Token ||  jwt_decode(localStorage.Token).details[0].type!="shop owner"  ||  jwt_decode(localStorage.Token).details[0]._id!=this.props.match.params.id)
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
     console.log("Data For Address")
      console.log(data);
    
      this.setState({
        username:data.shop_owner_name,

        shop_id : data.shop_id,
        shpimagepath : data.imagepath,
        shopname:data.shop_name,
        shopdesc:data.description,
        address:data.address,
        city:data.town,
        rating : data.rating,
        // items: data.items
        mobile:data.contact_no,
        lat :Number(data.lat),
        lng : Number(data.lng)

      })   
    
   })
   .catch(function() {
    console.log('error handling');
    window.alert("something is going wrong..!!")
});


fetch('http://localhost:3000/reg/viewitems/'+ this.props.match.params.id,{
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
   .then(respond =>{
     console.log("data", respond.data);
  //   initialitems = data.map((del) => {
      
  //     return del
    
  //  })
  //  console.log("initialitems");
  //  console.log(initialitems);
  //  this.setState({
  //    items:initialitems
  //  })
      this.setState({
        items : respond.data.items
      })
  })  
    
    .catch(function() {
    console.log('error handling');
    window.alert("something is going wrong..!!")
});




  }

  editprofile()
  {
     this.props.history.push('/acc/')

  }  


   render(){
    const { rating } = this.state;

      console.log("Dulanga",this.state.items)

    let itemlist=this.state.items.map((i,index)=> { 
      return(
        
              <div className="col-4 col-6-medium col-12-small">
              <article className="box style2">
                <a href="#" className="image featured"><img src={i.imagepath} alt="" /></a>
                <h3><a href="#">{i.itemname}</a></h3>
                <h3><a href="#">Rs. {i.price}</a></h3>
                <h3><a href="#">Quantity: {i.qty}</a></h3>
                <p>We have the best foods</p>
              </article>
            </div> 
              )
            })


       return(
        
         
        <body className="is-preload">

        {/* {itemlist} */}

        <article id="top" className="wrapper style1">
            <div className="container">
                <div className="row">
                    <div className="col-4 col-5-large col-12-medium">
                        <span className="image fit"><img src={this.state.shpimagepath} alt="" /></span>
                    </div>
                    <div className="col-8 col-7-large col-12-medium">
                        <header>
                            <h1>Hi. This is <strong>{this.state.shopname}</strong>.</h1>
                        </header>
                        <p>{this.state.shopname} which is inspired by Sri Lankan Food Culture.{this.state.shopdesc}</p>
                        <a href="#work" className="button large scrolly">Learn about what I do</a>
                    </div>
                </div>
            </div>
        </article>

        <article id="work" className="wrapper style2">
            <div className="container">
                <header>
                    <h2>Here's all the stuff We do.</h2>
                </header>

                <div className="row aln-center">
                    <div className="col-4 col-6-medium col-12-small">
                        <section className="box style1">
                            <span className="image fit"><img src="https://cdn0.iconfinder.com/data/icons/online-fresh-food-orders-2-1/512/online-food-order-laptop-chef-512.png" alt="" /></span>
                            <h3>Online Delivery</h3>
                            <p>Make it easy</p>
                        </section>
                    </div>
                    <div className="col-4 col-6-medium col-12-small">
                        <section className="box style1">
                            <span><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdT91ViypWOqUpu2HTjWWPbhpLKYrnb4nR-k9kIGuP-Gdlsmtgg" alt="" /></span>
                            <h3>Food Delivery</h3>
                            <p>Food Delivery is done by {this.state.shopname} to satisfy our Customers as much as we can.</p>
                        </section>
                    </div>
                    <div className="col-4 col-6-medium col-12-small">
                        <section className="box style1">
                            <span><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUVFRUVFhYVFQ8VFRUXFRcWFhUYFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODgtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAADAAECBwQGCAX/xABUEAABAwEEBQUJCQsMAgMAAAABAAIDEQQhMUEFCBJRsQcTImGBBiMyVHFykdHTFDR0hJKhsrPBFzM1QmJzk5Sj0vAVJCVDUlNjgoPC4fEWRFVkov/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC8UklB5pggkSkmYpIGBSJUJDTDHcnivvzQSJuVFcpXLFJtvs+jzstaS11ooCXEY81W4Ct216FvnLPp51k0ZIWHZfMRC04EbdS6nXshypfke7j2W+0udMKwQAOc2/vjieiw9WZQaw2y2+3EvDLXajW9wbaJ7+sgFK0dytuY0vfYbU1jQXOc6z2hrWgYkktoB1rsGxRNY0NY0Na0UDGgNa0DIAYIssYc0tcAWuBBBvBBuII3IOJYbM97msja57nkNa1oLnOJuAa0Xk9S9b/w7SPiFs/VrT+6s/u37n5NGaQfE0kNa8SwPvrsV2oyDvaRTytV46D5X9GvgjdaLTzcxYOcZzVpdsvFzqFjCCCb+1BQJ7jtIeIWz9WtP7qie47SHiFs/VrT+6uj/uuaH8c/YWz2aZ3K1oc/+5+xtns0HOP/AIdpHxC2fq1p/dTnuO0h4hbP1a0/urowcrWiM7Z+xtfs1L7rmh/HP2Fs9mg5xd3HaQ8Qtn6taf3V5VtsMsLzHNG+J4pVkjHMeKioq1wBFQQV0/aeV7RAa4ttW04AkNENrBcRgATHQVXPkcc+ldIUF81qmJJx2ATefNa0ehqDCsfc1bJWCSGyWmVhrR8cE72GhoaOa2hvRJNEW+yjnTBa7PT8cx2iKn+agXXmh9Gx2aCOCIUZExrGjqaKVO8nEneVlPaCCDeCKGuFOtBzt3Acsdoge2K3OdPCSBzhvljyqT+OBjfeuhrNaGyNa9jg5jgHNcDUEG8EFc9ct/cVFZXstlmYGRyuLXsAo1r8Q5oyBvu3rdNXvTzprHJZnmpszxs9UclS0ekOCC1SU6RQNvKt29AYFIlIBOgSSHtejgiBAkkkkDEpNCRKdAJ4IvHaE7pRS68nAJ5H08uQQxGW347x6kBI2UvOKZ7cxjmN6m11bwme+iCpdYx1bBZ/hQ+qkWHq1tHNWw/4kX0XLK1i2fzGzk4m1D6qRY2rWO82z85F9F6C45GZjHikJhSvzKT3gC9B5snpZ5BBpHKj3Au0pEwxuZHPGTsF9dlzXYscQCRka0KrAchOkv72yfpLR7JdFxvr9oUnOpeUHNv3DNI399sgpvkn9kiM5C9JU++2Qf6k/sl0OWF1+G7/AJRY5K3YEIOdG8hOkv72yfpLR7JD+4XpGp77ZB5ZJ/ZLpElBLdq/AZIOdo+QvSVPvtk/ST+yVg8lXJe/Rz5J7S+N8zm7DOb2y1jcSdpwBJN2WSsuN+RxREA2Ppccd+9R8LzeKZw2/Jv3qUbqdE9nWgrjWBH9FeS0RcHrVNWt45y29bYOMq2zWD/BXxiLg9ajq2xkvtoy2bPX0yoL0J2rhhmfsCnsilMlBh2bj2FFQCB2bjhkd3lSc6poO07knmvRHadyZvRuyyPrQFa2gomAopJqoHSSSQJCe7Z9SISma1BGJueJKIhEbN4wzG5SdIAK+jrQQk6JqM8k8Qr0jeeCeNmZx4JnNpeO0IKp1kfeFn+FD6qVedq3mkFsP+JFdv6Ll6Osaa2Cz08aH1UqwtWxg5q2dUkX0XILiiFekfRuRkN7MxjmN6cSClUEZm06QuI+dRj6RqcslJrdq84ZD1p5GZjHigIhyszwIzTskBG6mKgBtXnDIb0EWHaN+WW9ZCHJHW8XEJRyVxuIxQPIyvVTNCa7auP/AGpeF5vFTfHXqpggmAovZVRjfkceKZx2rhhmfUgrPl9lP8l03WiK/fc9azq0Hvlu82DjKtr1gBTRXxiLg9apq1Ec5betkHGVBezm1uKBtnwa9v8AGam91bh2ncpc2KUQOxtLgnIqhtdS49hTvffQY8EEdql38BFaEzWACiQuQSSSSQMSnSQ3O2fIglI+iCGFvSp2bkSNmZx4IiBgUz30CG7o35HL1J4216R7BuQVLrEs/mNnJurahd/pSLH1ah3m2fnIvovWZrI+8LP8KH1Uq8/VvcRDbD/iRV+S5BdTnUvKx9gnpU7N6mwbV5wyHrRkEWPqnJQ5G06Q7etM3pX5DL1oIuYXXj/tFjfX1KaHIzMY8UBFjvbtYZZ707XbfUM+tTnmZG0ue5rGjEuIa0eUm4IFE/LAjJEXlyaaspvFqgB/PRetQ/l+zOu90wDf36L5r0HoPG0bss1OJ2WBCFYrbFJXmpI30x2HsdTy0KNIyvlyKCt9YP8ABXxiLg9ahq2sJfbR+TZ7918q2rl+l/ouhxFoir6HrWdWk98t3m2fjKgvGI06J/7RVF7KoPOHwc96Ccpr0R/0mj6NxzwO9EYyidza4oHTVQw4i70FEaEDpJJIGJUQ3MqRToA+D5vBEe8AVSkcAL0BraUJF3BARjK3nsG5MRs3jDMbkZM51BegqXWOvsFnp40PqpVg6tsferZ1SRfRcsrWIafcNnOANqFB/pSLH1avvNs/ORfReguJzaXjtCmHilck5Kxy2t9Lt2/rQTA2rzhkN6k9lLx2jeptcCLk6CLHgiqH4Xm8VBza1Iw4o8bgRcgi+PMXEfOqZ1kbe7mbHEHEB75nObW4mMRhtRnTbPpV1Kh9ZKYGWxDcyc+l0Y/2oK17nu4y3WyN0lms7pWNdsEh0QAdQOp0nDJw9KzbVybaUiY6SSxuDGNLnHbgNALybnVVy6vEVNGSH+1apT6GRN/2rfu6WPaslobvgl+g5BzlyGWp0elo2hxDZWSNIrc6jdoVHVRdNPdW4dp3LlLkkeW6WsZrSr3D5Ubx9q6tgIpTAjFBW/L+wDRQu/8AYi4PWratNOctvmQcZVtesH+CvjEXB60/VuaS+20x2YL918qC95H5DHglzIpT586poLrs+KKgGx+Rx4pSPyGKac1uz4JobjQ4796CbY7k4UkxQOkkkgSGXbOOCmSo7FcUEWMqansG5FIQQdm44ZHciudQVQCrs+bwSa3avOGQSa3avOGQ9aXg+bwQVVrIe8LP8KH1UqwNW55ENsOXORV+S5Z+sh7ws/wofVSrB1bY+82zdzkX0XILjA2r8sutGQSNm8YZjcig5oBubS8doTV2vN4peF5vFO5tLx2j1ICgIb20vGOY3qbXVFQsa12pjWuc97WRtFXvc4NaAMauNwHWgJtbVwuGfqVAayD/AOeWZm6zk/KkcP8Aar3sNsimYJbPIyVhu2o3tew0x6TSRVUZrH2B3umzWmh2HwmGuQfG9z6HcSJbt+ydyDeuQqAjREThiZZneXp7P+1b1bjtxPaBix4Pa0hU/wAjfKDZIbEyxWiUQPjc8te+oY9r3F/h4NcC4i+l1FuXdTyk6OssDnx2mKaXZIZHC9spc6hptFtQ0dZog597gZdjStkP/wBmNvynbH2rrmSOt4xC5N5NdFvtOlbMGjwZmzvIwDYnCQk9VQB2hdYvfkMeCCteX6Wui6EX+6Iq+h61jVpNZLd5tn4yraOX6MDRXxiLg9avq0jvlt8yz8ZUF5yMr5cioc6cKdL+L1KR+QxTczd170Eo2U8uZTvZVRjfkceKeR9PLuQRDyLjjxRGhQbHvxUmlBJJJJAxTpiFDbpiglJSl+Cx25bVaZf8orW7RqcMh60QiqB0zutCB2bjhkdyQG1ecMhvQVNrEV9w2emHuq79FIsfVp+82z85F9F6zNZD3hZ/hQ+qlWBq3SUhthy5yL6LkF1FYp6q7Nb0TwvN4ooCBNpS5OhEbOGGY3eRVlyj8rkVjLrPZQJpxc51e9RHcaeE7qw37kFjTyBtTUNb+MSQB13lVHy890tllsEcFntMUj/dLC+OORrjsNjlrthpwDti450VUW/S+kdKS7LnTTuJujYHbA3UY24eUr3LDyP6VkbUwMjGXOSxtPa0VKDY9Xzuis9m91stNojhDzAYxK8MaSOdDy2t1fAr2K4dO6Ls2kYHRO2ZY3iu0xzTQjwXMcMHBc/Wjkb0owVEcUlMo5mE+h1KrXmv0jouX+vsr64dJrXeUeC5BsPd9yWz6PjfaWzMls7XNFTVkrdo0AcylDiLwewLX+4ruNtGk5XRWcsGwA57pHFoaCaVoASewLZe6DlRfbtGyWS0x0mLoy2WOgY8MeHHbaT0TQYitepe1q4A+6bUB/csv/zoLM7gu4SHRkZbGecneO+ykAV/JaPxW9S3CClOvPepxsooyMzGPFBXGsH+CvjEXB607Vu++W2mOzBT0y1W3cv0oOivjEVfQ9avq0nvlt8yz8ZUF4QZ780ZDkjreMVHnsqdLcgef58k0OJr4X8YKcbKXnFKRlfLkUE0xUBJkceKm0IHSSSQIlDLa44KZToBNdQ0PYUQlNIBS9Y7TWgdhl1+VASm1jhl1pA7NxwyO5GTOG9BUush7ws/wofVSrA1bmVhtgy5yKvyXLL1iCfcNnpePdV36KRY+rV95tn5yL6L0Fw+D5vBGSK8+22psUb3uNI42ue47mtBc6nYEFc8tfKAbJH7kszqTyt6bwb4ozdd+U6+hyVVcnfcBNpN5e4mOzsd3yWlXOzLIwcXHebhjfgfGmkn0ppCv9bapgAMQwONAPNa35mrrPue0NFY7PHZ4hRkbQ3rcc3HrJvQD7ne5+zWOIR2aJrGgYi9zutzsXFeg51bh2nchuNCQMM+ryI8YFLkAyzZvGGYQNJ6NgtMZjmjbKxwva4A+jcVmrHkND0e1BzfyocmLrATaLOTJZSbwb3wE4Bx/GZudjkd5ydX7S8cVulje6jp4w2MXUcWnaLa76YeRdCz2SOWJ0b2h7HtLXA5g3Gq5L7r9DSaM0jJExxBikbJC/PZNHxuG8jA9YKDrxj6qMj8hivF7ltNC12Sz2ptzpY2uc0XgPF0g7HBw7F7MAFK55oK15fogNFVz90RV9D1rGrSKSW7zbPxlW16wf4K+MRcHrT9W498ttMdmCnplQXxI+nlyChzOdelvTwb880VBCOStxxTvfRQnGeeSaG8muPDyIJBmZx4KbSnTFA6SSSBiFHbpipobm7XkQMBtY4bt6m5oIoosfS49nWiIBNdS49hTeF5vFI9LycU7HUuPYUFU6x91gs/wofVSrB1bZO82yuckX0XLO1kfeFn+FD6qVefq3MJhtgy5yKvyXILgttrYxjnvcGRsBc95NAALzeqn5QOVPR8+j7RZ7NK90sjNho5uVooSNrpEUwqrL7otENtNmmsr3FrJmFm0KVbW8H0gKmDyAWjxyH5EiDUOSfTVlslvFotZLWsjfsFrHPPOOo0GjR/ZL/Srqk5ZdFYCaQdfMzepaE3kEtFbrXDd+RKlLyCWnO1w+XYlQb83lk0QBTnpP0M3qUW8seiQbppKHLmZrvJctE+4BafHIfkSqP3BLRWnuuE/wCSW5Bv8nLLorKaTy8zN6kzOWPRA/rpP0M3qWhy8glp8bh+RKkOQG0eOQ/IlQb0eWPRINRNJ1jmZvUqs5Z+6SxW+aCayuc5zY3Ry7THsNA4OjptC/wnr13cglorT3ZCT5kinJyCWmnvuH5EqDJ5JOUmxWKw+57VI5r2yvLQI5H9B1Di0b6q5NE6TitUTbRZ3h8bxUEZ7wRkRuVIN5ArQbxbIfkSq3O4bubGjbGyyh5kcC5znUoC515oMmoNX5f5AdFfGIuD1q2rSe+W3zIOMq2fl+ipoupN/uiKvoetY1aRSS3ebZ+MqC8pGZjHim54U693WpyPohc0fCz+byIJxszOPBPIyt4xSjfX7U73UQRbJvxUgoBhN5xyRGlA6SSSBiE6YhMHb0CkaCL0Brq3E3cVM9LzeKI5gIogkAovbUUKix9Ljjkd6Zx2rhhmfsCCpdYl59w2cY0tQv8A9KRY+rUe82z85F9F6zNY66wWenjQ+qlWDq2SDmrZ1yRfRcgugiqxy4jo1u37kR7qmg7TuUwwUpkgTGgCgUiEEHZuOGR3J3vyGPBANztm4G7gjxsAFyZkYAp6etQ8HzeCAyx3nZN2eW5EkkyF5KeOOnlzQNE0AVxrmiIJGzeMMxuUnybrycEEJOibs8vtUoRniSpRspecSoubS8doQVzrB/gr4xFwetP1bXEPtp/Js92++VbfrAOB0UPhEXB61XVqA5y2+ZBxlQXjCK3nHgiob2ZjHMb0udFKoGmFOkLjxTRXmpxGW5SY2pqewbkpGZjHigImIUWyVCcIJJJJIEhPbteREIToBxvyNxRFCRlfsKEHl3R9J3+RBJ/SuGAz9SeN1OiezrRGiiZ7KoKm1kfeFn+FD6qVefq3tJgtg/xIr/8AK5ZusU/+Y2cG+lqH1UixtWo95tn5yL6L0FwxnZuPYUZM5tbigF5HRr2oJyur0R29Sizo3HA5+tFYyiciqB0OV+QvJQy8tux3dXlRY2U8uZQDa3Y8hz3I6RCx3O2bsRl1f8ICyPp1k5ITWbN+O/q8iJGzPEnNEQMCmkfT1ITzs4YHL1KUTfxjeT8yCtOX2L+i6nO0RcHrWdWgd8t3m2fjKtr1g/wV8Yi4PWoatryH20/k2fjKgvh7qBB5s+Fnu/jNTjFekezqRUEWPqnc6iHKKdIdvWmZ0rzgMB60C2Sb/mRWlOmogdJJJAxCZrlJCeK4elAnHauGGZ+wKTohTdTBNE7LAjJEQDjfkceKZ7q3DtO5NL0jQZZ7k8Jp0cDxQVTrGilgs9PGh9VKsLVrcOZtnXJF9FyzdZH3hZ/hQ+qlXnat4rBbBT+siv3dFyC6HvyGPBIRClFGK644796MgE11DQ9hTyPyGKaY5Yk/Mox9E0OeaCbYhS++uKYHZuOGR+woqHK7LEnJA8j6eU4JmR77ycVBg2Tfnnu6kdAHwfN4Kb30+zrSkcAPs3oTW7N5/wCkBGMzOPBRI2bxhmNyMovcAL0FbawJror4xFwetT1amjnLb1Mg4yrZuXyM/wAl1wraIrt1z1rOrR98t3mwcZUF5ObS8doU+cFK5J3OpeVj7B8Kl2NPtQEa2t5wyHrTvZfUY5jeptdW8JEoGa8EVSBqh0reBdxRQUDpJJIGKcBMUmuQRkZW8XFD5wm4XHP/AIUnurcO07kjFuuI/i9BNjaXBNIyvlyKUb6+VNI/IY8EFS6xcn8xs4OItQ+qkWNq1nvNs/ORfResvWMaBYLP8KH1UixNWsjmbZ+ci+i5Bcr2VQucI6OeRU5H5DFMIRS/HeglGynlzKk5tRQqDH5HHI708j6eXJAPnC2437v+USNlLzivJ7p9MR2GyS2qYFzYwCQ3wiXODGNbuq5wFVUjNYB1PweD8ZNfqkF5kVQS/ZuN4y9SpMawTv8A48frJ9krM7gu6mPSdm90sYWEPMb2ONdh7Q1xAdQbQo5pr1oNjjZmceCIQhA7NxwyP2FTe+gQDJ2PJwTsbW89g3JNZW93YNybwfN4IK61gvwV8Yi4PWo6tslH205bNnr6ZVt2sD+CvjEXB61LVrYOctvU2DjKgvJg2rzhkEZBI2bxhmNyLtClckA3jZvGGYTN6V+XFIDa8nFO5tLx2j1ICpqJNdW9MDVBJJJJAkN43IiSCEdKKaYhIoByipux3p4RlnmpgJEIK95ddDutGjHOaKuge2ag3AFrv/y4nsVXchndTHZbS+CZwYy0bIa8mjWyN8GpyBBIXSEsYc0tcAQ4EEHAg3EHqXOPKVyUT2V7prIx01mJLtloLpIa4gtF7mjeMkHRsPz8UVci6I5QtJ2ZgjitcgYLg14jkDRuHONdQdQXo/da0x47d+Ysfs0HUswyzyTRihvx3rln7remPHD+gsfs0jyt6Y8c/YWP2aDp7TOi4rVDJZ527ccjdlzbxnUEEYEEAg5EBVw/kK0aL+etnk5yz+yVVfda0x47+wsfs1E8remPHD+gsfs0FqjkK0dgZbWP9Sz+yVgdy/c5BYIBZ7O0tYCXEk1c9xpVzzmTQegBc1Hlc0x45+wsfs1IcrWmMrZ+wsfs0HU76UvQmNoRXs6ly47lb0x44f0Fj9mm+65pjxz9hY/ZoOq0zlysOVvTHjn7Cx+zWNpHlM0rMwsfbZKEUOw2GI/KjaD86DeuX3upjk2LBE4OLHc5LQ1DSBRrK/2ryaZL2dXLQzo7NPaXCnPvaxvW2Kt/ynO9CrnuB5NLVpB7ZHtdFZ6guleCC8Ynmwb3E/2sL8103ozR8dniZDE0NjjaGtaMgEGUUDZ+TXBGIqpIGCdRAokQghs7sEUJJIEkkkgSSSSBJJJIEkkkgSYp0kHNPLj78d5VWaZJAkkkkCSSSQJJJJAkkkkCW48l/vyPzhxSSQdYtTpJIEkkkgSSSSBJJJIEkkkg/9k=" alt="" /></span>
                            <h3>Get the App</h3>
                            <p>See menus and photos for nearby restaurants and bookmark your favorite places on the go</p>
                        </section>
                    </div>
                </div>
                <footer>
                    <a href="#portfolio" className="button large scrolly">See our Foods</a>
                </footer>
            </div>
        </article>



        <article id="portfolio" className="wrapper style3">
            <div className="container">
                <header>
                    <h2>Here’s Our Foods.</h2>
                </header>
                <div className="row">{itemlist}</div>
        <footer>

         <div style={{"width":"100%", "height" : "100%"}}>
             <SimpleMap lat={this.state.lat} lng={this.state.lng} name={this.state.shopname} />
        </div>      
                        <br/>
                        <br/>

        <div>
            <h2>Rating: {rating}</h2>
            <StarRatingComponent 
            name="rate1" 
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
            />
        </div>    


                    
                    
                </footer>
            </div>
        </article>
        



        <article id="contact" className="wrapper style4">
            <div className="container medium">
                <header>
                    <h2>Contact Us : {this.state.mobile}</h2>
                </header>
                <div className="row">
                    
                    <div className="col-12">
                        <hr />
                        <h3>Find us on ...</h3>
                        <ul className="social">
                            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                            <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
                            <li><a href="#" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
                            <li><a href="#" className="icon fa-tumblr"><span className="label">Tumblr</span></a></li>
                            <li><a href="#" className="icon fa-google-plus"><span className="label">Google+</span></a></li>
                            <li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
                            
                            
                        </ul>
                        <hr />
                    </div>
                </div>
                <footer>
                    <ul id="copyright">
                        <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                    </ul>
                </footer>
            </div>
        </article>
        </body>
       );
   }
}
