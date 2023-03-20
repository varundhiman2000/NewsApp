import './App.css'
import React from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export class App extends Component  {
  state={
    progress:0
  }
  // apiKey="66351c0a7bf14d07a0a5c42787d39a7f"
  apiKey=process.env.REACT_APP_NEWS_API;
  setProgress=(progress)=>{
    this.setState({
       progress:progress
    })
  }
  render(){
  return (
    <div>

      <Router>
            <LoadingBar color='#f11946'progress={this.state.progress}/>
          <Navbar />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey}key='home' pageSize={12} country='us' category='general' />}></Route>
            <Route path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey}key='business' pageSize={12} country='us' category='business' />}></Route>
            <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey}key='entertainment' pageSize={12} country='us' category='entertainment' />}></Route>
            <Route path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey}key='health' pageSize={12} country='us' category='health' />}></Route>
            <Route path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey}key='science' pageSize={12} country='us' category='science' />}></Route>
            <Route path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey}key='sports' pageSize={12} country='us' category='sports' />}></Route>
            <Route path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey}key='technology' pageSize={12} country='us' category='technology' />}></Route>
          </Routes>
        </Router>
    </div>
  )
}
}
export default App







