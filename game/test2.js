//난이도 조절을 위한 상수 선언
const ENEMY_SPEED_MIN_EASY = 3000;
const ENEMY_SPEED_MAX_EASY = 6000;
const ENEMY_SPEED_MIN_HARD = 2000;
const ENEMY_SPEED_MAX_HARD = 4000;

//반복에는 for문을 쓰면 안됨
let isJumping = false;
const score = 0;
$(function () {
  gameStart(); //온로드 안에 넣어야함 static 같은 느낌 이게 없으면 미리 로드 되지 않아서 전부 null로 잡히는 것 같이됨
});

function gameStart() {
  // $('#gameover_screen').hide();
  setKeyboardEvent();
  enemyStart(); //난이도 조절을 위해서는 random함수를 써야함
  itemStart();
  startBackgroundAnimation();
  checkGameOver();
}

//백 그라운드 애니메이션
function startBackgroundAnimation() {
  let position = 0;
  setInterval(function () {
    $("#container").css("background-position", position-- + "px");
  }, 10);
}

//충돌 감지
function isColliding(object1, object2) {
  // const char = object1.getBoundingClientRect();
  const char = {
    bottom: object1.getBoundingClientRect().bottom,
    top: object1.getBoundingClientRect().top + 10,
    right: object1.getBoundingClientRect().right - 10, // 다리와 발 부분만 선택
    left: object1.getBoundingClientRect().left + 10, // 다리와 발 부분만 선택
  };
  
  const obj = object2.getBoundingClientRect();
  
  return !(
    char.bottom < obj.top ||
    char.top > obj.bottom ||
    char.right < obj.left ||
    char.left > obj.right
    );
  }
  
  function checkGameOver() {
    setInterval(function () {
      const cat = $("#cat");
      const enemy = $("#enemy");
      const item = $("#item");
    
    const catLeft = Number(cat.css("left").replace("px", ""));
    const catRight = catLeft + 50;
    const catTop = Number(cat.css("top").replace("px", ""));
    //괄호 단축키: 텍스트 더블클릭한 상태로 괄호하면 됨...자동으로 닫힘
    const enemyLeft = Number(enemy.css("left").replace("px", "")); //게임수학의 기초...
    const enemyRight = enemyLeft + 20;
    const enemyBottom = Number(cat.css("bottom").replace("px", ""));;

    const isEnemyColliding =
      catRight > enemyLeft && catTop < enemyBottom && catLeft < enemyRight;

    const itemLeft = Number(item.css("left").replace("px", ""));
    const itemRight = itemLeft + 20;
    const itemBottom = Number(item.css("bottom").replace("px", ""));
    const isItemColliding =
      catRight > itemLeft && catTop > itemBottom && catLeft < itemRight;


    console.log(`catRight: ${catRight}
        ,catTop: ${catTop}
        , enemyRight: ${enemyRight}
        , enemyBottom: ${enemyBottom}
        , isGameOver: ${isColliding}`);

  }, 1000 / 60);
}

function updateScore(score) {
  $("#score").text(score);
}


//         // 재시작 버튼 클릭 이벤트 핸들러
//   $('#gameover_screen input[type="button"]').click(function () {
//     $('#gameover_screen').hide(); // 게임 오버 화면 숨김
//     gameStart(); // 게임 재시작
//   });

//충돌체크하는 함수
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function enemyStart() {
  // 속도 조절
  const enemy = $("#enemy");
  const speed = getRandomNumber(2000, 6000);
  //적이 오른쪽에서 왼쪽으로 이동
  enemy.animate({ right: "550px" }, speed, "linear", function () {
    //점수 올리자
    if($("#score")>0){
    score -= 100;
    updateScore(score);
    } else {
      $('#gameover_screen').show();
    }
    //적 리셋
    enemy.css("right", "-70px");
    enemyStart();
    // 재귀함수, 인터벌 등 방법의 여러가지 있음
  }); //맨뒤가 콜백임
}

function itemStart() {
  // 속도 조절
  const item = $("#item");
  const speed = getRandomNumber(2000, 6000);
  //아군이 오른쪽에서 왼쪽으로 이동
  item.animate({ right: "550px" }, speed, "linear", function () {
    //점수 올리자
    score += 100;
    updateScore(score);

    //적 리셋
    item.css("right", "-70px");
    itemStart();
    // 재귀함수, 인터벌 등 방법의 여러가지 있음
  }); //맨뒤가 콜백임
}

// let gameover = false;

function jump() {
  if (isJumping == true) {
    return;
  }

  isJumping = true;
  $("#cat")
    .animate(
      {
        bottom: "+=180px",
      },
      500
    )
    .animate(
      {
        bottom: "-=180px",
      },
      500,
      function () {
        isJumping = false;
      }
    );
}

// 키보드 이벤트 정의
function setKeyboardEvent() {
  $("html").keydown(function (e) {
    switch (e.key) {
      case " ":
        if (!isJumping) {
          jump();
        }
        break;
    }
  });
}

$("#restart").click(function () {
  gameLoop();
});
