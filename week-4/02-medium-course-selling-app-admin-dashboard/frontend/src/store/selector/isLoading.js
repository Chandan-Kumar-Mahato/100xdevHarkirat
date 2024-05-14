import { userState } from "../atom/user";
import { selector } from "recoil";

export const userLoading = selector({
    key:"isLoadingState" , 
    get:({get})=>{
        const state = get(userState);
        return state.isLoading;
    }
})