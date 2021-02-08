let songStats; //variable for storing dataset
let angle = 0; //setting start angle for spinning effect

let r = 249; //variable for pink R color
let g = 27; //variable for pink G color
let b = 89; //variable for pink B color

let geniusLogoSVG; //variable for svg format logo genius
let cursorInstructionIMG; //variable for img cursor instruction
let alligningLeft = 25; //alligning text (and shapes) left

let lineThickness = 2; //variable for setting weight of line

let title; //variable for storing the title for multiple use
let hoofdKop = 25; //variable for setting textsize for multiple use
let subKop = 18; //variable for setting textsize for multiple use
let brood = 14; //variable for setting textsize for multiple use
let fontUbuntuBOLD; //variable for bold ubuntu font
let fontUbuntuREG; //variable for regular ubuntu font

let song; //variable for the nr. 1 song

let albumcover1; //variable for albumcover 1
let albumcover2; //variable for albumcover 2
let albumcover3; //variable for albumcover 3

function preload() {

  //preload jason dataset in global variable
  songStats = loadJSON('js/data.json');

  //preload custom font (ubuntu)
  fontUbuntuBOLD = loadFont('assets/Ubuntu-Bold.ttf');
  fontUbuntuREG = loadFont('assets/Ubuntu-Regular.ttf');

  //preload for svg logo genius, img cursor and album covers
  geniusLogoSVG = loadImage('assets/logoGenius.svg');
  cursorInstructionIMG = loadImage('img/cursor.png');

  albumcover1 = loadImage('img/albumcover1.jpg');
  albumcover2 = loadImage('img/albumcover2.jpg');
  albumcover3 = loadImage('img/albumcover3.jpg');

  drakeCursor = loadImage('img/drakeCursor.png');

  //background IMG
  bg = loadImage('img/backgroundIMG.jpg');

  //song nr. 1
  song = loadSound('assets/1-godsplan.m4a');

}

function setup() {
  createCanvas(1000, 1000); //canvas size (size based on window);
  angleMode(DEGREES);
}

function draw() {

  //background color setting
  background(bg);

  let geniusYellow = color(247,241,108); //variable for yellow color from genius' branding

  textAlign(CENTER);

  if (songStats) {

    let x = width/2;
    let y = height/2;

    let afstand = dist(mouseX,mouseY,x,y);

    if (afstand>398/2 && afstand<536/2) {
      stroke(r,g,b); strokeWeight(lineThickness);
      image(albumcover1,width/2-75,height/2-150, 150, 150); 
    }

    for (let i = 0; i<songStats.data.length; i++) {

      let radiusSize = songStats.data[i].currentViews/100000 * 4;

      fill(30); stroke(60); strokeWeight(lineThickness*2);
      ellipse(width/2,height/2, radiusSize*2, radiusSize*2);

      fill(r,g,b,50); stroke(r,g,b); strokeWeight(lineThickness*2);
      arc(x, y, radiusSize*2, radiusSize*2, 90, angle-i*45);

      angle=angle+0.25;

      if (angle>360) {
        angle = 0;
      }

    }

      //black information circle
      noStroke(); fill(0);
      ellipse(width/2,height/2,398,398);
      strokeWeight(lineThickness/2); stroke(102); //line divider between info and currentViews
      line(360,600,643,600);
      noStroke();

      if (afstand>398/2 && afstand<536/2 ) {

        let releaseYear = new Date(songStats.data[2].releaseDate); //variable for input release year

        image(albumcover3,width/2-75,height/2-150, 150, 150); //albumcover

        textFont(fontUbuntuBOLD); textSize(hoofdKop); fill(255); //songtitle
        text('Nr. 3 – ' + songStats.data[2].songTitle,width/2,height/2+45);

        textSize(subKop); fill(r,g,b); //currentviews
        text(songStats.data[2].currentViews + ' views',width/2,height/2+140);

        textFont(fontUbuntuREG); textSize(brood); fill(255); //releasedate
        text('Released in ' + releaseYear.getFullYear() + ', part of his ' + songStats.data[2].album + ' album.',width/2,height/2+70);

      }

      if (afstand>536/2 && afstand<576/2) {

        let releaseYear = new Date(songStats.data[1].releaseDate); //variable for input release year

        image(albumcover2,width/2-75,height/2-150, 150, 150); //albumcover

        textFont(fontUbuntuBOLD); textSize(hoofdKop); fill(255); //songtitle
        text('Nr. 2 – ' + songStats.data[1].songTitle,width/2,height/2+45);

        textSize(subKop); fill(r,g,b); //currentviews
        text(songStats.data[1].currentViews + ' views',width/2,height/2+140);

        textFont(fontUbuntuREG); textSize(brood); fill(255); //releasedate
        text('Released in ' + releaseYear.getFullYear() + ', part of his ' + songStats.data[1].album + ' album.',width/2,height/2+70);
      }

      if (afstand>576/2 && afstand<696/2) {

        let releaseYear = new Date(songStats.data[0].releaseDate); //variable for input release year

        image(albumcover1,width/2-75,height/2-150, 150, 150); //albumcover

        textFont(fontUbuntuBOLD); textSize(hoofdKop); fill(255); //songtitle
        text('Nr. 1 – ' + songStats.data[0].songTitle,width/2,height/2+45);

        if (songStats.data.mostPopular = true) { //if it's the most popular song the views will turn yellow gold
        fill(geniusYellow);
        } else {
        fill(r,g,b);
        }

        textSize(subKop); //currentviews
        text(songStats.data[0].currentViews + ' views',width/2,height/2+140);

        textFont(fontUbuntuREG); textSize(brood); fill(255); //releasedate
        text('Released in ' + releaseYear.getFullYear() + ', part of his ' + songStats.data[0].album + ' album.',width/2,height/2+70);
      }

  }

  //circle based grid
  for (let i = 0; i<6; i++) {
    let radius = 880-i*80;

    noFill(); stroke(102); strokeWeight(0.5);
    ellipse(width/2,height/2,radius);

    fill(102); noStroke(); textFont(fontUbuntuBOLD); textSize(brood);
    text(10 - i + 'M', width/2, height/2+radius/2-15);
  }

  textAlign(LEFT);

  //yellow information upperleft
  fill(geniusYellow);
  rect(0,0,450,300);
  triangle(alligningLeft, 312, 25, 300, 40, 300);
  image(geniusLogoSVG, 25, 25, 158, 24); //logo genius
  document.title = title; // set html document title (standard Javascript) nice-to-have ( thanks Luc ;) )
  title = 'Top 3 ' + songStats.description; //compiling title
  
  //title above data visualisation
  fill(0); textSize(hoofdKop); textFont(fontUbuntuBOLD);
  text(title, alligningLeft, 150);

  //subtitle above data visualisation
  textSize(subKop);
  text('(According to lyric views)', alligningLeft, 180);

  //line divider between text in yellow info tab
  stroke(0); strokeWeight(lineThickness);
  line(alligningLeft, 225, 425, 225);

  //cursor image
  image(cursorInstructionIMG, 18, 250, 20, 20);

  //text explaining data visualisation interaction
  noStroke(0); textSize(brood); textFont(fontUbuntuREG);
  text('Hover on a circle to see stats, click for the nr. 1 song!', 45, 265);

  //credits
  fill(102); noStroke(); textFont(fontUbuntuREG);
  text('By Devon Habets (2063034) CMD1A - MMT 1.2', alligningLeft, height-alligningLeft);

  //drake cursor
  image(drakeCursor,mouseX-25,mouseY-25,50,50);
}

function mouseClicked() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
  } else {
    song.play();
  }
}