import React from 'react';
import './FaceRecognition.css'


 


const FaceRecognition=({imageURL, box})=>{
   
    return(
        <div>
            <div className='ma center'>
             <div className='mt2 center absolute'>
                <img id='inputimage' src={imageURL} width='500px' height='auto' alt='' />
                <div className='bounding-box' style={{left:box.leftCol,top:box.topRow,right:box.rightCol,bottom:box.bottomRow}}></div>
             </div>
            </div>
            
        </div>
    )
    };
    
    export default FaceRecognition;