import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 1, 0,	//1
			3, 1, 0,	//2
			2, 0, 0,	//3
			0, 0, 0,	//0
			1, 1, 0,	//1
			3, 1, 0,	//2
			2, 0, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 3,
            3, 1, 0,
			1, 2, 3,
            3, 2, 1
		];

		this.texCoords = [
			1, 1,
			0.75, 0.75,
			0.25, 0.75,
			0.5, 1,
			1, 1,
			0.75, 0.75,
			0.25, 0.75,
			0.5, 1
		]

		this.normals = [];

        for (var i = 0; i < 8; i++) {
			var z = i < 4 ? 1 : -1;

            this.normals.push(0, 0, z);
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}