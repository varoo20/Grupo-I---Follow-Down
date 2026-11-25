import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
    }

    preload() {
        this.load.image('FondoPausa', '../assets/images/pausaa.png');
        }

    create() {
        this.add.rectangle(600, 350, 1200, 700, 0x000000, 0.5);

        this.add.rectangle(600, 350, 500, 600, 0x000000, 0.7);

        this.add.image(600, 380, 'FondoPausa').setDisplaySize(1200, 700);
        
        const resumeBtn = this.add.text(600, 350, 'Continuar', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => resumeBtn.setStyle({ color: '#c78110' }))
            .on('pointerout', () => resumeBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => {
                this.scene.stop();
                this.scene.resume('GameScene');
            });

        const lobbyBtn = this.add.text(600, 450, 'Volver a la Sala', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => lobbyBtn.setStyle({ color: '#c78110' }))
            .on('pointerout', () => lobbyBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => {
                this.scene.stop('GameScene');
                this.scene.start('LobbyWaiting');
            });

        const mainMenuBtn = this.add.text(600, 550, 'Volver al Menú', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => mainMenuBtn.setStyle({ color: '#c78110' }))
            .on('pointerout', () => mainMenuBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => {
                this.scene.stop('GameScene');
                this.scene.start('MenuScene');
            });
    }
}
