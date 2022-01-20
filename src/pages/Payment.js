import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

import {getOrders, removeAllCart} from "../services/cartService";
import {getGrandPrice, makeTransaction, createShipment} from "../services/productService";

import {CONSTANTS} from '../constants';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

require('dotenv').config();

// This values are the props in the UI
const currency = "USD";

const style = {"layout":"vertical"};


const mapToProps = (state)=>{
		return {
			isLoggedIn:state.loginReducer.isAuthenticated,
			user:state.loginReducer
		}
}

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [amount, setAmount] = useState("2");
    const history = useHistory();
    const user = useSelector(mapToProps);
    const dispatchCustom = useDispatch();

    useEffect(()=>{

    		if(user.isLoggedIn === false)
    		{
    			history.push("/signin?next=" + encodeURIComponent('/payment'))
    		}

    		document.title = `${CONSTANTS.ECOM_WEBSITE_NAME} - Payment`;

    		(async ()=> {
    			
    			let GrandPrice = await getGrandPrice(getOrders());

    			if(GrandPrice.isError === false)
    			{
    				setAmount(()=>"" + GrandPrice.data.grandtotal + "");
    			}

    			else
    			{
    				GrandPrice = await getGrandPrice(getOrders());
    				setAmount(()=>"" + GrandPrice.data.grandtotal + "");
    			}

    		}
    		)();


    }, [])

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                        // Your code here after capture the order

                        (async ()=>
                        {
                        	// create invoice
	                        let transaction = await makeTransaction(getOrders());

	                        // create shipment
	                        if(transaction.isError===false)
	                        {

	                        	let shipmentResult = await createShipment(transaction.data.invoice);

	                        	if( shipmentResult.isError === false)
	                        	{
				                        // clear the cart.
				                        removeAllCart(dispatchCustom);

				                        // show notification.
				                        store.addNotification({
				                        title: 'Payment Successful',
				                        message: `Order number is ${shipmentResult.data.shipment_code}. Navigate to My Account -> View Order History to get the order number.`,
				                        type: 'success',                         // 'default', 'success', 'info', 'warning'
				                        container: 'top-left',                // where to position the notifications
				                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
				                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
				                        dismiss: {
				                          duration: 0
				                        }
				                    });

				                    history.push("/");

			                    }

			                 }


			                 else
			                 {
			                 		transaction = await makeTransaction(getOrders());

			                        // create shipment
			                        if(transaction.isError===false)
			                        {

			                        	let shipmentResult = await createShipment(transaction.data.invoice);

			                        	if( shipmentResult.isError === false)
			                        	{
						                        // clear the cart.
						                        removeAllCart(dispatchCustom);

						                        // show notification.
						                        store.addNotification({
						                        title: 'Payment Successful',
						                        message: `Order number is ${shipmentResult.data.shipment_code}. Navigate to My Account -> View Order History to get the order number.`,
						                        type: 'success',                         // 'default', 'success', 'info', 'warning'
						                        container: 'top-left',                // where to position the notifications
						                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
						                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
						                        dismiss: {
						                          duration: 0
						                        }
						                    });

						                     history.push("/");

					                    }
					                }

			                 }

                    })();

                    });
                }}
            />
        </>
    );
}

export default function Payment() {

	const [client_id, setClientId] = useState(process.env.REACT_APP_PAYPAL_CLIENT_ID);


	const getOptions = ()=>{
		return {
                    "client-id": client_id,
                    components: "buttons",
                    currency: "USD"
                };
	}
	
	return (
	<div className="container">

	  <div className="row mt-4">

		<div style={{ maxWidth: "750px", minHeight: "200px" }} className="col-12 col-md-6 offset-md-3">
            <PayPalScriptProvider
                options = {getOptions()}
            >

            	<h1> Payment Information </h1>
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
			</PayPalScriptProvider>
		</div>
	</div>
	</div>
	);
}