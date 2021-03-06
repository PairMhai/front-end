import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './CSS/index.css';

import Highlight from './pages/Highlight'
import Home from './pages/Home'
import Material from './pages/Material'
import Design from './pages/Design'
import Contact from './pages/Contact'
import Information from './pages/Information'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import MatDetail from './pages/MatDetail'
import DesDetail from './pages/DesDetail'
import Profile from './components/Profile'
import Cart from './components/Cart'
import Payment from './components/Payment'
import Promotion from './components/Promotion'
import History from './components/History'
import EditProfile from './pages/EditProfile'

import './CSS/index.css';

import ResetPassword from './pages/ConfirmResetPass'


ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Highlight}/>
      <Route path='/home' component={Home}/>
      <Route exact path='/contactus' component={Contact}/>
      <Route exact path='/signup' component={SignUp}/>
      <Route exact path='/signin' component={SignIn}/>
      <Route path='/cart' component={Cart}/>
      <Route path='/payment' component={Payment}/>
      <Route exact path='/promotion' component={Promotion}/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/info' component={Information}/>
      <Route exact path='/material' component={Material}/>
      <Route exact path='/design' component={Design}/>
      <Route exact path="/history" component={History}/>
      <Route exact path="/mat/" component={Material}/>
      <Route exact path="/des/" component={Design}/>
      <Route path="/mat/:id" component={MatDetail}/>
      <Route path="/des/:id" component={DesDetail}/>
      <Route path="/edit_profile" component={EditProfile}/>
      <Route path="/password/reset/:uid/:token" component={ResetPassword}/>
    </Switch>
  </BrowserRouter>
)     
,document.getElementById('root'));
