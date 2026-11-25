import Phaser from 'phaser';

export class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    preload() {
        this.load.image('FondoCreditos', '../assets/images/creditos.png');

        this.load.audio('credits', '../assets/audio/The White Lady - Credits.mp3');
        }

    create() {
        this.add.image(600, 350, 'FondoCreditos').setDisplaySize(1200, 700);

        this.music = this.sound.add('credits', { loop: true });
        this.music.play();

        // Pause/resume the music with the scene and stop it on exit
        this.events.once('shutdown', () => {
            this.events.off('pause');
            this.events.off('resume');
            this.music.destroy();
        });

        const ReturnBtn = this.add.text(1070, 665, 'Menú', {
            fontSize: '32px',
            color: '#ffffff',
            padding: { x: 90, y: 15 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { ReturnBtn.setStyle({ color: '#c78110' }); this.sound.play('boton'); })
            .on('pointerout', () => ReturnBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}