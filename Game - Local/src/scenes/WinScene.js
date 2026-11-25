import Phaser from 'phaser';

export class WinScene extends Phaser.Scene {
    constructor() {
        super('WinScene');
    }

    init(data){
        this.scoreJ1 = data.scoreJ1 || 0;
        this.scoreJ2 = data.scoreJ2 || 0;
    }

    preload() {  
        this.load.image('FondoVictoria', '../assets/images/victoria.png');

        this.load.image('Gema', '../assets/images/trebol.png');

        this.load.audio('victory', '../assets/audio/Victory sound.mp3');
        }

    create() {
        //this.add.image(600, 350, 'Fondo').setDisplaySize(1200, 700);

        this.add.rectangle(600, 350, 1200, 700, 0x000000, 0.3);

        this.add.rectangle(600, 350, 500, 600, 0x000000, 0.7);

        this.add.image(600, 350, 'FondoVictoria').setDisplaySize(1200, 700);

        this.sound.play('victory');

        this.add.text(520, 310, 'Fika: ' + `${this.scoreJ1} `, { fontSize: '32px', color: '#ff4400' }).setOrigin(0.5);
        this.add.text(520, 380, 'Take: ' + `${this.scoreJ2} `, { fontSize: '32px', color: '#d58607' }).setOrigin(0.5);

        this.add.image(670, 310, 'Gema').setDisplaySize(50, 50);
        this.add.image(670, 380, 'Gema').setDisplaySize(50, 50);

        const restartBtn = this.add.text(600, 440, 'Reiniciar nivel', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => restartBtn.setStyle({ color: '#c78110' }))
            .on('pointerout', () => restartBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => {
                this.scene.stop();
                this.scene.start('GameScene');
            });

        const lobbyBtn = this.add.text(600, 520, 'Volver a la Sala', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => lobbyBtn.setStyle({ color: '#c78110' }))
            .on('pointerout', () => lobbyBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => {
                this.scene.stop('GameScene');
                this.scene.start('LobbyWaiting');
            });

        const mainMenuBtn = this.add.text(600, 600, 'Volver al Menú', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => mainMenuBtn.setStyle({ color: '#c78110' }))
            .on('pointerout', () => mainMenuBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => {
                this.scene.stop('GameScene');
                this.scene.start('MenuScene');
            });
    }
}