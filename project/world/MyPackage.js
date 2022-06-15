import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyWheel } from '../train/MyWheel.js';

/**
 * MyPackage
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyPackage extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.cylinder = new MyWheel(scene);

        this.initMaterial();
    }

    initMaterial() {
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture("images/package.png");
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.2,0.2,0.2)
        this.texture.apply();

        this.scene.pushMatrix();
        this.scene.translate(5,1.5,1.5);
        this.scene.rotate(-Math.PI/1.75,1,0,0);
        this.scene.scale(50,2,2);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5,1.5,-1.5);
        this.scene.rotate(-Math.PI/1.75,1,0,0);
        this.scene.scale(50,2,2);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(5,4,0);
        this.scene.rotate(-Math.PI/1.75,1,0,0);
        this.scene.scale(50,2,2);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}