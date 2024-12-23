/* global AFRAME */

import "aframe";

//funcion para que el personaje corra con la tecla shift
AFRAME.registerComponent('run-controls', {
    //definir propiedades del componente
    schema: {
        normalSpeed: { type: 'number', default: 10 },
        runSpeed: { type: 'number', default: 50 }
    },

    init: function () {
        var el = this.el;
        var data = this.data;

        // Si se presiona la tecla shift
        window.addEventListener('keydown', function (event) {
        if (event.key === 'Shift') {
            console.log("press shift");
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

AFRAME.registerComponent('log-position', {
    tick: function () {
      const position = this.el.object3D.position;
      const positionData = {
        x: position.x.toFixed(2),
        y: position.y.toFixed(2),
        z: position.z.toFixed(2)
      };
      //console.log("Informacion: ", positionData);
      this.el.emit('position-updated', positionData);
    }
  });
  
  

  AFRAME.registerComponent('custom-look-controls', {
    init: function () {
      this.lookControls = this.el.components['look-controls'];
      this.mouseSensitivity = 1; // Ajusta este valor para más o menos sensibilidad
      this.originalMouseMove = this.lookControls.onMouseMove.bind(this.lookControls);
      this.lookControls.onMouseMove = this.onMouseMove.bind(this);
    },
    onMouseMove: function (event) {
      event.movementX *= this.mouseSensitivity;
      event.movementY *= this.mouseSensitivity;
      this.originalMouseMove(event);
    }
  });
  