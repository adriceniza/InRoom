window.onload = initialize;
var storage = firebase.storage();
var refImage;
var fichero;
var databaseRef;
var storage;
function initialize(){
    event.preventDefault();
    var signinButton = document.getElementById('sign-in-button');
    var closeSignin = document.getElementById('close-signin');
    closeSignin.addEventListener('click' , abrirmodal)
    signinButton.addEventListener('click' , abrirmodal)
    formAutenticacion = document.getElementById('login');
    formAutenticacion.addEventListener('submit' , logIn, false);


    storageRef = firebase.storage().ref();
    databaseRef = firebase.database().ref().child("Image");

    fichero = document.getElementById("fichero");
    fichero.addEventListener("change", subirImagenAfirebase, false);
    showImagesFirebase();
}

function abrirmodal(){
    event.preventDefault();
    var signinModal = document.getElementById('signin-modal');
    var signinButton = document.getElementById('sign-in-button');
    signinModal.classList.toggle('hidden');
    signinButton.classList.toggle('hidden');

    
    
}




function logIn(event){
    event.preventDefault();
    
    var user = event.target.username.value;
    var password = event.target.pdw.value;

    firebase.auth().signInWithEmailAndPassword(user,password)
    .then((userCredential) => {
        event.preventDefault()
        //Signed in
        console.log('Signed in succesfully')
        var user = userCredential.user;
        var buttonlogOut = document.getElementById('logout-button-signin');
        buttonlogOut.addEventListener('click', logout , false)


        buttonlogOut.classList.toggle('hidden');
        
        //...
        var signinModal = document.getElementById('signin-modal');
        signinModal.classList.toggle('hidden');
        
        
        

        currentUser();
    })
    .catch((error) => {
        event.preventDefault()
        console.log('error')
        var errorCode = error.code;
        var errorMessage = error.message;
    });


    var form = document.getElementById('login');
    form.reset();
    

}

function logout(){
    event.preventDefault();
    var profileimg = document.getElementById('profileimage');
    profileimg.classList.toggle('hidden');
    firebase.auth().signOut().then(()=> {
        console.log('Signed Out succesfully')
        var buttonlogOut = document.getElementById('logout-button-signin');
        buttonlogOut.classList.toggle('hidden');
        var signinModal = document.getElementById('signin-modal');
        signinModal.classList.toggle('hidden');

        //Signed out 

    }).catch((error)=>{
    //An error happened)
});
}

function currentUser(){
    console.log('hey maquiiina')
    event.preventDefault()
    var user  = firebase.auth().currentUser;
    var profileimg = document.getElementById('profileimage');
    var restablecerImg = document.getElementById('deleteImg');
    restablecerImg.addEventListener('click', deleteImage );

    if (user) {
        //User is signed in.
        profileimg.classList.toggle('hidden')
    } else {
        //No user signed in.
    }

    var name , email;

    if (user != null){
        name = user.displayName;
        email = user.email;
    }

    if (email == 'admin@admin.com'){
        console.log('personal account')
        var removecrud= document.getElementById("removeCRUD");
        removecrud.classList.toggle('hidden')
        var editcrud= document.getElementById("editCRUD");
        editcrud.classList.toggle('hidden')

    }
    if(email == 'wargameryt@gmail.com'){
        console.log('admin account')
    }
    
}



function subirImagenAfirebase(){
    var imagenASubir = fichero.files[0];
    var imagennombre = imagenASubir.name;
    var uploadTask = storageRef.child('Opinion/' + imagennombre).put(imagenASubir);

    uploadTask.on('state_changed',
    function (snapshot) {
    }, function (error) {
      console.log(error);
    }, function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        createNodo(imagennombre, downloadURL);
      });
    });
}

function deleteImage(){
    event.preventDefault();

    document.getElementById("profileimage").src = 'img/profileImage.png';
    document.getElementById("profileImgCRUD").src = 'img/profileImage.png';

    var keyBorrar = this.classList('profileimg');
    var refBorrar = refVisitante.child(keyBorrar);
    refBorrar.remove();
}
function createNodo(imagennombre, downloadURL) {
    console.log(imagennombre);
    console.log(downloadURL);
    databaseRef.push({
      nombre: imagennombre,
      url: downloadURL
    });
  }


function showImagesFirebase() {
    console.log('heeey');
    databaseRef.on("value", function (snapshot) {
      var data = snapshot.val();
      var result = "";
      for (var key in data) {
        result = data[key].url;
      }
      document.getElementById("profileimage").src = result;
      document.getElementById("profileImgCRUD").src = result;
    });
  }