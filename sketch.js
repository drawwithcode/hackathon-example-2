var mic, vol, myInput;

function setup() {
  createCanvas(360, 640);

  // Create an Audio input
  mic = new p5.AudioIn();
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  
  myInput = 'mic';
}

function draw() {
  
  background(246,247,246,200);

  // Get the overall volume (between 0 and 1.0)
  vol = mic.getLevel();
  //vol = mouseX/width;
  
  //traslate to the middle
  translate(width/2,0)
  
  //push the current transformation
  push();
  
  //define multiplier based on volume
  var multi = map(vol, 0, 1, 1, 3)
  
  //define scale
  scale(multi,1);
  
  // Set colors
  fill('#098631');
  stroke('#1E3244')
  
  // Draw three triangles for the tree.
  // I will use the custom function 'regTriangle' defined below.
  
  regTriangle(0, 300, 200, 200);
  
  regTriangle(0, 300 - 70*0.8, 200*0.8, 200*0.8);
  
  regTriangle(0, 300 - 70*0.8 - 70*0.6, 200*0.6, 200*0.6);
  
  //pop the transformation
  pop();
  
  //depending by the vol level, draw from 0 to 5 balls.
  
  for(var i = 0; i < vol*15; i++){
    
    if(i==4) {
      fill('#CB150B')
      ellipse(20*multi,269,20* multi)
    }
    if(i==3) {
      fill('#EBB289')
      ellipse(-10*multi,358,20* multi)
    }
    if(i==2) {
      fill('#FDE0B7')
      ellipse(40*multi,371,20* multi)
    }
    if(i==1) {
      fill('#DD4F71')
      ellipse(-20*multi,440,20* multi)
    }
    if(i==0) {
      fill('#CB150B')
      ellipse(40*multi,466,20* multi)
    }
    
  }
  
  
  // Depending on the vol value, draw random poligons
  // silence = no polygons
  // mx. volume = 100 poligons
  
  for(var i = 0; i < vol*10; i++) {
    // Set fill to white
    fill(255);
    
    //draw polygons
    polygon(random(width) - width/2, random(height), 10, round(map(vol,0,1,3,12)))
  }
}

// Create a regular triangle giving the top verted (x and y) then width and height.

function regTriangle(top_x, top_y, tHeight, tWidth) {
  
  triangle(top_x, top_y, top_x-tWidth/2, top_y+tHeight, top_x+tWidth/2, top_y+tHeight);
  
}

// Create regular polygons.

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}