import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyTriangle } from '../solids/MyTriangle.js';
import { MyQuad } from '../solids/MyQuad.js';
import { MyRoofTop } from './MyRoofTop.js';
import { MyUnitCubeQuad } from '../solids/MyUnitCubeQuad.js';

/**
 * MySmallStation
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MySmallStation extends CGFobject {
    constructor(scene) {
        super(scene);

        this.quad = new MyQuad(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.roof = new MyRoofTop(this.scene);

        this.initMaterials();
    }

    initMaterials() {
        this.roofTexture = new CGFappearance(this.scene);
		this.roofTexture.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.roofTexture.setDiffuse(0.0, 0.0, 0.0, 1.0);
		this.roofTexture.setSpecular(1.0, 1, 1, 1.0);
		this.roofTexture.setShininess(10.0);
        this.roofTexture.loadTexture("images/rooftop.jpg");
		this.roofTexture.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

        this.wallTexture = new CGFappearance(this.scene);
		this.wallTexture.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.wallTexture.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.wallTexture.setSpecular(0.0, 0, 0, 0.0);
		this.wallTexture.setShininess(10.0);
        this.wallTexture.loadTexture("images/wall.jpg");
		this.wallTexture.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

        this.smallEntranceTexture = new CGFappearance(this.scene);
		this.smallEntranceTexture.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.smallEntranceTexture.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.smallEntranceTexture.setSpecular(0.0, 0, 0, 0.0);
		this.smallEntranceTexture.setShininess(10.0);
        this.smallEntranceTexture.loadTexture("images/wall.jpg");
		this.smallEntranceTexture.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(3,3,1);

        // Entrada da Estação
        this.scene.pushMatrix();
        this.smallEntranceTexture.apply();
        this.scene.translate(0,0,6.7);
        this.scene.scale(7,6,0.3);
        this.cube.display();
        this.scene.popMatrix();

        // Traseira da Estação
        this.scene.pushMatrix();
        this.wallTexture.apply();
        this.scene.scale(7,6,0.3);
        this.cube.display();
        this.scene.popMatrix();

        // Esquerda da Estação
        this.scene.pushMatrix();
        this.scene.translate(-3.5,0,0);
        this.scene.scale(0.3,6,7);
        this.cube.display();
        this.scene.popMatrix();

        // Direita da Estação
        this.scene.pushMatrix();
        this.scene.translate(3.5,0,0);
        this.scene.scale(0.3,6,7);
        this.cube.display();
        this.scene.popMatrix();

        // Telhado da Estação
        this.scene.pushMatrix();
        this.roofTexture.apply();
        this.scene.translate(-3.65,2.9,3.5);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(3.65,3,3.65);
        this.roof.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}