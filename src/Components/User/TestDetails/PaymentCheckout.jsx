 
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";
import { dataProvider } from './../../Context Api/DataProvider';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentCheckout = ({price,discount,item}) => {
     const move=useNavigate()
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


            // all nescessary staf will send form here.
            console.log(item)
            const bookedService={name:item.testName,userEmail:user.email,transectionId:paymentIntent.id,userName:user.displayName,discount,report:null,date:item.date,price:item.price,imgUrl:item.imageUrl}
            axiosPublic.post("/add_booked_item",bookedService)
            .then((res)=>{
                if(res.data.acknowledged){
                    axiosPublic.post("/decrement_item_slots",{id:item._id})
                    .then(res=>{
                        if(res.data.acknowledged){
                            move("/UserDashbord/upcomingAppoinment")
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your Payment successfull.",
                                showConfirmButton: false,
                                timer: 1500
                              });

                        }
                    })
                     
                }
            })

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