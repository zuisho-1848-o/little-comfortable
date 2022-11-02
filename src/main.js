// popup だと少し挙動が異なる
// const  getCurrentTab = async () => {
//     let queryOptions = {
//         active: true,
//         lastFocusedWindow: true
//     };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
// }


// section
const sections = [...document.querySelectorAll("section")];
const selectFunction = document.getElementById("selectFunction");
const shareLink = document.getElementById("shareLink");
const searchSelecter = document.getElementById("searchSelecter");
const countLetters = document.getElementById("countLetters");


// selectFunction 関連
const funcCountLetters = document.getElementById("funcCountLetters");
const funcSearchSelecter = document.getElementById("funcsearchSelecter");
const funcShareLink = document.getElementById("funcShareLink");




// section 移動
funcCountLetters.addEventListener("click", (e) => {
    sections.forEach(elem => elem.style.display = "none");
    countLetters.style.display = "block";
})

funcSearchSelecter.addEventListener("click", (e) => {
    sections.forEach(elem => elem.style.display = "none");
    searchSelecter.style.display = "block";
})


funcShareLink.addEventListener("click", (e) => {
    sections.forEach(elem => elem.style.display = "none");
    shareLink.style.display = "block";
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




// searchSelecter 関連
const selecterText = document.getElementById("selecterText");
const countSelecterBtn = document.getElementById("countSelecterBtn");
const selecterCountResult = document.getElementById("selecterCountResult");

const countCSSSeletcerAll = (query) => {
    return document.querySelectorAll(query).length;
}

const openNewTab = (url) => {
    chrome.tabs.create({url});
}

document.addEventListener("click", (e) => {
    // alert(e.target.id);
    if(e.target.id == "goToNewTab") {
        openNewTab(e.target.innerText);
    }
})

countSelecterBtn.addEventListener("click", async (e) => {
    const currentTabs = await chrome.tabs.query({active: true});
    const currentTab = currentTabs[0];

    const query = selecterText.value || "";

    chrome.scripting.executeScript(
        {
            target: {tabId: currentTab.id},
            func: countCSSSeletcerAll,
            args: [query]
        },
        (injectionResults) => { selecterCountResult.innerHTML = `${query} の要素は ${injectionResults?.[0]?.result || 0} 件あります。<br>pageのソースは<br> <a href="#" id="goToNewTab">view-source:${currentTab.url}</a>` }
    );
})



// shareLink 関連
const onlyLink = document.getElementById("onlyLink");
const markdown = document.getElementById("markdown");
const japaneseStyle = document.getElementById("japaneseStyle");
const twoLine = document.getElementById("twoLine");
const copyLinkResult = document.getElementById("copyLinkResult");
const toBeSharedLink = document.getElementById("toBeSharedLink");

const getURLAndTitle = () => {
    return [document.URL, document.title];
}

const copyToClipBoard = async (type) => {
    let text = "";
    const currentTabs = await chrome.tabs.query({active: true});
    const currentTab = currentTabs[0];
    const [url, title] = (await chrome.scripting.executeScript(
        {
            target: {tabId: currentTab.id},
            func: getURLAndTitle,
        }
    ))[0].result;

    // alert(url);
    // alert(title);

    switch(type) {
        case "onlyLink":
            text = url;
            break
        case "markdown":
            text = `[${title}](${url})`;
            break
        case "japaneseStyle":
            text = `「${title}」（${url}）`;
            break
        case "twoLine":
            text = `${title}\n${url}`;
            break
    }

    toBeSharedLink.innerText = text;
    const range = document.createRange();
    range.selectNodeContents(toBeSharedLink);
    window.getSelection().addRange(range);

    navigator.clipboard.write(text).then(
        () => copyLinkResult.innerHTML = `をクリップボードにコピーしました。`,
        (err) => {
            // alert(err);
            copyLinkResult.innerHTML = `をクリップボードにコピーできませんでした。<br>ショートカットでコピーしてお使いください。`
        }
    )
}

onlyLink.addEventListener("click", (e) => {
    copyToClipBoard("onlyLink");
})
markdown.addEventListener("click", (e) => {
    copyToClipBoard("markdown");
})
japaneseStyle.addEventListener("click", (e) => {
    copyToClipBoard("japaneseStyle");
})
twoLine.addEventListener("click", (e) => {
    copyToClipBoard("twoLine");
})




