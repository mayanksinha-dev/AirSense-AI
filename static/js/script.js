// =====================================
// GSAP
// =====================================

gsap.registerPlugin(ScrollTrigger);

// =====================================
// CUSTOM CURSOR
// =====================================

const cursor = document.getElementById("cursor");

if (cursor) {

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";

});

document.querySelectorAll("a,button").forEach(el=>{

el.addEventListener("mouseenter",()=>{

cursor.style.width="50px";
cursor.style.height="50px";

});

el.addEventListener("mouseleave",()=>{

cursor.style.width="20px";
cursor.style.height="20px";

});

});

}

// =====================================
// HERO ANIMATION
// =====================================

gsap.from(".tag",{

opacity:0,
y:50,
duration:1

});

gsap.from(".hero-title",{

opacity:0,
y:120,
duration:1.4,
ease:"power4.out"

});

gsap.from(".hero-description",{

opacity:0,
y:60,
duration:1.2,
delay:.3

});

gsap.from(".hero-buttons",{

opacity:0,
y:60,
duration:1.2,
delay:.5

});

// =====================================
// FEATURE CARDS
// =====================================

gsap.utils.toArray(".feature-card")
.forEach(card=>{

gsap.from(card,{

scrollTrigger:{

trigger:card,
start:"top 85%"

},

opacity:0,
y:100,
duration:1

});

});

// =====================================
// STATS
// =====================================

gsap.from(".stat",{

opacity:0,
y:100,
duration:1,
stagger:.2

});

// =====================================
// SECTION HEADERS
// =====================================

gsap.utils.toArray(".section-header")
.forEach(section=>{

gsap.from(section,{

scrollTrigger:{

trigger:section,
start:"top 85%"

},

opacity:0,
y:80,
duration:1

});

});

// =====================================
// DARK MODE
// =====================================

const themeBtn =
document.getElementById("themeToggle");

if(themeBtn){

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("light");

if(
document.body.classList.contains("light")
){

themeBtn.innerHTML="☀️";

}else{

themeBtn.innerHTML="🌙";

}

});

}

// =====================================
// CHART DEMO
// =====================================

const chartCanvas =
document.getElementById("aqiChart");

if(chartCanvas){

new Chart(chartCanvas,{

type:"line",

data:{

labels:[
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun"
],

datasets:[{

label:"AQI",

data:[
70,
90,
120,
95,
80,
60
],

borderColor:"#0A84FF",

backgroundColor:
"rgba(10,132,255,.2)",

fill:true,

tension:.4

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

labels:{
color:"#fff"
}

}

},

scales:{

x:{

ticks:{
color:"#fff"
}

},

y:{

ticks:{
color:"#fff"
}

}

}

}

});

}

// =====================================
// THREE JS BACKGROUND
// =====================================

const container =
document.getElementById(
"three-container"
);

if(container){

const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(

75,

window.innerWidth/
window.innerHeight,

0.1,

1000

);

const renderer =
new THREE.WebGLRenderer({

alpha:true,
antialias:true

});

renderer.setSize(

window.innerWidth,

window.innerHeight

);

container.appendChild(
renderer.domElement
);

const geometry =
new THREE.IcosahedronGeometry(
4,
1
);

const material =
new THREE.MeshBasicMaterial({

color:0x0A84FF,

wireframe:true

});

const mesh =
new THREE.Mesh(
geometry,
material
);

scene.add(mesh);

camera.position.z=10;

function animate(){

requestAnimationFrame(
animate
);

mesh.rotation.x+=0.002;

mesh.rotation.y+=0.003;

renderer.render(
scene,
camera
);

}

animate();

window.addEventListener(

"resize",

()=>{

camera.aspect=
window.innerWidth/
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

}

);

}

// =====================================
// MAGNETIC BUTTON
// =====================================

document
.querySelectorAll("button")
.forEach(button=>{

button.addEventListener(

"mousemove",

e=>{

const rect=
button.getBoundingClientRect();

const x=
e.clientX-
rect.left-
rect.width/2;

const y=
e.clientY-
rect.top-
rect.height/2;

gsap.to(button,{

x:x*0.15,
y:y*0.15,
duration:.3

});

}

);

button.addEventListener(

"mouseleave",

()=>{

gsap.to(button,{

x:0,
y:0,
duration:.4

});

}

);

});

// =====================================
// PAGE LOAD
// =====================================

window.addEventListener(

"load",

()=>{

gsap.from("body",{

opacity:0,
duration:1

});

}

);
