export const myPostApi = (email, accessToken) =>{
    return fetch (`http://localhost:3000/volunteers?email=${email}`,{
        headers:{
            authorization: `Bearer ${accessToken}`
        }
    })
    .then(res=> res.json())
}
