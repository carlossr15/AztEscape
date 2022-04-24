export default class PiedraMovil extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, w, h){
        super(scene, x, y, 'piedraMovil');
        this.setScale(w/100,h/100);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.body.setDrag(5000, 0);
        this.scene.add.layer(this);
        //this.body.setSize(w,h);

        this.scene.physics.add.collider(this, this.scene.player);
        this.scene.physics.add.collider(this, this.scene.suelo);
        this.scene.physics.add.collider(this, this.scene.piedras);
        this.combination = this.scene.getCombinationSuelo();
        this.newCombination = '';
        this.combIncorrecta = this.scene.sound.add('combinacionIncorrecta', {volume: 1});
        this.abrirPuertaPared = this.scene.sound.add('abrirPuertaPared', {volume: 1});
    }

    hitBoton(){
        var allbuttons = this.scene.botonesSuelo.getChildren();
        for (var i = 0; i < this.scene.botonesSuelo.getLength(); i++){
            if(this.scene.physics.overlap(this, allbuttons[i]) && !allbuttons[i].getPulsado()){
                allbuttons[i].pulsado = true;
                console.log("Boton-pulsado");
                allbuttons[i].pulsar();
                this.newCombination += allbuttons[i].getNombre();
                console.log("Combination: " + this.newCombination);
                if(this.newCombination == this.combination) {
                    if(allbuttons[i].getAcciona() == 'puerta'){
                        this.scene.puertaPared1.abrirPuerta(); 
                        this.abrirPuertaPared.play();
                    }else if(allbuttons[i].getAcciona() == 'puente'){
                        this.scene.puente.bajar = true;
                        this.abrirPuertaPared.play(); //CAMBIAR POR SONIDO DE BAJAR PUENTE
                    }
                } 
                else if(this.newCombination.length / 2 == allbuttons[i].getNumero()){
                    this.combIncorrecta.play();
                    this.newCombination = '';
                    this.scene.time.delayedCall(200, function(){
                        for(var j = 0; j < this.scene.botonesSuelo.getLength(); j++){
                            allbuttons[j].pulsado = false;
                            allbuttons[j].sacar();
                        }   
                    }, [], this);
                    
                }
                allbuttons[i].destroy();
            }
        }
    }

    preUpdate(){
        this.hitBoton();
    }

}