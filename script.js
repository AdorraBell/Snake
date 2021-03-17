window.onload = function(){

	const canvas = document.getElementById("game");
	const ctx = canvas.getContext("2d");

	let z = Math.floor((Math.random()*10));

	const scoreImg = new Image();
	scoreImg.src = "img/food0.png";

	let backgrImg = document.getElementById('ground');

	const ground = new Image();
	ground.src = "img/background.jpg";

	const foodImg = new Image();

	let game = setInterval(drawGame, 200);

	let speed = 200;
	let gameOver = false;
	let box = 32;
	let score = 0;
	let notice;
	let dir;

	let food = {
		x: Math.floor((Math.random()*28+1))*box,
		y: Math.floor((Math.random()*28+2))*box,
	};

	let snake = [];
	snake[0] = {
		x: 14*box,
		y: 16*box
	};

	function foodChange(){
		foodImg.src = "img/food" + z + ".png";
	};

	foodChange();

	document.addEventListener("keydown", direction);

	function direction(event){
		if(event.keyCode == 37 && dir != "right"){
			dir = "left";
		}else if(event.keyCode == 38 && dir != "down"){
			dir = "up";
		}else if(event.keyCode == 39 && dir != "left"){
			dir = "right";
		}else if(event.keyCode == 40 && dir != "up"){
			dir = "down";
		}
	}

	function eatTail(head, arr){
		for (let i = 0; i < arr.length; i++){
			if(head.x == arr[i].x && head.y == arr[i].y){
				gameOver = true;
				theEnd();
				
				notice = "Вы проиграли";
				
				ctx.fillStyle = "red";
			    ctx.font = "50px Arial";
			    ctx.fillText(notice, box *9, box*1.5);
			}
		}
	}

	function noRes(food, arr){
		for (let i = 0; i < arr.length; i++){
			if(food.x == arr[i].x && food.y == arr[i].y){
				z = Math.floor((Math.random()*10));
			}
		}
	}
	
	function drawGame(){
		ctx.drawImage(ground, 0, 0);

		ctx.drawImage(foodImg, food.x, food.y);

		for(let i = 0; i < snake.length; i++){
			ctx.fillStyle = i == 0 ? "#8f78e6":"#9d8ed8"; 
			ctx.fillRect(snake[i].x, snake[i].y, box, box);
		}

		ctx.drawImage(scoreImg, box, box/2);

		ctx.fillStyle = "white";
		ctx.font = "50px Arial";
		ctx.fillText(score, box *2.5, box*1.5);

		let snakeX = snake[0].x;
		let snakeY = snake[0].y;

		if(snakeX == food.x && snakeY == food.y){

			score++;
			food = {
				x: Math.floor((Math.random()*28+1))*box,
				y: Math.floor((Math.random()*28+2))*box,
			};

			z = Math.floor((Math.random()*10));
			foodChange();

			if(score == 3){
				speed-=5;
			}if(score == 6||9){
				speed-=3;
			}else if(score%5 && score<40){
				speed-=2;
			}else if(score%10){
				speed-=3;
			}
		}else{
			snake.pop();
		}

		if(dir == "left") snakeX -= box;
		if(dir == "right") snakeX += box;
		if(dir == "up") snakeY -= box;
		if(dir == "down") snakeY += box;

		let newHead = {
			x: snakeX,
			y: snakeY
		};

		eatTail(newHead, snake);

		snake.unshift(newHead);

		noRes(food, snake);

		function check(){
			if(snakeX < box || snakeX > box*28
				||snakeY < 2*box || snakeY > box*29){
				
				gameOver = true;
				theEnd();
				
				notice = "Вы проиграли";
				
				ctx.fillStyle = "red";
			    ctx.font = "50px Arial";
			    ctx.fillText(notice, box *9, box*1.5);

			}else if(snake.length == 783){ 
				gameOver = true;
				theEnd();

				notice = "Вы выиграли!";
				
				ctx.fillStyle = "blue";
			    ctx.font = "50px Arial";
			    ctx.fillText(notice, box *9, box*1.5);
			}
		}

		check();
	}

	function theEnd(){
		if (gameOver == true){
			clearInterval(game);
		}
	}

}