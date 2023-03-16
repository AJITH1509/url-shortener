import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { API } from "../global";

export const UrlShortener = () => {
  const [url, setUrl] = useState("");

  const [data, setData] = useState([]);
  const getUrls = () => {
    fetch(`${API}/urls`)
      .then((response) => response.json())
      .then((result) => setData(result));
  };
  useEffect(() => getUrls(), []);

  const handleClick = () => {
    fetch(`${API}/shorten`, {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => getUrls());
  };
  return (
    <div>
      <Card className="input-container">
        <CardContent className="input">
          <TextField
            onChange={(e) => setUrl(e.target.value)}
            label="Url"
            id="fullWidth"
          />
          <CardActions className="btn-actions">
            <Button onClick={handleClick} color="success" variant="contained">
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
    <div>
      <a href={`${API}/${shortUrl}`}>{`${API}/${shortUrl}`}</a>
    </div>
  );
};
