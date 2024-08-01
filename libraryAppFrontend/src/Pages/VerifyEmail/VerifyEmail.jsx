import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import emailVerify from "../../assets/Images/emailVerifySuccess.webp";
import "./_verifyEmail.scss";

const VerifyEmail = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/user/${param.id}/verify/${param.token}`
        );
        console.log(res);
        setValidUrl(true);
      } catch (err) {
        console.log(err);
        setValidUrl(false);
      }
    };
    verifyEmail();
  }, [param]);

  return (
    <div className="emailVerifyPage">
      {validUrl ? (
        <div className="emailVerified">
          <img src={emailVerify} alt="emailVerifiedSuccess" />
          <h1>Email Verified Successfully</h1>
          <Link to="login">
            <Button variant="contained">Login</Button>
          </Link>
        </div>
      ) : (
        <h1>Invalid Link</h1>
      )}
    </div>
  );
};

export default VerifyEmail;
