import React from 'react';
import Navigation from './Component/Navigation/Navigation'
import Logo from './Component/Logo/Logo';
import ImageLink from './Component/ImageLink/ImageLink'
import Rank from './Component/Rank/Rank'
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/Register/Register'

const app = new Clarifai.App({
  apiKey: '65630fcbe6a1433881006f22888aa3a9'
 });
 

class App extends React.Component {

constructor(){
  super();
  this.state={
    input:'',
    imageURL:'',
    box:{},
    route: 'SignIn',
    SignedIn: false,
    user:{
      id:'',
      name:'',
      email:'',
      password:'',
      entries:0,
      joined: ''
    }
  }
}



onInputChange=(event)=>{
  this.setState({input: event.target.value})
  
}

calculateFaceLocation=(data)=>{
 const Face= data.outputs[0].data.regions[0].region_info.bounding_box;
 const image=document.getElementById('inputimage');
 const width=Number(image.width);
 const height=Number(image.height);
 return {
   leftCol:Face.left_col*width,
   topRow:Face.top_row*height,
   rightCol:width-(Face.right_col*width),
   bottomRow: height-(Face.bottom_row*height)
 }

}

displayBox=(box)=>{
  console.log(box);
this.setState({box:box});
}
 
onSubmit=()=>{
  this.setState({imageURL:this.state.input})
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(response=>{
     if(response){
      fetch('http://localhost:3006/image', {
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

      
    }
  this.displayBox(this.calculateFaceLocation(response))
  .catch(err=>console.log(err))
  
  
})}

onRouteChange=(route)=>{
  if(route==='SignIn'){
    this.setState({SignedIn:false})
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
