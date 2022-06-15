import { CGFobject } from '../../lib/CGF.js';
import { CGFtexture } from '../../lib/CGF.js';
import { MyQuad } from "../solids/MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
    }

    display() {
        this.scene.material.apply();
        this.scene.scale(100,100,100);
        this.scene.translate(0,0,-0.5);
        this.scene.pushMatrix();
        // Face de trás
        this.scene.pushMatrix();
        this.scene.textures[this.scene.selectedTexture][2].bind();
        this.quad.display();
        this.scene.popMatrix();

        // Face de Frente
        this.scene.translate(0,0,1);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.textures[this.scene.selectedTexture][1].bind();
        this.quad.display();
        this.scene.popMatrix();

        // Face de Baixo
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0.5);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.textures[this.scene.selectedTexture][5].bind();
        this.quad.display();
        this.scene.popMatrix();

        // Face de Cima
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.textures[this.scene.selectedTexture][0].bind();
        this.quad.display();
        this.scene.popMatrix();

        // Face do lado Direito
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(-0.5,0,-0.5);
        this.scene.textures[this.scene.selectedTexture][4].bind();
        this.quad.display();
        this.scene.popMatrix();

        // Face do lado Esquerdo
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.translate(0.5,0,-0.5);
        this.scene.textures[this.scene.selectedTexture][3].bind();
        this.quad.display();
        this.scene.popMatrix();
    }
}