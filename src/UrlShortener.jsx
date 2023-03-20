import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { API } from "../global";

function checkFunction(response) {
  if (response.status === 401) {
    throw Error("unauthorized");
  } else {
    return response.json();
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "/";
}

export const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const getUrls = () => {
    fetch(`${API}/urls`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => checkFunction(response))
      .then((data) => setData(data))
      .catch((err) => logout());
  };
  useEffect(() => {
    if (show) {
      getUrls();
    }
  }, [show]);

  const handleClick = () => {
    fetch(`${API}/shorten`, {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    }).then(() => getUrls());
  };
  return (
    <div>
      <Card className="input-container">
        <CardContent className="input">
          <TextField
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            label="Url"
            id="fullWidth"
          />
          <CardActions className="btn-actions">
            <Button
              onClick={() => {
                handleClick();
                setShow(true);
              }}
              color="success"
              variant="contained"
            >
              Convert
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <div>
        {data.map((ele) => (
          <Url key={ele._id} shortUrl={ele.short_url} />
        ))}
      </div>
    </div>
  );
};

const Url = ({ shortUrl }) => {
  return (
    <Card className="url-container">
      <a href={`${API}/${shortUrl}`}>{`${API}/${shortUrl}`}</a>
    </Card>
  );
};
