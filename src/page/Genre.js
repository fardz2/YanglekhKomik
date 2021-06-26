import { useState } from "react"
import { useEffect } from "react"
import Loading from "../component/Loading"
import { Link } from "react-router-dom"
import { Card ,Row , Col } from "react-bootstrap"



export default function Genre(){
    const [loading , setLoading] = useState(true)
    const [genre , setGenre] = useState([])
  
   
    
    useEffect(()=>{
        const apiGet = async ()=>{
            try {
                setLoading(true)
                const get = await fetch("https://mangamint.kaedenoki.net/api/genres")
                const response = await get.json()
             
                setTimeout(()=>{
                    setGenre(response.list_genre)
                    setLoading(false)
                },500)
               
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
        
              
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title>Genre</Card.Title>
                            <Card.Text>
                                <Row>
                                   {
                                        genre.map((res,key)=>(
                                            <Col xs={6} md={4}>
                                                <Link to={`/genre/${res.endpoint}/1`}>
                                                    {res.genre_name}
                                                </Link>
                                               
                                            </Col>
                                        ))
                                   }    
                                </Row>
                            </Card.Text>
                        </Card.Body>
                  </Card>
               
            
            

        }
       
        </>
    )
}