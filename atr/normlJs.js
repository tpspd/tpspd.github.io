let hidDiv, inp = gebi("inpWrd"), enter = "idStart", strt = 1, nmGm = localStorage.nmGmr, arWrd, enWrd, frWrd, nmbr = 0, nbWrd = 0, lftTm, fxCngr, cngrt = "", tmLft, wrdEdt = !1, lngTm, afPl = !1, inpAdd = document.querySelectorAll(".inpAdd"), ds = { ar: "", en: "", fr: "" }, upbt = "nwFr", dwbt = "nwAr", nmCh = 3, kyBt = "ent"; 

function mdf(n) { if (afPl) return afPl = !1, 0; 
    function e(n, e) { gebi("nw" + n).innerText = e, e && (gebi("nw" + n).nextElementSibling.style.display = "none") } opnDiv("addWrd", "nwEn", "nwAr"), gebi("pAdd").innerText = "edit words", gebi("okAdd").innerText = "edit", gebi("nmW").innerText = n, e("En", enWrd[n]), e("Fr", frWrd[n]), e("Ar", arWrd[n]), wrdEdt = !0 } 
function opnDiv(n, e, r = "tpScrl") { dsply("cntnr", "block"), dsply(n, "block"), enter = e, gebi("divplac").className += " opPlc", setTimeout(() => { gebi("divplac").className = "dvPlc", fxClk(r) }, 10) } 
function hiding() { valScnd(localStorage.lvlTim), inp.value = "", setTimeout(() => { gebi("divplac").className += " hidplac" }, 20), hidDiv = setTimeout(() => { gebi("idStart").focus(), gebi("divplac").className = "dvPlc", document.querySelectorAll(".hidjs").forEach(n => { dsply(n.id, "none") }), wrdEdt && fedt() }, 320), "" != cngrt && (clearInterval(fxCngr), cngrt = "") } 
function nmGmr() { let n = gebi("nmGm").innerText; gebi("spNmGm").innerText = n, hiding(), localStorage.nmGmr = n } 
function topScrl(n) {
    if ("∞" == n) return gebi("tpScrl").innerText = "", !1; localStorage["top" + n] ? gebi("tpScrl").innerHTML = `Top Score : <span >${localStorage["topGmr" + n]} ,
        ${localStorage["top" + n]}</span> words in <span>${clTm(n, 1)}</span>` : gebi("tpScrl").innerText = "Top Score : no One"
} 
function valScnd(n) { topScrl(n), gebi("tmLft").innerText = clTm(n), enter = "idStart", gebi("mbrWrd").innerText = 0, localStorage.lvlTim = n, gebi("timeLvl").value = n, 0 == strt && (clrngTm(), inp.value = "", dsply("wrdDsply", "none"), dsply("idStart", "block"), strt = 1) } function clTm(n, e = 0) { if ("∞" == n) return "∞"; let r = 0, t, i, d = ""; return (n > 59 ? (r = Math.floor(n / 60), t = n % 60) : t = n, 1 == e) ? r > 0 ? (r > 1 && (d = "s"), r + " minute" + d) : t + " seconds" : (t < 10 && (t = "0" + t), i = " " + (r = "0" + r) + ":" + t) }
 
function gogame() { if (chTyp(inp), 0 == enWrd.length || 0 == strt || (dsply("idStart", "none"), dsply("wrdDsply", "flex"), gebi("inpWrd").focus(), enter = "tpScrl", strt = 0, gebi("mbrWrd").innerText = 0, nbWrd = 0, "∞" == (lftTm = localStorage.lvlTim))) return !1; let n, e = 25 * lftTm, r = e, t; tmLft = setInterval(() => { n = clTm(--lftTm), gebi("tmLft").innerText = n, 0 == lftTm && (clrngTm(), resulte()) }, 1e3), lngTm = setInterval(() => { t = (100 * --r / e).toFixed(1) + "%", gebi("lngTm").style.width = t }, 40) } 
 function clrngTm() { clearInterval(tmLft), clearInterval(lngTm), gebi("lngTm").style.width = "100%" } 

 function resulte() {
    if ("block" == gebi("cntnr").style.display) return hiding(), setTimeout(() => { resulte() }, 500), !1; lftTm = localStorage.lvlTim, dsply("wrdDsply", "none"), dsply("idStart", "block"), strt = 1, inp.value = ""; let n = localStorage["top" + lftTm], e = gebi("spNmGm").innerText; gebi("tmLft").innerText = clTm(lftTm), dsply("cntnr", "block"), nbWrd > 0 && void 0 == n || nbWrd > n ? (cngrt = `<div>congratulations <span> ${e}</span></div><div>You wrote <span> ${nbWrd}</span> words in <span> ${clTm(lftTm, 1)}</span>
        <div id="okcng" onclick="hiding()" class="okbtn okCng nofcs">Ok thanks</div></div>`, gebi("cngrtl").innerHTML = cngrt, opnDiv("cngrtl", "okcng"), gebi("okcng").focus(), fxCngr = setInterval(() => { gebi("cngrtl").innerHTML != cngrt && (gebi("cngrtl").innerHTML = cngrt) }, 500), localStorage["top" + lftTm] = nbWrd, localStorage["topGmr" + lftTm] = e, topScrl(lftTm)) : opnDiv("gmOvr", "okgmOvr"), gebi("btnLng").focus()
} 
function hidWrd(n) { if (afPl = !0, 1 == enWrd.length) return dltall(), !1; let e = enWrd.length - 1, r = gebi("wrdDiv" + e), t = gebi("wrdDiv" + n); 
function i(r, t) { [r[n], r[e]] = [r[e], r[n]], r.splice(e, 1), wToSt(t, r) } t.className = "hdDv", i(arWrd, "Ar"), i(enWrd, "En"), i(frWrd, "Fr"), setTimeout(() => { r.innerHTML = inDv(n), t.remove(), r.id = "wrdDiv" + n }, 300), gebi("nmbWrd").innerText = e, stWrd() } 
function chInp(n, e, r, t = e) { if (enter = e, upbt = r, dwbt = t, "none" == n.style.display) { let i = { up: upbt, dw: dwbt, ent: enter }; fxClk(i[kyBt]) } } 
function chTyp(n) { n.type = "search" } 
function edt() { let n = alvlin(); if (!(n = rep(n, " ", ""))) return !1; let e = 1 * gebi("nmW").innerText; 
function r(n, r) { let t = gebi("nw" + r).innerText; ind(t = t.trim(), "@#") > -1 && (t = rep(t, "@#", "/@/#/")), n[e] = t, wToSt(r, n) } arWrd[e] = gebi("nwAr").innerText, r(arWrd, "Ar"), r(frWrd, "Fr"), r(enWrd, "En"), gebi("wrdDiv" + e).innerHTML = inDv(e), hiding() } 
function fedt() { gebi("pAdd").innerText = "add New words", gebi("okAdd").innerText = "add", vidInp(), wrdEdt = !1 } 
function addWrds() { 
    if ("add New words" != rinTxt("pAdd")){ return false}
    let n = gebi("nwEn"), e = gebi("nwAr"), r = gebi("nwFr"), t = alvlin(), i = enWrd.length;
     if (enter = "nwEn", t = rep(t, " ", "")) { dsply("notAdd", "none"), dsply("isAdd", "block"), setTimeout(() => { dsply("isAdd", "none") }, 1e3), isAddWrd(n, enWrd, "En"), isAddWrd(e, arWrd, "Ar"), isAddWrd(r, frWrd, "Fr");
      let d = document.createElement("div"); d.id = "wrdDiv" + i, d.className = "hdDv", d.innerHTML = inDv(i), gebi("cntWrds").prepend(d), vidInp(), setTimeout(() => { d.className = "adDv" }, 0) } else dsply("notAdd", "block"), dsply("isAdd", "none"), setTimeout(() => { dsply("notAdd", "none") }, 1e3); fxClk("nwAr"), gebi("nmbWrd").innerText = enWrd.length } 
function isAddWrd(n, e, r) { let t = n.innerText; ind(t = t.trim(), "@#") > -1 && (t = rep(t, "@#", "/@/#/")), e.push(t), wToSt(r, e) } 
function inDv(n) {
    return `<p onclick="mdf(${n})"><span class="hidWrd"
  onclick="hidWrd(${n})">\xd7</span><span ${ds.ar}>${arWrd[n]}</span><span ${ds.en}>${enWrd[n]}</span><span ${ds.fr}>${frWrd[n]}</span></p>`
} 
function vidInp() { inpAdd.forEach(n => { n.innerText = "", "none" != n.style.display && (n.nextElementSibling.style.display = "inline-block") }) } 
function dltall() { cntWrd = gebi("cntWrds").innerHTML = "", enWrd = [], arWrd = [], frWrd = [], nmbr = 0, localStorage.removeItem("stWrdEn"), localStorage.removeItem("stWrdAr"), localStorage.removeItem("stWrdFr"), gebi("nmbWrd").innerText = 0, hiding() } 
function opnSite() {
     let n, e;
     
      document.addEventListener("keydown", ky=>{  
        if (ky.key  == 'Enter') {
            ky.preventDefault();
             if(enter==('okAdd'|'nwFr'|'nwAr'|'nwEn'|'nmbtn')) {fxClk(enter);}
        }
      }) 

     document.addEventListener("keyup", r => { 
        let t = r.key;
         if (enter==('nwEn'|'nwFr'|'nwAr'|'okAdd'|'nmbtn') && e.indexOf("\n", 0) > -1  ) return kyBt = "ent", e = e.replaceAll("\n", ""), n.innerText = e, fxClk(enter), !1;("Enter" == t || "ArrowDown" == t || "ArrowUp" == t) && (r.preventDefault(), "Enter" == t && (fxClk(enter), kyBt = "ent"), "ArrowUp" == t && (fxClk(upbt), kyBt = "up"), "ArrowDown" == t && (fxClk(dwbt), kyBt = "dw")) });
    
    document.querySelectorAll(".inpAdd").forEach((r) => { 
    ["input", "focus"].forEach(t => { 
        r.addEventListener(t, () => { n = r, (e = r.innerText) ? gebi("okAdd").style.backgroundColor = "var(--mnCl)" : alvlin() ? gebi("okAdd").style.backgroundColor = "var(--mnCl)" : gebi("okAdd").style.backgroundColor = "#2196f396", setTimeout(() => { "" != r.innerText || "none" == r.style.display ? r.nextElementSibling.style.display = "none" : r.nextElementSibling.style.display = "inline-block" }, 0) }) }) });
        inp.oninput = () => { let n = inp.value.toLocaleLowerCase(), e = enWrd[nmbr].toLocaleLowerCase(), r = frWrd[nmbr].toLocaleLowerCase(); ind([arWrd[nmbr], e, r], n) > -1 && n && 0 == strt && (nmbr++, stWrd(), inp.value = "", nbWrd++, gebi("mbrWrd").innerText = nbWrd) }, gebi("divplac").addEventListener("click", n => { n.stopPropagation() }), nmGm ? (gebi("spNmGm").innerText = nmGm, gebi("nmGm").innerText = nmGm) : gebi("spNmGm").innerText = "Unknown", localStorage.lvlTim ? valScnd(localStorage.lvlTim) : valScnd(30), allWrd()
} 
function cntn() {
    let n, e = 0, r = [], t = [], i = [], d = []; for (; e < enWrd.length;)-1 == ind(d, n = Math.floor(Math.random() * enWrd.length)) && (d.push(n), e++, r.push(enWrd[n]), t.push(arWrd[n]), i.push(frWrd[n])); enWrd = r, arWrd = t, frWrd = i, gebi("nmbWrd").innerText = enWrd.length, document.querySelectorAll(".ch input").forEach(n => { let e = n.value; 
        function r(r, t, i) { ds[e] = t, nmCh += i, document.querySelectorAll("." + e).forEach(n => { n.style.display = r }), localStorage["ch" + n.id] = r } n.addEventListener("change", () => { if (n.checked) r("inline-block", "", 1); else { if (nmCh < 2) return n.checked = !0, !1; r("none", 'class="n"', -1) } gebi("plWt").className = "wt", n.disabled = !0, setTimeout(() => { lstWrd(), stWrd(), gebi("plWt").className = "n", n.disabled = !1 }, 100) }), "none" == localStorage["ch" + n.id] && (r("none", 'class="n"', -1), n.checked = !1) }), lstWrd(), stWrd();
        setTimeout(() => { gebi("clVu").innerHTML += `<iframe src="https://maktaeliliktroniya.blogspot.com/2022/08/typing-speed.html" frameborder="0"></iframe>`, dsply("clVu", "none"),1000})
} 
function lstWrd() { let n = gebi("cntWrds"), e = "", r = 0; !
function n(t) { for (; r < t; r++)e += `<div id="wrdDiv${r}">${inDv(r)}</div>` }(enWrd.length), e += '<div id="spdlt" class="add aldlt"onclick="opnDiv(\'dltAll\',\'yesbtn\')" >delete all</div>', n.innerHTML = "", n.innerHTML = e, gebi("nmbWrd").innerText = enWrd.length } 
function stWrd() { nmbr == enWrd.length && (nmbr = 0), inTxt("lng0", arWrd[nmbr]), inTxt("lng1", enWrd[nmbr]), inTxt("lng2", frWrd[nmbr]) } 
function ind(n, e, r = 0) { return n = n.indexOf(e,r) } 
function gebi(n) { return document.getElementById(n) } 
function dsply(n, e) { gebi(n).style.display = e } 
function stToDiv(n) { let e = localStorage["stWrd" + n]; return e.split("@#") } 
function wToSt(n, e) { localStorage["stWrd" + n] = e.join("@#") } 
function rep(n, e, r) { return n.replaceAll(e, r) } 
function fxClk(n) { gebi(n).focus(), gebi(n).click() } 
function rinTxt(n) { return gebi(n).innerText } 
function inTxt(n, e) { gebi(n).innerText = e } 
function alvlin() { return rinTxt("nwAr") + rinTxt("nwEn") + rinTxt("nwFr") }
 async function allWrd() { 
    function n(n) { return localStorage.getItem(n) } n("stWrdAr") || n("stWrdEn") || n("stWrdFr") ? (enWrd = stToDiv("En"), arWrd = stToDiv("Ar"), frWrd = stToDiv("Fr")) : await fetch("https://raw.githubusercontent.com/tpspd/tpspd.github.io/main/atr/wrds.json").then(n => n.json()).then(n => { enWrd = n.enWrd, arWrd = n.arWrd, frWrd = n.frWrd, wToSt("En", enWrd), wToSt("Ar", arWrd), wToSt("Fr", frWrd) }), cntn() } opnSite();



    