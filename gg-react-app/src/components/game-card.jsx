import React from 'react';
import {Link} from 'react-router-dom';

const GameCard = ({imageUrl, title, description}) => {
    const cardStyle = { width: '18rem' }
    return (
        <div className="card" style={cardStyle}>
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description.slice(0,20)}...</p>
                <Link to="#" className="btn btn-primary btn-sm">Details</Link>
                <Link to="#" className="btn btn-success btn-sm">Order</Link>
            </div>
        </div>
    )
}

export default GameCard;