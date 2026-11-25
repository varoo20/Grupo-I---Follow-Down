import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.image('FondoMenu', '../assets/images/menu_principal.png');
        this.load.image('BotonJugar', '../assets/images/Boton.png');

        this.load.audio('title', '../assets/audio/Enter HallowNest - Title.mp3');

        this.load.audio('boton', '../assets/audio/raton_boton.mp3');
        }

    create() {
        const savedVolume = localStorage.getItem('gameVolume');
         if (savedVolume !== null) {
            this.sound.volume = parseFloat(savedVolume); 
        }  
        const savedMute = localStorage.getItem('gameMute'); 
        if (savedMute !== null) {
            this.sound.mute = (savedMute === 'true'); 
        }

        this.add.image(600, 350, 'FondoMenu').setDisplaySize(1200, 700);

        this.music = this.sound.add('title', { loop: true });
        this.music.play();

        // Pause/resume the music with the scene and stop it on exit
        this.events.once('shutdown', () => {
            this.events.off('pause');
            this.events.off('resume');
            this.music.destroy();
        });

        const PlayBtn = this.add.text(600, 340, 'Jugar', {
            fontSize: '32px',
            color: '#ffffff',
            padding: { x: 140, y: 25 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { PlayBtn.setStyle({ color: '#c78110' }); this.sound.play('boton'); })
            .on('pointerout', () => PlayBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => this.scene.start('LobbyWaiting'));

        const SettingsBtn = this.add.text(600, 430, 'Ajustes', {
            fontSize: '32px',
            color: '#ffffff',
            padding: { x: 120, y: 25 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { SettingsBtn.setStyle({ color: '#c78110' }); this.sound.play('boton'); })
            .on('pointerout', () => SettingsBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => this.scene.launch('SettingsScene'));

        const CreditsBtn = this.add.text(600, 520, 'Créditos', {
            fontSize: '32px',
            color: '#ffffff',
            padding: { x: 110, y: 25 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { CreditsBtn.setStyle({ color: '#c78110' }); this.sound.play('boton'); })
            .on('pointerout', () => CreditsBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => this.scene.start('CreditsScene'));

        const HelpBtn = this.add.text(600, 610, 'Ayuda', {
            fontSize: '32px',
            color: '#ffffff',
            padding: { x: 140, y: 25 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { HelpBtn.setStyle({ color: '#c78110' }); this.sound.play('boton'); })
            .on('pointerout', () => HelpBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => this.scene.launch('HelpScene'));
    }
}