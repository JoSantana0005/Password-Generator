let UpperCase = document.getElementById('Uppercase');
let lowerCase = document.getElementById('LowerCase');
let Numbers = document.getElementById('Numbers');
let Symbols = document.getElementById('Symbols');
// Evento para agregara el valor del inpt de rango en el span
let rango = () =>{
    
    let Length_password = document.getElementById('Length--password');
    let range = document.getElementById('Number--range');

    range.textContent = Length_password.value
    Length_password.addEventListener('input',(event) =>{
        if(range){
            range.textContent = event.target.value
            console.log("Cambio el valor")
        }else{
            console.log("Hubo un error")
        }
    })
}
rango();

// Function para la contraseña aleatoria

function GeneratePassword(str,Length){
    let pass = ''
    for (let i = 0; i < Length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
    }
    return pass
}

// Function que genera la cadena de la contraseña
function StringCharacter(){
    let symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    let Upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let Lower = 'abcdefghijklmnopqrstuvwxyz';
    let number = '0123456789'

    let character = '';

    if(UpperCase.checked){
        character += Upper
    }
    if(lowerCase.checked){
        character += Lower
    }
    if(Numbers.checked){
        character += number
    }
    if(Symbols.checked){
        character += symbols
    }
    
    return character
}

// Evento que genera una contraseña aleatoria
let password;
//function para validar la fuerza de la contraseña
function Stregth_password(password){
    if(password.length < 8){
        return 'Weak'
    }else if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)){
        return 'Safe'
    }else{
        return 'Medium'
    }
}
let Level = document.getElementById('Level');
//Function que activa las barras
function wavesColors(level){
    let waves = document.querySelectorAll('.Barra, .Barra_debil, .Barra_mediana');
    waves.forEach(element =>{
        element.style.backgroundColor = 'Transparent'
    })
    
    if(level == 'Weak'){
        Level.textContent = level
        let wave_red = document.getElementsByClassName('Barra_debil');
        Array.from(wave_red).forEach(element =>{
            element.style.backgroundColor = '#eb1a1a'
        })
    }
    
    else if(level == 'Medium'){
        Level.textContent = level
        let wave_orange = document.querySelectorAll('.Barra_mediana');
        Array.from(wave_orange).forEach(element =>{
            element.style.backgroundColor = '#b24e00'
        });
    }
    
    else if(level == "Safe"){
        Level.textContent = level
        let wave_green = document.querySelectorAll('.Barra');
        Array.from(wave_green).forEach(element =>{
            element.style.backgroundColor = '#29e200'
        });
        
    }
}
// String para las contraseñas
let result = document.getElementById('Result');
document.getElementById('Generate').addEventListener('click',(event)=>{
    event.preventDefault();
    let Length = document.getElementById('Length--password').value;
    let characters = StringCharacter();

    if(Length == 0 || (!UpperCase.checked && !lowerCase.checked && !Numbers.checked && !Symbols.checked)){
        alert("Please select password options and assign a password size")
        return
    }

    if(result){
        password = GeneratePassword(characters,Length);
        result.textContent = password
        console.log(password)
    }else{
        console.log("Algo salio mal")
    }
    
    let Stregth = Stregth_password(password);
    wavesColors(Stregth);
})

//Evento para copiar la contraseña en el teclado
document.getElementById('Copy').addEventListener('click',()=>{
    if(result){
        navigator.clipboard.writeText(result.textContent).then(function(){
            alert("The copied password is" + result.textContent)
        },function(err){
            console.error('Error' + err)
        })
    }else{
        console.log("No existen result")
    }
})
