import React from 'react';
import './Register.css';


class Register extends React.Component{

  constructor(props){
    super(props);
    this.state={
      registerEmail:'',
      registerPassword:'',
      registerName:''
    }
  }

  onEmailRegister=(event)=>{
    this.onemailChange(event);
    this.setState({registerEmail  :event.target.value})

  }
  onPasswordRegister=(event)=>{
    this.onPasswordChange(event);
    this.setState({registerPassword:event.target.value})

  }
  onNameRegister=(event)=>{
    this.setState({registerName:event.target.value})

  }

  onRegister=()=>{
    if(this.state.registerName==='' || this.state.registerEmail==='' || this.state.registerPassword===''){
      return alert('Please fill all the details properly')
    }
    fetch('https://nameless-tor-61336.herokuapp.com/register',{
      method:'post',
      headers:{'Content-type': 'application/json'},
      body: JSON.stringify({
        email:this.state.registerEmail,
        password:this.state.registerPassword,
        name:this.state.registerName
      })
    })
    .then(response=>response.json())
    .then(data=>{ 
      this.props.registerUser(data);
      this.props.onRouteChange('SignIn');
      
    })
    
  }

  checkValidity=(check,functionName)=>{
    let submitButton=document.getElementById('submitButton');
  

     if(check){
         functionName.style.display='none';
         submitButton.disabled=false;
      }
      else{
        functionName.style.display='block';
        submitButton.disabled=true;
      }
  }
  


  onemailChange=(event)=>{
 
   let emailCheck=document.getElementsByClassName('emailCheck');
   let  Input=event.target.value;
   let pattern = /^[\w]+@gmail\.com$/;
   let check=pattern.test(Input);
   this.checkValidity(check,emailCheck[0])
  }
  onPasswordChange=(event)=>{
   
    let passwordCheck=document.getElementsByClassName('passwordCheck');
    let  Input=event.target.value;
    let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%&]).{6,2000}$/;
    let check=pattern.test(Input);
   this.checkValidity(check,passwordCheck[0])
   }
 

   render(){
    return(
      <article className="mw7 center bg-transparent br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5 w-250 w-70-m w-30-l">
      <main className="pa4 black-80">
         <div className="measure">
         <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
           <legend className="f1 fw6 ph0 mh0">Register</legend>
           <div className="mt3">
             <label className="db fw6 lh-copy f4" htmlFor="Name">Name</label>
             <input
               onChange={this.onNameRegister}
              className="pa2 input-reset  bg-transparent hover-bg-black hover-white w-150 b--black ba" type="text" name="Name"  id="Name"/>
           </div>
           <div className="mt3">
             <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
             <input 
             onChange={this.onEmailRegister}
             className="pa2 input-reset  bg-transparent hover-bg-black hover-white w-150 b--black ba" type="email" name="email-address"  id="email-address"/>
             <p className='emailCheck'>Please enter a Valid E-mail id.</p>
           </div>
           <div className="mv3">
             <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
             <input
             onChange={this.onPasswordRegister}
              className="b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-150" type="password" name="password"  id="password"/>
              <p className='passwordCheck'>Your password should contain lowercase and uppercase alphabet,special symbol and a 
              number and should be greater than 6 character</p>
           </div>
         </fieldset>
         <div className="">
           <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
           type="submit" 
           value="Register" 
           id="submitButton" 
           onClick={this.onRegister}
           />
         </div>
         
       </div>
</main>
      </article>
      )
   }
   
}

export default Register;