import React, { useEffect, useState } from "react";

function Deneme() {
  const [data, setData] = useState([]);

  useEffect(() => {
    //get api implement
    const url = "https://jsonplaceholder.typicode.com/comments";
    fetch(url, {
      headers: {
        companyId: "45464844",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
        setData(json);
      })
      .catch((e) => {
        console.log("error var knk", e);
      });
  }, []);

  //post and put api  implement
  const postPutEvent = () => {
    const data = {
      id:'def234',
      name: "Seema",
      mobile: "05071876337",
      designation: "developer",
      pin: "4567",
    };

    const url = data.id ?  "https://jsonplaceholder.typicode.com/comments/" + data.id: "https://jsonplaceholder.typicode.com/comments";
    fetch(url, {
      method: data.id ? "PUT":"POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("response", response);
        if(response.state==200) {
          alert("success")
        }
      })
      .catch((e) => {
        console.log("error var knk", e);
      });
  };

  return (
    <div>
      {data.map((item) => {
        return <div></div>;
      })}

      <button onClick={postPutEvent}>submit</button>
    </div>
  );
}

export default Deneme;