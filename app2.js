let popped = 0;
document.addEventListener('mouseover', function(game){
    
    if (game.target.className === "lv2"){
        
                game.target.style.backgroundColor = "white";
                game.target.textContent = "POP";
                popped++;
                removeEvent(game);
                checkAllPopped();
    } 
    else if (game.target.className === "wrong2")  {
        game.target.style.backgroundColor = "#ededed";
        game.target.textContent = "FAIL";
        removeEvent(game);
        checkAllPopped();
    }
        

    
});

function removeEvent(game){
    game.target.removeEventListener('mouseover', function(){
        
    })
};


function checkAllPopped(){
    if (popped === 6){
        console.log('all popped!');
        let gallery = document.querySelector('#balloon');
        let message = document.querySelector('#congrats2');
        gallery.innerHTML = '';
        message.style.display = 'block';
    }
   
};