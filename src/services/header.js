import {getUserLocal} from './getAuthUser';


export const header = 
{
        'Authorization': getUserLocal() !== undefined ? "Bearer " +  getUserLocal()["access"] : "Bearer hellow",
 };