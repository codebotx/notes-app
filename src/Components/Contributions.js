import React from 'react'
import contributions from '../assets/img/contributions.svg'
import { Form, Card } from 'react-bootstrap';
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { CloudUploadFill } from 'react-bootstrap-icons';
import 'firebase/compat/firestore'
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import emailjs from '@emailjs/browser';

const firestore = firebase.firestore();
const storage = getStorage();

export default function Contributions() {
	React.useEffect(() => {
		document.title = 'Contributions | RESOC'
		console.log(process.env.REACT_APP_EMAIL_JS_SERVICE_ID)
		console.log(process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID)
		console.log(process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY)
		return () => {
			document.title = 'NOTES-SIT | RESOC'
		}
	}, []);
	const name = auth.currentUser.displayName ? auth.currentUser.displayName : auth.currentUser.email.slice(0, auth.currentUser.email.indexOf('@'));
	const email = auth.currentUser.email;
	const [isDark, setIsDark] = React.useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
	const [selectedFile, setSelectedFile] = React.useState(null);
	const [errdef, setErrdef] = React.useState('')
	const [status, setStatus] = React.useState('')
	var progress = 0;

	React.useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (event) => setIsDark(event.matches ? true : false);
		mediaQuery.addEventListener('change', handleChange);
		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		}
	}, []);
	const [downloadURL, setDownloadURL] = React.useState(null);

	const handleSubmit = (e) => {
		e.preventDefault()
		if (selectedFile.size > 100000000) {
			setErrdef('File size is too large. Please upload a file less than 100 MB');
			return;
		}

		// Get the file from the input element
		const file = selectedFile;
		// Create the file metadata
		const metadata = {
			contentType: file.type
		};
		// Upload file and metadata to the object 'images/mountains.jpg'
		const storageRef = ref(storage, 'uploads/' + file.name);
		const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		uploadTask.on('state_changed',
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				progress = progress.toFixed(2);
				console.log('Upload is ' + progress + '% done');
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused');
						setStatus('Upload is paused');
						break;
					case 'running':
						setStatus('Upload is running ' + progress + ' % done');
						console.log('Upload is running');
						break;
					default:
						setStatus('Upload is ' + progress + '% done');
				}
			},
			(error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				switch (error.code) {
					case 'storage/unauthorized':
						setErrdef('User doesn\'t have permission to access the object');
						break;
					case 'storage/canceled':
						// User canceled the upload
						setErrdef('User canceled the upload');
						break;
					case 'storage/unknown':
						// Unknown error occurred, inspect error.serverResponse
						setErrdef('Unknown error occurred, inspect error.serverResponse');
						break;
					default:
						setErrdef('Unknown error occurred, inspect error.serverResponse');
				}
			},
			() => {
				setErrdef('');
				setStatus('Upload is ' + progress + '% done');
				// Upload completed successfully, now we can get the download URL
				const { uid } = auth.currentUser;
				firestore
					.collection("Contributions")
					.doc(uid)
					.collection("submits")
					.add({
						name: name,
						email: email,
						filename: file.name,
					});
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setDownloadURL(downloadURL);
					console.log('File available at', downloadURL);
				});
				emailjs.send(
					process.env.REACT_APP_EMAIL_JS_SERVICE_ID
					, process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID, {
					name: name,
					email: email,
					receiver: process.env.REACT_APP_EMAIL_ADMIN,
					filename: file.name,
					downloadURL: downloadURL,
				}, process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY)
					.then((result) => {
						console.log(result.text);
					}, (error) => {
						console.log(error.text);
					}
					);
			},
		);
	};
	React.useEffect(() => {
		const timeoutId = setTimeout(() => {
			setErrdef('')
		}, 3000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [errdef])

	React.useEffect(() => {
		const timeoutId = setTimeout(() => {
			setStatus('')
		}, 3000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [status])


	return (
		<>
			<section className="py-4 px-4 px-sm-0">
				{/* <div className="container "> */}
				<div className="d-sm-flex align-items-center justify-content-between mainc">
					<div className="img-home">
						<h1 className="heading">Share<span></span></h1>
						<p className="lead my-4">
							Contact us here to share your notes and contribute to RESOC
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
						{
							errdef &&
							<div className="alert alert-danger" role="alert">
								{errdef}
							</div>
						}
						{
							status &&
							<div className="alert alert-success" role="alert">
								{status}
							</div>
						}
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-2" controlId="formGroupName">
								<Form.Label>Name</Form.Label>
								<Form.Control type="text" value={name} disabled={true} />
							</Form.Group>
							<Form.Group className="mb-2" controlId="formGroupEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email" value={email} disabled={true} />
							</Form.Group>
							<div className="mb-3">
								<div className="input-group">
									<input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"
										// value={selectedFile}
										onChange={(e) => setSelectedFile(e.target.files[0])}
										// ref={fileRef}
										aria-label="Upload" />
									{isDark &&
										<button disabled={selectedFile === null ? true : false && selectedFile.size < 100000000}
											className="btn btn-outline-secondary btn-dark w-100 mt-2" style={{
												color: 'var(--text-var)'
											}} type="submit" id="inputGroupFileAddon04">Upload <CloudUploadFill /></button>}
									{!isDark &&
										<button disabled={selectedFile === null ? true : false &&
											selectedFile.size < 100000000
										}
											className="btn btn-outline-secondary btn-light w-100 mt-2" style={{
												color: 'var(--text-var)',
											}} type="submit" id="inputGroupFileAddon04">Submit request <CloudUploadFill /></button>}
								</div>
							</div>
						</Form>
						<p>

							{downloadURL ?
								<span> Here is the <b><a href={downloadURL} target='_blank' rel='noreferrer noopener' className='text-var'> download link.</a></b>
								</span>
								: <span>You'll get your file link for you to share with friends here.</span>}
						</p>
						<p>
							Please upload your file (less than 100 MB) in a pdf format or a zip file of pdfs <b>only</b>.
							<br />
							Please go through the <Link to='/community-guidelines' className='text-var'>contributions guidelines</Link> before submitting a request.
						</p>
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
							<li>
								<a href="https://www.linkedin.com/in/ananya-satpathy-98529a122" target="_blank" className='text-var' style={{ textDecoration: 'none' }} rel="noreferrer">Ananya Satapathy</a>
							</li>
							<li>
								<a href="https://www.linkedin.com/in/abhinav-singh-11b748213" target="_blank" className='text-var' style={{ textDecoration: 'none' }} rel="noreferrer">Abhinav Singh</a>
							</li>
							<li>
								<a href="https://www.linkedin.com/in/jauharahmad75/" target="_blank" className='text-var' style={{ textDecoration: 'none' }} rel="noreferrer">Jauhar Ahemad</a>
							</li>
							<li>
								<a href="https://www.linkedin.com/in/d-raj-sekhar-44a12a1b4/" target="_blank" className='text-var' style={{ textDecoration: 'none' }} rel="noreferrer">David Raj Sekhar</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
