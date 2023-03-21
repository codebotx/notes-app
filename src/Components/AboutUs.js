import React from 'react'
import astronaut from '../assets/img/astronauthelmet.svg'
import anubhab from '../assets/img/anubhab.jpeg'
import { CupHot } from 'react-bootstrap-icons'
export default function AboutUs() {
	return (
		<>
		
			<section className=" pt-4 px-4 px-sm-0">
				{/* <div className="container "> */}
					<div className="d-sm-flex align-items-center justify-content-between mainc">
						<div className="img-home">
							<h1 className="heading">TEAM<span></span><span className="text-secondary">SOC</span></h1>
							<p className="lead my-4">
								The coolest team!
							</p>
						</div>
						<img className="img-fluid w-50 d-none d-sm-block" src={astronaut} alt="in office" />
					</div>
				{/* </div> */}
			</section>

			<div className=" px-3 p-sm-5 ">
				<h1 className='p-2'> Dev Team</h1>
				<div className="lead mt-3 p-1">
					<ul style={{
						listStyleType: "none",
						padding: "0"
					}}>
						<li>
							<img src={anubhab} style={{
								width: "50px",
								height: "50px",
								borderRadius: "50%",
								margin: "0 10px"
							}} alt="avatar" className="avatar p-2" />
							<a href="https://anubhavp.dev/" target="_blank" className='text-var' style={{ textDecoration: 'none' }} rel="noreferrer">Anubhab Patnaik</a>
						</li>
						<li>
							<img src="https://avatars.githubusercontent.com/u/90375759?v=4" style={{
								width: "50px",
								height: "50px",
								borderRadius: "50%",
								margin: "0 10px"
							}} alt="avatar" className="avatar p-2" />
							<a href="https://github.com/smrutid12/" target="_blank" className='text-var' style={{ textDecoration: 'none' }} rel="noreferrer">Smruti Dash</a>
						</li>
					</ul>
				</div>
				<h1 className='mt-3 ps-2'> Contributors</h1>
				<div className='mt-3'>
					<ul style={{
						listStyleType: "none",
						paddingLeft: "20px"
					}}>
						<li>
							<a href="https://anubhavp.dev/" target="_blank" className='text-var' style={{ textDecoration: 'none' }} rel="noreferrer">Anubhab Patnaik</a>

						</li>
						<li>
							Srijan Paul
						</li>
						<li>
							Swayam Vikash Pattanaik
						</li>
						<li>
							Abinash Parida
						</li>
						<li>
							<a href="https://github.com/smrutid12/" target="_blank" className='text-var' style={{ textDecoration: 'none' }} rel="noreferrer">Smruti Dash</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="container px-3 px-sm-5">
					<p>
						We hope you're having an amazing time on RESOC! Our team has been burning the midnight oil to make your experience on our website as smooth as a baby's butt. We would be incredibly grateful if you could donate to help us cover the costs of keeping this virtual ship afloat. We need to pay for the domain rights, and while we'd love to say that money grows on trees, unfortunately, that's just not the case. You could always buy us a pizza or a coffee, too. We promise we won't say no!
					</p>
					<div>
						<a href='/static/paytm.jpeg' className='text-var' target='_blank' rel="noreferrer">
						<CupHot size={30} style={{
							marginRight: "10px",
							color : "#FF5E5B"
						}} />
						 Buy us a coffee!	
						</a>
					</div>
					<div className='mt-3'>
					<p>
						With love and pizza dreams,
						<br />
						- TeamSoc ❤️ 
					</p>
					</div>
				</div>
			
		</>
	)
}
