import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyPlane } from './MyPlane.js';
import { MySmallStation } from './MySmallStation.js';
import { MyStationModel } from './MyStationModel.js';

/**
 * MyTrackSegment
 * @constructor
 * @param {MzScene} scene - Reference to MyScene object
 * @param {Point} start - 
 * @param {Point} finish - 

 */
export class MyTrackSegment extends CGFobject {
	constructor(scene, start, finish) {
		super(scene);
		this.start = start;
		this.finish = finish;

		this.plane = new MyPlane(scene, 20, 0, this.calcDistance(start, finish)/2, 0, 1)

		this.type = start.type;

		this.station = new MyStationModel(scene);

		this.initMaterials();

		// Appearence
		

	}

	initMaterials() {
		this.trackTexture = new CGFappearance(this.scene);
		this.trackTexture.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.trackTexture.setDiffuse(0.0, 0.0, 0.0, 1.0);
		this.trackTexture.setSpecular(1.0, 1, 1, 1.0);
		this.trackTexture.setShininess(10.0);
		this.trackTexture.loadTexture("images/tracks.png");
		this.trackTexture.setTextureWrap('REPEAT', 'REPEAT');
	}

	// funçao calcular distancia
	calcDistance(start, finish) {
		var distance;
		var side1;
		var side2;

		if (start.x > finish.x) {
			side1 = start.x - finish.x;
		}
		else {
			side1 = finish.x - start.x;
		}

		if (start.z > finish.z) {
			side2 = start.z - finish.z;
		}
		else {
			side2 = finish.z - start.z;
		}

		distance = Math.sqrt(side1 * side1 + side2 * side2);

		return distance;
	}

	// funcao calcular angulo
	calcAngle(start, finish) {
		var angle = Math.atan2(-(finish.z - start.z), (finish.x - start.x));

		return angle;
	}

	display() {
		this.scene.pushMatrix();
		this.scene.translate(this.start.x, 0.02, this.start.z);
		this.scene.rotate(this.calcAngle(this.start, this.finish), 0, 1, 0);

		this.scene.pushMatrix();
		this.trackTexture.apply();
		this.scene.scale(this.calcDistance(this.start, this.finish), 1, 4);
		this.scene.translate(0.5, 0, 0);
		this.scene.rotate(-Math.PI * 0.5, 1, 0, 0);
		this.plane.display();
		this.scene.popMatrix();

		if(this.start.type == 'station'){
		this.scene.pushMatrix();
		this.scene.translate(this.calcDistance(this.start, this.finish)/2,2,10);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.scale(0.5, 0.5, 0.5);
		this.station.display();
		this.scene.popMatrix();
		}
		
		this.scene.popMatrix();
	}
}
