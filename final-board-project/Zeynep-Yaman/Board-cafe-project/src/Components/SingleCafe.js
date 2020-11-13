import React from "react";
import db from '../firebaseConfg';
import Review from "./Review";
import CardGroup from 'react-bootstrap/CardGroup'



export default function Cafe(props) {
  // console.log(props.cafeData.data.reviews);
  console.log(props.cafeData.id);

  // This function will render the reviews that you have for each cafe
  const renderReviews = () => {
    let reviews = props.cafeData.data.reviews.map((review) => {
      console.log(review);
      return (
        <Review review={review} />
      );
    });
    return (
      <CardGroup>
        {reviews}
      </CardGroup>
    )
  };

  const reviewEdDel = db.collection("cafes").doc(props.cafeData.id);

  // add button to edit the reviews read more in the docs for editing the database on firestore
  const editReview = () => {
    db.collection("cafes").doc(props.cafeData.id).set( {
      name: this.state.name,
      address: this.state.address,
      
    })

  };
  // add button to delete reviews
  const deleteReview = () => {
    db.collection("cafes").doc(props.cafeData.id).delete();
  };

  return (
    <div>
      
      <h2>
        {props.cafeData.data.name},{props.cafeData.data.address}
      </h2>

      {props.cafeData.data.reviews && renderReviews()}
      {/* <button onClick= {editReview} >Edit review</button> */}
      <button onClick= {deleteReview} >Delete review</button>
    </div>
  );
}
