import Phaser from 'phaser';

export class LobbyScene extends Phaser.Scene {
    constructor() {
        super('LobbyScene');
    }

    create() {
        this.load.image('Fondo', '../assets/images/boceto_pantalla_selector_nivel.png');

        this.add.image(400, 300, 'Fondo');

        this.add.text(400, 150, 'PONG', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const localBtn = this.add.text(400, 320, 'Local Play', {
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => localBtn.setStyle({ color: '#ffff00' }))
            .on('pointerout', () => localBtn.setStyle({ color: '#00ff00' }))
            .on('pointerdown', () => this.scene.start('GameScene'));
    }
}