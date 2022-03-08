import { useState, useEffect } from "react";
import './index.css'

const url = 'https://gorest.co.in/public/v2/users'
/* const HelloWorld = () =>{
  return(
    <section>
      <p>Hello World</p>
    </section>
  )
} */

const User = () =>{
  const [ users, setUsers ] = useState([]);
  const [ displayAll, setDisplaAll ] = useState(true);
  const [ displayOne, setDisplayOne ] = useState(false);
  let [singleUser, setSingleUser ] = useState({})

  async function fetchUsers(){
    const usersJson = await fetch(url);
    const usersNorm = await usersJson.json();
    setUsers(usersNorm)
  }

  let switchIt = () => {
    setDisplaAll(!displayAll);
    setDisplayOne(!displayOne);
    setSingleUser({})
  }
  const showInfos = (user) =>{
    switchIt();
    setSingleUser({...user})
  }

  useEffect(()=>{
    fetchUsers();
  }, [])

  //console.log(users)
  return(<>
    {displayAll && <section className="section">
    <h2>Users</h2>
    <ul>
    {users.map((user) => {
      const { id, name } = user;
      return <li key={id} className="singleUser">
        {name}
        <button className="btn" onClick={()=> showInfos(user)}>Details</button>
        </li>
    })}
    </ul>
  </section>}

  {displayOne && <section className="singleUser">
    <div> <strong>id:</strong> {singleUser.id} </div>
    <div> <strong>name: </strong> {singleUser.name} </div>
    <div> <strong>email:</strong> {singleUser.email} </div>
    <div> <strong>status:</strong> {singleUser.status} </div>
    <div> <strong>gender:</strong> {singleUser.gender} </div>
     <button className='btn' onClick={()=>switchIt()}>back</button>
    </section>}
  </>)
  
}


export default User;

