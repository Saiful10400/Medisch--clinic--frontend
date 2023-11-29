import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckout from "./PaymentCheckout";
import { dataProvider } from "../../Context Api/DataProvider";

// payment method.

const TestDetails = () => {
  const axiosPublic = useAxiosPublic();
  const{user}=useContext(dataProvider)
  const[userstatus,setUserstatus]=useState("block")
  useEffect(()=>{
    axiosPublic.get("/get_users")
    .then(res=>{
      const data=res.data
      const result=data.find(item=>item?.email.toUpperCase()===user?.email.toUpperCase())
      setUserstatus(result.status)
    })
  },[user])
  
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [hidePayment, setHidePayment] = useState(false);
  useEffect(() => {
    axiosPublic.get(`/Single_test?id=${id}`).then((res) => setData(res.data));
  }, [axiosPublic, id]);

  //   all data fetching from server.
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    axiosPublic.get("/visibale_banner").then((res) => setPromo(res.data));
  }, [axiosPublic]);

  // apply coupon handle

  const [payprice, setpayPrice] = useState(0);
 
  //
  const [enteredCode, setEnteredcode] = useState(null);
  const promocode = promo?.couponName;
  const applyCouponHandle = (e) => {
    e.preventDefault();
    const couponEnter = e.target.coupon.value;
    setEnteredcode(couponEnter);
    setpayPrice(data?.price - promo?.couponRate);
  };

  // book now button handle.
  const bookNowHandle = () => {
    document.getElementById("my_modal_3").showModal();
    // setpayPrice(data?.price);
  };

  //   backend payment data sending handle.
  // const ContinuePaymentHandle=()=>{
  //     setHidePayment(true)

  // }

  // stripe payment handle.

  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

  return (
    <div className="lg:w-[1400px] mx-auto flex lg:flex-row flex-col">
      <div className="lg:w-1/2">
        <img className="w-full object-contain" src={data?.imageUrl} alt="" />
      </div>
      <div className="lg:w-1/2 flex  justify-center items-center">
        <div>
          <h1 className="lg:text-[38px] text-3xl lg:mt-0 mt-5 font-bold">Test Name: {data?.testName}</h1>
          <h1 className="lg:text-[20px] font-bold lg:font-medium">
            Test Description: {data?.details}
          </h1>
          <h1 className="lg:text-[30px]  mt-4 font-bold">
            Reservation Last Date: {data?.date}
          </h1>
          <h1 className="lg:text-[30px] font-bold">
            Total Available slots: {data?.slots}
          </h1>
          <h1 className="lg:text-[30px] font-bold">Price: {data?.price} Tk</h1>
          <button disabled={userstatus==="block"} onClick={bookNowHandle} className="btn btn-secondary">
            Book Now
          </button>
        </div>
      </div>

      {/* modal show. */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h1 className="text-xl">Total price :{data?.price} Tk</h1>
          <h1 className="text-xl my-2">
            Discount Price: {enteredCode === promocode ? promo?.couponRate : 0}{" "}
            Tk
          </h1>
          <hr />
          <h1 className="text-xl">
            You will pay:{" "}
            {enteredCode === promocode
              ? data?.price - promo?.couponRate
              : data?.price}{" "}
            Tk
          </h1>
          <div className=" flex items-center justify-between mt-4">
            {/* <button onClick={ContinuePaymentHandle} className="btn btn-primary btn-sm ">
              Continue Payment
            </button> */}
            <form
              onSubmit={applyCouponHandle}
              className=" flex justify-center items-center gap-4"
              action=""
            >
              <input
                name="coupon"
                className="border-2 w-[130px] rounded-md px-1 text-lg"
                type="text"
                placeholder="Enter coupon"
              />
              <button className="btn btn-sm btn-primary">Apply</button>
            </form>
          </div>
          <div className={`  mt-12`}>
            {/* backend payment hanle */}
            <Elements stripe={stripePromise}>
              <PaymentCheckout
                discount={promo?.couponRate}
                price={data?.price} item={data}
              ></PaymentCheckout>
            </Elements>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TestDetails;
