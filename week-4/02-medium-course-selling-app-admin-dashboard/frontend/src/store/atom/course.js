import {atom} from 'recoil'
export const courseState = atom({
    key:"userState" , 
    default:{
        isLoading:true,
        course:null
    }
})