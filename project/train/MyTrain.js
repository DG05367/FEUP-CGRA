import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyWheel } from './MyWheel.js';
import { MyContainer } from './MyContainer.js';
import { MyCrane } from './MyCrane.js';
import { MySphere } from '../solids/MySphere.js';
import { MyCylinder } from '../solids/MyCylinder.js';
import { MyUnitCubeQuad } from '../solids/MyUnitCubeQuad.js';
import { MyPackage } from '../world/MyPackage.js';

/**
 * MyTrain
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Path} path - Reference to Path list with track segments
 */
export class MyTrain extends CGFobject {
    constructor(scene, path) {
        super(scene);
        this.path = path;
        this.initBuffers();

        // OBJECTS
        this.cube = new MyUnitCubeQuad(this.scene);
        this.cylinder = new MyCylinder(this.scene, 16);
        this.sphere = new MySphere(this.scene, 16, 16);
        this.wheel = new MyWheel(this.scene);
        this.container = new MyContainer(this.scene);
        this.crane = new MyCrane(this.scene);
        this.package = new MyPackage(this.scene);

        // Variables for crane
        this.craneRotationY = 0.0;
        this.craneRotationZ = 0.0;

        this.startIndex = this.path.indexOf(this.path.find(val => val.type === 'station'));     // Gives first Station Index
        this.nextIndex = this.getNextIndex(this.startIndex);                                    // Gives the next track Index

        this.firstStation = this.path.indexOf(this.path.find(val => val.type === 'station'));

        this.startDistance = this.calcDistance(this.path[this.startIndex], this.path[this.nextIndex]) / 2; // Where the train starts in the track
        this.flag = 1;

        // Variables
        this.flag = 1;          // Flag to warn if the train is or not on a station track
        this.velocity = 0;      // Current velocity of the train
        this.cruise = 1;        // Max velocity of the train

        this.acceleration = this.accelerate();  // Calculation of the acceleration

        this.orientation = this.calcAngle(this.path[this.startIndex], this.path[this.nextIndex]);               // Calculation of the Train Orientation at the Starting point

        this.boolZ = (this.path[this.startIndex].z != this.path[this.nextIndex].z) ? 1 : 0;                     // Just a check to complement the positioning of the train

        this.startx = this.calcHalfway(this.path[this.startIndex].x, this.path[this.nextIndex].x);              // Find Starting X point
        this.startz = this.calcHalfway(this.path[this.startIndex].z, this.path[this.nextIndex].z);              // Find Starting Z point

        this.position = vec3.fromValues(this.startx, 0, this.startz);                                           // Current position of the Train
        this.nextPosition = vec3.fromValues(this.path[this.nextIndex].x, 0.0, this.path[this.nextIndex].z);     // Destination of the train

        this.initMaterials();
    }

    initMaterials() {
        //Body
        this.bodyTexture = new CGFappearance(this.scene);
        this.bodyTexture.setAmbient(0, 0, 0, 1);
        this.bodyTexture.setDiffuse(0, 0, 0, 1.0);
        this.bodyTexture.setSpecular(0, 0, 0, 1.0);
        this.bodyTexture.setShininess(10.0);

        this.secondTexture = new CGFappearance(this.scene);
        this.secondTexture.setAmbient(0.1, 0.1, 1, 0.1);
        this.secondTexture.setDiffuse(0.1, 0.1, 1, 1);
        this.secondTexture.setSpecular(0, 0, 0, 1.0);
        this.secondTexture.setShininess(3.0);

        this.faceTexture = new CGFappearance(this.scene);
        this.faceTexture.setAmbient(0, 1, 1, 1);
        this.faceTexture.setDiffuse(0.9, 0, 0.3, 1.0);
        this.faceTexture.setSpecular(0, 0, 0, 1.0);
        this.faceTexture.setShininess(10.0);
        this.faceTexture.loadTexture("images/face.png");
        this.faceTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.face2Texture = new CGFappearance(this.scene);
        this.face2Texture.setAmbient(0, 1, 1, 1);
        this.face2Texture.setDiffuse(1, 1, 1, 1.0);
        this.face2Texture.setSpecular(0, 0, 0, 1.0);
        this.face2Texture.setShininess(10.0);
        this.face2Texture.loadTexture("images/cabine.png");
        this.face2Texture.setTextureWrap('REPEAT', 'REPEAT');

        //Rodas
        this.wheelsTexture = new CGFappearance(this.scene);
        this.wheelsTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.wheelsTexture.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.wheelsTexture.setSpecular(0, 0, 0, 1.0);
        this.wheelsTexture.setShininess(10.0);

        //Container
        this.containerTexture = new CGFappearance(this.scene);
        this.containerTexture.setAmbient(1, 1, 1, 1);
        this.containerTexture.setDiffuse(0.4, 0.4, 0.4, 1.0);
        this.containerTexture.setSpecular(1, 1, 1, 1.0);
        this.containerTexture.setShininess(10.0);

        //Crane
        this.craneTexture = new CGFappearance(this.scene);
        this.craneTexture.setAmbient(0, 0, 1, 1);
        this.craneTexture.setDiffuse(0.3, 0.3, 0.3, 1.0);
        this.craneTexture.setSpecular(0, 0, 0, 1.0);
        this.craneTexture.setShininess(10.0);
    }

    // Get the next Index on Path
    getNextIndex(initialIndex) {
        if (initialIndex === this.path.length - 1)
            return 0;
        return initialIndex + 1;
    }

    // Calculate the Orientation Angle
    calcAngle(start, finish) {
        var angle = Math.atan2(-(finish.z - start.z), (finish.x - start.x));
        //console.log(angle, "angle", start, "start", finish);
        return angle + Math.PI / 2;
    }

    calcHalfway(start, finish) {
        return (finish - start) / 2 + start;
    }


    // Calculate the distance between beginning and end of
    // Track Segment
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

    update(t) {

        // MOVEMENT ALGORITHM
        // position = position + directionVector * velocity;
        // directionVector.x = Math.sin(this.orientation);
        // directionVector.y = 0;
        // directionVector.z = Math.cos(this.orientation);

        // The Train has only 3 stages, on station track arriving/leaving
        // on station stoped, or on simple track

        // Stoping or Leaving the Station
        if (this.path[this.startIndex].type === 'station' && this.velocity > 0.005) {
            // Did he just arrive on station track?
            // If so flag = 1 and start decreasing velocity
            if (this.flag == 0) {
                this.acceleration = this.accelerate();
                this.flag = 1;
            }

            this.velocity = this.velocity * this.acceleration;

            if ((Math.round(this.position[0]) != this.nextPosition[0] || Math.round(this.position[2]) != this.nextPosition[2])) {
                console.log(this.position[0], Math.trunc(this.position[2]));
                var x = this.position[0] + this.velocity * Math.sin(this.orientation);
                var y = this.position[1];
                var z = this.position[2] + this.velocity * Math.cos(this.orientation);

                this.position = vec3.fromValues(x, y, z);
            }
            else {
                var x = this.nextPosition[0] - 0.12673378;
                var y = 0;
                var z = this.nextPosition[2];

                this.position = vec3.fromValues(x, y, z);

                this.startIndex = this.nextIndex;
                this.nextIndex = this.getNextIndex(this.nextIndex);

                this.orientation = this.calcAngle(this.path[this.startIndex], this.path[this.nextIndex]);
                this.nextPosition = vec3.fromValues(this.path[this.nextIndex].x, 0.0, this.path[this.nextIndex].z);
            }

        }
        // Train is stopped and waiting
        else if (this.path[this.startIndex].type === 'station' && this.velocity <= 0.005) {
            this.velocity = 0;
        }
        // Train is on a simple track velocity is constant flag is back to 0
        else {
            this.velocity = 1;
            this.flag = 0;
            if ((Math.round(this.position[0]) != this.nextPosition[0] || Math.round(this.position[2]) != this.nextPosition[2])) {
                console.log(this.position[0], Math.trunc(this.position[2]));
                var x = this.position[0] + this.velocity * Math.sin(this.orientation);
                var y = this.position[1];
                var z = this.position[2] + this.velocity * Math.cos(this.orientation);

                this.position = vec3.fromValues(x, y, z);
            }
            else {
                var x = this.nextPosition[0] - 0.12673378;
                var y = 0;
                var z = this.nextPosition[2];

                this.position = vec3.fromValues(x, y, z);

                this.startIndex = this.nextIndex;
                this.nextIndex = this.getNextIndex(this.nextIndex);

                this.orientation = this.calcAngle(this.path[this.startIndex], this.path[this.nextIndex]);
                this.nextPosition = vec3.fromValues(this.path[this.nextIndex].x, 0.0, this.path[this.nextIndex].z);
            }

        }

        this.wheel.update(this.velocity);       // Wheels rotation function
    }

    // Invert the Acceleration (go from slowing down to speeding up)
    invAccelartion() {
        this.acceleration = 1 / this.acceleration;
    }

    // Acceleration = Velocity / (Velocity / Distance) ^ 2
    accelerate() {
        var distance = this.calcDistance(this.path[this.startIndex], this.path[this.nextIndex]) / 2;
        console.log(distance, 'distance');
        console.log(Math.exp(this.cruise / distance), 'value');
        return (this.cruise / Math.exp(this.cruise / distance) + 0.00025);
    }

    // Turn the crane Left and Right
    craneTurnY(val) {
        this.craneRotationY += val;
        this.craneRotationY = this.craneRotationY % (Math.PI * 2);
    }

    // Turne the crane Up and Down
    craneTurnZ(val) {
        this.craneRotationZ += val;
        this.craneRotationZ = this.craneRotationZ % (Math.PI * 2);
        if (this.craneRotationZ > 0.05) this.craneRotationZ = 0.05;
        else if (this.craneRotationZ < -0.53) this.craneRotationZ = -0.53;
    }

    // Reset the crane Position
    craneReset() {
        this.craneRotationY = 0;
        this.craneRotationZ = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);  // Movement
        this.scene.rotate(this.orientation, 0, 1, 0);                                // Movement

        this.scene.pushMatrix();
        // Base do Comboio - Paralelipipedo
        this.faceTexture.apply();
        this.scene.translate(0, 1.5, -3.75);
        this.scene.scale(2.5, 1, 7.5);
        this.cube.display();
        this.scene.popMatrix();

        // Cabine do Comboio
        this.scene.pushMatrix();
        this.face2Texture.apply();
        this.scene.translate(0, 3.25, -2.1);
        this.scene.scale(2, 2.5, 1.8);
        this.cube.display();
        this.scene.popMatrix();

        // Engine do Comboio - Cilindro e Esfera
        this.scene.pushMatrix();
        this.secondTexture.apply();
        this.scene.translate(0, 2.9, -0.3);
        this.scene.scale(0.9, 0.9, 3.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.bodyTexture.apply();
        this.scene.translate(0, 2.9, 3.2);
        this.scene.scale(0.9, 0.9, 0.3);
        this.sphere.display();
        this.scene.popMatrix();

        // Chaminé do Comboio - Cilindro
        this.scene.pushMatrix();
        this.bodyTexture.apply();
        this.scene.translate(0, 3.5, 2.5);
        this.scene.scale(0.3, 1, 0.3);
        this.cylinder.display();
        this.scene.popMatrix();

        // 4x Rodas do Comboio - Cilindro + Circulo
        // Frente Esquerda
        this.scene.pushMatrix();
        this.wheelsTexture.apply();
        this.scene.translate(1.5, 0.75, 2.5);
        this.wheel.display();
        this.scene.popMatrix();

        // Frente Direita
        this.scene.pushMatrix();
        this.wheelsTexture.apply();
        this.scene.translate(-1.3, 0.75, 2.5);
        this.wheel.display();
        this.scene.popMatrix();

        // Trás Esquerda
        this.scene.pushMatrix();
        this.wheelsTexture.apply();
        this.scene.translate(1.5, 0.75, -2.5);
        this.wheel.display();
        this.scene.popMatrix();

        // Trás Direita
        this.scene.pushMatrix();
        this.wheelsTexture.apply();
        this.scene.translate(-1.3, 0.75, -2.5);
        this.wheel.display();
        this.scene.popMatrix();

        // Container
        this.scene.pushMatrix();
        this.containerTexture.apply();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(2.9, 2, -1.125);
        this.container.display();
        this.scene.popMatrix();

        // Crane
        this.scene.pushMatrix();
        this.craneTexture.apply();
        this.scene.translate(0, 4.4, -1.25);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.crane.display(this.craneRotationY, this.craneRotationZ);
        this.scene.popMatrix();

        // Package
        // For the Package we will do 3 distinct Packages, the one that stays on the Station, 
        // the Second one that is on the crane arm, the Third one that is on the Train back

        // STATION PACKAGE
        this.scene.pushMatrix();
        this.scene.translate(0, 2.2, -2.9);
        this.package.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
