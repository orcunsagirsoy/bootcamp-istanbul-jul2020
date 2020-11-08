import React from 'react'
import firebase from "../../firebaseConfig"
import Button from '@material-ui/core/Button';


export default function Profile(user) {
//     const user = firebase.auth().currentUser;
//     let email,  uid;

// if (user != null) {
//    email = user.email;

//      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//                    // this value to authenticate with your backend server, if
//                    // you have one. Use User.getToken() instead.
// }

// const deleteAccount =()=>{
//     return user.delete().then(function() {
//         // User deleted.
//         console.log("user deleted successfully")
//       }).catch(function(error) {
//         // An error happened.
//         console.log("there is a problem")
//       }); 
// }

    return (
        <div>
            <h2>UserName</h2>
            {/* <p>Id: {uid}</p>
            <p>Email: {email}</p>  

            <h3>Delete account</h3>
            <Button onClick={deleteAccount}>Delete</Button> */}
        </div>
    )
}
//or we can use this to retrieve data from the login, I don't get the difference between the 2 methods
//   user.providerData.forEach(function (profile) {