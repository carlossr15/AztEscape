export default class Bullets extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);
        

        this.createMultiple({
            classType: Bullet,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'bullet'
        });
    }

    fireBullet(x, y, pointerX, pointerY) {
        let bullet = this.getFirstDead(false);

        if (bullet){
            bullet.fire(x,y, pointerX, pointerY);
        }
    }

    
}

class Bullet extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y){
        super(scene, x, y, 'bullet');
        this.newCombination = '';
        this.combination;
        this.combIncorrecta = this.scene.sound.add('combinacionIncorrecta', {volume: 1});
        this.abrirPuertaPared = this.scene.sound.add('abrirPuertaPared', {volume: 1});
    }

    fire(x, y, pointerX, pointerY){
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.scene.physics.moveTo(this, pointerX, pointerY, 650);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.hurtEnemy();
        this.hitDiana();
        this.hitBoton();
        if (this.x <= 0){
            this.setActive(false);
            this.setVisible(false);
        }
        if (this.y > 2000){
            this.setActive(false);
            this.setVisible(false);
        }
        if (this.scene.physics.overlap(this, this.scene.suelo)){
            this.setActive(false);
            this.setVisible(false);
        }
    }

    hurtEnemy(){
        var allEnemies = this.scene.enemies.getChildren();
        for (var i = 0; i < this.scene.enemies.getLength(); i++){
            if (this.scene.physics.overlap(this, allEnemies[i])){
                allEnemies[i].hurt();
                console.log("PEDRADA");
            }
        }
    }

    hitDiana(){
        var allDianas = this.scene.dianas.getChildren()
        for (var i = 0; i < this.scene.dianas.getLength(); i++){
            if (this.scene.physics.overlap(this, allDianas[i])){
                allDianas[i].pulsado = true;
                console.log("Diana-pulsado");
                if(!allDianas[i].meHanDado){
                    allDianas[i].impactar();                    
                    if(allDianas[i].getAcciona() == 'puerta'){
                        this.scene.puertaPared2.abrirPuerta(); 
                        this.abrirPuertaPared.play();
                    }else if(allDianas[i].getAcciona() == 'puente'){
                        this.scene.puente2.bajar = true;
                        this.abrirPuertaPared.play(); //CAMBIAR POR SONIDO DE BAJAR PUENTE
                    }
                }
            }
        }
    }

    hitBoton(){
        var allbuttons = this.scene.botones.getChildren();
        if(allbuttons.length > 0) this.combination = this.scene.getCombinationPuente();
        for (var i = 0; i < allbuttons.length; i++){
            if(this.scene.physics.overlap(this, allbuttons[i]) && !allbuttons[i].getPulsado()){
                allbuttons[i].pulsado = true;
                console.log("Boton-pulsado");
                allbuttons[i].pulsar();
                this.newCombination += allbuttons[i].getNombre();
                console.log("Combination: " + this.newCombination);
                if(this.newCombination == this.combination) {
                    if(allbuttons[i].getAcciona() == 'puerta'){
                        this.scene.puertaPared2.abrirPuerta(); 
                        this.abrirPuertaPared.play();
                    }else if(allbuttons[i].getAcciona() == 'puente'){
                        this.scene.puente1.bajar = true;
                        this.abrirPuertaPared.play(); //CAMBIAR POR SONIDO DE BAJAR PUENTE
                    }
                } 
                else if(this.newCombination.length / 2 == allbuttons[i].getNumero()){
                    this.combIncorrecta.play();
                    this.newCombination = '';
                    this.scene.time.delayedCall(200, function(){
                        for(var j = 0; j < allbuttons.length; j++){
                            allbuttons[j].pulsado = false;
                            allbuttons[j].sacar();
                        }   
                    }, [], this);
                    
                }
            }
        }
        
    }

}