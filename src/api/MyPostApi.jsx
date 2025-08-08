export const myPostApi = (email, accessToken) =>{
    return fetch (`https://volunteerly-server-side.vercel.app/volunteers?email=${email}`,{
        headers:{
            authorization: `Bearer ${accessToken}`
        }
    })
    .then(res=> res.json())
}
