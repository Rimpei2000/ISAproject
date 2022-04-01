import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Axios from 'axios';

function Home() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [firstEndpoint, setFirstEndpoint] = useState(0)
  const [secondEndpoint, setSecondEndpoint] = useState(0)
  const [thirdEndpoint, setThirdEndpoint] = useState(0)
  const [fourthEndpoint, setFourthEndpoint] = useState(0)
  const [fifthEndpoint, setFifthEndpoint] = useState(0)
  const [sixthEndpoint, setSixthEndpoint] = useState(0)
  const [seventhEndpoint, setSeventhEndpoint] = useState(0)
  const [eighthEndpoint, setEighthEndpoint] = useState(0)
  const [endpointsList, setEndpointsList] = useState([])

  const getReqNumbers = async() => {
    await Axios.get("http://localhost:3022/endpoints", {
    })
    .then(res => {
      setEndpointsList(res["data"]["rows"])
      endpointsList.map((item) => {
        switch (item.endpoint_id) {
          case 1:
            setFirstEndpoint(item.endpoint_requested)
            break;

          case 2:
            setSecondEndpoint(item.endpoint_requested)
            break;

          case 3:
            setThirdEndpoint(item.endpoint_requested)
            break;

          case 4:
            setFourthEndpoint(item.endpoint_requested)
            break;

          case 5:
            setFifthEndpoint(item.endpoint_requested)
            break;

          case 6:
            setSixthEndpoint(item.endpoint_requested)
            break;

          case 7:
            setSeventhEndpoint(item.endpoint_requested)
            break;

          default:
            setEighthEndpoint(item.endpoint_requested)
            break;
        }
      })
    })
  }

  useEffect(() => {
      if (window.localStorage.getItem("username") === "admin") {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
      getReqNumbers()
  })



  return (
    <HomeStyled>
      {isAdmin ? (
        <>
          <div className='endpoint title'>
            <p>Method</p>
            <p>Endpoint</p>
            <p>Number of requests</p>
          </div>
          <div className='endpoint'>
            <p>PUT</p>
            <p>/signup</p>
            <p>{firstEndpoint}</p>
          </div>
          <div className='endpoint'>
            <p>GET</p>
            <p>/LogIn</p>
            <p>{secondEndpoint}</p>
          </div>
          <div className='endpoint'>
            <p>DELETE</p>
            <p>/:userId</p>
            <p>{thirdEndpoint}</p>
          </div>
          <div className='endpoint'>
            <p>PUT</p>
            <p>/MyInfo</p>
            <p>{fourthEndpoint}</p>
          </div>
          <div className='endpoint'>
            <p>POST</p>
            <p>/ContactUs</p>
            <p>{fifthEndpoint}</p>
          </div>
          <div className='endpoint'>
            <p>Sixth</p>
            <p>/something</p>
            <p>{sixthEndpoint}</p>
          </div>
          <div className='endpoint'>
            <p>Seventh</p>
            <p>/something</p>
            <p>{seventhEndpoint}</p>
          </div>
          <div className='endpoint'>
            <p>Eighth</p>
            <p>/something</p>
            <p>{eighthEndpoint}</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  .endpoint {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border: 1px solid;
    border-radius: 5px;
    margin: 1rem;
  }
  .title p{
    font-weight: bold;
  }
`;

export default Home;
