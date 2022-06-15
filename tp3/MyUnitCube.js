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
            0.5, -0.5, 0.5,    //A  Direito 0
            0.5, -0.5, -0.5,   //B  Direito 1
            0.5, 0.5, 0.5,     //C  Direito 2
            0.5, 0.5, -0.5,    //D  Direito 3

            -0.5, -0.5, -0.5,  //E  Esquerdo 4
            -0.5, -0.5, 0.5,   //F  Esquerdo 5
            -0.5, 0.5, -0.5,   //G  Esquerdo 6
            -0.5, 0.5, 0.5,    //H  Esquerdo 7

            -0.5, -0.5, 0.5,   //F  Frente  8
            0.5, -0.5, 0.5,    //A  Frente  9
            -0.5, 0.5, 0.5,    //H  Frente  10
            0.5, 0.5, 0.5,     //C  Frente  11
            
            0.5, -0.5, -0.5,   //B  Atrás   12
            -0.5, -0.5, -0.5,  //E  Atrás   13
            0.5, 0.5, -0.5,    //D  Atrás   14
            -0.5, 0.5, -0.5,   //G  Atrás   15

            -0.5, 0.5, 0.5,    //H  Cima    16
            0.5, 0.5, 0.5,     //C  Cima    16
            -0.5, 0.5, -0.5,   //G  Cima    19
            0.5, 0.5, -0.5,    //D  Cima    17
            
            -0.5, -0.5, -0.5,  //E  Baixo   23
            0.5, -0.5, -0.5,   //B  Baixo   21
            -0.5, -0.5, 0.5,   //F  Baixo   22
            0.5, -0.5, 0.5     //A  Baixo   20
        ];

        this.indices = [];

        for(var i = 0; i<6; i++)
        {
            this.indices.push(0+i*4);
            this.indices.push(1+i*4);
            this.indices.push(2+i*4);

            this.indices.push(1+i*4); 
            this.indices.push(3+i*4);
            this.indices.push(2+i*4);  
        }

        this.normals = [];
        
        for (var i = 0; i < 8; i++) 
        {
            var x = i < 4 ? 1 : -1;
            this.normals.push(x, 0, 0);
        }
        
        for (var i = 0; i < 8; i++) 
        {
            var y = (i == 2 || i == 3 || i == 6 || i == 7) ? 1 : -1;
            this.normals.push(0, y, 0);
        }
        
        for (var i = 0; i < 8; i++) 
        {
            var z = (i == 0 || i == 2 || i == 5 || i == 7) ? 1 : -1;
            this.normals.push(0, 0, z);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}