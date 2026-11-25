export class Player {

    constructor(scene, id, x, y, texture) {
        this.id = id;
        this.scene = scene;
        this.score = 0;
        this.speed = 250;

        this.sprite = scene.physics.add.sprite(x, y, texture);
        this.sprite.setDisplaySize(35, 40);

        this.sprite.setImmovable(false);
        this.sprite.setCollideWorldBounds(true);
    }
}