export const myRequestApi = email =>{
    return fetch (`https://volunteerly-server-side.vercel.app/myRequests?email=${email}`).then(res=> res.json())
}
