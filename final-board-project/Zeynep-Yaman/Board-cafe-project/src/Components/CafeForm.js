import React, { Component } from 'react'
import db from '../firebaseConfg';

export default class CafeForm extends Component {

constructor () {
    super();
    this.state = {
        name: '',
        address: '',     
    }

    this.addCafe = this.addCafe.bind(this);

}

onChangeHandler (evt, key) {
    this.setState ( {
        [key]: evt.target.value
    })
}


addCafe () {
    if (this.state.name !== '') {
        db.collection("cafes").add({
          name: this.state.name,
          address: this.state.address,
        })
        .then(docRef => {
            this.props.cafes.push({
                id: docRef.id,
                data: {
                    name: this.state.name,
                    address: this.state.address,
                    reviews: [],
                }
            })
            this.props.forceParentUpdate()
            alert("cafe added")
            document.getElementById("cafe-form").reset()
        })
    }
} 

render() {
    return (
        <section className="reviewform">

            <h3>Add a New Cafe </h3>
            <form id="cafe-form">
            <div className="form-group">
                    <label htmlFor="reviewform-name">Name</label>
                    <input type="text" id="reviewform-name" name= "reviewform-name" value={this.state.name} onChange={(evt) =>this.onChangeHandler (evt , 'name') }/>
                </div>

                <div className="form-group">
                    <label htmlFor="reviewform-address">Address</label>
                    <input type="text" id="reviewform-address" name= "reviewform-address" value={this.state.address} onChange={(evt) =>this.onChangeHandler (evt , 'address') }/>
                </div>

                <button onClick={this.addCafe}>Add Cafe</button>
            </form>


                
            </section>
        )
    }
}