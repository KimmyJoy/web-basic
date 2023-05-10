// function changehtmlLine() {
//     let span = document.getElementsByClassName("content");
//     span.style.backgroundColor = '#F9DCC4';
//     span.style.borderColor = '#006D77';
//     span.style.borderStyle = 'dashed';
// }

function changehtmlLine(span) {
  // let span = document.getElementsByClassName("content");
  span.style.backgroundColor = "#F9DCC4";
  span.style.borderColor = "#006D77";
  span.style.borderStyle = "dashed";
}

// function changecssLine() {
//     let span = document.getElementById("textcss");
//     span.style.backgroundColor = '#F9DCC4';
//     span.style.borderColor = '#006D77';
//     span.style.borderStyle = 'dashed';
// }

// function changejavascriptLine() {
//     let span = document.getElementById("textjavascript");
//     span.style.backgroundColor = '#F9DCC4';
//     span.style.borderColor = '#006D77';
//     span.style.borderStyle = 'dashed';
// }

function changebyhtmlLeave(span) {
  span.style.backgroundColor = "#F6BD60";
  span.style.borderStyle = "none";
}

let x = null;
function changebyClick(span) {
  if (x !== null) {
    changebyhtmlLeave(x);
  }
  x = span;
  changehtmlLine(x);
}
