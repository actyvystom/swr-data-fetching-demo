import { useEffect, useState } from "react";
import useSWR from "swr";
// function useFetch(url) {
//   const [data, setData] = useState();

// //   useEffect(() => {
// //     async function startFetching() {
// //       const response = await fetch(url);
// //       const newData = await response.json();

// //       setData(newData);
// //     }

// //     startFetching();
// //   }, [url]);

//   return data;
// }

export default function Joke() {
  const [id, setId] = useState(0);
  // we replace the former custom hook with the useSWRR hook and deconstruct the data from the hook
  // ! see the the customized fetcher function in _app.js to support error handling
  const { data, error, isLoading } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // only supported when fetcher function is customized
  if (error) {
    return (
      <h1>
        An error occurred: <br />
        {error.message}
      </h1>
    );
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.joke}</h1>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
