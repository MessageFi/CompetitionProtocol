
export const useAuthentication=async(address ,signer)=>{
    signer.signMessage('{"method":"auth","date":"2023-12-07","nonce":1}').then(
        message => {
            fetch('http://124.156.177.144:8000/web3/player/verify', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    address: address,
                    message: '{"method":"auth","date":"2023-12-07","nonce":1}',
                    signedData: message
                }),
            }).then(
                data => {
                    data.json().then(
                        result=> localStorage.setItem('Authorizationn',`Bearer ${result.data.token}`)
                    )
                 }
            )
        }
    )
}