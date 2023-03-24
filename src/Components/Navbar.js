import {
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import logo1 from '../assets/img/moon.png'
import logo2 from '../assets/img/sun.png'
import { Link } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
const analytics = getAnalytics();

export default function Header() {
  const handleNotesClick = () => {
    // Track link click
    try{logEvent(analytics, 'select_content', { content_type: 'link', content_id: 'notes_link' });
	}catch(error){
		console.error('Error while logging select_content event:', error);
	}
  };
  const handleTaskboardClick = () => {
    // Track link click
    try{logEvent(analytics, 'select_content', { content_type: 'link', content_id: 'taskboard_link' });
  }catch(error){
    console.error('Error while logging select_content event:', error);
  }
  };
  const handleCommunityClick = () => {
    // Track link click
    try{logEvent(analytics, 'select_content', { content_type: 'link', content_id: 'community_link' });
  }catch(error){
    console.error('Error while logging select_content event:', error);
  }
  };
  const handleContributionsClick = () => {
    // Track link click
    try{logEvent(analytics, 'select_content', { content_type: 'link', content_id: 'contributions_link' });
  }catch(error){
    console.error('Error while logging select_content event:', error);
  }
  };
  const handleAboutClick = () => {
    // Track link click
    try{logEvent(analytics, 'select_content', { content_type: 'link', content_id: 'about_link' });
  }catch(error){
    console.error('Error while logging select_content event:', error);
  }
  };
  const handleLoginClick = () => {
    // Track link click
    try{logEvent(analytics, 'select_content', { content_type: 'link', content_id: 'login_link' });
  }catch(error){
    console.error('Error while logging select_content event:', error);
  }
  };
  const handleProfileClick = () => {
    // Track link click
    try{logEvent(analytics, 'select_content', { content_type: 'link', content_id: 'profile_link' });  
  }catch(error){
    console.error('Error while logging select_content event:', error);
  }
  };
  const handleLogoClick = () => {
    // Track link click
    try{logEvent(analytics, 'select_content', { content_type: 'link', content_id: 'logo_link' });
  }catch(error){
    console.error('Error while logging select_content event:', error);
  }
  };


  const { currentUser } = useAuth();
  const [buttonText, setButtonText] = useState("Login");

  React.useEffect(() => {
    if(currentUser && currentUser.displayName) {
      if (currentUser.displayName.includes(" ")){
        var username = currentUser.displayName.slice(0, currentUser.displayName.indexOf(" "));
         if(username.length> 15)
          username = username.slice(0, 15);
      }
      else if(currentUser.displayName.length> 15) {
        username = currentUser.displayName.slice(0, 15);
      }
      else {
        username = currentUser.displayName;
      }
      setButtonText(username);
    }
    else if (currentUser && currentUser.email) {
      if (currentUser.email.includes("@")){
        username = currentUser.email.slice(0, currentUser.email.indexOf("@"));
        if(username.length> 15)
          username = username.slice(0, 15);
      }
      setButtonText(username);
    }
    else {
      setButtonText("Login");
    }
  }, [currentUser]);
  const [isDark, setIsDark] = React.useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => setIsDark(event.matches ? true : false);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  if (isDark) {
    return (<>
      <Navbar className='navbar navbar-expand-lg navbar-dark py-4 cdin' expand="lg">
        <Container >
          <Nav >
          <Navbar.Brand>
          <Link 
          onClick={handleLogoClick}
          to="/">
              <img src={logo1} alt="logo" width="30" height="30" className="d-inline-block align-top" />
            </Link>
          </Navbar.Brand>
          </Nav>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link
              onClick={handleNotesClick}
              to="/notes" className="nav-link">Notes</Link>
              {currentUser && <Link onclick={handleTaskboardClick}
               to="/taskboard" className="nav-link">Tasks</Link>}
              {!currentUser && <Link onclick={handleTaskboardClick} to="/login" className="nav-link">Tasks</Link>}
              {currentUser && <Link onclick={handleCommunityClick}
               to="/community" className="nav-link">Community</Link>}
              {!currentUser && <Link onclick={handleCommunityClick}
               to="/login" className="nav-link">Community</Link>}
              {currentUser && <Link onclick={handleContributionsClick}
               to="/contributions" className="nav-link">Contributions</Link>}
              {!currentUser && <Link onclick={handleContributionsClick}
               to="/login" className="nav-link">Contributions</Link>}
              
            </Nav>
            <Nav>
               <Link onClick={handleAboutClick} to="/aboutus" className="nav-link">About Us</Link>
               {currentUser && <Link
                onclick={handleProfileClick}
               to="/profile" className="nav-link">{buttonText}</Link>}
              {!currentUser && <Link onclick={handleProfileClick}
               to="/login" className="nav-link">{buttonText}</Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>)
  }
  else {
    return (<>
      <Navbar className='navbar navbar-expand-lg py-4 cdin' expand="lg">
        <Container >
          <Nav >
            <Navbar.Brand>
              <Link to="/">
                <img src={logo2} alt="logo" width="30" height="30" className="d-inline-block align-top" />
              </Link>
            </Navbar.Brand>
          </Nav>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to="/notes" className="nav-link">Notes</Link>
              {currentUser && <Link to="/taskboard" className="nav-link">Tasks</Link>}
              {!currentUser && <Link to="/login" className="nav-link">Tasks</Link>}
              {currentUser && <Link to="/community" className="nav-link">Community</Link>}
              {!currentUser && <Link to="/login" className="nav-link">Community</Link>}
              {currentUser && <Link to="/contributions" className="nav-link">Contributions</Link>}
              {!currentUser && <Link to="/login" className="nav-link">Contributions</Link>}
            </Nav>
            <Nav>
            <Link to="/aboutus" className="nav-link">About Us</Link>
            {currentUser && <Link to="/profile" className="nav-link">{buttonText}</Link>}
            {!currentUser && <Link to="/login" className="nav-link">{buttonText}</Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>)
  }
}
