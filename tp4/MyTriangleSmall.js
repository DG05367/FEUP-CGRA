import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers(coords);
	}
	
	initBuffers(coords) {
		this.vertices = [
			-1, 0, 0,	//0
			0, 1, 0,	//1
			1, 0, 0,	//2
			-1, 0, 0,	//3
			0, 1, 0,	//4
			1, 0, 0,	//5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0,
			3, 4, 5,
			5, 4, 3
		];


		this.normals = [];

		this.texCoords = coords;

        for (var i = 0; i < 6; i++) {
            var z = i<3 ? 1 : -1;
            this.normals.push(0, 0, z);
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
