var startExperienteBtn = document.getElementById('start_experience');
var bottomNav = document.getElementById('bottom-menu');


startExperienteBtn.onclick = function(){
    document.getElementById('container').outerHTML = '';
        // Muestra el menú inferior con una animación
    bottomNav.style.display = 'flex'; // Cambia el display para que sea visible
    setTimeout(function() {
        bottomNav.classList.add('show'); // Activa la animación de aparición
    }, 10); // Espera breve para asegurar que la transición ocurra
        
    document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
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
        console.log(position);
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