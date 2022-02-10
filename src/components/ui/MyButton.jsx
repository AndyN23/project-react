import React, { useState, useEffect } from 'react';
import Http from '../app/http';
import Toast from '../app/toast';

const MyButton = (props) => {
    return(
        <button className='button'>{props.buttonText.text}</button>
    )
}

export default MyButton;