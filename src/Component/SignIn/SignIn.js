import React from 'react';

class SignIn extends React.Component{

constructor(props){
  super(props);
  this.state={
    signInEmail:'',
    signInPassword:''
  }
}



  onEmailChange=(event)=>{
    this.setState({signInEmail:event.target.value})

  }
  onPasswordChange=(event)=>{
    this.setState({signInPassword:event.target.value})

  }

  onSubmitSignIn=()=>{
    if(this.state.signInEmail==='' || this.state.signInPassword===''){
      return alert('Please provide your credentials')
    }
    fetch('https://nameless-tor-61336.herokuapp.com/signin',{
      method:'post',
      headers:{'Content-type': 'application/json'},
      body: JSON.stringify({
        email:this.state.signInEmail,
        password:this.state.signInPassword
      })
    })
    .then(response=>response.json())
    .then(data=>{
      if(data.id){
        this.props.registerUser(data);
        this.props.onRouteChange('Home');
      }
    })
    
  }
  
  render(){
    return(
    <article className="mw7  center bg-transparent br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5 w-250 w-70-m w-30-l">
    <main className="pa4 black-80">
       <div className="measure">
       <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
         <legend className="f1 fw6 ph0 mh0">Sign In</legend>
         <div className="mt3">
           <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
           <input
            onChange={this.onEmailChange}
            className="pa2 input-reset  bg-transparent hover-bg-black hover-white w-150 b--black ba" type="email" name="email-address"  id="email-address"/>
         </div>
         <div className="mv3">
           <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
           <input 
           onChange={this.onPasswordChange}
           className="b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-150" type="password" name="password"  id="password"/>
         </div>
       </fieldset>
       <div className="">
         <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
         type="submit" 
         value="Sign in" 
         onClick={this.onSubmitSignIn}
         />
       </div>
       <div className="lh-copy mt3">
      <p className="f6 link dim black db pointer" onClick={()=>this.props.onRouteChange('Register')}>New User? Register here</p>
      
       </div>
       
     </div>
    </main>
    </article>
    )}
    
}

export default SignIn;