import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import profile from '../assets/img/profile-page.svg';

var dark = false;
export default function UpdateProfile () {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) dark = true;
  const [isDark, setIsDark] = React.useState(dark);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    event.matches ? setIsDark(true) : setIsDark(false);
  });
  const [name, setName ] = useState(
    auth.currentUser.displayName? auth.currentUser.displayName.slice(
      0, auth.currentUser.displayName.indexOf(" ")) : auth.currentUser.email.slice(
        0, auth.currentUser.email.indexOf("@")
      )
    );
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  function handleSubmit (e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    const promises = []
    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history('/profile')
      })
      .catch(() => {
        setError('Failed to update account')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
     <section className="py-4 px-4 px-sm-1 cdin">
      {/* <div className="container "> */}
        <div className="d-sm-flex align-items-center justify-content-between mainc">
        {error && <Alert variant='danger'>{error}</Alert>}
          <div className="img-home">
            <h1 className="heading">{name}</h1>
            <p className="lead my-4">
              Hey {name}, welcome to RESOC!
              Update your password here.
            </p>
          </div>
          <img className="img-fluid w-50 d-none d-sm-block p-5" src={profile} style={{
            marginBlockEnd: "20px",

          }} alt="profiledoc" />
        
      </div>
    </section>
    <div className='px-2 px-sm-5'>
      <div className=" p-sm-2">

         <Form onSubmit={handleSubmit}>
         <Form.Group id='email' className='mb-2'>
           <Form.Label>Email</Form.Label>
           <Form.Control
             type='email'
             ref={emailRef}
             required
             defaultValue={currentUser.email}
           />
         </Form.Group>
         <Form.Group id='password' className='mb-2'>
           <Form.Label>Password</Form.Label>
           <Form.Control
             type='password'
             ref={passwordRef}
             placeholder='Leave blank to keep the same'
           />
         </Form.Group>
         <Form.Group id='password-confirm' className='mb-2'>
           <Form.Label>Password Confirmation</Form.Label>
           <Form.Control
             type='password'
             ref={passwordConfirmRef}
             placeholder='Leave blank to keep the same'
           />
         </Form.Group>
         {isDark ? 
         <button className=" mt-3 btn btn-dark" type='submit'
          >UPDATE
        </button> :
        <button className=" mt-3 btn btn-light" type='submit'
        >UPDATE
      </button> 
        
        }
          </Form>
      </div>

    </div>
    </>
      )
}
