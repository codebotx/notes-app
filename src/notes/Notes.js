import React from 'react'
import programming from '../assets/img/notes.svg'
import { Link } from 'react-router-dom'
import data from './data.json'
import { Search } from 'react-bootstrap-icons';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

export default function Notes() {
	React.useEffect(() => {
		document.title = "RESOC | NOTES"
		try{logEvent(analytics, 'page_view', {
			page_title: 'Notes',
			page_location: window.location.href,
			page_path: window.location.pathname
			})
		} catch (error) {
			console.error('Error while logging page_view event:', error);
		}
		return () => {
			document.title = "NOTES-SIT | RESOC"
		}
	}, [])

	const [search, setSearch] = React.useState('')
	const [displayData, setDisplayData] = React.useState([])
	const [isDark, setIsDark] = React.useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
	React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => setIsDark(event.matches ? true : false);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
	React.useEffect(() => {
		const searchquery = search.trim().toLowerCase();
		if (searchquery.length > 0) {
			setDisplayData(data.filter(item => item.tags.some(tag => tag.toLowerCase().includes(searchquery))))
		}
		else {
			setDisplayData(data)
		}
	}, [search])

	return (
			<>
				<section className="py-4 px-sm-5 px-4 cdin">
					<div className="d-sm-flex align-items-center justify-content-between mainc">
						<div className="img-home">
							<h1 className="heading">NOTES<span></span></h1>
							<p className="lead my-4">
								Get started here.
								<br />
							</p>
							<a target='_blank'
								rel="noreferrer"
								href='https://drive.google.com/file/d/1tDEfpGmiLjuT_QCfl42skYxPelJ3AMVS/view?usp=sharing' className=' text-var'>	B.Tech - Syllabus</a>
						</div>
						<img className="img-fluid w-50 d-none d-sm-block" src={programming} alt="in office" />
					</div>
				</section>
				<div className='px-1 px-sm-5'>
					<div className="container px-sm-5">
					<div className=" d-flex mb-3 justify-content-between">
          <input style={{
            userScalable: "no",
          }} type="text" className="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Search here" onChange={(e) => setSearch(e.target.value)}
					/>
          <button type="btn submit" className="btn btn-text-var" style={{
            background: "none",
            outline: "dashed 1px",
            marginLeft: "10px",
            color: isDark ? "white" : "black", 
            }}><Search /></button>
        </div>
						<ul style={{
							listStyleType: 'none',
							padding: '0px',
						}}>
							{displayData.map((item, index) => {
								return (
									<li className='my-1' key={index}>
										<Link to={`/previewnotes?id=${item.id}`}
										className='text-var notes-link'>
											{item.name}
										</Link>
									</li>
								)
							}
							)}
						</ul>
					</div>
				</div>
				<div className='p-3 p-sm-5' style={{fontSize: '0.8rem'}}>
					<a className='text-var' href='/community-guidelines'><b>Disclaimer</b></a>: Please go through our community guidelines for more information on contributions and sponsorships. 
					<br />
					<Link to='/contributions' className='text-var'>Contribute to REOSC</Link>
				</div>
			</>
	)
}