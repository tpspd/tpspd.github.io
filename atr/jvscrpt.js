let hidDiv,inp=gebi("inpWrd"),enter="idStart",strt=1,nmGm=localStorage.nmGmr,arWrd,enWrd,frWrd,nmbr=0,nbWrd=0,lftTm,fxCngr,cngrt="",tmLft,wrdEdt=!1,lngTm,afPl=!1,inpAdd=slctAll(".inpAdd"),upbt="nwFr",dwbt="nwAr",nmCh=3,kyBt="ent",ds={ar:"",en:"",fr:""};function mdf(n){if(afPl)return afPl=!1,0;function e(n,e){gebi("nw"+n).innerText=e}opnDiv("addWrd","nwEn","nwAr"),gebi("pAdd").innerText="edit phrases",gebi("okAdd").innerText="edit",gebi("nmW").innerText=n,e("En",enWrd[n]),e("Fr",frWrd[n]),e("Ar",arWrd[n]),wrdEdt=!0,chcInp()}function opnDiv(n,e,t="tpScrl"){dsply("cntnr","block"),dsply(n,"block"),enter=e,gebi("divplac").className+=" opPlc",setTimeout(()=>{gebi("divplac").className="dvPlc",fxClk(t)},10)}function hiding(){valScnd(localStorage.lvlTim),inp.value="",setTimeout(()=>{gebi("divplac").className+=" hidplac"},200),hidDiv=setTimeout(()=>{gebi("idStart").focus(),gebi("divplac").className="dvPlc",slctAll(".hidjs").forEach(n=>{dsply(n.id,"none")}),wrdEdt&&fedt()},320),""!=cngrt&&(clearInterval(fxCngr),cngrt="")}function nmGmr(){let n=gebi("nmGm").innerText;gebi("spNmGm").innerText=n,hiding(),localStorage.nmGmr=n}function topScrl(n){if("∞"==n)return gebi("tpScrl").innerText="",!1;localStorage["top"+n]?gebi("tpScrl").innerHTML=`Top Score : <span >${localStorage["topGmr"+n]}
        ${localStorage["top"+n]}</span> phrases in <span>${clTm(n,1)}</span>`:gebi("tpScrl").innerText="Top Score : no One"}function valScnd(n){topScrl(n),gebi("tmLft").innerText=clTm(n),enter="idStart",gebi("mbrWrd").innerText=0,localStorage.lvlTim=n,gebi("timeLvl").value=n,0==strt&&(clrngTm(),inp.value="",dsply("wrdDsply","none"),dsply("idStart","block"),strt=1)}function clTm(n,e=0){if("∞"==n)return"∞";let t=0,r,i,l="";return(n>59?(t=Math.floor(n/60),r=n%60):r=n,1==e)?t>0?(t>1&&(l="s"),t+" minute"+l):r+" seconds":(r<10&&(r="0"+r),i=" "+(t="0"+t)+":"+r)}function gogame(){if(chTyp(inp),0==enWrd.length||0==strt||(dsply("idStart","none"),dsply("wrdDsply","flex"),gebi("inpWrd").focus(),enter="tpScrl",strt=0,gebi("mbrWrd").innerText=0,nbWrd=0,"∞"==(lftTm=localStorage.lvlTim)))return!1;let n,e=25*lftTm,t=e,r;tmLft=setInterval(()=>{n=clTm(--lftTm),gebi("tmLft").innerText=n,0==lftTm&&(clrngTm(),resulte())},1e3),lngTm=setInterval(()=>{r=(100*--t/e).toFixed(1)+"%",gebi("lngTm").style.width=r},40)}function clrngTm(){clearInterval(tmLft),clearInterval(lngTm),gebi("lngTm").style.width="100%"}function resulte(){if("block"==gebi("cntnr").style.display)return hiding(),setTimeout(()=>{resulte()},500),!1;lftTm=localStorage.lvlTim,dsply("wrdDsply","none"),dsply("idStart","block"),strt=1,inp.value="";let n=localStorage["top"+lftTm],e=gebi("spNmGm").innerText;gebi("tmLft").innerText=clTm(lftTm),dsply("cntnr","block"),nbWrd>0&&void 0==n||nbWrd>n?(cngrt=`<div>congratulations <span> ${e}</span></div><div>You wrote <span> ${nbWrd}</span> phrases in <span> ${clTm(lftTm,1)}</span>
        <div id="okcng" onclick="hiding()" class="okbtn okCng nofcs">Ok thanks</div></div>`,gebi("cngrtl").innerHTML=cngrt,opnDiv("cngrtl","okcng"),gebi("okcng").focus(),fxCngr=setInterval(()=>{gebi("cngrtl").innerHTML!=cngrt&&(gebi("cngrtl").innerHTML=cngrt)},500),localStorage["top"+lftTm]=nbWrd,localStorage["topGmr"+lftTm]=e,topScrl(lftTm)):opnDiv("gmOvr","okgmOvr"),gebi("btnLng").focus()}function hidWrd(n){if(afPl=!0,1==enWrd.length)return dltall(),!1;let e=enWrd.length-1,t=gebi("wrdDiv"+e),r=gebi("wrdDiv"+n);function i(t,r){[t[n],t[e]]=[t[e],t[n]],t.splice(e,1),wToSt(r,t)}r.className="hdDv",i(arWrd,"Ar"),i(enWrd,"En"),i(frWrd,"Fr"),setTimeout(()=>{t.innerHTML=inDv(n),r.remove(),t.id="wrdDiv"+n},300),gebi("nmbWrd").innerText=e,stWrd()}function chInp(n,e,t,r=e){enter=e,upbt=t,dwbt=r,"none"==n.style.display&&fxClk({up:upbt,dw:dwbt,ent:enter}[kyBt])}function chTyp(n){n.type="search"}function trnslt(){let n=gebi("nwAr").innerText,e=gebi("nwEn").innerText,t=gebi("nwFr").innerText;if(document.querySelector(":root"),!alvlin())return!1;function r(n,e,t,r){if("none"==r.parentElement.style.display)return!1;fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl="+e+"&tl="+t+"&dt=t&q="+encodeURI(n)).then(n=>n.json()).then(n=>{r.innerText=n[0][0][0],r&&(r.previousElementSibling.style.display="inline-block",r.nextElementSibling.style.display="none")})}n.length?(r(n,"Ar","En",gebi("nwEn")),r(n,"Ar","Fr",gebi("nwFr"))):e.length?(r(e,"En","Ar",gebi("nwAr")),r(e,"En","Fr",gebi("nwFr"))):(r(t,"Fr","Ar",gebi("nwAr")),r(t,"Fr","En",gebi("nwEn")))}function edt(){let n=alvlin();if(!(n=rep(n," ","")))return!1;let e=1*gebi("nmW").innerText;function t(n,t){let r=gebi("nw"+t).innerText;ind(r=r.trim(),"@#")>-1&&(r=rep(r,"@#","/@/#/")),n[e]=r,wToSt(t,n)}arWrd[e]=gebi("nwAr").innerText,t(arWrd,"Ar"),t(frWrd,"Fr"),t(enWrd,"En"),gebi("wrdDiv"+e).innerHTML=inDv(e),hiding(),stWrd()}function fedt(){gebi("pAdd").innerText="add New phrases",gebi("okAdd").innerText="add",vidInp(),wrdEdt=!1}function addWrds(){if("add New phrases"!=rInrTxt("pAdd"))return edt(),!1;let n=gebi("nwEn"),e=gebi("nwAr"),t=gebi("nwFr"),r=alvlin(),i=enWrd.length;if(enter="nwEn",r=rep(r," ","")){dsply("notAdd","none"),dsply("isAdd","block"),setTimeout(()=>{dsply("isAdd","none")},1e3),isAddWrd(n,enWrd,"En"),isAddWrd(e,arWrd,"Ar"),isAddWrd(t,frWrd,"Fr");let l=document.createElement("div");l.id="wrdDiv"+i,l.className="hdDv",l.innerHTML=inDv(i),gebi("cntWrds").prepend(l),vidInp(),setTimeout(()=>{l.className="adDv"},0)}else dsply("notAdd","block"),dsply("isAdd","none"),setTimeout(()=>{dsply("notAdd","none")},1e3);if(fxClk("nwAr"),gebi("nmbWrd").innerText=enWrd.length,!gebi("spdlt")){let d=document.createElement("div");d.id="spdlt",d.classList="add aldlt",d.addEventListener("click",()=>{opnDiv("dltAll","yesbtn")}),d.innerHTML="delete all",gebi("cntWrds").append(d)}}function isAddWrd(n,e,t){let r=n.innerText;ind(r=r.trim(),"@#")>-1&&(r=rep(r,"@#","/@/#/")),e.push(r),wToSt(t,e)}function inDv(n){return`<p onclick="mdf(${n})"><span class="hidWrd"
  onclick="hidWrd(${n})">\xd7</span><span ${ds.ar}>${arWrd[n]}</span><span ${ds.en}>${enWrd[n]}</span><span ${ds.fr}>${frWrd[n]}</span></p>`}function chcInp(){inpAdd.forEach(n=>{n.innerText?(n.previousElementSibling.style.display="inline-block",n.nextElementSibling.style.display="none"):(n.previousElementSibling.style.display="none",n.nextElementSibling.style.display="inline-block")})}function vidInp(){inpAdd.forEach(n=>{n.innerText="",n.previousElementSibling.style.display="none",n.nextElementSibling.style.display="inline-block"}),chcInp()}function dltall(){cntWrd=gebi("cntWrds").innerHTML="",enWrd=[],arWrd=[],frWrd=[],nmbr=0,localStorage.removeItem("stWrdEn"),localStorage.removeItem("stWrdAr"),localStorage.removeItem("stWrdFr"),gebi("nmbWrd").innerText=0,hiding()}function opnSite(){let n,e;document.addEventListener("keydown",n=>{"Enter"==n.key&&(n.preventDefault(),enter==("okAdd"|"nwFr"|"nwAr"|"nwEn"|"nmbtn")&&fxClk(enter))}),document.addEventListener("keyup",t=>{let r=t.key;if(enter==("nwEn"|"nwFr"|"nwAr"|"okAdd"|"nmbtn")&&e.indexOf("\n",0)>-1)return kyBt="ent",e=e.replaceAll("\n",""),n.innerText=e,fxClk(enter),!1;("Enter"==r||"ArrowDown"==r||"ArrowUp"==r)&&(t.preventDefault(),"Enter"==r&&(fxClk(enter),kyBt="ent"),"ArrowUp"==r&&(fxClk(upbt),kyBt="up"),"ArrowDown"==r&&(fxClk(dwbt),kyBt="dw"))}),inpAdd.forEach(t=>{["input","focus"].forEach(r=>{n=t,e=t.innerText,t.addEventListener(r,()=>{alvlin()?(gebi("okAdd").style.backgroundColor="var(--mnCl)",gebi("trnslat").style.display="block"):(gebi("okAdd").style.backgroundColor="var(--mnClOp)",gebi("trnslat").style.display="none"),setTimeout(()=>{t.innerText?(t.previousElementSibling.style.display="inline-block",t.nextElementSibling.style.display="none"):(t.previousElementSibling.style.display="none",t.nextElementSibling.style.display="inline-block")},0)})})}),slctAll(".sound").forEach(n=>{n.innerHTML=`<svg  class="active" viewBox="0 0 24 24" focusable="false" >
        <path
            d="M3,9v6h4l5,5V4L7,9H3z M16.5,12c0-1.77-1.02-3.29-2.5-4.03v8.05C15.48,15.29,16.5,13.77,16.5,12z M14,3.23v2.06 c2.89,0.86,5,3.54,5,6.71s-2.11,5.85-5,6.71v2.06c4.01-0.91,7-4.49,7-8.77S18.01,4.14,14,3.23z">
             </path>
        </svg>
        <svg class="pose" viewBox="0 0 24 24" focusable="false"> <path d="M6,6h12v12H6V6z"></path></svg>`}),slctAll(".sound").forEach(n=>{n.onclick=e=>{e.preventDefault();let t=gebi(n.dataset.lng).innerText;t&&responsiveVoice.speak(t,n.dataset.voi)}}),slctAll(".nwWord .clrear").forEach(n=>{n.onclick=()=>{gebi(n.dataset.lng).innerText="",gebi(n.dataset.lng).focus()}}),setTimeout(()=>{gebi("clVu").innerHTML='<iframe src="https://maktaeliliktroniya.blogspot.com/2022/08/typing-speed.html" frameborder="0" style="display:none"></iframe>'},900),inp.oninput=()=>{let n=inp.value.toLocaleLowerCase(),e=enWrd[nmbr].toLocaleLowerCase(),t=frWrd[nmbr].toLocaleLowerCase();ind([arWrd[nmbr],e,t],n)>-1&&n&&0==strt&&(nmbr++,stWrd(),inp.value="",nbWrd++,gebi("mbrWrd").innerText=nbWrd)},gebi("divplac").addEventListener("click",n=>{n.stopPropagation()}),nmGm?(gebi("spNmGm").innerText=nmGm,gebi("nmGm").innerText=nmGm):gebi("spNmGm").innerText="Unknown",localStorage.lvlTim?valScnd(localStorage.lvlTim):valScnd(30),allWrd()}function cntn(){let n,e=0,t=[],r=[],i=[],l=[];for(;e<enWrd.length;)-1==ind(l,n=Math.floor(Math.random()*enWrd.length))&&(l.push(n),e++,t.push(enWrd[n]),r.push(arWrd[n]),i.push(frWrd[n]));enWrd=t,arWrd=r,frWrd=i,gebi("nmbWrd").innerText=enWrd.length,slctAll(".ch input").forEach(n=>{let e=n.value;function t(t,r,i){ds[e]=r,nmCh+=i,slctAll("."+e).forEach(n=>{n.style.display=t}),localStorage["ch"+n.id]=t}n.addEventListener("change",()=>{if(n.checked)t("block","",1);else{if(nmCh<2)return n.checked=!0,!1;t("none",'class="n"',-1)}gebi("plWt").className="wt",n.disabled=!0,setTimeout(()=>{lstWrd(),stWrd(),gebi("plWt").className="n",n.disabled=!1},100)}),"none"==localStorage["ch"+n.id]&&(t("none",'class="n"',-1),n.checked=!1)}),lstWrd(),stWrd()}function lstWrd(){let n=gebi("cntWrds"),e="",t=0;!function n(r){for(;t<r;t++)e+=`<div id="wrdDiv${t}">${inDv(t)}</div>`}(enWrd.length),e+='<div id="spdlt" class="add aldlt"onclick="opnDiv(\'dltAll\',\'yesbtn\')" >delete all</div>',n.innerHTML="",n.innerHTML=e,gebi("nmbWrd").innerText=enWrd.length}function stWrd(){nmbr==enWrd.length&&(nmbr=0),inTxt("lng0",arWrd[nmbr]),inTxt("lng1",enWrd[nmbr]),inTxt("lng2",frWrd[nmbr])}function ind(n,e,t=0){return n=n.indexOf(e,t)}function gebi(n){return document.getElementById(n)}function dsply(n,e){gebi(n).style.display=e}function stToDiv(n){return localStorage["stWrd"+n].split("@#")}function wToSt(n,e){localStorage["stWrd"+n]=e.join("@#")}function rep(n,e,t){return n.replaceAll(e,t)}function fxClk(n){gebi(n).focus(),gebi(n).click()}function rInrTxt(n){return gebi(n).innerText}function inTxt(n,e){gebi(n).innerText=e}function alvlin(){return rInrTxt("nwAr")+rInrTxt("nwEn")+rInrTxt("nwFr")}function slctAll(n){return document.querySelectorAll(n)}async function allWrd(){function n(n){return localStorage.getItem(n)}n("stWrdAr")||n("stWrdEn")||n("stWrdFr")?(enWrd=stToDiv("En"),arWrd=stToDiv("Ar"),frWrd=stToDiv("Fr")):await fetch("https://raw.githubusercontent.com/tpspd/tpspd.github.io/main/atr/wrds.json").then(n=>n.json()).then(n=>{enWrd=n.enWrd,arWrd=n.arWrd,frWrd=n.frWrd,wToSt("En",enWrd),wToSt("Ar",arWrd),wToSt("Fr",frWrd)}),cntn()}opnSite();
