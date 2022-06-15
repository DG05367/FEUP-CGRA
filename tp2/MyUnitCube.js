import { CGFobject } from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0.5, -0.5, -0.5,    //0
            -0.5, -0.5, -0.5,   //1
            0.5, 0.5, -0.5,     //2
            -0.5, 0.5, -0.5,    //3
            0.5, -0.5, 0.5,     //4
            -0.5, -0.5, 0.5,    //5
            0.5, 0.5, 0.5,      //6
            -0.5, 0.5, 0.5      //7
        ];

        this.indices = [
            // Face de Trás
            0, 1, 2,
            1, 3, 2,
            2, 1, 0,    
            2, 3, 1,
            // Face de Frente
            4, 5, 6,
            5, 7, 6,
            6, 5, 4,
            6, 7, 5,
            // Face de Cima
            2, 3, 6,
            3, 7, 6,
            6, 3, 2,
            6, 7, 3,
            // Face de Baixo
            0, 1, 4,
            1, 4, 5,
            4, 1, 0,
            5, 4, 1,
            // Face do lado Esquerdo
            1, 5, 3,
            3, 7, 5,
            3, 5, 1,
            5, 7, 3,
            //Face do lado Direito
            0, 4, 2,
            2, 6, 4,
            2, 4, 0,
            4, 6, 2
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}