import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../solids/MySphere.js';
import { MyCylinder } from '../solids/MyCylinder.js';
import { MyWheel } from './MyWheel.js';
import { MyUnitCubeQuad } from '../solids/MyUnitCubeQuad.js';

/**
 * MyTrack
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyCrane extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();

        this.cube = new MyUnitCubeQuad(this.scene);
        this.coveredCyl = new MyWheel(this.scene);
        this.cylinder = new MyCylinder(this.scene, 16);
        this.sphere = new MySphere(this.scene, 16, 16);

        this.velocity = 0.0;

    }


    display(rotationy, rotationz) {
        this.scene.pushMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(rotationy, 0, 1, 0);     //Rodar para a esquerda e direita
        
        //  Base do Guindaste
        this.scene.pushMatrix();
        this.scene.scale(0.27,1.5,0.27);
        this.cylinder.display();
        this.scene.popMatrix();

        //  Ligação do Guindaste
        this.scene.pushMatrix();
        this.scene.translate(0,1.6,0);
        this.scene.scale(0.4,0.4,0.4);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1.7,0);


        //  Corda do Guindaste
        this.scene.pushMatrix();
        this.scene.translate(-2.8 - rotationz*2,-1.9 - rotationz*3,-0.05);      // Translação para acompanhar a Rotação
        this.scene.scale(0.1,4,0.1);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.rotate(rotationz*1.4, 0, 0, 1);     // Rodar para cima e para baixo

        //  Braço do Guindaste
        this.scene.pushMatrix();
        this.scene.scale(15,0.25,0.25);
        this.coveredCyl.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}