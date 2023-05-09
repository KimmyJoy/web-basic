function checkText() {
    let text = document.getElementById("inputText").value;

    if (text.length === 0 || text === "") {
        alert('텍스트 값을 입력해주세요');
    } else {
        let textDisplay = document.getElementById("textDisplay");
        textDisplay.innerHTML = `<h2>${text}</h2>`;
        let colorButtons = document.getElementById("colorButtons");

        let redBtn = document.createElement("button");
        redBtn.innerHTML = "빨강";
        redBtn.onclick = function() {
            alert("빨강으로 텍스트가 변합니다")
            document.getElementById("textDisplay").style.color = "red";
        };
        colorButtons.appendChild(redBtn);

        let blueBtn = document.createElement("button");
        blueBtn.innerHTML = "파랑";
        blueBtn.onclick = function() {
            alert("파랑으로 텍스트가 변합니다")
            document.getElementById("textDisplay").style.color = "blue";
        };
        colorButtons.appendChild(blueBtn);

        let greenBtn = document.createElement("button");
        greenBtn.innerHTML = "초록";
        greenBtn.onclick = function() {
            alert("초록으로 텍스트가 변합니다")
            document.getElementById("textDisplay").style.color = "green";
        };
        colorButtons.appendChild(greenBtn);
        document.getElementById("inputText").parentNode.style.display = "none";
    }
}
    
// function changeColor(color) {
//     let 
    
    
// }