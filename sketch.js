let bowed, env;

function setup() {
  createCanvas(400, 400);
	getAudioContext().suspend();  
  env = new p5.Envelope();
  env.setADSR(0.01, 0.01, 1, 0.01)
  env.setRange(1, 0)
  
  const audioBuffers = [
    new Promise(resolve => bowed = loadSound('audio/bowed.mp3', resolve))
  ]
  
  Promise.all(audioBuffers)
    .then(() => {
      console.log('all audio is loaded')
    	env.setInput(bowed)
			bowed.loop()
    })
  	.catch(() => {
  		console.log('audio failed to load')
  	})
  background(80);
  fill(0, 100);
  ellipse(width/2, height/2, width);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
	env.triggerAttack();	
}

function mouseReleased() {
	env.triggerRelease();
}