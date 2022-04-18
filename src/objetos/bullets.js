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
        var botonMecanismo = this.scene.botonMecanismo;
        if (this.scene.physics.overlap(this, botonMecanismo)){
            console.log("pihpphjip");
            botonMecanismo.pulsar();
            //botonMecanismo.destruir();
        }
    }

}