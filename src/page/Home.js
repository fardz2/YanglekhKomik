import { useState } from "react"
import { useEffect } from "react"
import HotKomik from "../component/Hotkomik"
import News from "../component/News"
import Loading from "../component/Loading"



export default function Home(){
    const [populer , setPopuler] = useState([])
    const [news, setNews] = useState([])
    const [loading , setLoading] = useState(false)
    
    useEffect(()=>{
        const apiGet = async ()=>{
            try {
                setLoading(true)
                const get = await fetch("https://mangamint.kaedenoki.net/api/manga/popular/1")
                const get2 = await fetch("https://mangamint.kaedenoki.net/api/manga/page/1")
                const response = await get.json()
                const response2= await get2.json()
                setPopuler(response.manga_list)
                setNews(response2.manga_list)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
            

        }
        apiGet()
    },[])
    

    return(
        <>
        {
            loading?
            
            <Loading/>
           
            :
            <>
            {
                populer.length > 0?
                <HotKomik populerManga={populer}/>
                :<h1>Maaf manga populer tidak ditemukan, terjadi down server</h1>
            }
           
                <News updateManga={news}/>
            </>
        }
       
        </>
    )
}