import { CGFobject } from '../../lib/CGF.js';
import { MyCircle } from '../solids/MyCircle.js';
import { MyCylinder } from '../solids/MyCylinder.js';


/**
 * MyWheel
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 */
export class MyWheel extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

        this.cylinder = new MyCylinder(this.scene, 16);
        this.circle = new MyCircle(this.scene, 16);
        this.velocidade = 0;
    }

    update(speed)
    {
        this.velocidade += 10 * speed;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(this.velocidade, 1, 0, 0);
        this.scene.scale(0.2,0.75,0.75);
        this.scene.rotate(Math.PI/2,0,0,1);
        
        this.scene.pushMatrix();
        this.cylinder.display();

        this.scene.translate(0,1,0);
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1,0,0);
        this.circle.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}