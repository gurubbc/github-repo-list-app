import { useState } from "react";
function App() {
  const [repos, setRepos] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [userName, isUserName] = useState(false)
  const [forked, setForked]=useState(false)

  const handleInputChange = (event) => {
    const userName = document.getElementById('uname').value
    // alert(userName.length)
    if (userName.length > 0)
      isUserName(true)
    else
      isUserName(false)
  }

  const handleCheckBox = () => {
    const myCheckBox=document.getElementById("fork")
  
    if (myCheckBox.checked) {
      // alert("Gathering forked repositories too...")
      setForked(true)
      // alert("forked too")
    }
    else 
    {
      // alert("Gathering all repositories except forked one...")
      setForked(false)
    }
  }

  const fetchRepos = async () => {
    // alert("fetchRepo...")
    const username = document.getElementById('uname').value

    // alert(username)
    // alert("https://api.github.com/users/" + username + "/repos")
    const response = await fetch("https://api.github.com/users/" + username + "/repos")
    var result = await response.json();
    // alert("result is " + result + " and " + result['message'])
    if (result['message'] == 'Not Found') {
      // alert("No such repo found")
      // await setRepos(null)
      document.getElementById('nf').innerHTML = "Not Found"
      setIsVisible(false)

    } else
      if (result.length == 0) {
        document.getElementById('nf').innerHTML = "No repository found for this user: "+username
        setIsVisible(false)
      }
      else {
        // if (result.contains("Not Found"))
        // alert(" no such repo found")
        // // alert(result)
        if (forked==false) {
          // alert("returning all repositories except forked one ")
          result = await result.filter(obj => obj.fork==false)
          await setRepos(result)
        } else {
          // alert("returning all repositories even including forked one ")
          result = await result.filter(obj => obj.fork==true)          
          await setRepos(result)
        }


        setIsVisible(true)

        // alert("guru repos " + repos)
      }

  }


  return (
    <div>
      <h1> Fetch github repositories </h1>
      Github username: <input type="text" id="uname" onChange={handleInputChange}></input>
      Include forks: <input type="checkbox" id="fork" onChange={handleCheckBox}></input>
      <button
        disabled={!userName}
        enabled={document.getElementById('uname') != null}
        onClick={fetchRepos}>Submit</button> <hr></hr>
      <div id="nf"></div>
      <div style={{ display: isVisible ? 'block' : 'none' }}>
        <table id="users" border="2">

          <tr>
            <td>Name</td>
            <td>Language</td>
            <td>Description</td>
            <td>Size</td>
            <td>Forked</td>
          </tr>
          {
            repos != null && repos.length > 0 &&
            repos.map(repo => {


              return (
                <tr key={repo.id}>
                  <td>{repo.name}</td>
                  <td>{repo.language}</td>
                  <td>{repo.description}</td>
                  <td>{repo.size}</td>
                  <td>{repo.fork}</td>
                </tr>)



            })}

        </table>
      </div>

    </div>
  );
}

export default App;
