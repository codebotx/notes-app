import React from 'react'
import moon from '../assets/img/moonlight.svg'
import '../assets/css/dashboard.css'
export default function Landingsegment () {
  return (
    <>
      <section className=" py-4 cdin px-4 px-sm-3">
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
				<div className='px-3'>
					<div className="container">
						<p>
						RESOC is the coolest academic notes-sharing platform around, built by a bunch of tech-savvy students at Silicon Institute, and it's totally free ❤️. You don't have to sell your soul to afford good quality notes anymore. <br></br>
						 <b><a href="/notes" className=' fw text-var'> Checkout the notes</a></b>.
							</p>
							<p>
						We have a nifty <a className='text-var' href='/chat-room'>task section</a> for you to manage your work.  No more forgetting deadlines and drowning in assignments.
							Pop over to the <a className='text-var' href='/chat-room'>community chat page</a> and give us a holler. We're always happy to help out and connect with like-minded folks. You might even make a new study buddy or two :)
							</p>
							<p>
							Oh, and if you really dig what we're doing here at RESOC, we'd be over the moon if you'd consider sponsoring us. Just head over to the <a href='/aboutus' className='text-var'>about section</a> and donate to our talented content creators. Trust us, it really helps keep the site running and lets us add all sorts of fun new features!
						</p>
								<div className='sponsor my-2'>
									<a href='https://www.buymeacoffee.com/anubhabr500' className='	' target='_blank' rel='noreferrer'>
										<img src='https://cdn.buymeacoffee.com/buttons/v2/default-white.png' alt='Buy Me A Coffee' style={{height: '50px', width: '175px'}} />
									</a>
								</div>
					</div>	
				</div>
    </>
  )
}
