import React from 'react'
import Partnernship from '../assets/img/Partnership.svg'

export default function Collab() {
	React.useEffect(() => {
		document.title = 'Collab | RESOC'
		return () => {
			document.title = 'NOTES-SIT | RESOC'
		}
	}, []);

  const [isDark, setIsDark] = React.useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => setIsDark(event.matches ? true : false);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
	const [section, setSection] = React.useState('assignments');
	return (<>
		<section className=" py-5 px-4 px-sm-1 cdin">
			<div className="container">
				<div className="d-sm-flex align-items-center justify-content-between mainc">
					<div className="img-home">
						<h1 className="heading">Collab<span></span></h1>
						<p className="lead my-4">
							Want to get your assignments done? Collaborate with your friends and juniors here.
						</p>
					</div>
					<img className="img-fluid w-50 d-none d-sm-block" src = {Partnernship} alt="in office" />
				</div>
			</div>
		</section>
		<div className='p-2 p-sm-5'>
      
		{!isDark && section === 'assignments' && <>
          <button className="mx-1 btn btn-dark" onClick={() => setSection('assignments')}>Assignments</button>
					<button className="mx-1 btn btn-light" onClick={() => setSection('creators')}>Creators</button>
					</>
		}
		{
			!isDark && section === 'creators' && <>
					<button className="mx-1 btn btn-light" onClick={() =>setSection('assignments') }>Assignments</button>
					<button className="mx-1 btn btn-dark" onClick={() =>setSection('creators') }>Creators</button>
					</>
		}
		{
			isDark && section === 'assignments' && <>
					<button className="mx-1 btn btn-light" onClick={() => setSection('assignments')}>Assignments</button>
					<button className="mx-1 btn btn-dark" onClick={() => setSection('creators')}>Creators</button>
			</>
		}
		{
			isDark && section === 'creators' && <>
					<button className="mx-1 btn btn-dark" onClick={() =>setSection('assignments') }>Assignments</button>
					<button className="mx-1 btn btn-light" onClick={() =>setSection('creators') }>Creators</button>
			</>
		}
		</div>

		
		</>)
}