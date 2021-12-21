import {refreshTokenRequest} from "./authService";
import axiosBase from './axiosBase';

async function getUserInfo(access, refresh, dispath)
{
    let isError = false;
    let invalidToken = false;
    let error_messages = [];

    const url = "/auth/v1/users/me/";
    const header = {'AUTHORIZATION': `JWT ${access}`};

    axiosBase.get(url, {headers: header},)
    .then((response)=>{

        if(response.data)
        {
            console.log(response.data);
        }

    }).catch((error)=>{

        if(error.response)
        {

        }

        else
        {
            isError = true;
            error_messages = [...error_messages, 'Something went wrong. Please try again.'];
        }


    });



	return {'isError': isError, 'invalidToken': invalidToken, 'errors': error_messages};
}