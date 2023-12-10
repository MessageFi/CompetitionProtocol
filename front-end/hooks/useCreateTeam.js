export const useCreateTeam = ()=>{
    const authorization = localStorage.getItem('Authorization')
    fetch('http://124.156.177.144:8000/web3/team/create',{
        method:'POST',
        headers:{
            // 'Authorization':Global.authorization
            "Authorization": `Bearer ${authorization}`,
            "Content-Type":'application/json',
            'accept': '*/*',
        },
        body: JSON.stringify({
            'logo':'string',
            'name':'string'
        })
    }).then(
        data=>data.json().then(
            res=>console.log(res.message)
        )
    )
}