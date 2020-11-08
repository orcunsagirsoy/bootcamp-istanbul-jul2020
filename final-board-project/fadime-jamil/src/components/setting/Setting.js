import React from 'react'
import firebase from "../../firebaseConfig"
import Button from '@material-ui/core/Button';


export default function Setting() {
    var user = firebase.auth().currentUser;

    // user.updateProfile({
    // displayName: "Jane Q. User",
    // photoURL: "https://example.com/jane-q-user/profile.jpg"
    // }).then(function() {
    // // Update successful.
    // }).catch(function(error) {
    // // An error happened.
    // });
    const [email, setEmail]= React.useState(user.email)
    const [password, setPassword]=React.useState(user.password)
const updateUserEmail = (email)=> { return user.updateEmail(email).then(function() {
    // Update successful.
    console.log("updated successfully")
  }).catch(function(error) {
    // An error happened.
    console.log("error while updating")
  });}
  const updateUserPassword=(password)=>{
    user.updatePassword(password).then(function() {
        // Update successful.
        console.log("updated successfully")
      }).catch(function(error) {
        // An error happened.
        console.log("error while updating")
      });
  } 

  const sendChanges= (email, password)=>{
    updateUserEmail(email)
    updateUserPassword(password)
  }
    return (
        <div>
            <form onSubmit={sendChanges}>
                <label>Email:</label>
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
                <label>Password:</label>
                <input type="text" value={password} onChange={e=>setPassword(e.target.value)}/>
                <Button>Submit</Button>
            </form>
        </div>
    )
}
