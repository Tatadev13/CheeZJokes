import React, { useState, useEffect } from "react";
import axios from "axios";

const JokeList = () => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch 5 jokes from the API
    axios
      .get("https://icanhazdadjoke.com/search?limit=5", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        const jokesData = response.data.results.map((joke) => ({
          id: joke.id,
          text: joke.joke,
          votes: 0,
        }));
        setJokes(jokesData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jokes:", error);
        setIsLoading(false);
      });
  }, []);

  const handleVote = (id, increment) => {
    setJokes((prevJokes) =>
      prevJokes.map((joke) =>
        joke.id === id
          ? {
              ...joke,
              votes: joke.votes + increment,
            }
          : joke
      )
    );
  };

  return (
    <div>
      <h2>Dad Jokes</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {jokes.map((joke) => (
            <li key={joke.id}>
              {joke.text}
              <button onClick={() => handleVote(joke.id, 1)}>Upvote</button>
              <button onClick={() => handleVote(joke.id, -1)}>Downvote</button>
              <span> Votes: {joke.votes}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JokeList;
