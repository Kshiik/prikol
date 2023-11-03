let main_window = document.getElementById("main");
let game_window = document.getElementById("game");
let editor_window = document.getElementById("editor");

function swipe_window(name){
    if(name == "main"){
        game_window.style.zIndex = "-1";
        main_window.style.zIndex = "1";
        editor_window.style.zIndex = "-1";
        status = "main";
    }
    if(name == "game"){
        game_window.style.zIndex = "1";
        main_window.style.zIndex = "-1";
        editor_window.style.zIndex = "-1";
        status = "game";
        game();
    }
    if(name == "editor"){
        game_window.style.zIndex = "1";
        main_window.style.zIndex = "-1";
        editor_window.style.zIndex = "1";
        status = "editor";
        editor();
    }
}

function select_item(img,count) {
   
    item = img;
    count_image = count;
}