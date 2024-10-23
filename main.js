var startExperienteBtn = document.getElementById('start_experience');

startExperienteBtn.onclick = function(){
    document.getElementById('container').outerHTML = '';
    document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
};

//funcion para que el personaje corra con la tecla shift
AFRAME.registerComponent('run-controls', {
    //definir propiedades del componente
    schema: {
        normalSpeed: { type: 'number', default: 65 },
        runSpeed: { type: 'number', default: 100 }
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
