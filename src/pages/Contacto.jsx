import React from 'react'
import './estiloContacto.css'

const Contacto = () => {
  return (
    <div>
      <h2>Contáctanos</h2>
      <br />
      <div className='contacto'>
           <p>Puedes ponerte en contacto con nosotros de las siguientes maneras:</p>
           <br />
      <ol>
        <li><a href="tel:+1234567890"><strong>Teléfono:</strong></a></li>
        <li><a href="mailto:info@ejemplo.com"><strong>Correo electrónico:</strong></a></li>
        <li><strong>Redes sociales:</strong> Facebook, Twitter, Instagram</li>
      </ol>
      </div>
   
    </div>
  )
}

export default Contacto