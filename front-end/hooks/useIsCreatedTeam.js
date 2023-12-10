export const useIsCreatedTeam= async(address)=>{
    const authorization = localStorage.getItem('Authorization')
    const res =await fetch('http://124.156.177.144:8000/web3/player/profile',{
        method:'POST',
        headers:{
            "Authorization": `Bearer ${authorization}`,
            "Content-Type":'application/json',
            'accept': '*/*',
        },
        body: JSON.stringify({
            "address": address
        })
    }).then(
        data=>data.json()
    )
    if(res.code===200){
        localStorage.setItem('teamId' , res.data.teamId)
        console.log(localStorage.getItem('teamId'));
        return true
    }else{
        return false
    }
}
