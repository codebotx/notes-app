import React from 'react'
import contributions from '../assets/img/contributions.svg'
import { Subtract } from 'react-bootstrap-icons';
import { Form, Button, Card } from 'react-bootstrap';
export default function Contributions() {
	const [isDark, setIsDark] = React.useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
	const emailRef = React.useRef()
	const passwordRef = React.useRef()
	const nameRef = React.useRef()
	const [loading, setLoading] = React.useState(false)
	React.useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (event) => setIsDark(event.matches ? true : false);
		mediaQuery.addEventListener('change', handleChange);
		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		}
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("foo")
	}
	return (
		<>
			<section className="pt-4 px-4 px-sm-0">
				{/* <div className="container "> */}
				<div className="d-sm-flex align-items-center justify-content-between mainc">
					<div className="img-home">
						<h1 className="heading">Share<span></span></h1>
						<p className="lead my-4">
							Contact us here to contribute to RESOC
						</p>
					</div>
					<img className="img-fluid w-50 d-none d-sm-block" src={contributions} alt="in office" />
				</div>
				{/* </div> */}
			</section>
			<div className='container px-sm-5'>
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
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-2" controlId="formGroupName">
								<Form.Label>Name</Form.Label>
								<Form.Control type="text" ref={nameRef} />
							</Form.Group>
							<Form.Group className="mb-2" controlId="formGroupEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email" ref={emailRef} />
								<div className="mb-3">
									<label for="formFileMultiple" className="form-label">Zip/pdf</label>
									<input className="form-control" type="file" 
									id="formFileMultiple" multiple />
								</div>
							</Form.Group>
							{isDark &&
								<Button disabled={loading} className=' w-100 mt-1 btn btn-dark' type='submit'>Contribute</Button>}
							{!isDark &&
								<Button disabled={loading}
									className=' w-100 mt-1 btn btn-light' type='submit'>Contribute</Button>}

						</Form>

					</Card.Body>
				</Card>
				<div className="py-3">
					<h1 className='mt-3 '> Contributors</h1>
					<div className='mt-3'>
						<ul style={{
							listStyleType: "none",
							paddingLeft: "0"
						}}><li>
								<a href="https://linkedin.com/in/sunil-kumar-panda/" target="_blank" className='text-var' style={{ textDecoration: 'none' }} rel="noreferrer">Sunil Soyabean Panda</a>
						</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
