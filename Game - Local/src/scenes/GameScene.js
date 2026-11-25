import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Collectible } from '../entities/Collectible';
import { Platform } from '../entities/Platform';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init() {
        this.players = new Map();
        this.inputMappings = [];

        this.winTimer = null;
    }

    preload() {
        //Cargar imagenes de puerta, jugadores, trebol, baya, roca, fondos...
        this.load.image('Puerta1', '../assets/images/puerta_1.png');
        this.load.image('Puerta2', '../assets/images/puerta_2.png');

        this.load.image('Jug1_idle', '../assets/images/fika_1.png');
        this.load.image('Jug1_run1', '../assets/images/fika_2.png');
        this.load.image('Jug1_run2', '../assets/images/fika_3.png');
        this.load.image('Jug1_jump', '../assets/images/fika_1.png'); //Tiene errores, no implementada

        this.load.image('Jug2_idle', '../assets/images/take_1.png');
        this.load.image('Jug2_run1', '../assets/images/take_2.png');
        this.load.image('Jug2_run2', '../assets/images/take_3.png');
        this.load.image('Jug2_jump', '../assets/images/take_salto.png');

        this.load.image('Gema', '../assets/images/trebol.png');
        this.load.image('Baya', '../assets/images/baya.png');
        this.load.image('Roca', '../assets/images/roca.png');

        this.load.image('Fondo', '../assets/images/nv1.png');
        this.load.image('Pausa', '../assets/images/pauseButton.png');

        //Cargar sonidos
        this.load.audio('jump1', '../assets/audio/salto_fika.mp3');
        this.load.audio('jump2', '../assets/audio/salto_take.mp3');
        this.load.audio('death', '../assets/audio/muerte.mp3');
        this.load.audio('collectT', '../assets/audio/recoger_trebol.mp3');
        this.load.audio('collectB', '../assets/audio/recoger_baya.mp3');
        this.load.audio('door', '../assets/audio/puerta.mp3');
        this.load.audio('roca', '../assets/audio/mover_piedra.mp3')

        //Musica del nivel
        this.load.audio('level', '../assets/audio/Fungal Wastes - Level.mp3');
    }

    create() {
        //Loop de musica
        this.music = this.sound.add('level', { loop: true });
        this.rockMoving = this.sound.add('roca', { loop: true });
        this.music.play();

        //Pausa la escena y la musica, asi como destruirla
        this.events.on('pause', () => this.music.pause());
        this.events.on('resume', () => this.music.resume());
        this.events.once('shutdown', () => {
            this.events.off('pause');
            this.events.off('resume');
            this.music.destroy();
        });

        //Colisiones con mundo y gravedad
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.physics.world.gravity.y = 3300;

        //Crear nivel
        this.createLevel();

        //Prepara jugadores con animaciones
        this.setUpPlayers();
        this.createAnimations();

        //Crea la roca, y los objetos
        this.createRock();
        this.createCollectibles();

        const pauseBtn = this.add.image(30, 30, 'Pausa')
            .setDisplaySize(40, 30)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => pauseBtn.setTint(0xcccccc))
            .on('pointerout', () => pauseBtn.clearTint())
            .on('pointerdown', () => {
                this.scene.pause();
                this.scene.launch('PauseScene');
                });
            
        //Colisiones
        this.players.forEach(player => {
            this.physics.add.collider(player.sprite, this.rock);
            this.physics.add.collider(player.sprite, this.platforms);
            this.collectibles.forEach(item => { 
                this.physics.add.overlap(player.sprite, item.sprite, () => { 
                    item.onCollect(player); 
                }); 
            });
            this.lethals.forEach(lethal => {
                this.physics.add.overlap(player.sprite, lethal.sprite, () => {
                    lethal.checkLethal(player);
                });
            });
        });
        
        this.physics.add.collider(this.rock, this.platforms);

        //Pausa
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause();
            this.scene.launch('PauseScene');
        });

        this.input.keyboard.on('keydown-R', () => {
            this.scene.restart();
        });
    }
    //Coloca las plataformas del nivel, letales o no
    createLevel() {
        this.add.image(600, 350, 'Fondo').setDisplaySize(1200, 700);

        this.platforms = this.physics.add.staticGroup();
        this.lethals = [];
        
        const base1 = new Platform(this, 185, 685, 370, 10, 0x000000, 'none');
            this.platforms.add(base1.sprite);
        const base2 = new Platform(this, 515, 685, 100, 10, 0x000000, 'none');
            this.platforms.add(base2.sprite);
        const base3 = new Platform(this, 680, 685, 70, 10, 0x000000, 'none');
            this.platforms.add(base3.sprite);
        const base4 = new Platform(this, 855, 685, 100, 10, 0x000000, 'none');
            this.platforms.add(base4.sprite);
        const base5 = new Platform(this, 1090, 685, 200, 10, 0x000000, 'none');
            this.platforms.add(base5.sprite);
        const plat1 = new Platform(this, 1160, 605, 150, 30, 0x000000, 'none');
            this.platforms.add(plat1.sprite);
        const techo1 = new Platform(this, 350, 565, 780, 10, 0x000000, 'none');
            this.platforms.add(techo1.sprite);
        const suelo1 = new Platform(this, 860, 550, 250, 40, 0x000000, 'none');
            this.platforms.add(suelo1.sprite);
        const planta1 = new Platform(this, 620, 530, 80, 10, 0x000000, 'none');
            this.platforms.add(planta1.sprite);
        const planta2 = new Platform(this, 480, 530, 80, 10, 0x000000, 'none');
            this.platforms.add(planta2.sprite);
        const planta3 = new Platform(this, 320, 530, 100, 10, 0x000000, 'none');
            this.platforms.add(planta3.sprite);
        const planta4 = new Platform(this, 195, 530, 30, 10, 0x000000, 'none');
            this.platforms.add(planta4.sprite);
        const plat2 = new Platform(this, 70, 470, 150, 30, 0x000000, 'none');
            this.platforms.add(plat2.sprite);
        const plat22 = new Platform(this, 50, 440, 100, 30, 0x000000, 'none');
            this.platforms.add(plat22.sprite);
        const suelo2 = new Platform(this, 700, 390, 980, 30, 0x000000, 'none');
            this.platforms.add(suelo2.sprite);
        const plat3 = new Platform(this, 780, 300, 200, 40, 0x000000, 'none');
            this.platforms.add(plat3.sprite);
        const plat4 = new Platform(this, 450, 245, 325, 30, 0x000000, 'none');
            this.platforms.add(plat4.sprite);
        const temporal = new Platform(this, 830, 185, 220, 40, 0x000000, 'none');
            this.platforms.add(temporal.sprite);
        const temporal2 = new Platform(this, 1050, 100, 300, 30, 0x000000, 'none');
            this.platforms.add(temporal2.sprite);
        const plat5 = new Platform(this, 90, 260, 190, 30, 0x000000, 'none');
            this.platforms.add(plat5.sprite);
        const plat6 = new Platform(this, 40, 160, 100, 30, 0x000000, 'none');
            this.platforms.add(plat6.sprite);
        const suelo3 = new Platform(this, 470, 100, 580, 30, 0x000000, 'none');
            this.platforms.add(suelo3.sprite);
        const lat1 = new Platform(this, 740, 150, 40, 90, 0x000000, 'none');
            this.platforms.add(lat1.sprite);
        const lat2 = new Platform(this, 920, 150, 40, 90, 0x000000, 'none');
            this.platforms.add(lat2.sprite);

        const letal1= new Platform(this, 485, 695, 370, 10, 0x00000000, 'player2');
            this.lethals.push(letal1);
        const letal2 = new Platform(this, 885, 695, 370, 10, 0x00000000, 'player1');
            this.lethals.push(letal2);
        const letal3 = new Platform(this, 350, 550, 780, 25, 0x00000000, 'both');
            this.lethals.push(letal3);

        this.doorJ1 = this.physics.add.staticImage(1000, 55, 'Puerta1').setDisplaySize(70, 60).refreshBody();
        this.doorJ2 = this.physics.add.staticImage(1130, 55, 'Puerta2').setDisplaySize(70, 60).refreshBody();
    }
    //Prepara y coloca personajes
    setUpPlayers() {
        const player1 = new Player(this, 'player1', 80, 650, 'Jug1_idle');
        const player2 = new Player(this, 'player2', 140, 650, 'Jug2_idle');

        this.players.set(player1.id, player1);
        this.players.set(player2.id, player2);

        const Keys = Phaser.Input.Keyboard.KeyCodes;
        this.inputMappings = [
            {player: player1, up: Keys.W, down: Keys.S, left: Keys.A, right: Keys.D},
            {player: player2, up: Keys.UP, down: Keys.DOWN, left: Keys.LEFT, right: Keys.RIGHT}
        ].map(mapping => ({
            player: mapping.player,
            upKey: this.input.keyboard.addKey(mapping.up),
            downKey: this.input.keyboard.addKey(mapping.down),
            leftKey: this.input.keyboard.addKey(mapping.left),
            rightKey: this.input.keyboard.addKey(mapping.right)
        }));
    }
    //Crea y coloca la piedra a mover
    createRock() {
        this.rock = this.physics.add.image(400, 20, 'Roca').setOrigin(0.5).setDisplaySize(130, 80);
        this.rock.setCollideWorldBounds(true);
        this.rock.setDrag(750);  
    }
    //Crea los treboles y bayas
    createCollectibles(){
        this.collectibles = [];

        const gem1 = new Collectible(this, 400, 170, 'Gema', true);
        const mod1 = new Collectible(this, 600, 330, 'Baya', false);
        const gem2 = new Collectible(this, 485, 635, 'Gema', true);
        const gem3 = new Collectible(this, 885, 635, 'Gema', true);
        const gem4 = new Collectible(this, 1160, 545, 'Gema', true);
        const gem5 = new Collectible(this, 480, 500, 'Gema', true);
        const gem6 = new Collectible(this, 50, 380, 'Gema', true);
        const gem7 = new Collectible(this, 800, 350, 'Gema', true);
        const gem8 = new Collectible(this, 40, 110, 'Gema', true);
        const gem9 = new Collectible(this, 800, 40, 'Gema', true);
        
        this.collectibles.push(gem1, mod1, gem2, gem3, gem4, gem5, gem6, gem7, gem8, gem9);
    }

    update(time, delta) {
        this.handleMovement();

        if (this.rock && this.rock.body) {
            if (Math.abs(this.rock.body.velocity.x) > 15) {
                if (!this.rockMoving.isPlaying) {
                    this.rockMoving.play(); 
                } 
            } else { 
                if (this.rockMoving.isPlaying) {
                    this.rockMoving.stop(); 
                } 
            } 
        }
        //Game loop
        this.checkWinCondition();
    }
    //Animaciones
    createAnimations() {
        const characterKeys = ['Jug1', 'Jug2'];
        characterKeys.forEach(key => {
            this.anims.create({ 
                key: `${key}_run`,
                frames: [ 
                    { key: `${key}_run1` },
                    { key: `${key}_run2` }
                ], 
                frameRate: 6,
                repeat: -1
            });
            this.anims.create({ 
                key: `${key}_jump`,
                frames: [ 
                    { key: `${key}_jump` }
                ], 
                frameRate: 6,
            });
        }); 
    }
    //Movimiento
    handleMovement(){
        this.inputMappings.forEach(mapping => {
            const player = mapping.player;
            const key = player.id === 'player1' ? 'Jug1' : 'Jug2';

            if (mapping.upKey.isDown && player.sprite.body.blocked.down) {
                player.sprite.setVelocityY(-850);
                player.sprite.anims.play(`${key}_jump`, true);
                if(key === 'Jug1'){
                    this.sound.play('jump1');
                }else{
                    this.sound.play('jump2');
                }
            }
            if (mapping.leftKey.isDown){
                player.sprite.setVelocityX(-player.speed);
                player.sprite.setFlipX(true);
                player.sprite.anims.play(`${key}_run`, true);

            } else if (mapping.rightKey.isDown){
                player.sprite.setVelocityX(player.speed);
                player.sprite.setFlipX(false);
                player.sprite.anims.play(`${key}_run`, true);

            }else{
                player.sprite.setVelocityX(0);
                player.sprite.setTexture(`${key}_idle`);
            }

            if (!player.sprite.body.blocked.down) {
                player.sprite.anims.stop();
                player.sprite.setTexture(`${key}_jump`);
            }
        });
    }
    //Revisar si estan en las puertas
    checkWinCondition(){
        const player1 = this.players.get('player1');
        const player2 = this.players.get('player2');
        
        if (player1 && player2 && this.doorJ1 && this.doorJ2) {
            const p1OnDoor = this.physics.overlap(player1.sprite, this.doorJ1);
            const p2OnDoor = this.physics.overlap(player2.sprite, this.doorJ2);
            
            if (p1OnDoor) {
                this.doorJ1.setTint(0xff7777);
                this.sound.play('door', { volume: 0.1 });
            }else{
                this.doorJ1.clearTint();
            }
            if (p2OnDoor) {
                this.doorJ2.setTint(0xffbb77);
                this.sound.play('door', { volume: 0.1 });
            }else{
                this.doorJ2.clearTint();
            } 
            if (p1OnDoor&& p2OnDoor) {
                if (!this.winTimer) { 
                    this.winTimer = this.time.delayedCall(1500, () => { 
                        const p1 = this.players.get('player1');
                        const p2 = this.players.get('player2');
                        this.scene.pause();
                        this.scene.launch('WinScene', {scoreJ1: p1.score, scoreJ2: p2.score}); 
                    });
                }
            } else {
                if (this.winTimer) {
                    this.winTimer.remove();
                    this.winTimer = null;
                } 
            }
        }
    }
}