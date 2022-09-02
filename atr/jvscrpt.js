let hidDiv,addCls,inp =gebi('inpWrd'),enter = 'idStart',strt=1,nmGm=localStorage.nmGmr,arWrd,enWrd,frWrd,nmbr=0,
    nbWrd=0,lftTm,fxCngr,cngrt='',tmLft,upbt='nwFr',dwbt='nwAr',nmCh=3,kyBt='ent';

opnSite();


function opnDiv(dvOpn,ent,fcs){dsply('cntnr','block');dsply(dvOpn,'block');enter=ent;gebi(fcs).focus()}

function hiding() {
    valScnd(localStorage.lvlTim);
    inp.value=''; enter = 'idStart';clearInterval(tmLft);
    addCls= setTimeout(() => { gebi('divplac').className +=' hidplac' }, 20)
    hidDiv=  setTimeout(() => {
        gebi('divplac').className = 'dvPlc';
        document.querySelectorAll('.hidjs').forEach(el =>{ dsply(el.id,'none') })
    }, 310);
    if(cngrt !=''){clearInterval(fxCngr);cngrt=''}
}

function nmGmr(){let gNam = gebi('nmGm').value; gebi('spNmGm').innerText = gNam;hiding(); localStorage.nmGmr = gNam}

function topScrl(time) {
  if(time =='∞'){gebi('tpScrl').innerText = '';return false}
  if(localStorage['top'+time]){
     gebi('tpScrl').innerHTML = `Top Score : <span >${localStorage['topGmr'+time]} ,
      ${localStorage['top'+time]}</span> words in <span>${clTm(time,1)}</span>`
  }else{gebi('tpScrl').innerText = 'Top Score : no One'}
}
/* localStorage['top30']=2 */
/* localStorage.removeItem('top30') */
function valScnd(time){
    topScrl(time);gebi('tmLft').innerText=clTm(time);enter='idStart';
    gebi('mbrWrd').innerText =0;localStorage.lvlTim=time;
    if(strt==0 ){ 
        clearInterval(tmLft);inp.value='';
        dsply('wrdDsply','none');dsply('idStart','block');strt=1;
    }
}

function clTm(time,plc=0) {
    if(time =='∞'){return '∞'}
    let mtm=Math.floor(time/60) ,stm=time-mtm*60,totlTm,s='' ; stm=stm.toFixed(0)
    if(plc==1){if(mtm>0){if(mtm>1){s='s'} return mtm+' minute'+s}else{return stm+' seconds'}}
     if (stm<10) {stm='0'+stm }
     if(mtm==0){totlTm=' '+stm+'s'} 
     totlTm=' '+mtm+':'+stm;
    return totlTm
}

function gogame() {
    if(enWrd.length==0 || strt==0){return false}
    dsply('idStart','none');dsply('wrdDsply','flex');gebi('inpWrd').focus();enter ='tpScrl';strt=0;
    gebi('mbrWrd').innerText =0;nbWrd=0; lftTm=localStorage.lvlTim;
    if(lftTm =='∞'){return false}
    let sntLft;
    tmLft= setInterval(() => {
        lftTm--;sntLft=clTm(lftTm); gebi('tmLft').innerText =sntLft; 
        if (lftTm ==0) {clearInterval(tmLft);resulte();}
    }, 1000);
    
    
}
function resulte() {
    if (gebi('cntnr').style.display == 'block') { hiding();setTimeout(() => {resulte()}, 500); return false}
    lftTm=localStorage.lvlTim;dsply('wrdDsply','none');dsply('idStart','block');strt=1;inp.value='';
    let tpSc =localStorage['top'+lftTm],nmGmr=gebi('spNmGm').innerText;
    gebi('tmLft').innerText =clTm(lftTm); dsply('cntnr','block'); gebi('idStart').focus()
    
    if ( (nbWrd>0 && tpSc == undefined ) || nbWrd >tpSc) {
        cngrt =`<div>congratulations <span> ${nmGmr}</span></div>
               <div>You wrote <span> ${nbWrd}</span> words in <span> ${clTm(lftTm,1)}</span>
               <div id="okcng" onclick="hiding()" class="okbtn okCng nofcs">Ok</div></div>`;
        dsply('cngrtl','block'); gebi('cngrtl').innerHTML =cngrt; 
        fxCngr=setInterval(() => { if (gebi('cngrtl').innerHTML !=cngrt) {gebi('cngrtl').innerHTML =cngrt } }, 500);
        localStorage['top'+lftTm]=nbWrd; localStorage['topGmr'+lftTm]=nmGmr;topScrl(lftTm);enter = 'okcng'
    }else{dsply('gmOvr','block');enter = 'okgmOvr'}
   
}
 
/* localStorage.removeItem('lng0')
localStorage.removeItem('lng1')
localStorage.removeItem('lng2') */
function hidWrd(rnNmb) { 
    if(enWrd.length==1){dltall();return false}
    gebi('wrdDiv'+rnNmb).remove();
    enWrd.splice(rnNmb,1);arWrd.splice(rnNmb,1);frWrd.splice(rnNmb,1);
    lstWrd();gebi('nmbWrd').innerText=enWrd.length;
    wToSt('En',enWrd);wToSt('Ar',arWrd);wToSt('Fr',frWrd);
}

function chInp(el) {
    if (el.style.display=='none' && nmCh>0) {
        let kys={ent:enter,up:upbt,dw:dwbt}
        fxClk(kys[kyBt])
    }
}

function addWrds() {
    let inpEn= gebi('nwEn'),inpAr= gebi('nwAr'),
    inpFr= gebi('nwFr'),tLng=inpEn.value+inpAr.value+inpFr.value;
     enter = 'nwAr';
    gebi('nwEn').focus();tLng=rep(tLng,' ','');
    if (tLng=='') { 
        dsply('notAdd','block');dsply('isAdd','none');
        setTimeout(() => { dsply('notAdd','none');}, 1000);
    }else{
        dsply('notAdd','none');dsply('isAdd','block');setTimeout(() => { dsply('isAdd','none')}, 1000);
        isAddWrd(inpEn,enWrd,'En');isAddWrd(inpAr,arWrd,'Ar');isAddWrd(inpFr,frWrd,'Fr');
        lstWrd();gebi('nmbWrd').innerText = enWrd.length;
        if (enWrd.length == 1){stWrd()}
    }
    
}

function isAddWrd(inpWrd,arrWrd,lng) {
    let vlinp = inpWrd.value; inpWrd.value='';
    if(ind(vlinp,'@#')>-1){vlinp=rep(vlinp,'@#','/@/#/')}
    arrWrd.unshift(vlinp);wToSt(lng,arrWrd)
}

function dltall() {
    cntWrd=gebi('cntWrds').innerHTML='';enter='idStart';
    dsply('wrdDsply','none');dsply('idStart','block');
    enWrd=[];arWrd=[];frWrd=[];nmbr=0;strt=1;
    localStorage.removeItem('stWrdEn');localStorage.removeItem('stWrdAr');
    localStorage.removeItem('stWrdFr');gebi('nmbWrd').innerText=0;
    clearInterval(tmLft);
    valScnd(localStorage.lvlTim);hiding();
}



function opnSite() {
    addEventListener('keyup',(ev) => {
        if(ev.keyCode === 13){fxClk(enter);kyBt='ent'}
        if(ev.keyCode === 38){fxClk(upbt);kyBt='up'}
        if(ev.keyCode === 40){fxClk(dwbt);kyBt='dw'}
    });
    gebi('divplac').addEventListener('click',e =>{e.stopPropagation()});
    inp.oninput = ()=>{
        let  vinp = inp.value;
            if((vinp == arWrd[nmbr] || vinp == enWrd[nmbr] || vinp == frWrd[nmbr])&& vinp!='' && strt==0 ){
                 nmbr++;stWrd();gebi('inpWrd').value='';nbWrd++;gebi('mbrWrd').innerText = nbWrd
            } 
    }

    /* //////// localStorage for gimer ... ext */
    if(nmGm){gebi('spNmGm').innerText=nmGm;gebi('nmGm').value= nmGm }else{gebi('spNmGm').innerText='Unknown'}
    if(localStorage.lvlTim){let lvtm=localStorage.lvlTim; gebi('timeLvl').value=lvtm; valScnd(lvtm);lftTm=lvtm
    }else{gebi('timeLvl').value=30;gebi('tmLft').innerText=30;topScrl('30');lftTm=30}

    /*//////// list words \\\\\\\\\  */
    allWrd();
    /* gebi('clVu').innerHTML += '<iframe src="https://maktaeliliktroniya.blogspot.com/2022/08/typing-speed.html" '+
                               'frameborder="0"></iframe>';
    dsply('ifrm','none') */
}
/* ////// create list words */
function lstWrd() {
    let cntWrd=gebi('cntWrds'),dvWrd=''; 
        
    for (let i = 0; i < enWrd.length; i++) {
        dvWrd +=`<div id="wrdDiv${i}"><span id="hidWrd${i}"class="hidWrd"onclick="hidWrd(${i})"
         >×</span><span class="arCl">${arWrd[i]}</span><span class="enCl">${enWrd[i]}</span>
         <span class="frCl">${frWrd[i]}</span></div>`;
    }
    dvWrd += `<p id="spdlt" class="add aldlt"onclick="opnDiv('dltAll','yesbtn','dltAll')" >delete all</p>`;
    cntWrd.innerHTML = dvWrd;
}

function stWrd() {
    if(nmbr == enWrd.length){nmbr = 0} gebi('lng0').innerText = arWrd[nmbr];
    gebi('lng1').innerText = enWrd[nmbr];gebi('lng2').innerText = frWrd[nmbr];
}

function cntn() {
    let rnNmb,i=0,nwEn=[],nwAr=[],nwFr=[],lstNmbr=[];
    while (i < enWrd.length) {
        rnNmb=Math.floor(Math.random()*enWrd.length);
        if(ind(lstNmbr,rnNmb)==-1){
            lstNmbr.push(rnNmb) ; i++;
            nwEn.push(enWrd[rnNmb]);nwAr.push(arWrd[rnNmb]);nwFr.push(frWrd[rnNmb]);
        }
    }
    enWrd=nwEn;arWrd=nwAr;frWrd=nwFr; lstWrd(); stWrd();
    gebi('nmbWrd').innerText=enWrd.length;

    document.querySelectorAll('.ch input').forEach((el)=>{
        el.addEventListener('click',()=> {
            if (el.checked) {
                document.querySelectorAll(el.dataset.lng).forEach(chnCl =>chnCl.style.display='initial');
                localStorage['ch'+el.id]='true';nmCh++
            }else{
                nmCh--; if (nmCh==0) { el.click();return false}
                document.querySelectorAll(el.dataset.lng).forEach(chnCl =>chnCl.style.display='none');
                localStorage['ch'+el.id]='false'
            }
            
        });
        if(localStorage['ch'+el.id]=='false'){el.click()}
        
    });
    
}
/* ////// short function \\\\\\\\\\ */
function ind(inpt,pr,pr2=0) { inpt=inpt.indexOf(pr,pr2);return inpt}
function gebi(pr) { return document.getElementById(pr)}
function dsply(id,dsply){gebi(id).style.display = dsply}
function stToDiv(lng) {let Hist = localStorage['stWrd' + lng];Hist = Hist.split('@#'); return Hist}
function wToSt(lng,lsWrd){localStorage['stWrd' + lng] = lsWrd.join('@#')}
function rep(inp,pr1,pr2) {return inp.replaceAll(pr1,pr2)}
function fxClk(id) {gebi(id).focus();gebi(id).click()}


function allWrd() {
    
    if (localStorage.getItem('stWrdEn')) {
        enWrd=stToDiv('En');arWrd=stToDiv('Ar');frWrd=stToDiv('Fr');
        cntn()
    }else{
        
        fetch("https://raw.githubusercontent.com/tpspd/tpspd.github.io/main/atr/wrds.json")
        .then(rs => rs.json())
        .then(rp=>{
            enWrd=rp.enWrd; arWrd=rp.arWrd;frWrd=rp.frWrd;
            wToSt('En',enWrd);wToSt('Ar',arWrd);wToSt('Fr',frWrd);
            cntn()
        })
          
    }
}
