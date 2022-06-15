import { CGFobject } from "../../lib/CGF.js";

/**
 * MyCircle
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {integer} nVertices - Number of vertices
 */

export class MyCircle extends CGFobject {
  constructor(scene, nVertices) {
    super(scene);

    this.nVertices = nVertices;
    this.initBuffers();
  }

  initBuffers() {
    var angle = (2 * Math.PI) / this.nVertices;

    this.vertices = [0, 0, 0];
    this.normals = [0, 1, 0];
    this.indices = [];

    for (var i = 0; i < this.nVertices; i++) {

      var xVertice = Math.sin(angle * i);
      var zVertice = Math.cos(angle * i);
      this.vertices.push(xVertice, 0, zVertice);

      this.indices.push(0, i + 1, (i + 1) % this.nVertices + 1);

      this.normals.push(0, 1, 0);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}
