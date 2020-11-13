import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'

export class Review extends Component {

    constructor (props) {
        super(props);

    }
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Text>
                        {this.props.review.review}, {this.props.review.rating}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default Review
