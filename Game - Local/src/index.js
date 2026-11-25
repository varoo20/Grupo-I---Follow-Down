import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene.js';
import { LobbyWaiting } from './scenes/LobbyWaiting.js';
import { LobbyScene } from './scenes/lobbyScene.js';
import { GameScene } from './scenes/GameScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { SettingsScene } from './scenes/SettingsScene.js';
import { CreditsScene } from './scenes/CreditsScene.js';
import { HelpScene } from './scenes/HelpScene.js';
import { WinScene } from './scenes/WinScene.js';


const config = {
    type: Phaser.AUTO,      // WebGL if available; otherwise, Canvas
    width: 1200,
    height: 700,
     scale: {
        //mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [MenuScene, LobbyWaiting, LobbyScene, GameScene, PauseScene, SettingsScene, CreditsScene, HelpScene, WinScene]
    // The first scene starts automatically
};

const game = new Phaser.Game(config);
