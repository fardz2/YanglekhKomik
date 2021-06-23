import { Card , Button } from "react-bootstrap"

export default function MyCard({res }){
    return(
       
           <Card style={{ width: '100%', margin:"auto" }} >
               <Card.Img variant="top" src={res.thumb} />
               <Card.Body>
                   <Card.Title>{res.title}</Card.Title>
                   <Card.Text>
                       <p>{res.updated_on} yang lalu</p>
                       <p>{res.chapter}</p>
                   </Card.Text>
                   <Button variant="primary">Go somewhere</Button>
               </Card.Body>
           </Card>
      
      
     
    )
}