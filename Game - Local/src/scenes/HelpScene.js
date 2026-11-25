import Phaser from 'phaser';

export class HelpScene extends Phaser.Scene {
    constructor() {
        super('HelpScene');
    }

    preload() {
        this.load.image('FondoAyuda', '../assets/images/ayuda.png');
        }

    create() {
        this.add.image(600, 350, 'FondoAyuda').setDisplaySize(1200, 700);

        const ReturnBtn = this.add.text(1070, 665, 'Menú', {
            fontSize: '32px',
            color: '#ffffff',
            padding: { x: 90, y: 15 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { ReturnBtn.setStyle({ color: '#c78110' }); this.sound.play('boton'); })
            .on('pointerout', () => ReturnBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => this.scene.stop(), this.scene.resume('MenuScene'));
    }
}