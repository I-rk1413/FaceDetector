import React from 'react';
import './ImageLink.css'

 


const ImageLink=({onInputChange,onSubmit})=>{
   
    return(
        <div>
            <p className='f3'>
                {'This magic Brain will detect faces in your pictures. Give it a try:)'}
            </p>
           <div className='center'>
            <div className='pa4 br3 shadow-5 center form'>
                <input  className='f4 pa2 w-70 center b--2' type='text' onChange={onInputChange} placeholder='Enter a valid Url'   />
                <button className='w-30 dim f4 link ph3 pv2 dib white bg-navy ba br2 ' onClick={onSubmit}>Detect</button>
            </div>
            </div>
            
        </div>
    )
    };
    
    export default ImageLink;