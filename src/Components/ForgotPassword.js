import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import Loader from './Loader'
export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [errorDef, setErrorDef] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch (e) {
      setError('Failed to reset password \n')
      setErrorDef(e.message)

    }

    setLoading(false)
  }
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError('')
      setErrorDef('')
    }, 3000)
  
    return () => {
      clearTimeout(timeoutId)
    }
  }, [error, errorDef])

  if(loading) return (<Loader />
  )
  else
  return (
    <>
      <Container className='d-flex align-items-center justify-content-center h-100' style={{ minHeight: '80vh' }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Card
            style={{
              borderRadius: '1rem',
              borderColor: 'var(--text-var)',
              borderWidth: '1px',
              borderStyle: 'dashed',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--bg-dark)'
            }}
          >
            <Card.Body className='text-var'>
              <h2 className='text-center mb-4'>Password Reset</h2>
              {error && <Alert variant='danger'>{error}</Alert>}
              {errorDef && <p style={{
                fontStyle: 'italic'
              }}>{errorDef}</p>}
              {message && <Alert variant='success'>{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' ref={emailRef} required />
                </Form.Group>
                <button disabled={loading} className="btn w-100 mt-2"
                  style={{
                    color: '#ff5e5b',
                  }}
                  type='submit'>Reset Password</button>

              </Form>
              <div className='w-100 text-center mt-3'>
                <Link to='/login' className='text-var'>Login</Link>
              </div>
            </Card.Body>
          </Card>
          <div className='w-100 text-center mt-3'>
            Need an account? <Link to='/signup' className='text-var'>Sign Up</Link>
          </div>
        </div>
      </Container>
    </>
  )
}
