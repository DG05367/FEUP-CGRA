import { CGFobject } from '../../lib/CGF.js';

export class MyCylinder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     */
    constructor(scene, slices) {
        super(scene);
        this.nDivs = slices;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;

        var phiInc = (Math.PI * 2) / this.nDivs;

        var vertex = 0;
        var xCoord = 0.0;
        for (let div = 0; div <= this.nDivs; div++) {
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);
            var x = cosPhi;
            var z = sinPhi;
            this.vertices.push(x, 0, z);
            this.vertices.push(x, 1, z);

            this.texCoords.push(xCoord, 1);
            this.texCoords.push(xCoord, 0);


            if (div < this.nDivs) {
                this.indices.push(vertex, vertex + 1, vertex + 2);
                this.indices.push(vertex + 3, vertex + 2, vertex + 1);

                vertex += 2;
            }
            this.normals.push(cosPhi, 0, sinPhi);
            this.normals.push(cosPhi, 0, sinPhi);
            phi += phiInc;
            xCoord += phiInc / (2 * Math.PI);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(nSlices) {
        this.nDivs = Math.round(nSlices);

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}