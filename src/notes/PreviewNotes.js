import React from 'react'
import { useLocation } from 'react-router-dom';
import ufo from '../assets/img/note-taking.svg'
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import Loader from '../Components/Loader';
const storage = getStorage();

function PreviewNotes(props) {
	const location = useLocation();

	const { name, description } = location?.state;
	const [urls, setUrls] = React.useState([])
	const [contributors, setContributors] = React.useState([])
	const [links , setLinks] = React.useState([])
	const [loading, setLoading] = React.useState(true)
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
		if (location.state?.links) {
			location.state.links.forEach(link => {
				const notesRef = ref(storage, `/notes/${link[1]}`);
				getDownloadURL(notesRef).then((url) => {
					// console.log(url)
				setUrls(urls => [...urls, [link[0], url]])
				}).catch((error) => {
					console.log(error)
				});
			})
		}
	},[location.state])
	

	React.useEffect(() => {
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
	}, [location.state])

	React.useEffect(() => {
		if (urls.length === location.state?.links.length) {
			const links = []
			urls.forEach(url => {
				links.push(<li
					key = {url[0]}
					><a
					target='_blank'
					rel="noreferrer"
					href={
						url[1]
					} className='text-var'>{url[0]}</a></li>)
			})
			setLinks(links)
			setLoading(false)
		}
	}, [location.state?.links.length, urls])
	
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
								 href= {syllabus} className=' text-var'>here</a>.
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

