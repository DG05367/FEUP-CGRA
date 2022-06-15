import {CGFobject} from '../../lib/CGF.js';
import {MyTrackSegment} from './MyTrackSegment.js';

/**
 * MyTrack
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Path} list - array with the path to create the segments
 */

export class MyTrack extends CGFobject {
	constructor(scene, list) {
		super(scene);
        this.createTrack(scene, list);

        this.initBuffers();
    }

    createTrack(scene, list) {
        this.Segment = [];
        for(var i=0; i<list.length-1; i++)
        {
            //console.log("lenght " + list.length);
            this.Segment.push(new MyTrackSegment(scene, list[i], list[(i+1)%list.length]));
        }
        this.Segment.push(new MyTrackSegment(scene, list[list.length-1] ,list[0]));
    }

    display()
    {
        for(var i=0; i<this.Segment.length; i++)
        {
            this.Segment[i].display();
        }
    }
}