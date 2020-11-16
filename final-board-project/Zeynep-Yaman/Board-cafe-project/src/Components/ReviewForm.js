import React, { Component } from 'react'
import db from '../firebaseConfg';

export class ReviewForm extends Component {

    constructor () {
        super();
        this.addReview = this.addReview.bind(this);
    }

    componentDidMount() {
    
    }


    addReview () {
        let cafeId = document.getElementById("reviewform-cafe").value
        let cafeRating = document.getElementById("reviewform-rating").value
        let cafeReview = document.getElementById("reviewform-review").value
        let cafe = this.props.cafes.find(cafe => {return cafe.id === cafeId})
        if (!cafe.data.reviews) {
            cafe.data.reviews = []
        }
        cafe.data.reviews.push({
            review: cafeReview,
            rating: cafeRating,
        })
        db.collection("cafes").doc(cafeId).set(cafe.data)
    } 

    render() {
        let options = []
        this.props.cafes.map(cafe => {
            let optionElement = <option key={cafe.id} value={cafe.id} > {cafe.data.name}, {cafe.data.address}</option>
            return options.push(optionElement)
        })
        return (
            <section className="reviewform">

                <h3>Add a New Review </h3>

                <div className="form-group">
                    <label htmlFor="reviewform-cafe">Cafe </label>
                    <select id="reviewform-cafe" name="reviewform-cafe" >
                        {options}
                    </select>
                    
                </div>

                <div className="form-group">
                    <label htmlFor="reviewform-review">Review </label>
                    <input type="text" id="reviewform-review" name= "reviewform-review" />
                </div>

                <div className="form-group">
                    <label htmlFor="reviewform-rating">Rating</label>
                    <input type="text" id="reviewform-rating" name= "reviewform-rating" />
                </div>
                <button onClick={this.addReview}>Add Review</button> 
            </section>
        )
    }
}

export default ReviewForm;
