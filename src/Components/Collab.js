import React from "react";
import Partnernship from "../assets/img/Partnership.svg";
import "firebase/compat/firestore";
import "../assets/css/chatApp.css";
import {
	Trash
  } from 'react-bootstrap-icons';
// import firebase from "firebase/compat/app";
import { InputGroup, Form, Card, Table } from "react-bootstrap";
// import { v4 as uuidv4 } from "uuid";
import { auth } from "../firebase";
// const collection_used = "Collab-prod";

export default function Collab() {
  const [isDark, setIsDark] = React.useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  //   let list = [];
  const name = auth.currentUser.displayName.slice(
    0,
    auth.currentUser.displayName.indexOf(" ")
  );
  const email = auth.currentUser.email;
  const photoURL = auth.currentUser.photoURL;
  const [section, setSection] = React.useState("assignments");
  //   const [collab, setCollab] = React.useState();
  //   const firestore = firebase.firestore();

  React.useEffect(() => {
    document.title = "Collab | RESOC";
    return () => {
      document.title = "NOTES-SIT | RESOC";
    };
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => setIsDark(event.matches ? true : false);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  React.useEffect(() => {
    if (!auth.currentUser.photoURL)
      auth.currentUser.updateProfile({
        photoURL: `https://api.dicebear.com/5.x/croodles/svg?seed=${name}&radius=50`,
      });
  }, [name]);

  return (
    <>
      <section className=" py-5 px-4 px-sm-1 cdin">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between mainc">
            <div className="img-home">
              <h1 className="heading">
                Collab<span></span>
              </h1>
              <p className="lead my-4">
                Want to get your assignments done? Collaborate with your friends
                and juniors here.
              </p>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src={Partnernship}
              alt="in office"
            />
          </div>
        </div>
      </section>
      <div className="p-2 p-sm-5">
        {!isDark && section === "assignments" && (
          <>
            <button
              className="mx-1 btn btn-dark"
              onClick={() => setSection("assignments")}
            >
              Assignments
            </button>
            <button
              className="mx-1 btn btn-light"
              onClick={() => setSection("creators")}
            >
              Creators
            </button>
          </>
        )}
        {!isDark && section === "creators" && (
          <>
            <button
              className="mx-1 btn btn-light"
              onClick={() => setSection("assignments")}
            >
              Assignments
            </button>
            <button
              className="mx-1 btn btn-dark"
              onClick={() => setSection("creators")}
            >
              Creators
            </button>
          </>
        )}
        {isDark && section === "assignments" && (
          <>
            <button
              className="mx-1 btn btn-light"
              onClick={() => setSection("assignments")}
            >
              Assignments
            </button>
            <button
              className="mx-1 btn btn-dark"
              onClick={() => setSection("creators")}
            >
              Creators
            </button>
          </>
        )}
        {isDark && section === "creators" && (
          <>
            <button
              className="mx-1 btn btn-dark"
              onClick={() => setSection("assignments")}
            >
              Assignments
            </button>
            <button
              className="mx-1 btn btn-light"
              onClick={() => setSection("creators")}
            >
              Creators
            </button>
          </>
        )}
      </div>
      {section === "assignments" && (
        <div className="p-2 px-sm-5">
          <Card
            style={{
              borderRadius: "0.5rem",
              borderColor: "var(--text-var)",
              borderWidth: "1px",
              borderStyle: "dashed",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "var(--bg-dark)",
            }}
          >
            <Card.Body>
              <div className="d-flex flex-row">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img className="profphoto" src={photoURL} alt="" />
                  <div className="name text-capitalize">{name}</div>
                </div>
                <div className="w-100 mt-3 ms-3">
                  <InputGroup className="mb-2">
                    <Form.Control
                      placeholder="Add subject"
                      aria-label="Add subject"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--text-var)",
                        borderRadius: "0.4rem",
                      }}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Form.Control
                      as="textarea"
                      placeholder="Add assignment"
                      aria-label="Add assignment"
                      style={{
                        background: "transparent",
                        color: "var(--text-var)",
                        borderRadius: "0.4rem",
                      }}
                    />
                  </InputGroup>

                  <div className="mt-2">
                    <button
                      className="btn btn-sm"
                      style={{ color: "#ff5e5b" }}
                      type="date"
                    >
                      Deadline
                    </button>
                    <button className="btn btn-sm btn-dark ms-2">
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card
            className="mt-3"
            style={{
              borderRadius: "0.5rem",
              borderColor: "var(--text-var)",
              borderWidth: "1px",
              borderStyle: "dashed",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "var(--bg-dark)",
            }}
          >
            <Card.Body>
              <Table className="text-var" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Assignments</th>
                    <th>Deadline</th>
                    <th className="ps-2">Contact</th>
					<th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          isDark ? "btn-light" : "btn-dark"
                        }`}
                      >
                        Contact
                      </button>
                    </td>
					<td><Trash color="#ff5e5b"/></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          isDark ? "btn-light" : "btn-dark"
                        }`}
                      >
                        Contact
                      </button>
                    </td>
					<td><Trash color="#ff5e5b"/></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>@mdo</td>
                    <td>@twitter</td>
                    <td>@mdo</td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          isDark ? "btn-light" : "btn-dark"
                        }`}
                      >
                        Contact
                      </button>
                    </td>
					<td><Trash color="#ff5e5b"/></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      )}
      {section === "creators" && (
        <div className="py-2 px-sm-5">
          <div className="row m-0">
            {/* repeat this col with the list for creators */}
            <div className="col">
              <Card
                style={{
                //   width: "18rem",
                  borderRadius: "0.5rem",
                  borderColor: "var(--text-var)",
                  borderWidth: "1px",
                  borderStyle: "dashed",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "var(--bg-dark)",
                }}
              >
                <Card.Body className="text-var">
                  <div className="d-flex flex-row justify-content-start">
                    <img className="profphoto" src={photoURL} alt="" />
                    <div className="name mt-2 text-capitalize">{name}</div>
                  </div>
                  <div className="row mt-2">
                    <div className="col ps-5">
                      Details of previous Contact of fixed length
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-start">{email}</div>
                    <div className="col text-end">Quote</div>
                  </div>
                </Card.Body>
              </Card>
            </div>
			
          </div>
        </div>
      )}
    </>
  );
}
