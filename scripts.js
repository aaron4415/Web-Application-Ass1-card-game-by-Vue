var numOfCard;
var flipTime = 0;
var correctSelect = 0;
var totalMark = 0;
var targetCardList = [];
function numberOfcard_click_handler() {
  if (
    document.getElementById("numInput").value % 3 != 0 ||
    document.getElementById("numInput").value == 0 ||
    document.getElementById("numInput").value == null
  ) {
    alert(
      "The number of your input is invalid, you must enter a number of any multiple of 3, please input the number again!"
    ); //check if the number is invalid
  } else {
    numOfCard = document.getElementById("numInput").value;
    //timer function for time counting ,starts here
    const timeH = document.getElementById("timeValue");
    let timeSecond = (30 * numOfCard) / 3;
    const countDown = setInterval(() => {
      timeSecond--;
      displayTime(timeSecond);
      if (timeSecond == 0 || timeSecond < 1) {
        endCount();
        clearInterval(countDown);
      }
    }, 1000);
    function displayTime(second) {
      const min = Math.floor(second / 60);
      const sec = Math.floor(second % 60);
      timeH.innerHTML = `
${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
`;
    }

    function endCount() {
      timeH.innerHTML = "0";
      alert("Time out! Please input a number to restart the game!");
      totalMark = 0;
      document.getElementById("scoreValue").innerHTML = totalMark;
      for (var k = 0; k < numOfCard; k++) {
        document
          .getElementById("cardContainer")
          .removeChild(document.getElementById(k.toString()));
      }
      document.getElementById("numInput").disabled = false;
      document.getElementById("SubmitButton").disabled = false;
      //if time is end, end the game
    }
    //timer function for time counting ,end here
    document.getElementById("numInput").disabled = true;
    document.getElementById("SubmitButton").disabled = true;
    //not allow user to input number
    correctSelect = 0;
    var targetCardList = [];
    for (var i = 0; i < numOfCard / 3; i++) {
      for (var j = 0; j < 3; j++) {
        targetCardList.push({ cardNum: i, filpedByCorrectSelect: -1 });
      }
    }
    shuffle(targetCardList); //shuffle the postion

    for (var i = 0; i < numOfCard; i++) {
      let cardContainer = document.getElementById("cardContainer");
      let cardBack = document.createElement("div");

      cardBack.className = "cardBack";
      cardBack.id = i.toString();
      cardBack.onclick = handleCardBack;
      //create the card
      function handleCardBack() {
        document.getElementById(event.srcElement.id.toString()).innerHTML =
          targetCardList[parseInt(event.srcElement.id)].cardNum;
        if (
          targetCardList[parseInt(event.srcElement.id)].filpedByCorrectSelect !=
          -1
        ) {
          alert("you alreay have selected this card");
          //check if the user has selected this card,it is not allow to select again
        } else {
          cardBack.classList.toggle("is-flipped");
          targetCardList[parseInt(event.srcElement.id)].filpedByCorrectSelect =
            correctSelect;
          flipTime++;
          cardBack.className = "card";
          //if user clicked on this card, show the number for him to see.
          if (flipTime == 3) {
            //check if the user has selected the correct card
            var checkCorr = 0;
            flipTime = 0;
            for (var j = 0; j < numOfCard; j++) {
              if (
                targetCardList[parseInt(event.srcElement.id)].cardNum ==
                targetCardList[j].cardNum
              ) {
                if (
                  targetCardList[parseInt(event.srcElement.id)]
                    .filpedByCorrectSelect ==
                  targetCardList[j].filpedByCorrectSelect
                ) {
                  checkCorr++;
                }
              }
            }

            if (checkCorr == 3) {
              //the user has selected the correct card
              correctSelect++;
              totalMark = totalMark + 3;
              document.getElementById("scoreValue").innerHTML = totalMark;
              if (correctSelect == numOfCard / 3) {
                //the user has win the game
               
                setTimeout(() => {
                  var timerText = timeH.textContent.replace(/(\r\n|\n|\r)/gm, "");;
                  console.log(timerText)
                  alert(
                    "congratulations! you got three score! This round you get " +
                      totalMark +
                      " score !"+"you still have "+timerText+" time, Please input a new number to restart the game again! "
                  );
                  totalMark = 0;
                  document.getElementById("scoreValue").innerHTML = totalMark;
                  for (var k = 0; k < numOfCard; k++) {
                    document
                      .getElementById("cardContainer")
                      .removeChild(document.getElementById(k.toString()));
                  }
                  clearInterval(countDown);
                  timeH.innerHTML = "0";
                  document.getElementById("numInput").disabled = false;
                  document.getElementById("SubmitButton").disabled = false;
                }, "1");
              } else {
                setTimeout(() => {
                  alert("congratulations! you got three score!");
                }, "1");
              }
            } else {
              //the user has selected the incorrect card
              totalMark = totalMark - 1;
              document.getElementById("scoreValue").innerHTML = totalMark;
              for (var k = 0; k < numOfCard; k++) {}
              setTimeout(() => {
                alert("your score has been reduced one ! try again!");
                for (var k = 0; k < numOfCard; k++) {
                  if (
                    targetCardList[k].filpedByCorrectSelect == correctSelect
                  ) {
                    targetCardList[k].filpedByCorrectSelect = -1;
                    document.getElementById(k.toString()).className =
                      "cardBack";
                  }
                }
              }, "100");
            }
          }
        }
      }
      cardContainer.appendChild(cardBack);
    }
  }
}
function nothing() {}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
