import React from 'react';
import './success.css';
import imgUrl from '../../images/logo.png'

const Success = () => {
    return (
        <div className="containerSuccess">
            <div className="wrapper">
                <img className = "logo" src={imgUrl} alt="logo"/>
                <div><button>Successfull</button></div>
                <p>Your order is being prepared. Thanks for choosing YuraDev. Shop</p>
            </div>
        </div>
    );
};

export default Success;