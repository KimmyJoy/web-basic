//난이도 조절을 위한 상수 선언
const ENEMY_SPEED_MIN_EASY = 3000;
const ENEMY_SPEED_MAX_EASY = 6000;
const ENEMY_SPEED_MIN_HARD = 2000;
const ENEMY_SPEED_MAX_HARD = 4000;
//바닥과 겹치는 부분이 있는지는 계속 체크를 해야함

//반복에는 for문을 쓰면 안됨
$(function () {
  const cat = $("#cat");
  const enemy = $("#enemy");
//   let isJumping = false; //점프 중인지 저장하는 변수
    let isJumping = false;
  let score = 0;
  gameStart();

  function gameStart() {
    // $('#gameover_screen').hide();
    setKeyboardEvent();
    enemyStart(); //난이도 조절을 위해서는 random함수를 써야함
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
        right: object1.getBoundingClientRect().right - 20, // 다리와 발 부분만 선택
        left: object1.getBoundingClientRect().left + 10 // 다리와 발 부분만 선택
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
      const catLeft = Number(cat.css("left").replace("px", ""));
      const catRight = catLeft + 50;
      const catBottom = Number(cat.css("bottom").replace("px", ""));
      //괄호 단축키: 텍스트 더블클릭한 상태로 괄호하면 됨...자동으로 닫힘
      const enemyLeft = Number(enemy.css("left").replace("px", "")); //게임수학의 기초...
      const enemyRight = enemyLeft + 20;
      const enemyTop = 20;

      const isGameOver =
             catRight > enemyLeft &&
             catBottom < enemyTop &&
             catLeft < enemyRight;

      // console.log(`catRight: ${catRight}
      // ,catBottom: ${catBottom}
      // , enemyRight: ${enemyRight}
      // , enemyBottom: ${enemyBottom}
      // , isGameOver: ${isGameOver}`);

      // if (isGameOver) {
      // cat.stop();
      // enemy.stop();
      if (isColliding(cat[0], enemy[0])) {
        cat.stop();
        enemy.stop();
      }
    }, 1000 / 60);
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
    const speed = getRandomNumber(2000, 6000);
    //적이 오른쪽에서 왼쪽으로 이동
    enemy.animate({ right: "550px" }, 1500, "linear", function () {
      //점수 올리자
      score += 100;
      updateScore(score);

      //적 리셋
      enemy.css("right", "-70px");
      enemyStart();
      // 재귀함수, 인터벌 등 방법의 여러가지 있음
    }); //맨뒤가 콜백임
  }

  function updateScore(score) {
    $("#score").text(score);
  }


  let gameover = false;

  function jumP() {
    isJumping = true;
    cat
      .animate({ bottom: "+=100px" })
      .animate({ bottom: "-=100px" }, function () {
        isJumping = false;
      });
  }

  // 키보드 이벤트 정의
  function setKeyboardEvent() {
    $("html").keydown(function (e) {
        switch (e.key) {
            case " ":
              if (!isJumping) {
                jumP();
              }
              break;
    //     isJumping = true;
    //       cat.animate({ bottom: "+=80px" }, 500, function () {
    //         cat.animate({ bottom: '-=100px' }, 500, function() {
    //       isJumping = false;
    //     //     case "ArrowRight":
    //     //   moveRight();
    //     //   break;
    //     //   case "ArrowLeft":
    //     //       moveLeft();
    //     //       break;
    //         });
    // });
};
      // console.log(e.key);
    });
    // let game = setInterval(function() {
    //     let characterTop = parseInt($("#cat").css("top"));
    //     let hitboxTop = parseInt($("#hitbox, #hitbox2").css("top"));
    //     let enemyLeft = parseInt($("#enemy").css("left"));
    
    //     if (enemyLeft < 100 && enemyLeft > 0 && characterTop >= 150 && hitboxTop <= 150) {
    //       gameover = true;
    //       alert("Game Over!");
    //       clearInterval(game);
    //     }
    //   }, 10);
    };
});

// function catJump() {
//   // 캐릭터가 점프 중인 상태로 변경
//   const height = cat.height();
//   const bottom = parseInt(cat.css("bottom").replace("px", ""));
//   const jumpHeight = 80; // 점프 높이
//   const jumpDuration = 500; // 점프 시간
//   const jumpFrames = 50; // 점프 애니메이션 프레임 수

//   // 위로 점프
//   cat.animate(
//     {
//       bottom: `${bottom + jumpHeight}px`,
//     },
//     {
//       duration: jumpDuration / 2,
//       easing: "linear",
//       complete: function () {
//         // 아래로 떨어짐
//         cat.animate(
//           {
//             bottom: `${bottom}px`,
//           },
//           {
//             duration: jumpDuration / 2,
//             easing: "linear",
//             complete: function () {
//               // 점프 종료
//               isJumping = false;
//             },
//           }
//         );
//       },
//     }
//   );
// }
$('#restart').click(function() {

    gameLoop();
    });