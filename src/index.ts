#!/usr/bin/env node
import RandomMovement from './mouse/RandomMovement';
import yargs from 'yargs';

const argv:any = yargs.argv;
const randomMovement = new RandomMovement();
const pixel = argv.p ? argv.p : 100;
const movementDelay = argv.d ? argv.d : 10
const runTime = argv.t ? argv.t : 0

if(argv.rand) {    
    console.log('rand', pixel, runTime, movementDelay);
    randomMovement.moveBackForthUpDown(pixel, runTime, movementDelay);
} else if (argv.xy) {
    randomMovement.moveAlongXY(pixel, runTime, movementDelay);
} else if (argv.x) {
    randomMovement.moveAlongX(pixel, runTime, movementDelay);
} else if (argv.y) {
    randomMovement.moveAlongY(pixel, runTime, movementDelay);
}