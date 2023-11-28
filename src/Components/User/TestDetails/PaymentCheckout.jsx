 
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";
import { dataProvider } from './../../Context Api/DataProvider';

const PaymentCheckout = ({price,discount}) => {
     
    const axiosPublic=useAxiosPublic()
const[paymentToken,setPaymentToken]=useState(null)
const[error,setError]=useState("")

    useEffect(()=>{
       if(price && discount){
        axiosPublic.post("/create-payment-intent",{price,discount})
        .then(res=>setPaymentToken(res.data.secret))
       }
    },[discount,price,axiosPublic])

    




    const stripe = useStripe();
    const elements = useElements();
    const {user}=useContext(dataProvider)


    // form handle
    const formHandle=async(event)=>{
       event.preventDefault()


       if (!stripe || !elements) {
        return
    }

    const card = elements.getElement(CardElement)
   
    if (card === null) {
        return
    }


    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card
    })


    if (error) {
        console.log('payment error', error);
        setError(error.message);
    }
    else {
        console.log('payment method', paymentMethod)
        setError('');
    }


    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(paymentToken, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if (confirmError) {
        console.log(confirmError)
    }
    else{
        if(paymentIntent.status=== "succeeded"){
            console.log(paymentIntent)
        }
    }


    }
    
    return (
       
        <form  onSubmit={formHandle}>
        <CardElement
            options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}
        />
        <button className="btn btn-sm bg-red-500 text-white my-4" type="submit" >
            Pay
        </button>
       
    </form>
    );
};

export default PaymentCheckout;