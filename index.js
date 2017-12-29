const numberOfDoors = 3;
const rounds = 100000;

let switchWins = 0;

const playRound = function(nod, sw){
	const randomCarDoor = Math.floor(Math.random()*nod); //Choose a random door number to fill with a car

	const initialDoorChoice = Math.floor(Math.random()*nod); //Contestant chooses a door

	let otherDoor = 0;
	if(initialDoorChoice == randomCarDoor){
		while(true){
			otherDoor = Math.floor(Math.random()*nod); //Choose other door to keep closed from remaining doors
			if(otherDoor != initialDoorChoice){
				break;
			}
		}
	}else{
		otherDoor = randomCarDoor; //Choose other door to keep closed as the car door (only choice)
	}

	if(sw){
		return otherDoor == randomCarDoor;
	}

	return initialDoorChoice == randomCarDoor;
}

for(let i = 1; i <= rounds; i++){
	if(playRound(numberOfDoors, true)){
		switchWins++;
	}

	let stayWins = i - switchWins; //Rounds we have lost by switching are rounds that would have been won by staying
	console.log("Switch win: " + ((switchWins/i)*100).toFixed(1) + "%, Stay win: "
		+ ((stayWins/i)*100).toFixed(1) + "%, Number of doors: " + numberOfDoors + ", Round: " + i + "/" + rounds);
}