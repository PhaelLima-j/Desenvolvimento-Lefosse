// abrindo pagina de anexo
const Wordpage = () => {
open("teste.html", "_self");
};

// logout
document.getElementById('logoutButton').addEventListener('click', () => {
    window.location.href ='/auth/logout';
});