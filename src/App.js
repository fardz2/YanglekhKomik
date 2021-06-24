import React  from 'react';
import MyNav from './component/MyNav';
import Home from './page/Home';
import Chapter from './component/Chapter';
import NewsDetail from './component/NewsDetail';
import Details from './component/Details';
import PageNotFound from './component/PageNotFound';
import SearchManga from './component/SearchManga';
// import About from './About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// const Home = lazy(()=>import('./page/Home'));
// const Chapter = lazy(() => import('./component/Chapter'));
// const NewsDetail = lazy(()=>import('./component/NewsDetail'));
// const Details = lazy(()=>import('./component/Details'));
// const PageNotFound = lazy(() => import('./component/PageNotFound'))
// const SearchManga = lazy(()=>import('./component/SearchManga'))


function App() {
  return ( 
    <Router>
      <MyNav/>
        <Switch>
            
              <Route exact path="/">
                <Container style={{paddingTop:"100px"}}>
                    <Home />
                </Container>
              </Route>
              <Route path="/404" component={PageNotFound}/>
              <Route  path="/search" >
                <Container style={{paddingTop:"100px"}}>
                  <SearchManga/>
                </Container>  
              </Route>
              <Route exact path="/detail/:type/:title">
                <Container style={{paddingTop:"100px"}}>
                  <Details/>
                </Container>
              </Route>
              <Route path="/detail/:type/:title/:chapter">
                  <Chapter/>   
              </Route>
              <Route exact path="/daftar-komik/:page" >
                <Container style={{paddingTop:"100px"}}>
                  <NewsDetail/>
                </Container>  
              </Route>
              {/* <Route  exact path="*">
                  <Container style={{paddingTop:"100px"}}>
                    <h2>Halaman Tidak ditemukan</h2>
                  </Container>
              </Route> */}
              
              <Redirect exact={true} from="*" to="/404" />
          
              
          </Switch> 
    </Router>


  )
}

export default App;