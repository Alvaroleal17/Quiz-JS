const quizContainer = document.querySelector(".quiz-container")
const contenedorRespuestas = document.querySelector(".rastreador-respuestas");
const opciones = document.querySelector(".opciones").children;
const numeroPregunta = document.querySelector(".num-pregunta");
const pregunta = document.querySelector(".pregunta");
const preguntasTotales = document.querySelector(".preguntas-totales");
const respuestasCorrectas = document.querySelector(".respuestas-correctas");
const preguntasTotales2 = document.querySelector(".preguntas-totales2");
const porcentajeTotal = document.querySelector(".porcentaje");
const startQuiz = document.getElementById("start")

//Función que muestra la pagina de inicio
startQuiz.addEventListener("click", function () {
  document.querySelector(".quiz-container").style.display = "block";
  document.querySelector(".start-quiz").style.display = "none";
});

//Ocultar las preguntas
quizContainer.style.display = "none";




let currentIndex;
let index = 0;
let preguntasRespondidas = [];
let puntaje = 0;

const op1 = document.querySelector(".opcion1");
const op2 = document.querySelector(".opcion2");
const op3 = document.querySelector(".opcion3");
const op4 = document.querySelector(".opcion4");

const preguntas = [
  {
    p: '¿Cuántos litros de sangre tiene una persona adulta?',
    opcion: [
      "Tiene entre 2 y 4 litros",
      "Tiene entre 4 y 6 litros",
      "Tiene 10 litros",
      "Tiene 7 litros",
    ],
    respuesta: 1,
  },
  {
    p: "¿Quién es el autor de la frase 'Pienso, luego existo'?",
    opcion: [
      "Platón",
      "Galileo Galilei",
      "Descartes",
      "Sócrates",
    ],
    respuesta: 2,
  },
  {
    p: "¿Cuál es el país más grande y el más pequeño del mundo?",
    opcion: [
      "Rusia y Vaticano",
      "China y Nauru",
      "Canadá y Mónaco",
      "Estados Unidos y Malta",
    ],
    respuesta: 0,
  },
  {
    p: "¿Cuál es el libro más vendido en el mundo después de la Biblia?",
    opcion: [
      "El Señor de los Anillos",
      "Don Quijote de la Mancha",
      "El Principito",
      "Cien años de Soledad",
    ],
    respuesta: 1,
  },
  {
    p: "¿Cuántos decimales tiene el número pi π?",
    opcion: [
      "Dos",
      "Cien",
      "Infinitos",
      "Mil",
    ],
    respuesta: 2,
  },
];

preguntasTotales.innerHTML = preguntas.length;

function load() {
  numeroPregunta.innerHTML = index + 1;
  pregunta.innerHTML = preguntas[currentIndex].p;
  op1.innerHTML = preguntas[currentIndex].opcion[0];
  op2.innerHTML = preguntas[currentIndex].opcion[1];
  op3.innerHTML = preguntas[currentIndex].opcion[2];
  op4.innerHTML = preguntas[currentIndex].opcion[3];
  index++;
}

//Verificar si la respuesta selecciona es correcta o incorrecta
function check(element) {
  if (element.id == preguntas[currentIndex].respuesta) {
    element.className = "correct";
    updateAnswersTracker("correct");
    puntaje++;
  } else {
    element.className = "wrong";
    updateAnswersTracker("wrong");
  }
  disableClick();
}

//Verificar si el usuario seleccionó una respuesta antes de hacer click en el botón 'Siguiente'
function validar() {
  if (!opciones[0].classList.contains("disabled")) {
    alert("Seleccione una pregunta por favor");
  } else {
    randomQuestion();
    enableClick();
  }
}

//Funcion para el evento de click en el botón 'Siguiente'
function next() {
  validar();
}

//Función para deshabilitar  click para las opciones
function disableClick() {
  for (let i = 0; i < opciones.length; i++) {
    opciones[i].classList.add("disabled");

    if (opciones[i].id == preguntas[currentIndex].respuesta) {
      opciones[i].classList.add("correct");
    }
  }
}

//Función para habilitar click en las opciones
function enableClick() {
  for (let i = 0; i < opciones.length; i++) {
    opciones[i].classList.remove("disabled", "correct", "wrong");
  }
}

//Funcióon para seleccionar una pregunta de forma aleatoria
function randomQuestion() {
  let randomNumber = Math.floor(Math.random() * preguntas.length);
  if (index == preguntas.length) {
    quizOver();
  } else {
    if (preguntasRespondidas.length > 0) {
      if (preguntasRespondidas.includes(randomNumber)) {
        randomQuestion();
      } else {
        currentIndex = randomNumber;
        load();
      }
    }
    if (preguntasRespondidas.length == 0) {
      currentIndex = randomNumber;
      load();
    }
    //Añadir la pregunta a la lista de preguntas respondidas
    preguntasRespondidas.push(randomNumber);
  }
}

//Reiniciar el quiz
window.onload = function () {
  this.randomQuestion();
  this.answersTracker();
};

//Configurar los elementos del rastreador de respuestas
function answersTracker() {
  for (let i = 0; i < preguntas.length; i++) {
    const div = document.createElement("div");
    contenedorRespuestas.appendChild(div);
  }
}

//Actualizar los elementos del rastreador de respuestas
function updateAnswersTracker(newClass) {
  contenedorRespuestas.children[index - 1].classList.add(newClass);
}

//Muestrar la finalización de la prueba
function quizOver() {
  document.querySelector(".quiz-over").classList.add("show");
  respuestasCorrectas.innerHTML = puntaje;
  preguntasTotales2.innerHTML = preguntas.length;
  porcentajeTotal.innerHTML =
    Math.round((puntaje / preguntas.length) * 100) + "%";
}

function tryAgain() {
  window.location.reload();
}
