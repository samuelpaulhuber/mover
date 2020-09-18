import robot from 'robotjs';

class RandomMovement {

  // get current mouse position and move given # number of pixels on x 
  // for given number of seconds every n seconds
  async moveAlongX(movementAmount: number, secondsToRun: number, secondsToMove: number) {
    await this.moveMouse(false, true, false, movementAmount, secondsToRun, secondsToMove);  
  }

  // get current mouse position and move given # number of pixels on y 
  // for given number of seconds every n seconds
  async moveAlongY(movementAmount: number, secondsToRun: number, secondsToMove: number) {
    await this.moveMouse(false, false, true, movementAmount, secondsToRun, secondsToMove);
  }

  // get current mouse position and move given # number of pixels on x & y 
  // for given number of seconds every n seconds
  async moveAlongXY(movementAmount: number, secondsToRun: number, secondsToMove: number) {
    await this.moveMouse(false, true, true, movementAmount, secondsToRun, secondsToMove);
  }

  // get current mouse position and move given # number of pixels on x & y. 
  // pixels move in both positive and negative directions based on if count is odd or even
  // for given number of seconds every n seconds
  async moveBackForthUpDown(movementAmount: number, secondsToRun: number, secondsToMove: number) {
    await this.moveMouse(true, true, true, movementAmount, secondsToRun, secondsToMove);
  }

  async moveMouse(isBackAndForth: boolean, isXmovement: boolean, isYmovement: boolean, 
    movementAmount: number, secondsToRun: number, secondsToMove: number) {
    // get start points
    let mousePos = robot.getMousePos();
    let endTime = (new Date());
    let count = 0;

    // find we want to finish running
    endTime.setSeconds(endTime.getSeconds() + secondsToRun);
     
    // check date and see if we are ready to stop
    while (new Date() < endTime || secondsToRun === 0) {
      // pause based on given interval
      await this.sleep(secondsToMove);

      // negative movement accounted for when even
      if (count % 2 === 0 && isBackAndForth)
        movementAmount *= -1;

      // update mouse coordinates
      let mouseX = isXmovement ? mousePos.x + movementAmount : mousePos.x;
      let mouseY = isYmovement ? mousePos.y + movementAmount : mousePos.y;

      // move mouse
      robot.moveMouse(mouseX, mouseY);

      // set new position
      mousePos = robot.getMousePos();

      // update count if we need to
      if (isBackAndForth)
        count++;
    } 
  }

  private sleep(s: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, s * 1000);
    });
  }  
}

export default RandomMovement;