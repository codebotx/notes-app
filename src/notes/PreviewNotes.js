import React from 'react'
import { useLocation } from 'react-router-dom';
import ufo from '../assets/img/note-taking.svg'
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import data from './data.json'

function PreviewNotes(props) {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const id = params.get("id");
	const displayData = data[id]
	let name = displayData.shortName;
	let description = data.description;
	const [contributors, setContributors] = React.useState([])
	const [links, setLinks] = React.useState([])
	const [loading, setLoading] = React.useState(true)


	React.useEffect(() => {
		setLoading(true)
		const contributors = []
		if (displayData?.contributors) {
			displayData.contributors.forEach(contributor => {
				contributors.push(<li
					key={contributor[0]}
				><a
					target='_blank'
					rel="noreferrer"
					href={
						contributor[1]
					} className='text-var'>{contributor[0]}</a></li>)
			})
		}
		setContributors(contributors)
		const links = []
		if (displayData?.links) {
			displayData.links.forEach(link => {
				links.push(<li
					key={link[0]}
				><a
					target='_blank'
					rel="noreferrer"
					href={
						link[1]
					} className='text-var'>{link[0]}</a></li>)
			})
		}

		setLinks(links)
	}, [displayData])

	React.useEffect(() => {
		if (contributors && links && displayData) {
			if (contributors?.length === displayData?.contributors.length && links?.length === displayData.links.length) {
				setLoading(false)
			}
		}
	}, [contributors, links, displayData])

	return (
		loading ? <Loader /> :
			<>
				<section className=" py-5 cdin px-4 px-sm-0">
					<div className="container">
						<div className="d-sm-flex align-items-center justify-content-between mainc">
							<div className="img-home">
								<h1 className="heading">{name}<span></span></h1>
								<p className="">
									{description}
								</p>
								<p className='text-var'>
									Find the syllabus <a target='_blank' rel="noreferrer"
										href="https://drive.google.com/file/d/1tDEfpGmiLjuT_QCfl42skYxPelJ3AMVS/view?usp=sharing" className=' text-var'>here</a>.
								</p>
							</div>
							<img className="img-fluid w-50 d-none d-sm-block" src={ufo} alt="in office" />
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
				<div className='p-3 p-sm-5' style={{ fontSize: '0.8rem' }}>
					<a className='text-var' href='/community-guidelines'><b>Disclaimer</b></a>: Please go through our community guidelines for more information on contributions and sponsorships.
					<br />
					<Link to='/contributions' className='text-var'>Contribute to REOSC</Link>
				</div>
			</>
	)
}
export default PreviewNotes;

