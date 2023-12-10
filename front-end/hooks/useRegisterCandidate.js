import ABI from 'Abi/contract.json'


export const registerCandidate=(trace , address) =>{
    const { data } = useContractWrite({
        address: '0x55A682cCc2f091F44f1672DAAa7f1151cD3620e8',
        abi: ABI,
        functionName: 'registerCandidate (0x4830a136)',
        args:[trace , address]
    })
    return data
}