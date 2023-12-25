import axios from "axios";
import React, { useEffect, useState } from "react";
import MyVerticallyCenteredModal from "../components/modal";
import "../styles/gamepage.css";

const GlobalGamePage = () => {
  const [tracks, setTracks] = useState<any>([]);
  const [score, setScore] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [anime, setAnimatedRanking] = useState(1);
  const [wrongGuess, setWrongGuess] = useState(false);
  const [processingGuess, setProcessingGuess] = useState(false);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") || "0", 10) || 0
  );

  const artistIds = ["06HL4z0CvFAxyc27GXpf02", "5K4W6rqBFWDnAN6FQUkS6x", "246dkjvS1zLTtiykXe5h60", "1uNFoZAHBGtllmzznpCI3s", "5ZsFI1h6hIdQRw2ti0hz81"];

  const fetchTracks = async () => {
    setShowRanking(false);
    setModalShow(false);
    try {
      const tracksPromises = artistIds.map(async (artistId) => {
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=IN`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual access token
            },
          }
        );
        return response.data.tracks;
      });

      const tracksArrays = await Promise.all(tracksPromises);
      const allTracks = tracksArrays.flat(); // Flatten the array of arrays
      const shuffledTracks = shuffleTracks(allTracks);
      setTracks(shuffledTracks.slice(0, 2));
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  console.log(tracks, "kk");

  const shuffleTracks = (array: any[]) => {
    let currentItem = array.length;
    let randomItem;

    while (currentItem !== 0) {
      randomItem = Math.floor(Math.random() * currentItem);
      currentItem--;

      [array[currentItem], array[randomItem]] = [
        array[randomItem],
        array[currentItem],
      ];
    }

    return array;
  };

  const handleHigherClick = (popularity: number) => () => {
    if (processingGuess) {
      return; // Do nothing if a guess is already being processed
    }

    setProcessingGuess(true);
    if (tracks[0].popularity > popularity) {
      setShowRanking(true);
      setWrongGuess(false);
      setTimeout(() => {
        setScore((prev) => {
          const newScore = prev + 1;
          if (newScore >= highScore) {
            localStorage.setItem("highScore", newScore.toString());
            setHighScore(newScore);
          }
          return newScore;
        });
        fetchTracks();
        setProcessingGuess(false);
      }, 1000);
    } else {
      setShowRanking(true);
      setWrongGuess(true);
      setTimeout(() => {
        setProcessingGuess(false);
        setModalShow(true);
      }, 1000);
    }
  };

  const handleLowerClick = (popularity: number) => () => {
    if (processingGuess) {
      return; // Do nothing if a guess is already being processed
    }

    setProcessingGuess(true);
    if (tracks[0].popularity > popularity) {
      setShowRanking(true);
      setWrongGuess(false);
      setTimeout(() => {
        setScore((prev) => {
          const newScore = prev + 1;
          if (newScore >= highScore) {
            localStorage.setItem("highScore", newScore.toString());
            setHighScore(newScore);
          }
          return newScore;
        });
        setProcessingGuess(false);
        fetchTracks();
      }, 1000);
    } else {
      setShowRanking(true);
      setWrongGuess(true);
      setTimeout(() => {
        setModalShow(true);
        setProcessingGuess(false);
      }, 1000);
    }
  };

  const playAgain = () => {
    fetchTracks();
    setScore(0);
    setWrongGuess(false);
  };

  return (
    <div className="containerCard">
      {tracks.map((x: any, index: number) => (
        <div className="cardGame" key={x.id}>
          <div>
            <img
              src={x.album.images[1].url}
              alt={`Album Cover for ${x.name}`}
              className="songImg"
            />
            <h1 className="albumName" >
              {x.album.name}
            </h1>
          </div>
          <span
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginTop: "15px",
              color: index === 1 && wrongGuess ? "red" : "green",
            }}
          >
            Ranking:{" "}
            {index === 0 ? (
              <span style={{ display: "inline-block" }}>{x.popularity}</span>
            ) : (
              <span
                style={{
                  display: showRanking && index === 1 ? "inline-block" : "none",
                }}
              >
                {x.popularity}
              </span>
            )}
          </span>
          <div style={{ marginTop: "20px" }}>
            <audio
              controls
              style={{
                display: "flex",
                alignItems: "center",

                margin: "auto",
              }}
            >
              <source src={x.preview_url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {index === 1 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <button
                onClick={handleHigherClick(x.popularity)}
                style={{
                  margin: "5px",
                  padding: "12px 55px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  backgroundColor: "#11235A",
                  color: "#ffffff",
                  border: "3px solid #1db954", // Border color matching the theme
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Higher
              </button>
              <button
                onClick={handleLowerClick(x.popularity)}
                style={{
                  margin: "5px",
                  padding: "12px 55px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  backgroundColor: "#11235A",
                  color: "#ffffff",
                  border: "3px solid #b52a2a", // Border color matching the theme
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Lower
              </button>
            </div>
          )}
          {index === 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%", // Adjust the width as needed
                margin: "auto", // Center horizontally
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#1db954",
                  alignSelf: "flex-end", // Align to the bottom
                }}
              >
                Highest Score:{" "}
                {parseInt(localStorage.getItem("highScore") || "0")}
              </span>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#1db954",
                  alignSelf: "flex-end", // Align to the bottom
                }}
              >
                Score: {score}
              </span>
            </div>
          )}
        </div>
      ))}
      <MyVerticallyCenteredModal
        score={score}
        show={modalShow}
        onHide={() => setModalShow(false)}
        playAgain={() => playAgain()}
      />
    </div>
  );
};

export default GlobalGamePage;
