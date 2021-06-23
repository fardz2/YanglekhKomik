import React from 'react';
import MyNav from './component/MyNav';
import Home from './page/Home';
import Chapter from './component/Chapter';
import NewsDetail from './component/NewsDetail';
// import About from './About';
import Details from './component/Details';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



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
              <Route  path="/chapter/:title/:chapter">
                  <Chapter/>
              </Route>
              <Route  path="/daftar-komik/:page" >
                <Container style={{paddingTop:"100px"}}>
                  <NewsDetail/>
                </Container>  
              </Route>
              <Route  path="/:type/:title">
                <Container style={{paddingTop:"100px"}}>
                  <Details/>
                </Container>
               
              </Route>
                <Route path="*">
                    <h2>tidak ada</h2>
                </Route>
          </Switch> 
    </Router>


  )
}

export default App;