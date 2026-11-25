export class Platform {

    constructor(scene, x, y, width, height, color, lethalTo) {
        this.scene = scene;
        this.lethalTo = lethalTo;

        this.sprite = scene.add.rectangle(x, y, width, height, color);
        this.sprite.setVisible(false);
        scene.physics.add.existing(this.sprite, true);
    }

    checkLethal(player){
        if(this.lethalTo === 'both'){
            this.killPlayer();
        }else if(this.lethalTo === 'player1' && player.id === 'player1'){
            this.killPlayer();
        }else if(this.lethalTo === 'player2' && player.id === 'player2'){
            this.killPlayer();
        }
    }

    killPlayer(){
        this.scene.sound.play('death');
        this.scene.scene.restart();
    } 
}