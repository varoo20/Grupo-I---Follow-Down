import Phaser from 'phaser';

export class SettingsScene extends Phaser.Scene {
    constructor() {
        super('SettingsScene');
    }

    preload() { 
        this.load.image('FondoAjustes', '../assets/images/boceto_ajustes.png');
        }
            
    create() {
        this.add.image(600, 350, 'FondoAjustes').setDisplaySize(1200, 700);

        this.add.text(170, 360, 'Audio', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const volumeText = this.add.text(600, 365, `${Math.round(this.sound.volume * 100)}%`,
        { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);

        const MinusSoundBtn = this.add.text(420, 365, '-', {
            fontSize: '32px',
            color: '#ffffff',
            padding: { x: 20, y: 15 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { MinusSoundBtn.setStyle({ color: '#c78110' }); this.sound.play('boton'); })
            .on('pointerout', () => MinusSoundBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => {this.sound.volume = Math.max(0, this.sound.volume - 0.1);
                volumeText.setText(`${Math.round(this.sound.volume * 100)}%`);
                localStorage.setItem('gameVolume', this.sound.volume);
            });

        const PlusSoundBtn = this.add.text(775, 365, '+', {
            fontSize: '32px',
            color: '#ffffff',
            padding: { x: 20, y: 15 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { PlusSoundBtn.setStyle({ color: '#c78110' }); this.sound.play('boton'); })
            .on('pointerout', () => PlusSoundBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => {this.sound.volume = Math.min(1, this.sound.volume + 0.1);
                volumeText.setText(`${Math.round(this.sound.volume * 100)}%`);
                localStorage.setItem('gameVolume', this.sound.volume);
            });

        const MuteSoundBtn = this.add.text(1000, 365, 'Silenciar', {
            fontSize: '32px',
            color: '#ffffff',
            padding: { x: 40, y: 15 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => { MuteSoundBtn.setStyle({ color: '#c78110' }); this.sound.play('boton'); })
            .on('pointerout', () => MuteSoundBtn.setStyle({ color: '#ffffff' }))
            .on('pointerdown', () => {this.sound.mute = !this.sound.mute;
                MuteSoundBtn.setText(this.sound.mute ? 'Desilenciar' : 'Silenciar');
                localStorage.setItem('gameVolume', this.sound.volume);

                if(this.sound.mute){
                    volumeText.setText('0%');
                }else{
                    volumeText.setText(`${Math.round(this.sound.volume * 100)}%`);
                }
            });

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