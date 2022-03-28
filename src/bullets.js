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
        var raton = this.scene.add.image(0,0,'cursor').setVisible(false);
        raton.setPosition(pointerX, pointerY);
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.scene.physics.moveToObject(this, raton, 650);
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.hurtEnemy();
        if (this.x <= 0){
            this.setActive(false);
            this.setVisible(false);
        }
        if (this.y >  1500){
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
}