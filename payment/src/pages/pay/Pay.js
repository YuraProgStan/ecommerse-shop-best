import React, {useEffect, useState} from 'react';
import './pay.css';
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


const Pay = () => {
    const navigate = useNavigate();
    const [stripeToken, setStripeToken] = useState(null)
    const onToken = (token) => {
        setStripeToken(token);
    }
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API}/checkout/payment`,
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,
                        idempotencyKey: uuidv4()
                    });
                console.log(res.data);
                navigate('/success');
            } catch (err) {
                console.log(err)
            }
        };
        stripeToken && makeRequest()
    }, [stripeToken])


    return (
        <div className="containerPay">
            {stripeToken ? (<span>Processing. Please wait...</span>)
                : (<StripeCheckout name="YuraDev. Shop"
                                   image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrt08MliTFOE9y8bSoesoVKRCdQFrNhm_307e05jomY4PP5OUoZhtKe7gN0ky0lBiKc2A&usqp=CAU"
                                   billingAddress
                                   shippingAddress
                                   description="Your total is $20"
                                   amount={2000}
                                   token={onToken}
                                   stripeKey={process.env.REACT_APP_STRIPE_KEY}
                >
                    <button>Pay Now</button>
                </StripeCheckout>)}
        </div>
    );
};

export default Pay;