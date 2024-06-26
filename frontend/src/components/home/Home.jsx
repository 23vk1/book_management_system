import { useEffect } from "react"


export default function HomePage() {


    useEffect(()=>{
        axios.get(`http://localhost:8000/user/books`, {
            withCredentials: true,
        })
    },[])





    return (
        <>
            

        </>
    )
}