var startExperienteBtn = document.getElementById('start_experience');
var bottomNav = document.getElementById('bottom-menu');
var camContainer = document.getElementById('camPos');
var exitBtn = document.getElementById('exit');
var isCamVisible = false;
var visorButtom = document.getElementById('visor-button');

startExperienteBtn.onclick = function() {
    document.getElementById('main-menu').style.display = 'none';
    bottomNav.style.display = 'flex'; 
    setTimeout(function() {
        bottomNav.classList.add('show');
    }, 10);
    
    document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
}

exitBtn.onclick = function() {
    window.close(); 
}

visorButtom.onclick = function(){
    if(isCamVisible){
        camContainer.style.display = 'none'; 

    }else{
        console.log("activing");
        camContainer.style.display = 'flex'; 
    
        setTimeout(function() {
            camContainer.classList.add('show'); 
        }, 10);
        
        document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
    }
    isCamVisible = !isCamVisible;

}

//funcion para que el personaje corra con la tecla shift
AFRAME.registerComponent('run-controls', {
    //definir propiedades del componente
    schema: {
        normalSpeed: { type: 'number', default: 40 },
        runSpeed: { type: 'number', default: 80 }
    },

    init: function () {
        var el = this.el;
        var data = this.data;

        // Si se presiona la tecla shift
        window.addEventListener('keydown', function (event) {
        if (event.key === 'Shift') {
            el.setAttribute('wasd-controls', 'acceleration', data.runSpeed);
        }
        });
        //si se suelta la tecla shift
        window.addEventListener('keyup', function (event) {
        if (event.key === 'Shift') {
            el.setAttribute('wasd-controls', 'acceleration', data.normalSpeed);
        }
        });
    }
});

//funcion para que el personaje salte al presiona la tecla space
AFRAME.registerComponent('jump-controls', {
    //definir propiedades del componente
    schema: {
        jumpHeight: {type: 'number', default: 5},
        gravity: {type: 'number', default: -9.8}
    },
    init: function(){
        this.velocityY = 0;
        this.isJumping = false;
        this.groundLevel = this.el.object3D.position.y;
        this.jumpStartHeight = this.groundLevel;
        var el = this.el;
        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && !this.isJumping) {
                console.log("saltando!!!");
                this.isJumping = true;
                this.velocityY = this.data.jumpHeight;
            }
        });
    },
    //funcion tick (ejecutar a cada frame)
    tick: function(time, timeDelta){
        var position = this.el.object3D.position;
        //console.log(position);
        //si esta en el aire
        if(this.isJumping){
            position.y += this.velocityY * (timeDelta/1000); //bajar al jugador 
            this.velocityY += this.data.gravity * (timeDelta/1000); //aumentar la gravedad
            if (position.y <= this.groundLevel) {
                position.y = this.groundLevel;
                this.isJumping = false;
                this.velocityY = 0;
            }
        }
    }
});

const loader = new THREE.GLTFLoader();
loader.load('models/genshin_impact_-_furina.glb', function (gltf) {
    scene.add(gltf.scene);
    renderer.render(scene, camera);
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();