import { useState, useEffect } from 'react';
import { Link ,useParams, useHistory} from 'react-router-dom';
import { Row , Col, Button} from 'react-bootstrap';
import MyCard from './MyCard';
import Loading from './Loading';


export default function GenreDetail(){
    const {page,genre} = useParams()
    const [detail, setDetail] = useState([])
    const [getGenre, setGenre] = useState([])
    const [nameGenre , setNameGenre] = useState("")
    const [loading,setLoading] = useState(true)
    let history = useHistory()
    let getPage = parseInt(page)

    useEffect(() => {
        const apiGet = async ()=>{
            
            try {
                setLoading(true)
                const get = await fetch(`https://mangamint.kaedenoki.net/api/genres/${genre}/${getPage}`)
                const get2 = await fetch("https://mangamint.kaedenoki.net/api/genres")
                const response = await get.json()
                const response2 = await get2.json()
             
                setTimeout(()=>{
                    setDetail(response.manga_list)
                    setGenre(response2.list_genre)
                    setLoading(false)
                },500)

               
                
               
            } catch (error) {
                console.log(error)
            }
            
        }
        apiGet()
    }, [getPage,genre])

    useEffect(()=>{
        getGenre.forEach((res, key) =>{
            if(res.endpoint === genre){
                setNameGenre(res.genre_name)
            }
        })
       
    },[genre , getGenre])

    const nextPage = ()=>{
        
        history.push(`/genre/${genre}/${getPage + 1}`)
    }

    const previousPage = ()=>{
        if(getPage>1){
            history.push(`/genre/${genre}/${getPage-1}`)
            
        }
    }

    let previous
    let next 
    if(detail.length === 20){
       previous = getPage > 1 ? <Button onClick={previousPage}>Sebelumnya</Button>:"" 
       next =  <Button onClick={nextPage}>Selanjutnya</Button>
    }

   
    return (
       <div>
         
           {
               
               loading
               ?<Loading/>
               :
               <>
                <div>
                        <h2>{nameGenre}</h2>
        
                </div>
                
                    <Row className="justify-content-center align-items-center flex-fill">
                        {
                            detail?.map((res, key)=>(
                                <Col sm={6} md lg={3}  key={key} >
                                    <Link to={`/detail/${res.type}/${res.endpoint}`}>
                                        <MyCard res={res}/>
                                    </Link>
                                
                                </Col>
                            ))
                        }
                    
                    </Row>
                    <div className="d-flex justify-content-center align-items-center">
                        {previous}
                        {next}
                    </div>
                </>
           }
    
       </div>
    )
}