import React, { useEffect } from "react";
import styled from "styled-components";

function PageNotFound() {
  useEffect(() => {
    if (window.localStorage.getItem("login") === "false") {
      window.location.href = "http://termproject.rshiratori.com/";
    }
  }, []);

  return (
    <PageNotFoundStyled>
      <h1>Error: 404 Page doesn't exist</h1>
    </PageNotFoundStyled>
  );
}

const PageNotFoundStyled = styled.div``;

export default PageNotFound;
