import React from 'react';
import * as qs from 'query-string';
import SimpleMap from "./SimpleMap";
import {StarRating} from "./StarRating";
import StarRatingComponent from 'react-star-rating-component';

export class Shopprofile extends React.Component  {


    constructor() {
        super();
        this.state = {
			address: null,
			description: null,
			imagepath: null,
			shop_id:  null,
			shop_name:  null,
			_id:  null,
            rating: null,
            town : null,
            msgemail:"",
            msgname:"",
            msgmsg:"",
            msgsubject:"",
            shopidtosendmsg:"",
            lat : "",
            lng : "",
            mobile : "",
            starrating : 1
			
        };
      }

      onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
      }
  

  componentDidMount() {

	 let selectQuParms = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).shop_name;
	console.log("-------------------");
	console.log(selectQuParms);
	console.log("-------------------");

    this.loadShops(selectQuParms);
    this.setState({
        shopidtosendmsg:selectQuParms
    })

  }



  loadShops = (selectQuParms) => {
	
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

	fetch(
		buildUrl('http://localhost:3000/reg/foods', {
			key: selectQuParms
		}),
		{
			method: "GET"
		}
	)
		  .then(data => data.json())
		  .then((res) => {
			if (!res.success) this.setState({ error: res.error });
			else {
				console.log("res")
				console.log(res)
				this.setState({
					address: res.data.address,
					description: res.data.description,
					imagepath: res.data.imagepath,
					items: res.data.items,
					shop_name:  res.data.shop_name,
					_id:  res.data._id,
                    rating: res.data.rating,
                    town : res.data.town,
                    mobile:res.data.contact_no,
                    lat : Number(res.data.lat),
                    lng : Number(res.data.lng)
					
				})
			}
		  });
    
  }

  renderfoods(){
	console.log("this.state.items"); 
	  console.log(this.state.items);
	let shopElement1;
	if(this.state.items)
	{
			shopElement1 = this.state.items.map(i=>{
		
return (

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

			return shopElement1
	 }


  }
  contactus(e){
    console.log(this.state.shopidtosendmsg)
      
    e.preventDefault();
     
    const user ={
        
        msgemail:this.state.msgemail,
        msgname:this.state.msgname,
        msgmsg:this.state.msgmsg,
        msgsubject:this.state.msgsubject,
        shopid:this.state.shopidtosendmsg
        
      }

    fetch("http://localhost:3000/reg/contactus_shop",{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
   
      })
   
      .then(response =>{ 
       
          if (response.status === 200) 
      {
        
        window.alert('Message is sent')
       
    }   
    
       })
   
      .catch(function() {
          console.log('error handling');
      });

  

}
  

  render() {
    const { rating } = this.state;
    
    const { lat } = this.state.lat;
    const { lng } = this.state.lng;
    console.log("this.state.lat")
    console.log(this.state.lat)
    console.log("this.state.lng")
    console.log(this.state.lng)
    
    
    return (                
        <body className="is-preload">

        

        <article id="top" className="wrapper style1">
            <div className="container">
                <div className="row">
                    <div className="col-4 col-5-large col-12-medium">
                        <span className="image fit"><img src={this.state.imagepath} alt="" /></span>
                    </div>
                    <div className="col-8 col-7-large col-12-medium">
                        <header>
                            <h1>Hi. This is <strong>{this.state.shop_name}</strong>.</h1>
                        </header>
                        <p>{this.state.shop_name} which is inspired by Sri Lankan Food Culture.{this.state.description}</p>
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
                            <span className="image fit"><img src="images/online.png" alt="" /></span>
                            <h3>Online Delivery</h3>
                            <p>Make it easy</p>
                        </section>
                    </div>
                    <div className="col-4 col-6-medium col-12-small">
                        <section className="box style1">
                            <span><img src="images/Delivery.jpeg" alt="" /></span>
                            <h3>Food Delivery</h3>
                            <p>Food Delivery is done by {this.state.shop_name} to satisfy our Customers as much as we can.</p>
                        </section>
                    </div>
                    <div className="col-4 col-6-medium col-12-small">
                        <section className="box style1">
                            <span><img src="images/parking.png" alt="" /></span>
                            <h3>Parking Option</h3>
                            <p>Parking Option is provided to the Customers of {this.state.shop_name}.Join with us and take the chance</p>
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
                <div className="row">{this.renderfoods()}</div>
        <footer>
                    
        <div style={{"width":"100%", "height" : "100%"}}>
            <SimpleMap lat={this.state.lat} lng={this.state.lng} name={this.state.shop_name} />
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
                        <form method="post" action="#">
                            <div className="row">
                            <div className="col-6 col-12-small">
                                    <input type="text" name="name" id="name" placeholder="Name"  onChange={event => this.setState({msgname: event.target.value})} />
                                </div>
                                <div className="col-6 col-12-small">
                                    <input type="text" name="email" id="email" placeholder="Email"  onChange={event => this.setState({msgemail: event.target.value})}/>
                                </div>
                                <div className="col-12">
                                    <input type="text" name="subject" id="subject" placeholder="Subject"  onChange={event => this.setState({msgsubject: event.target.value})} />
                                </div>
                                <div className="col-12">
                                    <textarea name="message" id="message" placeholder="Message"  onChange={event => this.setState({msgmsg: event.target.value})} ></textarea>
                                </div>
                                <div className="col-12">
                                    <ul className="actions">
                                       
                                        <li><input type="reset" value="Clear Form" className="alt" /></li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                        <br/>
                        <input type="submit" value="Send Message" onClick={this.contactus.bind(this)}  />
                    </div>
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
