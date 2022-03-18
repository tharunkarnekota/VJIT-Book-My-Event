import React,{useState} from 'react'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './Dashboard'
import Profile from './Profile'
import Contact from './Contact'
import Admin from './Admin'




const App = () => {
  const [x,setX] = useState(-1);
  return (
    <div>
      <BrowserRouter>

     
       
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/admin' exact component={Admin} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/contact' exact component={Contact} />
      </Switch>

      
      </BrowserRouter>
    </div>
  )
}

export default App
