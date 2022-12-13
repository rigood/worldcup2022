import { useState, useEffect } from "react";

const EMAIL = process.env.REACT_APP_WORLDCUP_EMAIL;
const PASSWORD = process.env.REACT_APP_WORLDCUP_PASSWORD;

const loginInfo = `{
    "email": "${EMAIL}",
    "password": "${PASSWORD}"
    }`;

function Matches() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (token) => {
    const matchesResponse = await fetch("/api/v1/match", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const matchesResults = await matchesResponse.json();
    const matchesData = matchesResults.data;
    setData(matchesData);
  };

  useEffect(() => {
    const fetchLoginToken = async () => {
      try {
        const response = await fetch("/api/v1/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: loginInfo,
        });

        if (!response.ok) {
          throw new Error(`${response.status} Error`);
        }

        const results = await response.json();
        const token = await results.data.token;

        await fetchData(token);
      } catch (err) {
        setError(err.message || "Server Error");
      }
    };

    fetchLoginToken();
  }, []);

  return (
    <div>
      경기 정보
      {data.map((match, index) => {
        return (
          <li key={index}>
            {match.home_team_en} {match.away_team_en}
          </li>
        );
      })}
    </div>
  );
}

export default Matches;
