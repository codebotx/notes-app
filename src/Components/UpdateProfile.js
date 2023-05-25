import React, { useRef, useState } from 'react'
import { Form, Alert, } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import profile from '../assets/img/profile-page.svg';
import Loader from './Loader';


export default function UpdateProfile() {
  const [isDark, setIsDark] = React.useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  React.useEffect(() => {
    document.title = 'Update Profile | RESOC'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => setIsDark(event.matches ? true : false);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      document.title = 'NOTES-SIT | RESOC'
      mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const name = auth.currentUser.displayName ? auth.currentUser.displayName : auth.currentUser.email.slice(0, auth.currentUser.email.indexOf('@'));
  const emailRef = useRef()
  const nameRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail, updateProfileName } = useAuth()
  const [error, setError] = useState('')
  const [errorDef, setErrorDef] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  const navigateToProfile = React.useCallback(() => {
    history('/profile')
  }, [history])

  const  handleSubmit = React.useCallback((event) =>{
    event.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }
    const promises = []
    setLoading(true)
    setError('')

    if (nameRef.current.value !== currentUser.displayName) {
      promises.push(updateProfileName(nameRef.current.value))
    }

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }
    const Promise = require('bluebird');
    
    Promise.all(promises)
      .then(() => {
        history('/profile')
      })
      .catch((err) => {
        setError('Failed to update account')
        setErrorDef(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
    
      return () => {
        setError('')
        setErrorDef('')
        setLoading(false)
      }
      
  }, [currentUser.displayName, currentUser.email, history, updateEmail, updatePassword, updateProfileName])
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError('')
      setErrorDef('')
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [error, errorDef])
  if (loading) return <Loader />
  else
    return (
      <>
        <section className="pt-4 px-4 px-sm-1 cdin">
          {error && <Alert variant='danger'>{error}</Alert>}
          {errorDef && <p style={{
            fontStyle: 'italic'
          }}>{errorDef}</p>}
          {/* <div className="container "> */}
          <div className="d-sm-flex align-items-center justify-content-between mainc">
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

        <div className="px-2 px-sm-5"
          style={{
            maxWidth: "500px",
          }}>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGroupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <button className="btn mt-2"
              style={{
                color: '#ff5e5b',
              }}
              type='submit'>UPDATE</button>  {isDark ?
                <button className=" mt-2 btn btn-dark" onClick={navigateToProfile}
                >CANCEL
                </button> :
                <button className=" mt-2 btn btn-light" onClick={navigateToProfile}
                >CANCEL
                </button>}
          </Form>
        </div>
      </>
    )
}
