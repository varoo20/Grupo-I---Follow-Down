import Phaser from 'phaser';

export class LobbyWaiting extends Phaser.Scene {
    constructor() {
        super('LobbyWaiting');
    }

    preload() {
        this.load.image('FondoSalas', '../assets/images/boceto_pantalla_salas.png'); 

        this.load.audio('lobby', '../assets/audio/Greenpath - Lobby.mp3');
    }   

    create() {
        this.add.image(600, 350, 'FondoSalas').setDisplaySize(1200, 700);

        this.music = this.sound.add('lobby', { loop: true, volume: 0.3 });
        this.music.play();

        // Pause/resume the music with the scene and stop it on exit
        this.events.once('shutdown', () => {
            this.events.off('pause');
            this.events.off('resume');
            this.music.destroy();
        });

        const LocalPlayBtn = this.add.text(300, 430, 'Jugar Local', {
            fontSize: '32px',
            color: '#ffffff',
            padding: { x: 60, y: 25 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { LocalPlayBtn.setStyle({ color: '#c78110' }); this.sound.play('boton'); })
            .on('pointerout', () => LocalPlayBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => this.scene.start('GameScene'));

        const OnlinePlayBtn = this.add.text(900, 430, 'Jugar Online', {
            fontSize: '32px',
            color: '#ffffff',
            padding: { x: 50, y: 25 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { OnlinePlayBtn.setStyle({ color: '#c78110' }); this.sound.play('boton'); })
            .on('pointerout', () => OnlinePlayBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => { alert('Opción no implementada todavía! Espera a las actualizaciones...'); });

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