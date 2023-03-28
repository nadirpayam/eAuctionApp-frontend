import React, { useEffect ,useState} from "react";


function Get() {
    const [data, setData] = useState([])

    const url = "https://jsonplaceholder.typicode.com/comments";
  
    
     useEffect(() => {
      fetch(url)
      .then(response => response.json()).then(json=> {
        console.log("json",json)
        setData(json)
      }).catch(e=> {
        console.log("error var knk", e)
      })
     })
  
  
  
    return <div>
         {
          data.map(item=> {
            return (
              <div>
                {item.email}
              </div>
            )
          })
         }
  
    </div>;
}

export default Get
