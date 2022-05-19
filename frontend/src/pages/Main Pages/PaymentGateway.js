import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated } from "../../auth/Auth";
import {
  braintreePayment,
  processPayment,
  createOrder,
} from "../../api/callApi";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleCart, deleteAllCartItems } from "../../slices/gamesSlice";
import ButtonController from "../../control/ButtonController";

const PaymentGateway = (props) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    clientToken: null,
    instance: {},
    address: null,
    success: false,
  });
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const getToken = (user) => {
    braintreePayment(user)
      .then((res) => {
        if (res) {
          setValues({ clientToken: res.clientToken });
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getToken(userId);
  }, []);

  const buyNow = () => {
    let nonce;
    let getNonce = values.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: props.amount,
        };
        processPayment(userId, paymentData).then((res) => {
          setValues({ success: res.success });
          const orderData = {
            cartItems: props.cart,
            transaction_id: res.transaction.id,
            amount: res.transaction.amount,
          };
          createOrder(userId, orderData);
          dispatch(deleteAllCartItems());
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!values.success ? (
        values.clientToken !== null ? (
          <div>
            <DropIn
              options={{ authorization: values.clientToken }}
              onInstance={(instance) => {
                values.instance = instance;
              }}
            />
            <ButtonController onClick={() => buyNow()}>Submit</ButtonController>
          </div>
        ) : (
          "Loading..."
        )
      ) : (
        <div
          style={{
            height: "10rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Payment Success
        </div>
      )}
    </>
  );
};

export default PaymentGateway;
