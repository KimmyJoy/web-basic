//난이도 조절을 위한 상수 선언
const ENEMY_SPEED_MIN_EASY = 3000;
const ENEMY_SPEED_MAX_EASY = 6000;
const ENEMY_SPEED_MIN_HARD = 2000;
const ENEMY_SPEED_MAX_HARD = 4000;

//반복에는 for문을 쓰면 안됨
let isJumping = false;
const score = 0;


$(function () {
  const cat = $("#cat");
  const enemy = $("#enemy");
  gameStart(); //온로드 안에 넣어야함 static 같은 느낌 이게 없으면 미리 로드 되지 않아서 전부 null로 잡히는 것 같이됨

function gameStart() {
  $("#gameclear_screen").hide();
  $("#gameclearcat").hide();
  $("#gameovercat").hide();
  $("#gameover_screen").hide();
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
      bottom: object1[0].getBoundingClientRect().bottom,
      top: object1[0].getBoundingClientRect().top + 20,
      right: object1[0].getBoundingClientRect().right - 20, // 다리와 발 부분만 선택
      left: object1[0].getBoundingClientRect().left + 10 // 다리와 발 부분만 선택
  };


  const obj = object2[0].getBoundingClientRect();
 
  return !(
      char.bottom < obj.top ||
      char.top > obj.bottom ||
      char.right < obj.left ||
      char.left > obj.right
  );
}

function checkGameOver() {
  
  const catLeft = Number(cat.css("left").replace("px", ""));
  const catRight = catLeft + 50;
  const catBottom = Number(cat.css("bottom").replace("px", ""));
  const enemyLeft = Number(enemy.css("right").replace("px", ""));
  const enemyRight = enemyLeft + 20;
  const enemyTop = 20;

  const isGameOver =
    catRight > enemyLeft && catBottom < enemyTop && catLeft < enemyRight;

  if (isGameOver && score < 0) {
    $("#gameover_screen").show();
    $("#gameovercat").show();
  } else {
    setTimeout(checkGameOver, 0);
  }
}

function checkClear() {

}

      // 재시작 버튼 클릭 이벤트 핸들러
$('#gameover_screen input[type="button"]').click(function () {
    $('#gameover_screen').hide(); // 게임 오버 화면 숨김
    gameStart(); // 게임 재시작
  });
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function enemyStart() {
    // 속도 조절
    //적이 오른쪽에서 왼쪽으로 이동
    
    const speed = getRandomNumber(2000, 6000);
    
    enemy.animate({ right: "550px" }, speed, "linear", function () {
      //점수 올리자
      if (isColliding(cat, enemy) && $("#score") > 0) {
        score -= 100;
        updateScore(score);
      } else {
        $("#gameover_screen").show();
        $("#gameovercat").show();
      }
      //적 리셋
      enemy.css("right");
      enemyStart();
      // 재귀함수, 인터벌 등 방법의 여러가지 있음
    }); //맨뒤가 콜백임
  }
  
  function itemStart() {
    // 속도 조절
    const speed = getRandomNumber(2000, 6000);
    // 아이템이 오른쪽에서 왼쪽으로 이동
    item.animate({ right: "550px" }, speed, "linear", function () {
      // 점수 올리기
      if (isColliding(cat, item) && score < 20000) {
        score += 100;
        updateScore(score);
      } else {
        $("#gameclear_screen").show();
        $("#gameclearcat").show();
        // 아이템 리셋
        item.css("right", "-70px");
      }
      // 아이템 재시작
      itemStart();
    });
  }

function updateScore(score) {
  $("#score").text(score);
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
  resetGame();
});

function resetGame() {
  // 캐릭터 초기화
  cat.css("left", "40px");
  cat.css("bottom", "10px");

  // 적 초기화
  const enemy = $("#enemy");
  enemy.css("right", "-70px");

  // 아이템 초기화
  const item = $("#item");
  item.css("right", "-70px");

  // 점수 초기화
  const score = 0;
  updateScore(score);

  // 게임 오버 화면 숨김
  $("#gameover_screen").hide();
  $("#gameovercat").hide();
  // 게임 클리어 화면 숨김
  $("#gameclear_screen").hide();
  $("#gameclearcat").hide();

  // 게임 상태 변수 초기화
  isJumping = false;

}
});
