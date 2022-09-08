const selectTag = document.querySelectorAll("select");
const fromTxt = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const TranslateBtn = document.querySelector("#btn");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons");

selectTag.forEach((tag, id) => {
    for(const country in countries){
        let select;
        if(id == 0 && country == "en-GB"){
            select = "selected"; 
        } else if(id == 1 && country == "hi-IN"){
            select = "selected";
        } 
        let option = `<option value="${country}" ${select}>${countries[country]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchange.addEventListener("click", () => {
    [fromTxt.value, toText.value] = [toText.value, fromTxt.value];
    [selectTag[0].value, selectTag[1].value] = [selectTag[1].value, selectTag[0].value];
});


TranslateBtn.addEventListener("click", () => {
    let text = fromTxt.value;
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let api = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}&de=yashnarkhedkar@gmail.com`;
    fetch(api).then(res => res.json()).then(data => {
        console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
    })
});

icons.forEach(icons => {
    icons.addEventListener("click", ({target}) => {
        if(!fromTxt.value || !toText.value) return;
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromTxt.value);
            }
            else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let utterance;
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromTxt.value);
                utterance.lang = selectTag[0].value;
            }
            else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});