import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyDiamond extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			1, 0, 0,	//3
			-1, 0, 0,	//4
			0, -1, 0,	//5
			0, 1, 0,	//6
			1, 0, 0		//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,
			2, 1, 0,
			2, 3, 1,
			4, 5, 6,
			5, 7, 6,
			6, 1, 4,
			6, 7, 5
		];

		this.texCoords = [
			0, 0.5,
			0.25, 0.75,
			0.25, 0.25,
			0.5, 0.5,
			0, 0.5,
			0.25, 0.75,
			0.25, 0.25,
			0.5, 0.5
		]

		this.normals = [];

        for (var i = 0; i < 8; i++) {
			var z = i<4 ? 1 : -1;
            this.normals.push(0, 0, z);
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}