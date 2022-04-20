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

class Bullet extends Phaser.Physics.Arcade.Sprite{

    constructor(scene,x,y){
        super(scene, x, y, 'bullet');
        this.combination = this.scene.getCombination();
        this.newCombination = '';
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
                allDianas[i].destroy();
                console.log("DIANA");
            }
        }
    }

    hitBoton(){
        var allbuttons = this.scene.botones.getChildren();
        for (var i = 0; i < this.scene.botones.getLength(); i++){
            if(this.scene.physics.overlap(this, allbuttons[i]) && !allbuttons[i].getPulsado()){
                allbuttons[i].pulsado = true;
                console.log("Boton-pulsado");
                allbuttons[i].pulsar();
                this.newCombination += allbuttons[i].getNombre();
                console.log("Combination: " + this.newCombination);
                if(this.newCombination == this.combination)
                    this.scene.puertaPared2.abrirPuerta();  
                else if(this.newCombination.length / 2 == allbuttons[i].getNumero()){
                    this.newCombination = '';
                    this.scene.time.delayedCall(200, function(){
                        for(var j = 0; j < this.scene.botones.getLength(); j++){
                            allbuttons[j].pulsado = false;
                            allbuttons[j].sacar();
                        }   
                    }, [], this);
                    
                }
            }
        }
        
    }

}