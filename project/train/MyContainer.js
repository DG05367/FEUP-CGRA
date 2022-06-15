import { CGFobject } from '../../lib/CGF.js';
import { MyUnitCubeQuad } from '../solids/MyUnitCubeQuad.js';


/**
 * MyTrack
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyContainer extends CGFobject {
    constructor(scene) {
		super(scene);
		this.initBuffers();

        this.cube = new MyUnitCubeQuad(this.scene);
    }

    display(){
        // Base do Container
        this.scene.pushMatrix();
        this.scene.translate(0,0.05,0);
        this.scene.scale(1.25,0.1,2.25);
        this.cube.display();
        this.scene.popMatrix();

        // Frente do Container
        this.scene.pushMatrix();
        this.scene.translate(0.625,0.5,0);
        this.scene.scale(0.1,1,2.25);
        this.cube.display();
        this.scene.popMatrix();

        // Trás do Container
        this.scene.pushMatrix();
        this.scene.translate(-0.625,0.5,0);
        this.scene.scale(0.1,1,2.25);
        this.cube.display();
        this.scene.popMatrix();


        // Esquerda do Container
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.scale(1.25,1,0.1);
        this.cube.display();
        this.scene.popMatrix();

        // Direita do Container
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,2.15);
        this.scene.scale(1.25,1,0.1);
        this.cube.display();
        this.scene.popMatrix();
    }
}