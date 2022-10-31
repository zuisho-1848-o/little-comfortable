// section
const sections = [...document.querySelectorAll("section")];
const selectFunction = document.getElementById("selectFunction");
const shareLink = document.getElementById("shareLink");
const searchSelecter = document.getElementById("searchSelecter");
const countLetters = document.getElementById("countLetters");


// selectFunction 関連
const funcShareLink = document.getElementById("funcShareLink");
const funcSearchSelecter = document.getElementById("funcsearchSelecter");
const funcCountLetters = document.getElementById("funcCountLetters");


// section 移動
funcShareLink.addEventListener("click", (e) => {
    sections.forEach(elem => elem.style.display = "none");
    shareLink.style.display = "block";
})

funcSearchSelecter.addEventListener("click", (e) => {
    sections.forEach(elem => elem.style.display = "none");
    searchSelecter.style.display = "block";
})

funcCountLetters.addEventListener("click", (e) => {
    sections.forEach(elem => elem.style.display = "none");
    countLetters.style.display = "block";
})

const backToTops = [...document.getElementsByClassName("backToTop")];
backToTops.forEach(btn => {
    btn.addEventListener("click", (e) => {
        sections.forEach(elem => elem.style.display = "none");
        selectFunction.style.display = "block";
    })
});






// countLetters 関連
const countLetterBtn = document.getElementById("countLetterBtn");
const countLetterArea = document.getElementById("countLetterArea");
const countResult = document.getElementById("countResult");

countLetterBtn.addEventListener("click", (e) => {
    const str = countLetterArea.value;
    const strLen = str.length;
    const strEscapeLen = str.replace(/ /g, "").replace(/　/g, "").replace(/\n/g, "").replace(/\t/g, "").replace(/\r/g, "").length
    countResult.innerHTML = `${strLen}文字<br>
改行・スペースなし：${strEscapeLen}文字`;
})