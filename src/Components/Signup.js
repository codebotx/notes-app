import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import Loader from './Loader'

export default function Signup() {
  React.useEffect(() => {
		document.title = 'Sign Up | RESOC'
		return () => {
			document.title = 'NOTES-SIT | RESOC'
		}
	}, []);
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [errorDef, setErrorDef] = useState('')
  const [loading, setLoading] = useState(false)
  // const history = useNavigate()

  const handleSubmit = React.useCallback(async (event) => {
    event.preventDefault()
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setErrorDef('')
      setLoading(true)
      const name = nameRef.current.value
      const user = await signup(emailRef.current.value, passwordRef.current.value)

      await user.user.updateProfile({
        displayName: name,
        photoURL: `https://api.dicebear.com/5.x/croodles/svg?seed=${name}&radius=50`
      })
      // history('/')
    } catch (err) {
      setError('Error signing up')
      if (err.code === 'auth/email-already-in-use') setErrorDef('Email already in use')
      else if (err.code === 'auth/invalid-email') setErrorDef('Invalid email')
      else if (err.code === 'auth/operation-not-allowed') setErrorDef('Operation not allowed')
      else if (err.code === 'auth/weak-password') setErrorDef('Weak password')
      else if (err.code === 'auth/too-many-requests') setErrorDef('Too many requests. Try again later')
      else if (err.code === 'auth/user-disabled') setErrorDef('User disabled')

      else setErrorDef(err.message)
    }
    setLoading(false)
    return null
  }, [signup])
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError('')
      setErrorDef('')
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [error, errorDef])

  if (loading) return (<Loader />)
  else return (
    
      <Container className='d-flex align-items-center justify-content-center h-100' style={{ minHeight: '80vh' }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Card style={{
            borderRadius: '0.5rem',
            borderColor: 'var(--text-var)',
            borderWidth: '1px',
            borderStyle: 'dashed',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--bg-dark)'
          }}>
            <Card.Body className='text-var'>
              <h1 className='text-center m-4'>Sign Up</h1>
              {error && <Alert variant='danger' className='text-center'>{error}</Alert>}
              {errorDef && <p style={{
                fontStyle: 'italic'
              }}>{errorDef}</p>}

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
                  <Form.Control type="password" ref={confirmPasswordRef} />
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-1 btn btn-primary' type='submit'>Sign Up</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/login' className='text-var'>Log In</Link>
          </div>
        </div>
      </Container>
   
  )
}
