import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/swiper.scss';




// install Swiper modules

export default function HotKomik({populerManga}){
    return (
        <div>
            <h1>Hot Komik</h1>   
            <Swiper
                spaceBetween={10}
                slidesPerView={2}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                freeMode={true}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                       
                      },
                      640: {
                        slidesPerView: 4,
                        
                      }
                }}
                >
                    {
                        populerManga.map((res,key)=>(
                            <SwiperSlide key={key} className="mySwiper" >
                                <Link to={`/detail/${res.type}/${res.endpoint}`}>
                                    <div className="d-flex flex-column " >
                                        <div className=" " >
                                            <img src={res.thumb} className="img-fluid" alt="terserah" />
                                        </div>
                                        <div className="" >
                                            <p  style={{overflow:'hidden',height:'22px'}}>{res.title}</p>
                                            <p>{res.type}</p>
                                            <p>{res.upload_on}</p>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
            </Swiper>   
    
        </div>
    )
}