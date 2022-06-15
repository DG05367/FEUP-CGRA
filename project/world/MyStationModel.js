import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCylinder } from '../solids/MyCylinder.js';
import { MyUnitCubeQuad } from '../solids/MyUnitCubeQuad.js';
import { MyRoofTop } from './MyRoofTop.js';
import { MySmallStation } from './MySmallStation.js';
import { MyPackage } from './MyPackage.js';

/**
 * MyStationModel
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyStationModel extends CGFobject {
    constructor(scene) {
        super(scene);

        this.cylinder = new MyCylinder(this.scene, 16);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.roof = new MyRoofTop(this.scene);
        this.smallStation = new MySmallStation(this.scene);
        this.package = new MyPackage(this.scene);

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

        this.bigEntranceTexture = new CGFappearance(this.scene);
		this.bigEntranceTexture.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.bigEntranceTexture.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.bigEntranceTexture.setSpecular(0.0, 0, 0, 0.0);
		this.bigEntranceTexture.setShininess(10.0);
        this.bigEntranceTexture.loadTexture("images/frontBig.jpg");
		this.bigEntranceTexture.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

        this.floorTexture = new CGFappearance(this.scene);
		this.floorTexture.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.floorTexture.setDiffuse(0.0, 0.0, 0.0, 1.0);
		this.floorTexture.setSpecular(1.0, 1, 1, 1.0);
		this.floorTexture.setShininess(10.0);
        this.floorTexture.loadTexture("images/floor.jpg");
		this.floorTexture.setTextureWrap('REPEAT','REPEAT');
    }

    display() {
        this.scene.pushMatrix();            // Inicio da Construção
        this.scene.translate(0,5.5,0);
        //this.scene.scale(0.5, 0.5, 0.5);

        // Main House
        // Parte da Frente
        this.scene.pushMatrix();            // Inicio da Frente
        this.bigEntranceTexture.apply();
        this.scene.translate(0, 1, 0.4);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(27.6, 14, 0.4);
        this.cube.display();
        this.scene.popMatrix();             // Fim da Frente

        // Lado Esquerdo
        this.scene.pushMatrix();            // Inicio do Lado Esquerdo
        this.wallTexture.apply();
        this.scene.translate(-13.5, 1, -5.75);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.scale(12.3, 14, 0.4);
        this.cube.display();
        this.scene.popMatrix();             // Fim do Lado Esquerdo

        // Lado Direito
        this.scene.pushMatrix();            // Inicio do Lado Direito
        this.scene.translate(13.5, 1, -5.6);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(12, 14, 0.4);
        this.cube.display();
        this.scene.popMatrix();             // Fim do Lado Direito

        // Traseiras
        this.scene.pushMatrix();            // Inicio das Traseiras
        this.scene.translate(0.2, 1, -11.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(27.4, 14, 0.4);
        this.cube.display();
        this.scene.popMatrix();             // Fim das Traseiras

        // Telhado
        this.scene.pushMatrix();            // Inicio do Telhado
        this.roofTexture.apply();
        this.scene.translate(-13.9, 8, -5.6);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(7, 5, 13.9);
        this.roof.display();
        this.scene.popMatrix();             // Fim do Telhado

        // Toldo
        this.scene.pushMatrix();            //  Inicio do toldo
        
        // Colunas do Toldo da Direita para a Esquerda
        // Coluna 1
        this.scene.pushMatrix();            // Inicio da Coluna 1
        this.wallTexture.apply();
        this.scene.translate(12.2,-6, 6);
        this.scene.scale(0.3,7,0.3);
        this.cylinder.display();
        this.scene.popMatrix();             // Fim da Coluna 1

        // Coluna 2
        this.scene.pushMatrix();            // Inicio da Coluna 2
        this.scene.translate(4.1,-6, 6);
        this.scene.scale(0.3,7,0.3);
        this.cylinder.display();
        this.scene.popMatrix();             // Fim da Coluna 2

        // Coluna 3
        this.scene.pushMatrix();            // Inicio da Coluna 3
        this.scene.translate(-3.7,-6, 6);
        this.scene.scale(0.3,7,0.3);
        this.cylinder.display();
        this.scene.popMatrix();             // Fim da Coluna 3

        // Coluna 4
        this.scene.pushMatrix();            // Inicio da Coluna 4
        this.scene.translate(-12,-6, 6);
        this.scene.scale(0.3,7,0.3);
        this.cylinder.display();
        this.scene.popMatrix();             // Fim da Coluna 4

        this.scene.pushMatrix();            // Inicio do Telhado do Toldo
        this.roofTexture.apply();
        this.scene.translate(0,2,0);
        this.scene.rotate(0.15,1,0,0);
        this.scene.scale(27,0.2,7);
        this.cube.display();
        this.scene.popMatrix();             // Fim do Telhado do Toldo

        this.scene.popMatrix();             //  Fim do Toldo

        // Secondary Houses
        // Casa da Direita
        this.scene.pushMatrix();            // Inicio da Casa da Direita
        this.scene.translate(14.7,-6,-9.2);
        this.scene.scale(1.2,1.2,1.2);
        this.smallStation.display();
        this.scene.popMatrix();             // Fim da Casa da Direita

        // Casa da Esquerda
        this.scene.pushMatrix();            // Inicio da Casa da Esquerda
        this.scene.translate(-21.9,-6,-9.2);
        this.scene.scale(1.2,1.2,1.2);
        this.smallStation.display();
        this.scene.popMatrix();             // Fim da Casa da Esquerda

        // Base da Estação
        this.scene.pushMatrix();            // Inicio da Base
        this.floorTexture.apply();
        this.scene.translate(0,-8.25,-14);
        this.scene.scale(50,4.5,30);
        this.cube.display();
        this.scene.popMatrix();             // Fim da Base

        this.scene.popMatrix();             // Fim da Construção
    }
}