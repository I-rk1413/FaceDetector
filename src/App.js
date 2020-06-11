import React from 'react';
import Navigation from './Component/Navigation/Navigation'
import Logo from './Component/Logo/Logo';
import ImageLink from './Component/ImageLink/ImageLink'
import Rank from './Component/Rank/Rank'
import './App.css';
import Particles from 'react-particles-js';

import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register'


 const initialState= {
  input:'',
  imageURL:'',
  box:[],
  route: 'SignIn',
  SignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    password:'',
    entries:0,
    joined: ''
  }}

class App extends React.Component {

constructor(){
  super();
  this.state= initialState;
  
}



onInputChange=(event)=>{
  this.setState({input: event.target.value})
  
}

calculateFaceLocation=(data)=>{
const FaceArray=data.outputs[0].data.regions;

const coordinates=FaceArray.map(item=>{
 const Face= item.region_info.bounding_box;
 const image=document.getElementById('inputimage');
 const width=Number(image.width);
 const height=Number(image.height);
 return {
   leftCol:Face.left_col*width,
   topRow:Face.top_row*height,
   rightCol:width-(Face.right_col*width),
   bottomRow: height-(Face.bottom_row*height)
 }

})
return coordinates;
 }



displayBox=(box)=>{
  this.setState({box:box});
}
 
onSubmit=()=>{
  this.setState({imageURL:this.state.input})
   fetch('https://nameless-tor-61336.herokuapp.com/apiHandler', {
        method:'post',
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify({
          input:this.state.input
        })
      })
   .then(response=>response.json())
   .then(response=>{
     if(response){
      fetch('https://nameless-tor-61336.herokuapp.com/image', {
        method:'put',
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify({
          id:this.state.user.id
        })
      })
      .then(response=>response.json())
      .then(count=>{
        this.setState(Object.assign(this.state.user,{entries:count}))
      })
      .catch(console.log)}
  this.displayBox(this.calculateFaceLocation(response))
  
  
  
})}

onRouteChange=(route)=>{
  if(route==='SignIn'){
    this.setState(initialState)
  }
  else if(route==='Home'){
    this.setState({SignedIn:true})
  }
  this.setState({route:route})
}


registerUser=(data)=>{
  this.setState({user:{
    id:data.id,
    name:data.name,
    email:data.email,
    password:data.password,
    entries:data.entries,
    joined: data.joined
  }})

}






  render(){
  return (
    <div className="App">
    <Particles className='particles'/>
     <Navigation onRouteChange={this.onRouteChange} SignedIn={this.state.SignedIn}/>
     {this.state.route==='Home' ? 
     <div>
     <Logo />
     <Rank name={this.state.user.name} entries={this.state.user.entries}/>
     <ImageLink onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
     <FaceRecognition imageURL={this.state.imageURL} box={this.state.box} />
     </div> :
     (this.state.route==='SignIn' ?
     <SignIn onRouteChange={this.onRouteChange} registerUser={this.registerUser} />  :
     <Register onRouteChange={this.onRouteChange} registerUser={this.registerUser}/>
     )}
     
    
     
    </div>
  );}
}

export default App;
