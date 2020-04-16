
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    location.replace("client.html");
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      var email_Verified = user.emailVerified;

      if(email_Verified){

        document.getElementById("verify_btn").style.display = "none";
      } else {

        document.getElementById("verify_btn").style.display = "block";
      }

      document.getElementById("user_para").innerHTML = "Velkommen : " + email_id + "<br/>  Verified : " + email_Verified;
    }
       
  } else {
    // No user is signed in.
    location.replace("#");
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }

});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  //window.location.href = "/web";

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorMessage = error.message;
    document.getElementById("account_errors").innerHTML =("Error : " + errorMessage);


    // ...
  });

}

function send() {
  var email = document.getElementById("email_field").value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    document.getElementById("reset").innerHTML =("Tilbakestillingslenke er sendt til din e-postadresse");
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}

//function create_account(){

 //var userPass = document.getElementById("password_field").value;
  //window.location.href = "verify.html";

  //firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    //Handle Errors here.
   //var errorMessage = error.message;
   //document.getElementById("account_errors").innerHTML =("Error : " + errorMessage);

    // ...
  //});
//}


function reset_user_password(){

const email = firebase.auth().currentUser.email;
firebase.auth().sendPasswordResetEmail(email)
  .then(function() {
    document.getElementById("reset").innerHTML =("Reset link has been sent to your email address");
  });
}

function logout(){
  firebase.auth().signOut();
}

//function send_verification(){

  //var user = firebase.auth().currentUser;

//user.sendEmailVerification().then(function() {
  // Email sent.
//}).catch(function(error) {
  // An error happened.
//windows.alert("Error : " + error.message);

//});
//}

