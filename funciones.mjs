 import { usersDB } from "./users.mjs" 

const createLocal = () => {
    if(localStorage.getItem('users') === null){
        let users = JSON.stringify([])
        localStorage.setItem('users', users)
    }
}
createLocal();
let localUsers = JSON.parse(localStorage.getItem('users')) || [];

console.log(localUsers)


document.addEventListener("DOMContentLoaded", function () {
   
    const loginForm = document.getElementById("login-form");

    // SING-UP
    const formularioSingUp = document.querySelector('#registro-form')




     const inputSingUp = document.querySelectorAll('#registro-form input')
    //Validación
    const expresion = {

        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        dni: /^[0-9]{8,}$/, // Numeros, hasta 8 digitos
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        password: /^.{8,12}$/ // 4 a 12 digitos.

    }

    const check = {

        nombre: false,
        apellido: false,
        dni: false,
        email: false,
        usuario: false,
        password: false

    }

    const checkValidation = (e) => {
        if (e.target.name === 'singup__nombre') validations(expresion.nombre, e.target, 'nombre')
        if (e.target.name === 'singup__apellido')validations(expresion.apellido, e.target, 'apellido')
        if (e.target.name === 'singup__dni') validations(expresion.dni, e.target, 'dni')
        if (e.target.name === 'singup__email') validations(expresion.email, e.target, 'email')
        if (e.target.name === 'singup__usuario') validations(expresion.usuario, e.target, 'usuario')
        if (e.target.name === 'singup__password') {
            validations(expresion.password, e.target, 'password')
            checkpassword();
        }
        if (e.target.name === 'singup__password2') checkpassword()

    }

    const validations = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.querySelector(`#singup__${campo}`).classList.add('check-active')
            document.querySelector(`#singup__${campo}`).classList.remove('check-error')
            document.querySelector(`#error_${campo}`).classList.add('error__inactive')
            check[campo] = true;
            console.log('hola if')
        } else {
            document.querySelector(`#singup__${campo}`).classList.remove('check-active')
            document.querySelector(`#singup__${campo}`).classList.add('check-error')
            document.querySelector(`#error_${campo}`).classList.remove('error__inactive')
            check[campo] = false;
            console.log('hola else')
        }
    }
    inputSingUp.forEach((input) => {
        input.addEventListener('keyup', checkValidation)
        input.addEventListener('blur', checkValidation)
    }) 



    //Validación password
     const checkpassword = () => {
        const pass1 = document.getElementById('singup__password').value
        const pass2 = document.getElementById('singup__password2').value

        if (pass1 !== pass2) {
            document.querySelector(`#singup__password2`).classList.remove('check-active')
            document.querySelector(`#singup__password2`).classList.add('check-error')
            document.querySelector(`#error_password2`).classList.add('error-active')
            check['password'] = false;
        } else {
            document.querySelector(`#singup__password2`).classList.add('check-active')
            document.querySelector(`#singup__password2`).classList.remove('check-error')
            document.querySelector(`#error_password2`).classList.remove('error-active')
            check['password'] = true;

        }
    } 



    //Guardar datos
     formularioSingUp.addEventListener('submit', (e) => {
    
        e.preventDefault();
        if(check.nombre && check.apellido && check.dni && check.email && check.usuario && check.password){
            let nombre = document.getElementById('singup__nombre').value
            let apellido = document.getElementById('singup__apellido').value
            let dni = document.getElementById('singup__dni').value
            let email = document.getElementById('singup__email').value
            let usuario = document.getElementById('singup__usuario').value
            let password = document.getElementById('singup__password').value
            
            
            let users = {
                nombre,
                apellido,
                dni,
                email,
                usuario,
                password               
            }
            
            localUsers.push(users);
            localStorage.setItem('users', JSON.stringify(localUsers));
            localUsers = JSON.parse(localStorage.getItem('users'))
            localUsers.push(users)
            localStorage.setItem('users',JSON.stringify(localUsers))
            formularioSingUp.reset();
            document.querySelector('#login').classList.remove('inactive')
            document.querySelector('#registro').classList.add('inactive')
            console.log(localUsers, 'localUsers')
        }
    }) 





    //Enviar datos para poder registrarse
    formularioSingUp.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuario = document.getElementById("singup__usuario").value;
        const password = document.getElementById("singup__password").value;
        const sing = document.getElementById('singUp')
        sing.style.display = 'none'
        document.getElementById('login').classList.remove("inactive")

        // ... (obtener otros campos)

        // Almacenar en Local Storage (ejemplo)
        const userData = { usuario, password };
        localStorage.setItem("userData", JSON.stringify(userData));

        alert("Datos registrados exitosamente");
        //        window.location.href = "login.html"; // Redirigir a la página login.html 
    });


    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        

        const loginUsuario = document.getElementById("login-usuario").value;
        const loginPassword = document.getElementById("login-password").value;

        // Obtener los datos almacenados
        const storedUserData = JSON.parse(localStorage.getItem("users"));
        const usuarioPrueba = storedUserData.find((user) => user.usuario == loginUsuario);

          console.log(usuarioPrueba);
        if (usuarioPrueba.password === loginPassword &&
            usuarioPrueba.usuario === loginUsuario) {
            alert("Inicio de sesión exitoso");
            window.location.href = "home.html"; // Redirigir a la página home.html

        } else {
            alert("Credenciales incorrectas");
        }
    });
});


