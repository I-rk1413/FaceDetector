import React from 'react';
import './FaceRecognition.css'


 


const FaceRecognition=({imageURL, box})=>{

    return(
        <div>
        <div className='ma center'>
             <div className='mt2 center absolute'>
                <img id='inputimage' src={imageURL} width='500px' height='auto' alt='' />
                {box.map(item=>(
                    <div className='bounding-box' style={{left:item.leftCol,top:item.topRow,right:item.rightCol,bottom:item.bottomRow}}></div>
            ))}
                
             </div>
            </div>
       
            
            
        </div>
    )
    };
    
    export default FaceRecognition;