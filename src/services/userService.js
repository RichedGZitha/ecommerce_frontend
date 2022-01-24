import axiosBase from './axiosBase';
import  { actionCreators } from '../state/actions/actionCreators';
import {header} from './header';

async function getUserInfo(dispatch)
{
    let isError = false;
    let invalidToken = false;
    let error_messages = [];
    let data = undefined;

    const url = "/get-my-profile/";
    
    await axiosBase.get(url, {headers:header})
    .then((response)=>{

        if(response.data)
        {
            data = response.data;
            let user = data.user

            let profile_dict = {'id':user.id, 'Country':data.country, 'Contact':data.contact, 'loyaltyPoints':data.loyalty_points, 'HeaderImage':data.header_image, 'Avatar':data.avatar}
            let user_dict = {'id': user.id, 'username': user.username, 'first_name': user.first_name, 'email':user.email, 'last_name': user.last_name, 'isManager': data.is_manager, 'is_seller': data.is_seller};
            

            // update the user store.
            dispatch(actionCreators.updateUserActionCreator(user_dict));

            // update the profile store.
            dispatch(actionCreators.updateProfileActionCreator(profile_dict));
            

        }

    }).catch((error)=>{

        if(error.response)
        {
            isError = true;
            error_messages = [...error_messages, error.response.data['detail']];
        }

        else
        {
            isError = true;
            error_messages = [...error_messages, 'Something went wrong. Please try again.'];
        }

    });

    
	return {'isError': isError, 'invalidToken': invalidToken, 'errors': error_messages};
}



async function getShipmentInfo()
{
    let isError = false;
    let error_messages = [];
    let data = undefined;

    const url = "/get-shipment-address/";
    
    await axiosBase.get(url, {headers:header})
    .then((response)=>{

        if(response.data)
        {
            data = response.data;
        }

    }).catch((error)=>{

        if(error.response)
        {
            isError = true;
            error_messages = [...error_messages, error.response.data['detail']];
        }

        else
        {
            isError = true;
            error_messages = [...error_messages, 'Something went wrong. Please try again.'];
        }

    });

    
    return {'isError': isError,"data":data , 'errors': error_messages};
}


export {getUserInfo, getShipmentInfo};