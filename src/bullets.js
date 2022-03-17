
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
        if (pointerX > x){
            this.setVelocityX(500);
        }else{
            this.setVelocityX(-500);
        }
        if (pointerY > y){
            this.setVelocityY(500);
        }else{
            this.setVelocityY(-500);
        }
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if (this.y > 500){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}