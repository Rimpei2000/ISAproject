import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Axios from 'axios';

function PageNotFound() {

 useEffect(() => {
   if (window.localStorage.getItem("login") === "false") {
     window.location.href = "http://localhost:3000/"
   }
 }, [])

 return (
   <PageNotFoundStyled>
     <h1>Error: 404 Page doesn't exist</h1>
   </PageNotFoundStyled>
 );
}

const PageNotFoundStyled = styled.div`

`;

export default PageNotFound;
