import { useParams } from "react-router-dom"
import { useState,useEffect} from "react"
import { Link } from "react-router-dom"
import Loading from "./Loading"

export default function Details(){
    const [detail, setDetail] = useState([])
    const [loading,setLoading] = useState(true)
    let {title} = useParams()
    
    useEffect(() => {
        const apiGet = async ()=>{
            try {
                setLoading(true)
                const get = await fetch(`https://mangamint.kaedenoki.net/api/manga/detail/${title}`)
                const response = await get.json()
                setTimeout(()=>{
                    setDetail(response)
                    setLoading(false)
                    
                },500)
               
               
            } catch (error) {
                console.log(error)
            }
            

        }
        apiGet()
    }, [title])
 
    
    return(
       
        <div>
             {
                loading
                ?<Loading/>
                : <div className="d-flex flex-column">
                <div className="d-flex flex-fill justify-content-center"> 
                    <img src={detail.thumb} alt="" className="img-fluid"/>
                </div>
                <div className="flex-fill">
                    <h2>{detail.title}</h2>
                    <p>{detail.synopsis}</p>
                </div>
                <div>
                    {
                        detail.genre_list?.map((res,key)=>(
                            <button type="button" class="btn btn-secondary btn-sm mr-3" key={key}>
                                {res.genre_name}
                            </button>
                        ))
                    }
                </div>
                <div>
                    <h3>Chapter list</h3>
                    <ul class="list-group " style={{height:"400px",overflow:"auto"}}>
                        {
                            detail.chapter?.map((res,key)=>(
                                <Link to={`/detail/${detail.type}/${detail.manga_endpoint}/${res.chapter_endpoint}`}>
                                    <li class="list-group-item" key={key}>
                                        {res.chapter_title}
                                    </li>
                                </Link>
                            ))
                        }
                    </ul>
                 
                </div>

            </div>
                
            }
          
        </div>

    )
}