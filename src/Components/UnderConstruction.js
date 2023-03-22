import React from 'react'
import planet from '../assets/img/undiscoveredplanet.png'
export default function UnderConstruction () {
  return (
    <>
		
      <section className=" py-5 cdin px-4 px-sm-3">
				<div className="container">
					<div className="d-sm-flex align-items-center justify-content-between mainc">
						<div className="img-home">
							<h1 className="heading">503<span></span></h1>
							<p className="lead my-4">
								Under Construction
							</p>
							<p>
							We haven't built this yet :(<br />
							Let's get back to checking out  <a href='/notes' className='text-var'>notes</a>.
							</p>
						</div>
						<img className="img-fluid w-50 d-none d-sm-block" src={planet} alt="in office" />
					</div>
				</div>
			</section>
				<div>
					<div className="container" style={{
						minHeight: '16vh'
					}}>
						</div>	
				</div>
				
    </>
  )
}
