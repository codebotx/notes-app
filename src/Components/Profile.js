import React, { useState} from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import profile from "../assets/img/profile-page.svg";
import { auth } from "../firebase";
import { Alert } from "react-bootstrap";



export default function Profile() {
  const history = useNavigate();
  const [isDark, setIsDark] = React.useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => setIsDark(event.matches ? true : false);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
  const name =auth.currentUser.displayName? auth.currentUser.displayName : auth.currentUser.email.slice(0, auth.currentUser.email.indexOf('@'));
  const [error, setError] = useState("");
  const [errorDef, setErrorDef] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/");
      window.location.reload();
    } catch(e) {
      setError("Failed to log out");
      setErrorDef(e.message);
    }
  }

  return (
    <>
     <section className="py-4 px-4 px-sm-1 cdin">
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      {errorDef && <p style={{
        fontStyle: "italic"
      }}>{errorDef}</p>}
      
      {/* <div className="container "> */}
        <div className="d-sm-flex align-items-center justify-content-between mainc">
          <div className="img-home">
            <h1 className="heading">{name}</h1>
            <p className="lead my-4">
              Hey {name}, welcome to RESOC!
              Manage your profile here.
            </p>
          </div>
          <img className="img-fluid w-50 d-none d-sm-block p-5" src={profile} style={{
            marginBlockEnd: "20px",

          }} alt="profiledoc" />
        {/* </div> */}
      </div>
    </section>
    <div className='p-2 px-sm-5 py-sm-4'>
      <button className="btn"
        style={{
          color: '#ff5e5b',
        }}
        onClick={() => auth.signOut()}>SIGN OUT</button>
      <div className=" py-2 d-flex align-items-center justify-content-start mb-2">
        {isDark &&
          <button className="btn btn-dark" onClick={()=> history("/update-profile")
          }>UPDATE PASSWORD
          </button>
        }
        {!isDark &&
          <button className="btn btn-light" onClick={()=> history("/update-profile")
        }>UPDATE PASSWORD
        </button>
        }
      </div>

    </div>
    </>
  );
}
