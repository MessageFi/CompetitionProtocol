export const useCreateProject=()=>{
    const authorization = localStorage.getItem('Authorization')
    fetch('http://124.156.177.144:8000/web3/project/create',{
        method:'POST',
        headers:{
            "Authorization": `Bearer ${authorization}`,
        }
    })
}