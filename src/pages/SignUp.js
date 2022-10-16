import React, { useState} from "react";
import { Link,useNavigate } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({name: "", email: "",phone: "",password: ""});
  const [error, setError] = useState({name: "",email: "",phone: "",password: ""});

  const enabled = data.name.length > 0 && data.email.length > 0 && data.phone.length > 0 && data.password.length > 0;
 
  const navigate = useNavigate();

  const submitForm =() =>{
    let setData = ({...data, name:data.name, email:data.email, phone:data.phone, password: data.password});
    console.log(data,'<><><><>data')
    console.log(setData,'><><><><<setData')
    if(setData){
      navigate('/login');
    }
    let prevData = JSON.parse(localStorage.getItem("values"));
    console.log(prevData,'><><><><prev')
    localStorage.setItem("values",JSON.stringify([...prevData,setData]))
  }

  function isValidEmail(email) {
    console.log(/\S+@\S+\.\S+/.test(email));
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPassword(password){
    console.log(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password))
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)
  }

  const handleSignUpFormData = (event) => {
    if (event.target.name === "username") {
      if (!event.target.value) {
        setError({ ...error, name: "This field is required." });
      } else {
        setData({ ...data, name: event.target.value });
        setError({ ...error, name: "" });
      }
    } else if (event.target.name === "email") {
      if (!event.target.value) {
        setError({ ...error, email: "This field is required." });
      } else if (event.target.value && !isValidEmail(event.target.value)) {
        setError({ ...error, email: "Email is invalid." });
      } else {
        setData({ ...data, email: event.target.value });
        setError({ ...error, email: "" });
      }
    } else if (event.target.name === "phone") {
      if (!event.target.value) {
        setError({ ...error, phone: "This field is required." });
      } else if (
        event.target.value.length > 10 || event.target.value.length < 10
      ) {
        setError({ ...error, phone: "Phone should contain only 10 numbers" });
      }
      else {
        setData({ ...data, phone: event.target.value });
        setError({ ...error, phone: "" });
      }
    } else if (event.target.name === "password") {
      if (!event.target.value) {
        setError({ ...error, password: "This field is required." });
      } 

      else if (event.target.value  && !isValidPassword(event.target.value)){
         setError({ ...error, password: "Password should be strong" });
      }

      else if(event.target.value.length >8 ){
        setError({ ...error, password: "Password should be of 8 characters" });
      }
      
      else {
        setData({ ...data, password: event.target.value });
        setError({ ...error, password: "" });
      }
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-form">
          <h3 className="title">SIGN UP</h3>
          <div className="form">
            <div className="input-group">
            <i className="fa fa-user form-icon" aria-hidden="true"></i>
              <label className="name">NAME :</label>
              <input  type="name" name="username" placeholder="Enter your name" value={data.name} onChange={(e) => {setData({ ...data, name: e.target.value });handleSignUpFormData(e) }}/>
              <h3 className="errorStyle">{error.name}</h3>
            </div>
            <div className="input-group">
            <i className="fa fa-envelope form-icon" aria-hidden="true"></i>
              <label className="email">EMAIL :</label>
              <input type="email" name="email" placeholder="Enter your email" value={data.email} onChange={(e) => {setData({ ...data, email: e.target.value });handleSignUpFormData(e)}}/>
              <h3 className="errorEmailStyle">{error.email}</h3>
            </div>
            <div className="input-group">
            <i className="fa fa-phone-square form-icon" aria-hidden="true"></i>
              <label className="phone">PHONE :</label>
              <input type="number" name="phone" placeholder="Enter your phone no." value={data.phone} onChange={(e) => { setData({ ...data, phone: e.target.value }); handleSignUpFormData(e) }}/>
              <h3 className="errorPhoneStyle">{error.phone}</h3>
            </div>
            <div className="input-group">
            <i class="fa fa-lock form-icon" aria-hidden="true"></i>
              <label className="password">PASSWORD :</label>
              <input type="password" name="password" placeholder="Enter your password" value={data.password} onChange={(e) => {setData({ ...data, password: e.target.value });handleSignUpFormData(e) }}/>
              <h3 className="errorStyle">{error.password}</h3>
            </div>
           <button className="submit" type="button" disabled={!enabled} onClick={() => submitForm()}>SIGN UP</button>
            <div className="login-here">
              <h3>Already have an Account?</h3>
              <Link to="/login"><h3 className="logged">Login Here</h3></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
