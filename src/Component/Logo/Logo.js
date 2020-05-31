import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png'
 


const Logo=()=>{
   
    return(
        <div className='ma4 mt0'>
           <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 160, width: 160 }} >
           <div className="Tilt-inner pa3" ><img src={brain} alt="Logo" style={{paddingTop:'10px'}}/></div>
          </Tilt>
        </div>
    )
    };
    
    export default Logo;