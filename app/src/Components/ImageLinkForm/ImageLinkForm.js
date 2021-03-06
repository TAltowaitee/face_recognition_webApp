import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
    return (
        <div className = "pa4">
            <p className = 'f3 white '>
                {'This Magic Brain will detected faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}></input>
                    <button className='w-30 grow f4  ph3 pv2 dib white bg-navy' onClick={onButtonSubmit}>Detect</button>
                </div>
                
            </div>
          
        </div>
    );
}

export default ImageLinkForm;