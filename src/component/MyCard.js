import { Card } from "react-bootstrap"

export default function MyCard({res }){
    return(
       
           <Card style={{ width: '100%', margin:"auto" }} >
               <Card.Img variant="top" src={res.thumb} />
               <Card.Body>
                   <Card.Title>{res.title}</Card.Title>
                   <Card.Text>
                        <p>{res.type}</p>
                       {
                           res.updated_on ? 
                            <div className="d-flex justify-content-between">
                                <p>{res.chapter}</p>
                                <p>{res.updated_on } yang lalu </p>
                            </div> : ""
                       }
                           
                   </Card.Text>
               </Card.Body>
           </Card>
      
      
     
    )
}