import { useEffect, useState} from "react";
import { LazyLoadImage  } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { useHistory, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import MediaQuery from "react-responsive";




export default function Chapter(){
    const [detail, setDetail] = useState([])
    const [getChapter, setChapter] = useState([])
    const [buttonChapter,setButtonChapter] = useState([])
    const [loading, setLoading] = useState(false)
    const{chapter ,title} = useParams()
    let history = useHistory()
    let endpoint_chapter
    let previous
    let next
    let resultButton = []
    

    useEffect(() => {
        const apiGet = async ()=>{
            try {
                setLoading(true)
                const get = await fetch(`https://mangamint.kaedenoki.net/api/chapter/${chapter}/`)
                const response = await get.json()
                const get2 = await fetch(`https://mangamint.kaedenoki.net/api/manga/detail/${title}`)
                const response2 = await get2.json()
                setDetail(response)
                setChapter(response2.chapter)
                setLoading(false)
               
                
               
            } catch (error) {
                console.log(error)
            }
            

        }
        apiGet()
    }, [chapter,title])

    useEffect(()=>{
        getChapter.map((res, key)=>{
            if(res.chapter_endpoint === detail.chapter_endpoint){
                 endpoint_chapter= key
                 if (endpoint_chapter !==0){
                     previous = endpoint_chapter -1
                     next = endpoint_chapter + 1
                 }else if(endpoint_chapter === 0){
                    previous = endpoint_chapter
                    next = endpoint_chapter + 1
                 }
            }
        })

        getChapter.filter((res,key)=>{
            if(previous === key || next === key){
                return res
            }
        }).map(res =>{
            resultButton.push(res)
        })
        setButtonChapter(resultButton)
    },[getChapter])

    
    const changeChapter = (e)=>{
        history.push(`/chapter/${title}/${e.target.value}`);
    }

    const previousChapter = ()=>{
       buttonChapter.map((res,key)=>{
            if(key===1){
                history.push(`/chapter/${title}/${res.chapter_endpoint}`)
            }
       })
    }

    const nextChapter = ()=>{
        buttonChapter.map((res,key)=>{
            if(key===0){
                history.push(`/chapter/${title}/${res.chapter_endpoint}`)
            }
       })
    }

   
   
     
       
   

    return(
        
        <div>
           
            {
                loading
                ?
                <Container style={{paddingTop:"100px"}}>
                    <h1>loading</h1>
                </Container>
               
                :
                <>
                    
                    <Container className="d-flex justify-content-between my-3" style={{paddingTop:"100px"}} >
                        <div>
                            <select className="form-control" value={detail.chapter_endpoint} onChange={changeChapter}>
                                    {
                                        getChapter.map((res,key)=>(
                                            <option value={res.chapter_endpoint}>{res.chapter_title}</option>
                                        ))
                                    }
                            </select>
                        </div>
                        <div>
                        
                            <button className="btn btn-primary mr-1" onClick={previousChapter}>Kembali</button>
                            <button className="btn btn-primary" onClick={nextChapter}>Selanjutnya</button>
                        </div>
                    </Container>
                  
                    <MediaQuery minDeviceWidth={759} >
                        <Container >              
                            <div className="text-center">
                                {
                                    detail.chapter_image?.map((res,key)=>(
                                        <LazyLoadImage
                                            alt='chapter'
                                            effect="opacity"
                                            src={res.chapter_image_link} 
                                            key={key}
                                            max-width= "100%"
                                            className="img-fluid"
                                            />
                                    ))
                                }
                                
                                
                            </div>
                        </Container> 
                    </MediaQuery> 
                    <MediaQuery minDeviceWidth={300} >
                                   
                            <div className="text-center">
                                {
                                    detail.chapter_image?.map((res,key)=>(
                                        <LazyLoadImage
                                            alt='chapter'
                                            effect="opacity"
                                            src={res.chapter_image_link} 
                                            key={key}
                                            max-width= "100%"
                                            className="img-fluid"
                                            />
                                    ))
                                }
                                
                                
                            </div>
                        
                    </MediaQuery> 
                    <Container className="d-flex justify-content-between my-3" style={{paddingTop:"100px"}} >
                        <div>
                            <select className="form-control" value={detail.chapter_endpoint} onChange={changeChapter}>
                                    {
                                        getChapter.map((res,key)=>(
                                            <option value={res.chapter_endpoint}>{res.chapter_title}</option>
                                        ))
                                    }
                            </select>
                        </div>
                        <div>
                        
                            <button className="btn btn-primary mr-1" onClick={previousChapter}>Kembali</button>
                            <button className="btn btn-primary" onClick={nextChapter}>Selanjutnya</button>
                        </div>
                    </Container>
                </>
                
            }
           
        </div>
    
    )
}