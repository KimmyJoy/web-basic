//return X, parameter X 리턴 및 파라미터가 없음
function hi() {
    // alert("Hi!!!!!!!"); 
        {
        console.log("Hi!!!!!!!!!");//로그 단축키도 있음. 브라우저상 f12 콘솔에 출력됨
    }
}
//로직을 분리하는 방식

function sum(x, y) {//타입이 없으므로 그냥 쓰면 됨 -> 너무 너무 거지같음
    let result = x + y;
    console.log(result);
}

function total(x, y) {
    return x + y;
}

function enterName() { //함수이름은 동사로 하는게 좋다. ctrl+f2로 하면 동일한 이름들 다 바뀐다
    let x = prompt('이름을 입력해주세요');//자바 스크립트는 자바와 비교하면서 배우는게 좋다
    //여기는 이름이 바뀔 일이 없기 때문에 let 아닌 const로 쓰는게 좋다
    while ( x === '' || x=== null){
        alert('입력해주세요');
        enterName();
        // 재귀함수 사용 가능 name은 상수 예약어라 권장하지 않음 메소드 이름 자바처럼 해도 될듯
    if (x !== '' & x !== null) {
        console.log(x);
        alert(x+'님 안녕하세요');
    }
}
}


function name(params) {
    
}

function name(params) {
    
}