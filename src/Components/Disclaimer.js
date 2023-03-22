import React from 'react'
import mars from '../assets/img/mars.png'
export default function Disclaimer () {
  return (
    <>
		
      <section className=" py-5 cdin px-4 px-sm-3">
				<div className="container">
					<div className="d-sm-flex align-items-center justify-content-between mainc">
						<div className="img-home">
							<h1 className="heading">TOS/CG<span></span></h1>
							<p className="lead my-4">
								Please go through the following community guidelines.
							</p>
						</div>
						<img className="img-fluid w-50 d-none d-sm-block" src={mars} alt="in office" />
					</div>
				</div>
			</section>
				<div>
					<div className="container p-2">
						<p>
						<b>Disclaimer</b>: This is a community-driven project. We are <b>not responsible for any kind of loss or damage caused by the content provided </b> on this website. The content is provided for educational purposes only. At RESOC, we value transparency and openness, which is why we want to make sure that our contributors are recognized for their hard work. If you find any <b>content inappropriate</b>, or if you feel that you're one of the contributors but <b>your name is not listed</b>, or if you find any discrepancy in the notes listed, please contact us via the community chat and mention your email address for further communication. The community chat is open to all your queries and suggestions. You can also contact us via email at <a className='text-var' href="mailto:anubhabr50@gmail.com"> anubhabr50@gmail.com</a>
						</p>
						<p>
						At RESOC, we believe in the power of free and open-source content. Therefore, we want to make it very clear that <b>neither RESOC nor any member of RESOC will ever ask for payment for using our website or downloading our notes</b>. RESOC has an MIT license, which means that our content is free to use, modify, and distribute. We stand for a community that helps each other grow and we do not partake in activities that involve payment for premimum notes or not letting users download notes. Please do not entertain any such requests. We want to maintain the integrity of our community and provide a safe and accessible space for all.
						</p>
						<p>
							<b>Funding</b>: We understand that funding is a sensitive topic, which is why we want to make it clear that RESOC reserves the right to claim sole jurisdiction on the donations/sponsorships received via the website. However, if you are a contributor, you are more than welcome to you add your donation/sponsorship link to the contributors' list in the <a className='text-var'href="/notes">notes</a> section so as to directly receive donations. This will help all of us maintain transperancy and avoid conflicts. If you are unable to add your funding information and want us to contribute a part of the donations, we're open to that, and we'll be happy to help.
						</p>
						<p>
							<b>Contributing to RESOC</b>: Contributing to RESOC is an excellent way to give back to the community and share your knowledge with the world. We are always looking for contributors. If you are interested in contributing to RESOC, please contact us via the community chat or email. We'll be glad to accept your contributions after scrutiny to ensure that the content is of high quality and is not misleading. As a contributor, you'll be listed in the contributors' list, and you can always add your donations/sponsorship links there. In any case, RESOC will always be happy to help you out, even if you're not able to add your details.
						</p>
						<p>
						<b>The community: </b>We want to create a safe and inclusive community here at RESOC, where everyone is respected and treated with kindness. We ask that all users maintain the essence of our community, which is to help one another learn and grow. Please ensure that you do not hurt sentiments or use language that could be considered offensive or discriminatory. We understand that disagreements may arise, but we ask that all discussions remain civil and respectful. Let's work together to make RESOC a positive and uplifting space for all. If you see any inappropriate behavior, please do not hesitate to report it to us via the community chat or email. We appreciate your cooperation in making RESOC a welcoming community for everyone.
						</p>
						<p>
						We hope that you find our community guidelines clear and informative. At RESOC, we strive to provide high-quality educational content, and we welcome all feedback, queries, and suggestions. Let's work together to create a better world, one step at a time.
						</p>
						</div>
				</div>
				
    </>
  )
}
