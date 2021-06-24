import { Link } from "react-router-dom"
export default function PageNotFound(){
    return(
        <div className=" d-flex justify-content-center align-items-center flex-column position-absolute fixed-top fixed-bottom bg-white">
            <h3>Page Tidak Ditemukan</h3>
            <p>Kembali ke halama <Link to="/">Utama</Link></p>
        </div>
    )
}