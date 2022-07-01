import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function APIFetchTest() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [apiResultPublic, setApiResultPublic] = useState();
  const [apiResultPrivate, setApiResultPrivate] = useState();
  const [apiResultScoped, setApiResultScoped] = useState();

  useEffect(() => {
    const getApiResultPublic = async () => {
      const domain = process.env.REACT_APP_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          //scope: "read:messages",
        });
        //console.log(`Access token is: ${accessToken}`);
        const apiResultResponse = await fetch(
          `${process.env.REACT_APP_API_URL}public`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(`Result of fetch = ${apiResultResponse}`);
        const data = await apiResultResponse.json();
        console.log(`apiResult is this: ${data}`);
        setApiResultPublic(data.message);
      } catch (e) {
        console.log(e.message);
      }
    };

    const getApiResultPrivate = async () => {
      const domain = process.env.REACT_APP_DOMAIN;

      try {
        const accessToken = await fetch(process.env.REACT_APP_AUDIENCE, {
          audience: "http://localhost:5000",
          grant_type: "client_credentials",
          client_id: process.env.REACT_APP_CLIENTID,
          client_secret: process.env.REACT_APP_CLIENTSECRET,
          //scope: "read:messages",
        });
        //console.log(`Access token is: ${accessToken}`);
        const apiResultResponse = await fetch(
          `${process.env.REACT_APP_API_URL}private`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(`Result of Privatefetch = ${apiResultResponse}`);
        const data = await apiResultResponse.json();
        console.log(`apiResultPrivate is this: ${data}`);
        setApiResultPrivate(data.message);
      } catch (e) {
        console.log(e.message);
      }
    };

    getApiResultPublic();
    getApiResultPrivate();
  }, [getAccessTokenSilently, user?.sub]);

  return <p>{apiResultPublic}</p>;
}
