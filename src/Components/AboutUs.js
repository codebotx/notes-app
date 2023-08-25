import React from "react";
import astronaut from "../assets/img/astronauthelmet.svg";
import { CupHot } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function AboutUs() {
  React.useEffect(() => {
    document.title = "About Us | RESOC";
    return () => {
      document.title = "NOTES-SIT | RESOC";
    };
  }, []);
  return (
    <>
      <section className=" pt-4 px-4 px-sm-0">
        {/* <div className="container "> */}
        <div className="d-sm-flex align-items-center justify-content-between mainc">
          <div className="img-home">
            <h1 className="heading">
              TEAM<span className="text-secondary">SOC</span>
            </h1>
            <p className="lead my-4">The coolest team!</p>
          </div>
          <img
            className="img-fluid w-50 d-none d-sm-block"
            src={astronaut}
            alt="in office"
          />
        </div>
        {/* </div> */}
      </section>

      <div className=" px-3 p-sm-5 ">
        <h1 className="p-2">Core Team</h1>
        <div className="lead mt-3 p-1">
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
            }}
          >
            <li>
              <img
                src="https://avatars.githubusercontent.com/u/69160388?v=4"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  margin: "0 10px",
                }}
                alt="avatar"
                className="avatar p-2"
              />
              <a
                href="https://anubhavp.dev/"
                target="_blank"
                className="text-var"
                style={{ textDecoration: "none" }}
                rel="noreferrer"
              >
                Anubhab Patnaik
              </a>
            </li>
            <li>
              <img
                src="https://avatars.githubusercontent.com/u/90375759?v=4"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  margin: "0 10px",
                }}
                alt="avatar"
                className="avatar p-2"
              />
              <a
                href="https://github.com/smrutid12/"
                target="_blank"
                className="text-var"
                style={{ textDecoration: "none" }}
                rel="noreferrer"
              >
                Smruti Dash
              </a>
            </li>
            {/* <li>
              <img
                src="https://www.linkedin.com/in/abhinav-singh-11b748213/overlay/photo/"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  margin: "0 10px",
                }}
                alt="avatar"
                className="avatar p-2"
              />
              <a
                href="
							https://www.linkedin.com/in/abhinav-singh-11b748213"
                target="_blank"
                className="text-var"
                style={{ textDecoration: "none" }}
                rel="noreferrer"
              >
                Abhinav Singh
              </a>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="container px-3 px-sm-5">
        <p>
          We have an open{" "}
          <Link className="text-var" to="/contributions">
            contributions page
          </Link>{" "}
          for you to contribute to the RESOC community. You&apos;ll be added to
          the list post scrutiny.
        </p>
        <p>
          We hope you&apos;re having an amazing time on RESOC! Our team has been
          burning the midnight oil to make your experience on our website as
          smooth as a baby&apos;s butt. We would be incredibly grateful if you
          could donate to help us cover the costs of keeping this virtual ship
          afloat. We need to pay for the domain rights, and while we&apos;d love
          to say that money grows on trees, unfortunately, that&apos;s just not
          the case. You could always buy us a pizza or a coffee, too. We promise
          we won&apos;t say no!
        </p>
        <div>
          <a
            href="https://github.com/sponsors/fuzzymfx"
            className="text-var"
            target="_blank"
            rel="noreferrer"
          >
            <CupHot
              size={30}
              style={{
                marginRight: "10px",
                color: "#FF5E5B",
              }}
            />
            Buy us a coffee!
          </a>
        </div>
        <div className="mt-3">
          <p>
            With love and pizza dreams,
            <br />- TeamSoc ❤️
          </p>
        </div>
      </div>
    </>
  );
}
