import client from "../../axios";
import { localStorageService } from "../../ultis/localStorageService";

export const fetchLogin = async (data: LoginPayload): Promise<Account> => {
    const tokenInfo = await client<Account>('/auth/login', {
        method: 'POST',
        data
    })
    if(tokenInfo){
        localStorageService.set(localStorageService.LOCAL_STORAGE_KEYS.ACCESS_TOKEN, tokenInfo.token)
    }else{
        localStorageService.clearAll();
    }

    return tokenInfo
}