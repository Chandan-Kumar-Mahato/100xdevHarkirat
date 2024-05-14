import {atom} from 'recoil'
export const userState = atom({
    // this is through which you will access the states with key
    key:"userState" , 
    default:{
        isLoading:true,
        userName:null
    }
})