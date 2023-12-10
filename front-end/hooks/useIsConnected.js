import {ethers} from 'ethers'
export const useIsConnected= async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const accounts = await provider.listAccounts();
    console.log(accounts);
    if (accounts.length > 0) {
        return true
    } else {
        return false
    }
}