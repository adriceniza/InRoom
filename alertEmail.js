window.onload = inicializar;



function inicializar(){
    event.preventDefault();
    formAutenticacion = document.getElementById('email-autenticacion');
    formAutenticacion.addEventListener('click' , alertar, false);

}
function alertar(){
    event.preventDefault();
    $('#modalEmail').modal();
}