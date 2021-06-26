import { Link } from 'react-router-dom';
import { Row , Col,} from 'react-bootstrap';
import MyCard from './MyCard';

export default function News({updateManga}){
    return (
       <div>
           <div className="d-flex justify-content-between align-items-center">
                <h2>Update Terbaru</h2>
                <Link to={`/daftar-komik/1`}>
                    View All
                </Link>
           </div>
           
            <Row className="justify-content-center align-items-center ">
                {
                    updateManga.map((res, key)=>(
                        <Col sm={6} md lg={3} >
                            <Link to={`/detail/${res.type}/${res.endpoint}`}>
                                <MyCard res={res}/>
                            </Link>
                           
                        </Col>
                    ))
                }
            </Row>
            
       </div>
    )
}