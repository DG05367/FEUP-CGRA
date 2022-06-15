import { CGFobject, CGFappearance } from '../lib/CGF.js';
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
        this.TSmallOne = new MyTriangleSmall(this.scene,[0 , 0, 0.25, 0.25, 0, 0.5, 0 , 0, 0.25, 0.25, 0, 0.5]);
        this.TSmallTwo = new MyTriangleSmall(this.scene, [0.25, 0.75, 0.5, 0.5, 0.75, 0.75, 0.25, 0.75, 0.5, 0.5, 0.75, 0.75]);
        this.TBigOne = new MyTriangleBig(this.scene, [1, 0, 0.5, 0.5, 0, 0, 1, 0, 0.5, 0.5, 0, 0]);
        this.TBigTwo = new MyTriangleBig(this.scene, [1, 1, 0.5, 0.5, 1, 0, 1, 1, 0.5, 0.5, 1, 0]);

        // Materials
        this.materialTexture = new CGFappearance(this.scene);
        this.materialTexture.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.materialTexture.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialTexture.setSpecular(1.0, 0, 0, 1.0);
        this.materialTexture.setShininess(10.0);
        this.materialTexture.loadTexture("images/tangram.png")
        this.materialTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        //Triangulo Grande 1
        this.scene.translate(2, 0, 0);
        this.materialTexture.apply();
        this.TBigOne.display();
        this.scene.popMatrix();

        //Triangulo Grande 2
        this.scene.pushMatrix();
        this.scene.translate(3, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.materialTexture.apply();
        this.TBigTwo.display();
        this.scene.popMatrix();

        //Triangulo Pequeno 1
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.materialTexture.apply();
        this.TSmallOne.display();
        this.scene.popMatrix();

        //Triangulo Pequeno 2
        this.scene.pushMatrix();
        this.scene.translate(-1, 2, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.materialTexture.apply();
        this.TSmallTwo.display();
        this.scene.popMatrix();

        //Diamante 
        this.scene.pushMatrix();
        this.scene.translate(2, 3, 0);
        this.materialTexture.apply();
        this.diamond.display();
        this.scene.popMatrix();

        //Paralelograma
        this.scene.pushMatrix();
        this.scene.translate(4, -1, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.materialTexture.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        //Triangulo
        this.scene.pushMatrix();
        this.scene.translate(3, -4, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.materialTexture.apply();
        this.triangle.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangle.enableNormalViz();
        this.TSmallOne.enableNormalViz();
        this.TSmallTwo.enableNormalViz();
        this.TBigOne.enableNormalViz();
        this.TBigTwo.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangle.disableNormalViz();
        this.TSmallOne.disableNormalViz();
        this.TSmallTwo.disableNormalViz();
        this.TBigOne.disableNormalViz();
        this.TBigTwo.disableNormalViz();
    }
}
