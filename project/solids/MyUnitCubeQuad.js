import { CGFobject } from '../../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        // Face de trás
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        // Face de Frente
        this.scene.translate(0,0,1);
        //this.scene.rotate(Math.PI,0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        // Face de Baixo
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        // Face de Cima
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        // Face do lado Esquerdo
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.translate(0.5,0,0.5);
        this.quad.display();
        this.scene.popMatrix();

        // Face do lado Direito
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(-0.5,0,0.5);
        this.quad.display();
        this.scene.popMatrix();
    }
}