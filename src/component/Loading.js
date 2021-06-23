import { Spinner } from "react-bootstrap"
export default function Loading(){
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:"500px"}}>
            <Spinner animation="border" />
        </div>
    )
   
}