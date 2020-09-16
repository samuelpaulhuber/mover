import robot from 'robotjs';

class RandomMovement {

  // get current mouse position and move # number of pixels on x for given number of seconds
  async moveAlongX(movementAmount: number, secondsToRun: number, secondsToMove: number) {
    await this.moveMouse(false, true, false, movementAmount, secondsToRun, secondsToMove);  
  }

  async moveAlongY(movementAmount: number, secondsToRun: number, secondsToMove: number) {
    await this.moveMouse(false, false, true, movementAmount, secondsToRun, secondsToMove);
  }

  async moveAlongXY(movementAmount: number, secondsToRun: number, secondsToMove: number) {
    await this.moveMouse(false, true, true, movementAmount, secondsToRun, secondsToMove);
  }

  async moveBackForthUpDown(movementAmount: number, secondsToRun: number, secondsToMove: number) {
    await this.moveMouse(true, true, true, movementAmount, secondsToRun, secondsToMove);
  }

  async moveMouse(isBackAndForth: boolean, isXmovement: boolean, isYmovement: boolean, 
    movementAmount: number, secondsToRun: number, secondsToMove: number) {
    let mousePos = robot.getMousePos();
    let endTime = (new Date());
    let count = 0;
    endTime.setSeconds(endTime.getSeconds() + secondsToRun);
     
    while (new Date() < endTime) {
      await this.sleep(secondsToMove);

      if (count % 2 === 0 && isBackAndForth)
        movementAmount *= -1;

      let mouseX = isXmovement ? mousePos.x + movementAmount : mousePos.x;
      let mouseY = isYmovement ? mousePos.y + movementAmount : mousePos.y;

      robot.moveMouse(mouseX, mouseY);
      mousePos = robot.getMousePos();
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