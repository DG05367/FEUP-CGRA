import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.TSmallOne = new MyTriangleSmall(this.scene);
        this.TSmallTwo = new MyTriangleSmall(this.scene);
        this.TBigOne = new MyTriangleBig(this.scene);
        this.TBigTwo = new MyTriangleBig(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        //Triangulo Grande 1
        this.scene.translate(2, 0, 0);
        this.TBigOne.display();
        this.scene.popMatrix();

        //Triangulo Grande 2
        this.scene.pushMatrix();
        this.scene.translate(3, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.TBigTwo.display();
        this.scene.popMatrix();

        //Triangulo Pequeno 1
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.TSmallOne.display();
        this.scene.popMatrix();

        //Triangulo Pequeno 2
        this.scene.pushMatrix();
        this.scene.translate(-1, 2, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.TSmallTwo.display();
        this.scene.popMatrix();

        //Diamante 
        this.scene.pushMatrix();
        this.scene.translate(2, 3, 0);
        this.diamond.display();
        this.scene.popMatrix();

        //Paralelograma
        this.scene.pushMatrix();
        this.scene.translate(4, -1, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.parallelogram.display();
        this.scene.popMatrix();

        //Triangulo
        this.scene.pushMatrix();
        this.scene.translate(3, -4, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.triangle.display();
        this.scene.popMatrix();
    }

}