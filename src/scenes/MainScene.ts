import Phaser from "phaser";
import Coroutine from "./coroutine_test";

function spawnCounter(idx:number) {
  const counter = new Coroutine(function* () {
    let i = 0;
    let start = Date.now();
    let realStart = start;
    let now = start;
    while (i < 10_000_000){
      i += 1;


      now = Date.now();
      if (now - start > 1000 / 60) {
        yield;
        start = Date.now();
      }
    }
    console.log(idx + ' done!', ((Date.now() - realStart) / 1000) + ' seconds');
  });
  counter.run();
}

export default class MainScene extends Phaser.Scene {
  create = () => {
    
    spawnCounter(1);
    spawnCounter(2);
    spawnCounter(3);
    spawnCounter(4);

    // setInterval(() => {
      // console.log("count..", counter.value);
      // if (counter.value > 100){
      //   counter.stop();
      // }
    // }, 1000);
  };
}
