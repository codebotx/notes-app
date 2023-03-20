import React from 'react'
import programming from '../assets/img/programming.svg'
import { Link } from 'react-router-dom'
// const data = React.lazy(() => import('./data.json'))
import data from './data.json'
export default function Notes() {
	return (
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
						<a href="/static/notes/UG-BTECH-CSE-2018.pdf" className=' text-var'>	B.Tech - Syllabus</a>
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