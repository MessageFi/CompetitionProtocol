import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useNetwork } from "wagmi"

export const useCustomContract = (address, abi) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum,'any');
    const signer = provider.getSigner();
    const { chain } = useNetwork()
    const contract = new ethers.Contract(address, abi, signer)

    return {
        contract,
        provider,
        signer
    }
}