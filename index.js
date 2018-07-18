const chalk = require("chalk");

const numberOfDoors = process.argv[2] || 3;
const rounds = process.argv[3] || 1000;
const roundDelay = process.argv[4] || 50;

let currentRound = 0;
let switchWins = 0;

const playRound = function(numberOfDoors, playerSwitched){
	const randomCarDoor = Math.floor(Math.random()*numberOfDoors); //Choose a random door number to fill with a car

	const initialDoorChoice = Math.floor(Math.random()*numberOfDoors); //Contestant chooses a door

	let otherDoor = 0;
	if(initialDoorChoice == randomCarDoor){
		while(true){
			otherDoor = Math.floor(Math.random()*numberOfDoors); //Choose other door to keep closed from remaining doors
			if(otherDoor != initialDoorChoice){
				break;
			}
		}
	}else{
		otherDoor = randomCarDoor; //Choose other door to keep closed as the car door (only choice)
	}

	if(playerSwitched){
		return otherDoor == randomCarDoor;
	}

	return initialDoorChoice == randomCarDoor;
}

const loopRound = function(){
	process.stdout.write("\x1Bc");

	const switchWon = playRound(numberOfDoors, true);

	switchWins += switchWon ? 1 : 0;

	let stayWins = currentRound - switchWins; //Rounds we have lost by switching are rounds that would have been won by staying

	console.log(chalk.red("Round result:"));
	console.log(switchWon ? "Switching won!" : "Switching lost!");

	console.log(chalk.green("Theoretical statistics:"));
	console.log("Switch win: " + (((numberOfDoors-1)/numberOfDoors)*100).toFixed(1) + "%, Stay win: "
		+ ((1/numberOfDoors)*100).toFixed(1) + "%, Number of doors: " + numberOfDoors);

	console.log(chalk.cyan("Actual statistics:"));
	console.log("Switch win: " + ((switchWins/currentRound)*100).toFixed(1) + "%, Stay win: "
		+ ((stayWins/currentRound)*100).toFixed(1) + "%, Number of doors: " + numberOfDoors
		+ ", Round: " + currentRound + "/" + rounds + ", Percentage complete: " + ((currentRound/rounds)*100).toFixed(0) + "%");

	if(currentRound == rounds){
		return;
	}

	currentRound++;

	if(roundDelay > 0){
		setTimeout(loopRound, roundDelay);
	}else{
		loopRound();
	}
}

loopRound();