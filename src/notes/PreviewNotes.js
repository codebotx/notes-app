import React from 'react'
import { useLocation } from 'react-router-dom';
import ufo from '../assets/img/preview.png'

function PreviewNotes(props) {
	const location = useLocation();

	const { name, description } = location?.state;
	const [links, setLinks] = React.useState([])
	const [contributors, setContributors] = React.useState([])

	React.useEffect(() => {
		const links = []
		const contributors = []
		if (location.state?.contributors) {
			location.state.contributors.forEach(contributor => {
				contributors.push(<li><a href={
					contributor[1]
				} className='text-var'>{contributor[0]}</a></li>)
			})
		}
		setContributors(contributors)
		if (location.state?.links) {
			location.state.links.forEach(link => {
				links.push(<li><a href={
					link[1]
				} className='text-var notes-link'>{link[0]}</a></li>)
			})
		}
		setLinks(links)
	}, [location.state])

	return (
		<>
			<section className=" py-5 cdin px-4 px-sm-3">
				<div className="container">
					<div className="d-sm-flex align-items-center justify-content-between mainc">
						<div className="img-home">
							<h1 className="heading">{name}<span></span></h1>
							<p className="lead my-4">
								{description}
								</p>
							<p className='text-var'>
								Find the syllabus <a href="/static/notes/UG-BTECH-CSE-2018.pdf" className=' text-var'>here</a>.
							</p>
						</div>
						<img className="img-fluid w-50 d-none d-sm-block ufo" src={ufo} alt="in office" />
					</div>
				</div>
			</section>
			<div className=" px-3 px-sm-5 ">
				<h1 className='mt-3 ps-2'> Links</h1>
				<div className='mt-3'>
					<ul style={{
						listStyleType: "none",
						paddingLeft: "20px"
					}}>
						{links}
					</ul>
				</div>
			</div>
			<div className=" px-3 p-sm-5 ">
				<h2 className='mt-3 ps-2'> Contributors</h2>
				<div className='mt-3'>
					<ul style={{
						listStyleType: "none",
						paddingLeft: "20px"
					}}>
						{contributors}
					</ul>
				</div>
			</div>
		</>
	)
}
export default PreviewNotes;

