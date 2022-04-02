import React from "react";
import styled from 'styled-components';
import Axios from 'axios';

function ContactUs() {

  const send = async() => {
    let msg = document.getElementById("content").value
    if (!msg) {
      window.alert("Message is empty")
      return
    }
    console.log(msg)
    let name = await window.localStorage.getItem("username")
    Axios.post('http://localhost:3022/API/v1/ContactUs', {
      username: name,
      msg: msg,
    })
    .then(res => {
      if (res.status == 200) {
        document.getElementById("reply").innerHTML = "Thank you for contacting us, we will get back to you within 3 days";
        document.getElementById("content").value = ''
      }
    })
  }

  return (
    <ContactUsStyled>
      <input type="text" id="content" />
      <button onClick={send}>Send Message</button>
      <p id='reply'></p>
    </ContactUsStyled>
  );
}

const ContactUsStyled = styled.div`
  color: red;
`;

export default ContactUs;
