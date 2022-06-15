import { CGFobject } from '../../lib/CGF.js';
import { MyWheel } from "../train/MyWheel.js";
import { MyQuad } from "../solids/MyQuad.js";
import { MyTriangle } from "../solids/MyTriangle.js";

/**
 * MyRoofTop
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyRoofTop extends CGFobject {
	constructor(scene) {
		super(scene);
		
        this.quad = new MyQuad(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.cylinder = new MyWheel(this.scene);
	}

    display() {
        this.scene.pushMatrix();            // Inicio da Construção
        //this.scene.scale(2,2,2);

        // Triangulo da frente
        this.scene.pushMatrix();            // Inicio do Triangulo da Frente
        this.scene.translate(0,0,2);
        this.triangle.display();
        this.scene.popMatrix();             // Fim do Triangulo da Frente
        
        // Triangulo de trás
        this.scene.pushMatrix();            // Inicio do Triangulo de Trás
        this.scene.rotate(Math.PI,0,1,0);
        this.triangle.display();
        this.scene.popMatrix();             // Fim do Triangulo de Trás

        // Quadrado de baixo
        this.scene.pushMatrix();            // Inicio do Quadrado de Baixo
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(0,1,0);
        this.scene.scale(2,2,1);
        this.quad.display();
        this.scene.popMatrix();             // Fim do Quadrado de Baixo

        // Quadrado da direita
        this.scene.pushMatrix();            // Inicio do Quadrado da Direita
        this.scene.translate(0.5,0.5,1);
        this.scene.scale(1,3.5,2);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2.43,-1,0,0);
        //this.scene.scale(2,2,1);
        this.quad.display();
        this.scene.popMatrix();             // Fim do Quadrado da Direita

        // Quadrado da esquerda
        this.scene.pushMatrix();            // Inicio do Quadrado da Esquerda
        this.scene.translate(-0.5,0.5,1);
        this.scene.scale(1,3.5,2);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2.43,1,0,0);
        this.quad.display();
        this.scene.popMatrix();             // Fim do Quadrado da Esquerda

        // Proteção do Telhado - Cilindro no Topo
        this.scene.pushMatrix();            // Inicio 
        this.scene.translate(0,0.92,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(10,0.1,0.1);
        this.cylinder.display();
        this.scene.popMatrix();             // Fim

        this.scene.popMatrix();             // Fim da Construção
    }
}