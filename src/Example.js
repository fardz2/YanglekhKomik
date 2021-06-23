import {
    useEffect,
    useState
} from 'react';
import {
    ListGroup,
    Container
} from 'react-bootstrap';
export default function Example() {
    const [data, setData] = useState([])


    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(data => data.json())
            .then(result => setData(result))
    }, [])

    return ( 
        < Container  >
            < ListGroup > 
            {
                data.map((e,i) => {
                    return <ListGroup.Item key={i}> { e.title} </ListGroup.Item>
                })
            }
            
            </ListGroup> 
        </Container>
        


    )
}