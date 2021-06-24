import { useState, useEffect } from 'react';
import { Link ,useParams, useHistory} from 'react-router-dom';
import { Row , Col, Button} from 'react-bootstrap';
import MyCard from './MyCard';
import Loading from './Loading';


export default function NewsDetail(){
    const {page} = useParams()
    const [detail, setDetail] = useState([])
    const [loading,setLoading] = useState(false)
    let history = useHistory()
    let getPage = parseInt(page)

    useEffect(() => {
        const apiGet = async ()=>{
            try {
                setLoading(true)
                const get = await fetch(`https://mangamint.kaedenoki.net/api/manga/page/${getPage}`)
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
    }, [getPage])

    const nextPage = ()=>{
        
        history.push(`/daftar-komik/${getPage + 1}`)
    }

    const previousPage = ()=>{
        if(getPage>1){
            history.push(`/daftar-komik/${getPage-1}`)
            
        }
    }
    return (
       <div>
           {
               loading
               ?<Loading/>
               :
               <>
                <div>
                        <h2>Update Terbaru</h2>
        
                </div>
                
                    <Row className="justify-content-center align-items-center flex-fill">
                        {
                            detail.map((res, key)=>(
                                <Col sm={6} md lg={3}  key={key} >
                                    <Link to={`/detail/${res.type}/${res.endpoint}`}>
                                        <MyCard res={res}/>
                                    </Link>
                                
                                </Col>
                            ))
                        }
                    
                    </Row>
                    <div className="d-flex justify-content-center align-items-center">
                        {
                            getPage > 1?
                                <Button onClick={previousPage}>Sebelumnya</Button>
                            :""
                        }
        
                        <Button onClick={nextPage}>Selanjutnya</Button>
                    </div>
                </>
           }
    
       </div>
    )
}