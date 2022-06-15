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
        this.TSmallOne = new MyTriangleSmall(this.scene);
        this.TSmallTwo = new MyTriangleSmall(this.scene);
        this.TBigOne = new MyTriangleBig(this.scene);
        this.TBigTwo = new MyTriangleBig(this.scene);

        // Materials
        this.materialGreen = new CGFappearance(this.scene);
        this.materialGreen.setAmbient(0.0, 1.0, 0.0, 1.0);
        this.materialGreen.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialGreen.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialGreen.setShininess(10.0);

        this.materialPink = new CGFappearance(this.scene);
        this.materialPink.setAmbient(1.0, 0.61, 0.82, 1.0);
        this.materialPink.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialPink.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialPink.setShininess(10.0);

        this.materialYellow = new CGFappearance(this.scene);
        this.materialYellow.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.materialYellow.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialYellow.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialYellow.setShininess(10.0);

        this.materialPurple = new CGFappearance(this.scene);
        this.materialPurple.setAmbient(0.59, 0.31, 0.75, 1.0);
        this.materialPurple.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialPurple.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialPurple.setShininess(10.0);

        this.materialRed = new CGFappearance(this.scene);
        this.materialRed.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.materialRed.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialRed.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialRed.setShininess(10.0);

        this.materialBlue = new CGFappearance(this.scene);
        this.materialBlue.setAmbient(0.0, 0.61, 1.0, 1.0);
        this.materialBlue.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialBlue.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialBlue.setShininess(10.0);

        this.materialOrange = new CGFappearance(this.scene);
        this.materialOrange.setAmbient(1.0, 0.61, 0.0, 1.0);
        this.materialOrange.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.materialOrange.setSpecular(1.0, 0.61, 0.82, 1.0);
        this.materialOrange.setShininess(10.0);
        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        //Triangulo Grande 1
        this.scene.translate(2, 0, 0);
        this.materialBlue.apply();
        this.TBigOne.display();
        this.scene.popMatrix();

        //Triangulo Grande 2
        this.scene.pushMatrix();
        this.scene.translate(3, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.materialOrange.apply();
        this.TBigTwo.display();
        this.scene.popMatrix();

        //Triangulo Pequeno 1
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.materialPurple.apply();
        this.TSmallOne.display();
        this.scene.popMatrix();

        //Triangulo Pequeno 2
        this.scene.pushMatrix();
        this.scene.translate(-1, 2, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.materialRed.apply();
        this.TSmallTwo.display();
        this.scene.popMatrix();

        //Diamante 
        this.scene.pushMatrix();
        this.scene.translate(2, 3, 0);
        this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        //Paralelograma
        this.scene.pushMatrix();
        this.scene.translate(4, -1, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.materialYellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        //Triangulo
        this.scene.pushMatrix();
        this.scene.translate(3, -4, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.materialPink.apply();
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
