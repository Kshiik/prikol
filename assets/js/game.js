let canvas = document.getElementById("gamezone");
let context = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const ceil = 80;
const width = canvas.width;
const height = canvas.height;

var status = "game";

let item = 0;

let count_image = 0;

let map = [];
let map_buffer = [];
let hero = {
    "x":0,
    "y":0,
    "hp":3,
}
let map_carrots = [
    {
    "x":160,
    "y":640
    },
    {
        "x":160,
        "y":80
    },
    {
        "x":320,
        "y":160
    }
];

let map_hole = [
    {
    "x":160,
    "y":640
    },
    {
        "x":160,
        "y":80
    },
    {
        "x":320,
        "y":160
    }
];


//картинки
let grass = new Image(ceil,ceil);
grass.src = "assets/image/grassPX2.png";
let bunny = new Image(ceil,ceil);
bunny.src = "assets/image/rabbitFront.png";
let carrot = new Image(ceil,ceil);
carrot.src = "assets/image/carrotPX.jpg";
let hole = new Image(ceil,ceil);
hole.src = "assets/image/hole.jpg";

//

for (let i = 0; i < width/ceil; i++) {
    for (let j = 0; j < height/ceil; j++){
        map.push({
            "x":i*ceil,
            "y":j*ceil
        });
    }
}

/*
for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++){
        context.strokeRect(
            map[i,j].x,
            map[i,j].y,
            ceil,
            ceil);
    }
}
*/

document.addEventListener("keydown",function(event){
    let press_key = event.code;
    switch(press_key){
        case"KeyA":
        if(hero.x>0){
            hero.x-=ceil;
        }
            break;
        case"KeyS":
        if(hero.y<height-ceil){
            hero.y+=ceil;
        }
            break;
        case"KeyD":
        if(hero.x<width-ceil){
            hero.x+=ceil;
        }
            break;
        case"KeyW":
        if(hero.y>0){
            hero.y-=ceil;
        }
            break;
    }
});

canvas.addEventListener("mousedown", function(event){
    let x = Math.floor(event.offsetX/ceil);
    let y = Math.floor(event.offsetY/ceil);
    let cell_index = map.findIndex(item=> item.x == x*ceil && item.y == y*ceil);
    let sprite = new Image();

    switch(item){
        case 1:
            sprite.src = "assets/image/sand.jpg";
        break;
        case 2:
            sprite.src="assets/image/grassPX2.png";
        break;
        case 3:
            sprite.src="assets/image/carrotPX.jpg";
        break;
        case 4:
            sprite.src="assets/image/button.jpg";
        break;
        case 5:
            sprite.src="assets/image/spike.jpg";
        break;
        case 6:
            sprite.src="assets/image/trap1.jpg";
        break;
        case 7:
            sprite.src="assets/image/trap2.jpg";
        break;
        case 8:
            sprite.src="assets/image/trap3.jpg";
        break;
        case 9:
            sprite.src="assets/image/trap4.jpg";
        break;
        case 10:
            sprite.src="assets/image/rabbitFront.png";
        break;
    };
    
    let repeat = map_buffer.findIndex(item => item.ceil == cell_index);
    if (item == 5) {
        let check = map_buffer.findIndex(map_item => map_item.item == item);
        if (repeat != -1) {
            map_buffer.splice(check, 1);
        }
    }

    map_buffer.push({
        "ceil":cell_index,
        "item":item,
        "count":count_image,
        "image":sprite,
    });
});

function game() {
    context.clearRect(0,0,width,height);

    for (let buffer_i = 0; buffer_i < map_buffer.length; buffer_i++) 
    {
        if (map_buffer[buffer_i].item != 5) {
            context.drawImage(
                map_buffer[buffer_i].image,
                map[map_buffer[buffer_i].ceil].x,
                map[map_buffer[buffer_i].ceil].y,
                ceil,
                ceil);
        }
        else{
            context.drawImage(
                map_buffer[buffer_i].image,
                hero.x,
                hero.y,
                ceil,
                ceil);
        }
    }
    let result_find = map_buffer.findIndex(item=>
        map[item.ceil].x == hero.x &&
        map[item.ceil].y == hero.y &&
        item.item == 2);

        console.log(result_find);
        
    if (result_find!=-1) {
        map_buffer.splice(result_find,1);
        
    }
    
    if(status == "game"){
        requestAnimationFrame(game);
    }
}

function editor() {
    context.clearRect(0,0,width,height);
    for (let map_i = 0; map_i < map.length; map_i++)
     {
            context.strokeRect(
                map[map_i].x,
                map[map_i].y,
                ceil,
                ceil);
    }

    for (let buffer_i = 0; buffer_i < map_buffer.length; buffer_i++) {
                context.drawImage(
                    map_buffer[buffer_i].image,
                    map[map_buffer[buffer_i].ceil].x,
                    map[map_buffer[buffer_i].ceil].y,
                    ceil,
                    ceil);
        }

    if(status == "editor"){
        requestAnimationFrame(editor);
    }
}
