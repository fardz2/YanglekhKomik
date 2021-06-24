import { useState, useEffect } from 'react';
import { Link , useLocation} from 'react-router-dom';
import { Row , Col} from 'react-bootstrap';
import MyCard from './MyCard';
import Loading from './Loading';


export default function SearchManga(){
    const {search} = useLocation();
    const [detail, setDetail] = useState([])
    const [loading,setLoading] = useState(false)
    const searchParams = new URLSearchParams(search)
    const q = searchParams.get("q")

    useEffect(() => {
        const apiGet = async ()=>{
            try {
                setLoading(true)
                const get = await fetch(`https://mangamint.kaedenoki.net/api/search/${q}`)
                const response = await get.json()
                setTimeout(()=>{
                    setDetail(response.manga_list)
                    setLoading(false)
                },500)
               
                
               
            } catch (error) {
                console.log(error)
            }
            

        }
        apiGet()
    }, [q])
   
    return(
        <div>
        {
            loading
            ?<Loading/>
            :
            <>
             <div>
                     <h2>Hasil</h2>
     
             </div>
             
                 <Row className="justify-content-center align-items-center flex-fill">
                     {
                         detail.length > 0
                         ?
                         detail.map((res, key)=>(
                             <Col sm={6} md lg={3}  key={key} >
                                 <Link to={`/detail/${res.type}/${res.endpoint}`}>
                                     <MyCard res={res}/>
                                 </Link>
                             
                             </Col>
                         ))
                         :<h2>Komik tidak ditemukan</h2>
                     }
                 
                 </Row>
             </>
        }
 
    </div>
    )
}