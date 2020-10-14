
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    //location.replace("#");
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      var email_Verified = user.emailVerified;

      if(email_Verified){
        document.getElementById("test").style.display = "block";
        document.getElementById("test2").style.display = "block";
        document.getElementById("verify_btn").style.display = "none";
      } else {
        document.getElementById("test").style.display = "none";
        document.getElementById("test2").style.display = "none";
        document.getElementById("verify_btn").style.display = "block";
      }

      document.getElementById("user_para").innerHTML = "Velkommen : " + email_id + "<br/><br/> Bekreftet Konto : " + email_Verified;
      document.getElementById("user_para2").innerHTML = "Trykk på hjem knappen og deretter trykk på BEKREFT knappen, Eller Logg Inn.";
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

function create_account(){
 var userEmail = document.getElementById("email_field").value;
 var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    //Handle Errors here.
   var errorMessage = error.message;
   document.getElementById("account_errors").innerHTML =("Error : " + errorMessage);

    // ...
  });

}


function reset_user_password(){

const email = firebase.auth().currentUser.email;
firebase.auth().sendPasswordResetEmail(email)
  .then(function() {
    document.getElementById("reset").innerHTML =("Tilbakestillingslenke er sendt til din e-postadresse");
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

function logout(){
  firebase.auth().signOut();
}

function send_verification(){

  var user = firebase.auth().currentUser;
 user.sendEmailVerification().then(function() {
  // Email sent.
  document.getElementById("email").innerHTML =("Bekreftelse Link er sendt til din E-post.");
}).catch(function(error) {
  // An error happened.
//windows.alert("Error : " + error.message);

});
}

function Delete(){
  firebase.auth().currentUser.delete()

  user.delete().then(function() {
    // User deleted.
  }).catch(function(error) {
    // An error happened.
    //windows.alert(" Kontoen er slettet! ");
  });
  }



  //<!-- Bruke 8 timer på alt av koding. Laget av BamseMoms https://bamsemoms.github.io-->