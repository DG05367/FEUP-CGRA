import { CGFscene, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySound } from "./MySound.js";
import { CGFcamera2 } from "./CGFcamera2.js";
import { MyCubeMap } from "./world/MyCubeMap.js";
import { MyPlane } from "./world/MyPlane.js";
import { MyStationModel } from "./world/MyStationModel.js";
import { MySmallStation } from "./world/MySmallStation.js";
import { MyTrack } from "./world/MyTrack.js";
import { MyTrain } from "./train/MyTrain.js";
import { MyUnitCubeQuad } from "./solids/MyUnitCubeQuad.js";
import { MyCrane } from "./train/MyCrane.js";


/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);


        // TEST PATHS
        this.path = [
            { x: -32, z: -24, type: 'station' },
            { x: 32, z: -24, type: 'simple' },
            { x: 44, z: 24, type: 'station' },
            { x: -44, z: 24, type: 'simple' },
        ];

        /*=this.path = [
            { x: 0, z: -40, type: 'simple' },
            { x: 40, z: -40, type: 'station' },
            { x: 40, z: -10, type: 'simple' },
            { x: 0, z: -10, type: 'simple' },
        ];

        this.path = [
            { x: -16, z: -32, type: 'station' },
            { x: 16, z: -32, type: 'simple' },
            { x: 32, z: 0, type: 'station' },
            { x: 16, z: 32, type: 'simple' },
            { x: -16, z: 32, type: 'station' },
            { x: -32, z: 0, type: 'simple' },
        ];*/


        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cube = new MyCubeMap(this);
        this.plane = new MyPlane(this, 30, 0, 30, 0, 30);
        this.mainStation = new MyStationModel(this);
        this.smallStation = new MySmallStation(this);
        this.train = new MyTrain(this, this.path);
        this.base = new MyUnitCubeQuad(this);
        this.track = new MyTrack(this, this.path);
        this.crane = new MyCrane(this);

        //------ Applied Material
        this.material = new CGFappearance(this);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        //------

        //------ Textures
        this.top1 = new CGFtexture(this, 'images/demo_cubemap/top.png');
        this.front1 = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.back1 = new CGFtexture(this, 'images/demo_cubemap/back.png');
        this.left1 = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.right1 = new CGFtexture(this, 'images/demo_cubemap/right.png');
        this.bot1 = new CGFtexture(this, 'images/demo_cubemap/bottom.png');

        this.top2 = new CGFtexture(this, 'images/demo_cubemap/posy.jpg');
        this.front2 = new CGFtexture(this, 'images/demo_cubemap/posz.jpg');
        this.back2 = new CGFtexture(this, 'images/demo_cubemap/negz.jpg');
        this.left2 = new CGFtexture(this, 'images/demo_cubemap/negx.jpg');
        this.right2 = new CGFtexture(this, 'images/demo_cubemap/posx.jpg');
        this.bot2 = new CGFtexture(this, 'images/demo_cubemap/negy.jpg');

        this.terrain = new CGFtexture(this, 'images/gravel.png');


        //------ Objects connected to MyInterface

        this.displayAxis = true;

        this.selectedTexture = 0;
        this.option1 = [this.top1, this.front1, this.back1, this.left1, this.right1, this.bot1];
        this.option2 = [this.top2, this.front2, this.back2, this.left2, this.right2, this.bot2];
        this.textures = [this.option1, this.option2];
        this.textureIds = { 'Planicie': 0, 'Basilica': 1 };

        this.scaleFactor = 1.0;

        this.selectedMusic = 0;
        this.tankEngine = new MySound('./sound/tankengine.mp3', 0.1, true);
        this.vengaBus = new MySound('./sound/vengabus.mp3', 0.1, true); 
        
        // Background Music for fun :D - choose one and comment the other
        //this.tankEngine.start();
        this.vengaBus.start();

        //-------
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera2(0.4, 0.1, 500, vec3.fromValues(80, 80, 80), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        
        this.checkKeys();
        this.train.update(t);
    }

    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;

        if (this.train.velocity === 0) {                  
            if (this.gui.isKeyPressed("KeyW")) {
                text += " W ";
                // guindaste para cima
                this.train.craneTurnZ(-Math.PI / 12);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyS")) {
                text += " S ";
                // guindaste para baixo
                this.train.craneTurnZ(Math.PI / 12);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyA")) {
                text += " A ";
                // guindaste para a esquerda
                this.train.craneTurnY(Math.PI / 12);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyD")) {
                text += " D ";
                // guindaste para a direita
                this.train.craneTurnY(-Math.PI / 12);
                keysPressed = true;
            }

        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.train.craneReset();                       // Reset posição do guindaste
            text += " R ";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyP")) {
            text += " P ";
            // Agarra/Largar a carga do guindaste
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyC")) {
            text += " C ";
            // Sair da Estação
            if(this.train.velocity == 0){
                this.train.invAccelartion();
                this.train.velocity = 0.008;
            }
            keysPressed = true;
        }

        if (keysPressed)
            console.log(text);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();
        this.pushMatrix();
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        // ---- BEGIN Primitive drawing section

        // Criação do Plano + Cubo
        this.pushMatrix();
        this.cube.display();
        this.popMatrix();

        this.pushMatrix();
        this.material.setTexture(this.terrain);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.apply();

        this.scale(100, 1, 100);
        this.rotate(-Math.PI * 0.5, 1, 0, 0);
        this.plane.display();
        this.popMatrix();

        // Estações
        this.pushMatrix();
        this.track.display();
        this.popMatrix();

        // Quimboio
        this.pushMatrix();
        this.train.display();
        this.popMatrix();
        // ---- END Primitive drawing section

        this.popMatrix();
    }
}