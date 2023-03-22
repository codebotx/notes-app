import React from 'react'
import { useLocation } from 'react-router-dom';
import ufo from '../assets/img/note-taking.svg'
import { getStorage } from 'firebase/storage';
import Loader from '../Components/Loader';

function PreviewNotes(props) {
	const location = useLocation();
	const { name, description } = location?.state;
	const [contributors, setContributors] = React.useState([])
	const [links , setLinks] = React.useState([])
	const [loading, setLoading] = React.useState(true)


	React.useEffect(() => {
		setLoading(true)
		const contributors = []
		if (location.state?.contributors) {
			location.state.contributors.forEach(contributor => {
				contributors.push(<li
				key = {contributor[0]}
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
		if (location.state?.links) {
			location.state.links.forEach(link => {
				links.push(<li
				key = {link[0]}
				><a
				target='_blank'
				rel="noreferrer"
				 href={
					link[1]
				} className='text-var'>{link[0]}</a></li>)
			})
		}
		setLinks(links)
	}, [location.state])

	React.useEffect(() => {
		if (contributors.length === location.state.contributors.length && links.length === location.state.links.length) {
			setLoading(false)
		}
	}, [contributors, links, location.state.contributors.length, location.state.links.length])

	return (
		loading ? <Loader /> :
		<>
			<section className=" py-5 cdin px-4 px-sm-3">
				<div className="container">
					<div className="d-sm-flex align-items-center justify-content-between mainc">
						<div className="img-home">
							<h1 className="heading">{name}<span></span></h1>
							<p className="">
								{description}
								</p>
							<p className='text-var'>
								Find the syllabus <a target='_blank' rel="noreferrer"
								 href= "https://drive.google.com/file/d/1tDEfpGmiLjuT_QCfl42skYxPelJ3AMVS/view?usp=sharing" className=' text-var'>here</a>.
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
		</>
	)
}
export default PreviewNotes;

