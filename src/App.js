import React from 'react'
import moon from './assets/img/moonlight.svg'
import './assets/css/dashboard.css'
import { Link } from 'react-router-dom'
import { CupHot } from 'react-bootstrap-icons'
export default function App() {
	return (
		<>
			<section className="py-4 px-4 px-sm-1 cdin">
				<div className="container ">
					<div className="d-sm-flex align-items-center justify-content-between mainc">
						<div className="img-home">
							<h1 className="heading">RE<span></span><span className="text-secondary">SOC</span></h1>
							<p className="lead my-4">
								RESOC: The coolest academic notes-sharing platform around!
							</p>
						</div>
						<img className="img-fluid w-50 d-none d-sm-block" src={moon} alt="in office" />
					</div>
				</div>
			</section>
			<div className='mt-3 px-3 px-sm-5'>
				<div className="container">
					<p>
						RESOC is the coolest academic notes-sharing platform around, built by a bunch of tech-savvy students at Silicon Institute, and it's totally free ❤️. You don't have to sell your soul to afford good quality notes anymore. <br></br>
						<b><Link to='/notes' className='fw text-var'>Check out the notes</Link></b>
					</p>
					<p>
						We have a nifty <Link to="/taskboard" className='text-var'>
							task section</Link> for you to manage your work.  No more forgetting deadlines and drowning in assignments.
						Pop over to the <Link to="/community" className='text-var' >community chat page</Link> and give us a holler. We're always happy to help out and connect with like-minded folks. You might even make a new study buddy or two :)
					</p>
					<p>
						Oh, and if you really dig what we're doing here at RESOC, we'd be over the moon if you'd consider sponsoring us. Just head over to the <Link to="/aboutus" className='text-var'>about section</Link> and donate to our talented content creators. Trust us, it really helps keep the site running and lets us add all sorts of fun new features!
					</p>
				<div>
						<a href='/static/paytm.jpeg' className='text-var' 
						target='_blank' rel="noreferrer">
						<CupHot size={30} style={{
							marginRight: "10px",
							color : "#FF5E5B"
						}}
						 />
						 Buy us a coffee!
						</a>
					</div>
					</div>
			</div>
		</>
	)
}
