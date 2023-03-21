import React from 'react'
import programming from '../assets/img/notes.svg'
import { Link } from 'react-router-dom'
import data from './data.json'
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Loader from '../Components/Loader'

const storage = getStorage();
export default function Notes() {
	const [loading, setLoading] = React.useState(false)
	const [syllabus, setSyllabus] = React.useState('')
	React.useEffect(() => {
		setLoading(true)
		const syllabusRef = ref(storage, `/UG-BTECH-CSE-2018.pdf`);
		getDownloadURL(syllabusRef).then((url) => {
			setSyllabus(url)
			setLoading(false)
		}).catch((error) => {
			console.log(error)
		});
	}, [])
				
	return (
		loading ? <Loader /> :
		<>

			<section className="py-4 px-sm-3 px-4 cdin">
				{/* <div className="container "> */}
				<div className="d-sm-flex align-items-center justify-content-between mainc">
					<div className="img-home">
						<h1 className="heading">NOTES<span></span></h1>
						<p className="lead my-4">
							Get started here.
							<br />
						</p>
						<a target='_blank'
				rel="noreferrer"
				href= {syllabus} className=' text-var'>	B.Tech - Syllabus</a>
					</div>
					<img className="img-fluid w-50 d-none d-sm-block" src={programming} alt="in office" />
				</div>
				{/* </div> */}
			</section>
			<div className='px-3 px-sm-5'>
				<div className="container px-sm-5">

					<ul style={{
						listStyleType: 'none',
						padding: '0px',
					}}>
						{data.map((item, index) => {
							return (
								<li key={index}>
									<Link to="/previewnotes" state={{
										name: item.name,
										description: item.description,
										links: item.links,
										contributors: item.contributors
									}} className='text-var notes-link'>
										{item.name}
									</Link>
								</li>
							)
						}
						)}
					</ul>
				</div>
			</div>


		</>
	)
}