export class Collectible {

    constructor(scene, x, y, texture, isPoint) {
        this.scene = scene;
        this.isPoint = isPoint;

        this.sprite = scene.physics.add.staticSprite(x, y, texture);
        this.sprite.setDisplaySize(35, 40);
        this.sprite.refreshBody();
    }

    onCollect(player){
        if(this.isPoint == true){
            player.score += 1;
            this.scene.sound.play('collectT');
            //Esto luego se mostrará en VictoryScene
        }else{
            player.sprite.setTint(0x9370DB);
            player.sprite.setFlipY(true);
            player.sprite.setGravityY(-5500);
            this.scene.sound.play('collectB');

            this.scene.time.delayedCall(4000, () => {
                player.sprite.clearTint();
                player.sprite.setFlipY(false);
                player.sprite.setGravityY(0);
            });
        }
        this.sprite.destroy();
    }
}