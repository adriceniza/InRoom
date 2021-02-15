window.onload = initialize;

var newvisitor;
var refVisitante;
var loginalert;
var tbody;
var CREATE = "Añadir visita"
var MODIFICAR = "Modificar visita"
var modo = CREATE;
var refEditar;
var user;
var password;
var storage = firebase.storage();
var refImage;
var fichero;
var databaseRef;

function initialize() {
    newvisitor = document.getElementById('new-visitor');
    newvisitor.addEventListener('submit', enviarfirebase, false);

    var buttonRegister = document.getElementById('finishRegisterr');
    buttonRegister.addEventListener('click', register ,false)

    tbody = document.getElementById('tbody');

    refVisitante = firebase.database().ref().child("nuevoVisitante");

    mostrarVisitantes();

    fichero = document.getElementById("fichero");
    fichero.addEventListener("change", subirImagenAfirebase, false);
  

    
    formAutenticacion = document.getElementById('login');
    formAutenticacion.addEventListener('submit' , logIn, false);

    storageRef = firebase.storage().ref();
    databaseRef = firebase.database().ref().child("Image");




    var signinButton = document.getElementById('sign-in-button');
    var closeSignin = document.getElementById('close-signin');
    closeSignin.addEventListener('click' , abrirmodal);
    signinButton.addEventListener('click' , abrirmodal);

    showImagesFirebase();
    
}


function abrirmodal(){
    event.preventDefault()
    var signinModal = document.getElementById('signin-modal');
    var signinButton = document.getElementById('sign-in-button');
    signinModal.classList.toggle('hidden');
    signinButton.classList.toggle('hidden');

}

function logIn(event){
    event.preventDefault();
    
    var user = event.target.username.value;
    var password = event.target.psw.value;

    firebase.auth().signInWithEmailAndPassword(user,password)
    .then((userCredential) => {
        event.preventDefault()
        //Signed in
        
        var user = userCredential.user;
        var buttonlogOut = document.getElementById('logout-button-signin');
        buttonlogOut.addEventListener('click', logout , false)


        var buttonAddForm = document.getElementById('toggle-btn');
        buttonAddForm.classList.toggle('hidden');

        
        


        var buttonlogOut = document.getElementById('logout-button-signin');
        if (buttonlogOut.style.display === "none") {
            
            buttonlogOut.style.display = "block";
          } else {
            buttonlogOut.style.display = "none";
          }
        
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
        console.log(errorCode);
        console.log(errorMessage);
    });


    var form = document.getElementById('login');
    form.reset();
    

}

function logout(){
    event.preventDefault();

    var user  = firebase.auth().currentUser;
    var profileimg = document.getElementById('profileimage');
    profileimg.classList.toggle('hidden');
        var name , email;

        if (user != null){
        name = user.displayName;
        email = user.email;
    }
        if (email == 'admin@admin.com'){
        
        
            var editButtons = document.getElementsByClassName('editar');
            for (var i = 0; i<editButtons.length; i++){
                editButtons[i].classList.toggle('hidden');
            }
            var removeButtons = document.getElementsByClassName('borrar');
            for (var i = 0; i<removeButtons.length; i++){
                removeButtons[i].classList.toggle('hidden');
            }
        
        };
    firebase.auth().signOut().then(()=> {
        console.log('Signed Out succesfully')
        var buttonAddForm = document.getElementById('toggle-btn');
        buttonAddForm.classList.toggle('hidden');
        var signinModal = document.getElementById('signin-modal');
        signinModal.classList.toggle('hidden');
        var buttonlogOut = document.getElementById('logout-button-signin');
        if (buttonlogOut.style.display === "none") {
            
            buttonlogOut.style.display = "block";
          } else {
            buttonlogOut.style.display = "none";
          }
          

            buttonlogOut.classList.toggle('hidden');
        //Signed out 

    }).catch((error)=>{
    //An error happened)
});
}


function currentUser(){
    event.preventDefault()
    var user  = firebase.auth().currentUser;
    var profileimg = document.getElementById('profileimage');
    var restablecerImg = document.getElementById('deleteImg');
    restablecerImg.addEventListener('click', deleteImage );
    if (user) {
        //User is signed in.
        if(profileimg.classList.contains('hidden')){
        profileimg.classList.toggle('hidden')
        }else{
        
        }
        

        
        
    } else {
        //No user signed in.
        
    }

    var name , email;

    if (user != null){
        name = user.displayName;
        email = user.email;
    }

    if (email == 'admin@admin.com'){
       console.log ('personal account')
        var editButtons = document.getElementsByClassName('editar');
        for (var i = 0; i<editButtons.length; i++){
            editButtons[i].classList.toggle('hidden');
        }
        var removeButtons = document.getElementsByClassName('borrar');
        for (var i = 0; i<removeButtons.length; i++){
            removeButtons[i].classList.toggle('hidden');
        }
    }
    if(email == 'wargameryt@gmail.com'){
        console.log('admin account')
    };
    
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

function mostrarVisitantes() {
    refVisitante.on("value", function (snap) {
        var datos = snap.val();
        var filas = "";
        for (var key in datos) {
            filas += "<tr>" +
                "<td>" + datos[key].Fecha + "</td>" +
                "<td>" + datos[key].Nombre + "</td>" +
                "<td>" + datos[key].Ubicación + "</td>" +
                "<td>" + datos[key].Comentario + "</td>" +
                "<td>" + datos[key].Valoración + "</td>" +

                '</td>' +
                '<td>' +
                '<button id="editCRUD" class="btn btn-primary editar hidden" data-visitante="' + key + '">' +
                '<i class="fas fa-edit"></i>' +
                '</button>' +
                '</td>' +

                '<td>' +
                '<button id="removeCRUD" class="btn btn-danger borrar hidden" data-visitante="' + key + '">' +
                '<i class="fas fa-trash"></i>' +
                '</button>' +
                '</td>' +
                "</tr>";
        }
        tbody.innerHTML = filas;
        if (filas != "") {
            var elementosEditables = document.getElementsByClassName('editar');
            for (var i = 0; i < elementosEditables.length; i++) {
                elementosEditables[i].addEventListener('click', editarVisitante, false);
            }
            var elementosBorrables = document.getElementsByClassName('borrar');
            for (var i = 0; i < elementosBorrables.length; i++) {
                elementosBorrables[i].addEventListener('click', borrarVisitante, false);
            }
        }
    })
}

function editarVisitante(event) {
    console.log('okeeey');
    event.preventDefault();
    var keyEditar = this.getAttribute('data-visitante');
    refEditar = refVisitante.child(keyEditar);
    refEditar.once('value', function (snap) {
        var datos = snap.val();
        document.getElementById('first-name').value = datos.Nombre;
        document.getElementById('country').value = datos.Ubicación;
        document.getElementById('commentary').value = datos.Comentario;
    })
    document.getElementById('new-visitor-btn').value = MODIFICAR;
    modo = MODIFICAR;

}
function borrarVisitante(event) {
    event.preventDefault();
    console.log('aquillegamos');
    var keyBorrar = this.getAttribute('data-visitante');
    var refBorrar = refVisitante.child(keyBorrar);
    refBorrar.remove();
    currentUser()
}





function enviarfirebase(event) {
    event.preventDefault();
    switch (modo) {
        case CREATE:
            f = new Date();
            n = (f.getHours() + ":" + f.getMinutes() + " - " + f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());

            refVisitante.push({
                Fecha: n,
                Comentario: event.target.commentary.value,
                Nombre: event.target.firstname.value,
                Ubicación: event.target.country.value,
                Valoración:event.target.formvaloracion.value,
            });
            break;
        case MODIFICAR:
            event.preventDefault();
            refEditar.update({
                Comentario: event.target.commentary.value,
                Nombre: event.target.firstname.value,
                Ubicación: event.target.country.value,
            });
            break;
    }

    newvisitor.reset();
    currentUser();
}

function toggleVisitor(newvisitor) {
    var x = document.getElementById('newvisitor');
    x.classList.toggle('hidden');
}


function checkIfUserIsLoggedIn(){
    firebase.auth().onAuthStateChanged(function(user){

    })
    
}


function register(event){
    event.preventDefault();

    console.log('okeey');
    var modal = document.getElementById('modalRegister');

    var email = document.getElementById('emailRegister').value;
    var password = document.getElementById('passwordRegister').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        console.log('User register succesfull');
        $('#modalRegister').modal('toggle')
    }).catch(error =>{
        console.log(error.message)
    });
}