import { useEffect, useState} from "react";
import { LazyLoadImage  } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { useHistory, useParams ,useLocation} from "react-router-dom";
import { Container } from "react-bootstrap";
import { DiscussionEmbed } from "disqus-react";
import MediaQuery from "react-responsive";
import Loading from "./Loading";




export default function Chapter(){
    const {pathname} = useLocation();
    const [detail, setDetail] = useState([])
    const [getChapter, setChapter] = useState([])
    const [buttonChapter,setButtonChapter] = useState([])
    const [loading, setLoading] = useState(true)
    const [firstChapter , setFirstChapter] = useState("")
    const [endChapter , setEndChapter] = useState("")
    const{chapter ,title } = useParams()
    let history = useHistory()
   
    
    
    

    useEffect(() => {
        const apiGet = async ()=>{
            try {
                setLoading(true)
                const get = await fetch(`https://mangamint.kaedenoki.net/api/chapter/${chapter}/`)
                const response = await get.json()
                const get2 = await fetch(`https://mangamint.kaedenoki.net/api/manga/detail/${title}`)
                const response2 = await get2.json()
                setTimeout(()=>{
                    setDetail(response)
                    setChapter(response2.chapter)
                    setLoading(false)
                },500)
                
               
                
               
            } catch (error) {
                console.log(error)
            }
            

        }
        apiGet()
       
    }, [chapter,title])

    useEffect(()=>{
        let endpoint_chapter
        let previous
        let next
        let resultButton = []
        getChapter.forEach((res, key)=>{
            if(key === getChapter.length -1 ){
                setFirstChapter(res.chapter_endpoint)
            }

            if( key === 0) {
                setEndChapter(res.chapter_endpoint)
            }
            if(decodeURIComponent(res.chapter_endpoint) === detail.chapter_endpoint){
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
            return false
        }).forEach(res =>{
            resultButton.push(res.chapter_endpoint)
        })
        setButtonChapter(resultButton)
       
    },[getChapter,detail])

    
    const changeChapter = (e)=>{
        history.push(`/chapter/${title}/${e.target.value}`);
    }

    const previousChapter = ()=>{
       buttonChapter.forEach((res,key)=>{
            if(key===1){
                history.push(`/chapter/${title}/${decodeURIComponent(res)}`)
                
            }
       })
   
      
        
    }

    const nextChapter = ()=>{
        buttonChapter.forEach((res,key)=>{
            if(key===0){
                history.push(`/chapter/${title}/${decodeURIComponent(res)}`)
               
            }
       })
    }

    return(
       
        <>
             {console.log(pathname)}
             
            {
                loading
                ?
                <Container style={{paddingTop:"100px"}}>
                    <Loading/>
                </Container>
               
                :
                <>
                    
                    <Container className="d-flex justify-content-between my-3" style={{paddingTop:"100px"}} >
                        <div>
                            <select className="form-control" value={detail.chapter_endpoint} onChange={changeChapter}>
                                    {
                                        getChapter.map((res,key)=>(
                                            <option value={ decodeURIComponent(res.chapter_endpoint)}>{res.chapter_title}</option>
                                        ))
                                    }
                            </select>
                        </div>
                        <div className="d-flex justify-content-between">
                            {
                               decodeURIComponent(firstChapter) === detail.chapter_endpoint ? "" :     <button className="btn btn-primary" onClick={previousChapter}>Sebelumya</button>
                            }
    
                            {
                                 decodeURIComponent(endChapter) === detail.chapter_endpoint ? "" :  <button className="btn btn-primary" onClick={nextChapter}>Selanjutnya</button>
                            } 
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
                                            <option value={ decodeURIComponent(res.chapter_endpoint)}>{res.chapter_title}</option>
                                        ))
                                    }
                            </select>
                        </div>
                        <div className="d-flex justify-content-between">
                            {
                               decodeURIComponent(firstChapter) === detail.chapter_endpoint ? "" :     <button className="btn btn-primary" onClick={previousChapter}>Sebelumya</button>
                            }
    
                            {
                                 decodeURIComponent(endChapter) === detail.chapter_endpoint ? "" :  <button className="btn btn-primary" onClick={nextChapter}>Selanjutnya</button>
                            } 
                        </div>
                    </Container>
                    <Container>
                        <DiscussionEmbed
                                shortname='yanglekhkomik'
                                config={
                                    {
                                        url : `https://yanglekhkomik.netlify.app${pathname}`,
                                        identifier : chapter,
                                        title : detail.chapter_name,
                                        language: 'id'
                                        
                                    }
                                
                                }
                        />
                    </Container>
                </>
                
            }
           
        </>
    
    )
}