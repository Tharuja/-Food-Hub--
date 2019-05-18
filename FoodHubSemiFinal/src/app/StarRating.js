import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import * as qs from 'query-string';

export class StarRating extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 1,
      address: null,
			description: null,
			imagepath: null,
			shop_id:  null,
			shop_name:  null,
			_id:  null,
      town : null,


    };
  }
  
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  render() {
    const { rating } = this.state;
    
    return (                
      <div>
        <h2>Rating: {rating}</h2>
        <StarRatingComponent 
          name="rate1" 
          starCount={10}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}
