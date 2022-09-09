let hidDiv, inp = gebi('inpWrd'), enter = 'idStart', strt = 1, nmGm = localStorage.nmGmr,
    arWrd, enWrd, frWrd, nmbr = 0, nbWrd = 0, lftTm, fxCngr, cngrt = '', tmLft, lngTm,
    upbt = 'nwFr', dwbt = 'nwAr', nmCh = 3, kyBt = 'ent';

opnSite();

function opnDiv(dvOpn, ent, fcs = 'tpScrl') {
    dsply('cntnr', 'block'); dsply(dvOpn, 'block'); enter = ent;
    gebi('divplac').className += ' opPlc';
    setTimeout(() => {
        gebi('divplac').className = 'dvPlc'; fxClk(fcs)
    }, 10);

}

function hiding() {
    valScnd(localStorage.lvlTim);
    inp.value = '';
    setTimeout(() => { gebi('divplac').className += ' hidplac' }, 20)
    hidDiv = setTimeout(() => {
        gebi('divplac').className = 'dvPlc';
        document.querySelectorAll('.hidjs').forEach(el => { dsply(el.id, 'none') })
    }, 310);
    if (cngrt != '') { clearInterval(fxCngr); cngrt = '' }
}

function nmGmr() {
    let gNam = gebi('nmGm').innerText;
    gebi('spNmGm').innerText = gNam; hiding();
    localStorage.nmGmr = gNam;
}

function topScrl(time) {
    if (time == '∞') { gebi('tpScrl').innerText = ''; return false }
    if (localStorage['top' + time]) {
        gebi('tpScrl').innerHTML = `Top Score : <span >${localStorage['topGmr' + time]} ,
      ${localStorage['top' + time]}</span> words in <span>${clTm(time, 1)}</span>`
    } else { gebi('tpScrl').innerText = 'Top Score : no One' }
}
/* localStorage.removeItem('top30') */
function valScnd(time) {
    topScrl(time); gebi('tmLft').innerText = clTm(time); enter = 'idStart';
    gebi('mbrWrd').innerText = 0; localStorage.lvlTim = time; gebi('timeLvl').value = time
    if (strt == 0) {
        clrngTm(); inp.value = '';
        dsply('wrdDsply', 'none'); dsply('idStart', 'block'); strt = 1;
    }
}

function clTm(time, plc = 0) {
    if (time == '∞') { return '∞' }
    let mtm = 0, stm, ttlTm, s = '';
    if (time > 59) { mtm = Math.floor(time / 60); stm = time % 60 } else { stm = time }
    if (plc == 1) { if (mtm > 0) { if (mtm > 1) { s = 's' } return mtm + ' minute' + s } else { return stm + ' seconds' } }
    if (stm < 10) { stm = '0' + stm }
    mtm = '0' + mtm; ttlTm = ' ' + mtm + ':' + stm;
    return ttlTm
}

function gogame() {
    chTyp(inp);
    if (enWrd.length == 0 || strt == 0) { return false }

    dsply('idStart', 'none'); dsply('wrdDsply', 'flex'); gebi('inpWrd').focus(); enter = 'tpScrl'; strt = 0;
    gebi('mbrWrd').innerText = 0; nbWrd = 0; lftTm = localStorage.lvlTim;
    if (lftTm == '∞') { return false }
    let sntLft, lngLfTm = lftTm * 25, rstLngtm = lngLfTm, rslt;
    tmLft = setInterval(() => {
        lftTm--; sntLft = clTm(lftTm); gebi('tmLft').innerText = sntLft;
        if (lftTm == 0) { clrngTm(); resulte(); }
    }, 1000);

    lngTm = setInterval(() => {
        rstLngtm--; rslt = (rstLngtm * 100 / lngLfTm).toFixed(1) + '%';
        gebi('lngTm').style.width = rslt;
    }, 40);
}

function clrngTm() {
    clearInterval(tmLft); clearInterval(lngTm);
    gebi('lngTm').style.width = '100%'
}

function resulte() {
    if (gebi('cntnr').style.display == 'block') { hiding(); setTimeout(() => { resulte() }, 500); return false }
    lftTm = localStorage.lvlTim; dsply('wrdDsply', 'none'); dsply('idStart', 'block'); strt = 1; inp.value = '';
    let tpSc = localStorage['top' + lftTm], nmGmr = gebi('spNmGm').innerText;
    gebi('tmLft').innerText = clTm(lftTm); dsply('cntnr', 'block');

    if ((nbWrd > 0 && tpSc == undefined) || nbWrd > tpSc) {
        cngrt = `<div>congratulations <span> ${nmGmr}</span></div>
               <div>You wrote <span> ${nbWrd}</span> words in <span> ${clTm(lftTm, 1)}</span>
               <div id="okcng" onclick="hiding()" class="okbtn okCng nofcs">Ok thanks</div></div>`;
        gebi('cngrtl').innerHTML = cngrt; opnDiv('cngrtl', 'okcng'); gebi('okcng').focus();
        fxCngr = setInterval(() => { if (gebi('cngrtl').innerHTML != cngrt) { gebi('cngrtl').innerHTML = cngrt } }, 500);
        localStorage['top' + lftTm] = nbWrd; localStorage['topGmr' + lftTm] = nmGmr; topScrl(lftTm)
    } else { opnDiv('gmOvr', 'okgmOvr'); }
    gebi('btnLng').focus();
}

function hidWrd(rnNmb) {
    if (enWrd.length == 1) { dltall(); return false }
    gebi('wrdDiv' + rnNmb).remove();
    enWrd.splice(rnNmb, 1); arWrd.splice(rnNmb, 1); frWrd.splice(rnNmb, 1);
    lstWrd(); gebi('nmbWrd').innerText = enWrd.length;
    wToSt('En', enWrd); wToSt('Ar', arWrd); wToSt('Fr', frWrd);
    stWrd();
}

function chInp(el) {
    if (el.style.display == 'none') {
        const ky = { up: upbt, dw: dwbt, ent: enter };
        fxClk(ky[kyBt]);
    }
}

function chTyp(el) { el.type = 'search'; el.type = 'text' /* setTimeout(() => {  }, 1000) */ }

function addWrds() {
    let inpEn = gebi('nwEn'), inpAr = gebi('nwAr'),
        inpFr = gebi('nwFr'), tLng = inpEn.innerText + inpAr.innerText + inpFr.innerText;
    enter = 'nwEn';
    tLng = rep(tLng, ' ', '');
    if (tLng == '') {
        dsply('notAdd', 'block'); dsply('isAdd', 'none');
        setTimeout(() => { dsply('notAdd', 'none'); }, 1000);
    } else {
        dsply('notAdd', 'none'); dsply('isAdd', 'block'); setTimeout(() => { dsply('isAdd', 'none') }, 1000);
        isAddWrd(inpEn, enWrd, 'En'); isAddWrd(inpAr, arWrd, 'Ar'); isAddWrd(inpFr, frWrd, 'Fr');
        lstWrd(); gebi('nmbWrd').innerText = enWrd.length; stWrd()
    }
    fxClk('nwAr');
}

function isAddWrd(inpWrd, arrWrd, lng) {
    let vlinp = inpWrd.innerText; inpWrd.innerText = '';
    if (ind(vlinp, '@#') > -1) { vlinp = rep(vlinp, '@#', '/@/#/') }
    arrWrd.unshift(vlinp); wToSt(lng, arrWrd)
}

function dltall() {
    cntWrd = gebi('cntWrds').innerHTML = '';
    dsply('wrdDsply', 'none'); dsply('idStart', 'block');
    enWrd = []; arWrd = []; frWrd = []; nmbr = 0;
    localStorage.removeItem('stWrdEn'); localStorage.removeItem('stWrdAr');
    localStorage.removeItem('stWrdFr'); gebi('nmbWrd').innerText = 0;
    hiding();
}

function opnSite() {
    addEventListener('keydown', (ev) => {
        let evKy = ev.key;
        if (evKy == 'Enter' || evKy == 'ArrowDown' || evKy == 'ArrowUp') {
            ev.preventDefault();
            if (evKy == 'Enter') { fxClk(enter); kyBt = 'ent' }
            if (evKy == 'ArrowDown') { fxClk(upbt); kyBt = 'up' }
            if (evKy == 'ArrowUp') { fxClk(dwbt); kyBt = 'dw' }
        }
    });

    const inpAdd = document.querySelectorAll(".inpAdd");
    inpAdd.forEach(el => {

        el.addEventListener('keydown', () => {
            inpAdd.forEach(el2 => {
                setTimeout(() => {
                    if (el2.innerText == '' && el2.style.display!='none') {
                        el2.nextElementSibling.style.display = 'inline-block'
                    } else { el2.nextElementSibling.style.display = 'none' }
                }, 10);

            })
        })
    });


    inp.oninput = () => {
        let vinp = inp.value.toLocaleLowerCase(), en = enWrd[nmbr].toLocaleLowerCase(),
            fr = frWrd[nmbr].toLocaleLowerCase();
        if ((vinp == arWrd[nmbr] || vinp == en || vinp == fr) && vinp != '' && strt == 0) {
            nmbr++; stWrd(); inp.value = ''; nbWrd++; gebi('mbrWrd').innerText = nbWrd
        }

    }

    /* const frm = document.querySelectorAll("form");
     frm.forEach(el => {
         el.addEventListener('submit', ev => {
             ev.preventDefault();
 
         })
     })
  */
    gebi('divplac').addEventListener('click', e => { e.stopPropagation() });
    /* //////// localStorage for gimer ... ext */
    if (nmGm) { gebi('spNmGm').innerText = nmGm; gebi('nmGm').innerText = nmGm } else { gebi('spNmGm').innerText = 'Unknown' }
    if (localStorage.lvlTim) {
        valScnd(localStorage.lvlTim)
    } else { valScnd(30) }
    /*//////// list words \\\\\\\\\  */
    allWrd();

}

function cntn() {
    let rnNmb, i = 0, nwEn = [], nwAr = [], nwFr = [], lstNmbr = [];
    while (i < enWrd.length) {
        rnNmb = Math.floor(Math.random() * enWrd.length);
        if (ind(lstNmbr, rnNmb) == -1) {
            lstNmbr.push(rnNmb); i++;
            nwEn.push(enWrd[rnNmb]); nwAr.push(arWrd[rnNmb]); nwFr.push(frWrd[rnNmb]);
        }
    }
    enWrd = nwEn; arWrd = nwAr; frWrd = nwFr; lstWrd(); stWrd();
    gebi('nmbWrd').innerText = enWrd.length;
    document.querySelectorAll('.ch input').forEach(el => {
        el.addEventListener('click', () => {
            if (el.checked) {
                nmCh++; chcd('inline-block')
            } else {
                nmCh--; if (nmCh == 0) { el.click(); return false }
                chcd('none')
            }
            function chcd(dsp) {
                document.querySelectorAll(el.dataset.lng).forEach(chnCl => chnCl.style.display = dsp);

                localStorage['ch' + el.id] = dsp
            }
        });
        if (localStorage['ch' + el.id] == 'none') { el.click() }
    });
    /* gebi('clVu').innerHTML += `<iframe src="https://maktaeliliktroniya.blogspot.com/2022/08/typing-speed.html" 
    frameborder="0"></iframe>`;
    dsply('clVu', 'none') */
}
function chosWrd() {


}

/* ////// create list words */
function lstWrd() {
    let cntWrd = gebi('cntWrds'), dvWrd = '';

    for (let i = 0; i < enWrd.length; i++) {
        dvWrd += `<div id="wrdDiv${i}"><span id="hidWrd${i}"class="hidWrd"onclick="hidWrd(${i})"
         >×</span><span class="arCl">${arWrd[i]}</span><span class="enCl">${enWrd[i]}</span>
         <span class="frCl">${frWrd[i]}</span></div>`;
    }
    dvWrd += `<p id="spdlt" class="add aldlt"onclick="opnDiv('dltAll','yesbtn')" >delete all</p>`;
    cntWrd.innerHTML = dvWrd;
}

function stWrd() {
    if (nmbr == enWrd.length) { nmbr = 0 } gebi('lng0').innerText = arWrd[nmbr];
    gebi('lng1').innerText = enWrd[nmbr]; gebi('lng2').innerText = frWrd[nmbr];
}


/* ////// short function \\\\\\\\\\ */
function ind(inpt, pr, pr2 = 0) { inpt = inpt.indexOf(pr, pr2); return inpt }
function gebi(pr) { return document.getElementById(pr) }
function dsply(id, dsply) { gebi(id).style.display = dsply }
function stToDiv(lng) { let Hist = localStorage['stWrd' + lng]; Hist = Hist.split('@#'); return Hist }
function wToSt(lng, lsWrd) { localStorage['stWrd' + lng] = lsWrd.join('@#') }
function rep(inp, pr1, pr2) { return inp.replaceAll(pr1, pr2) }
function fxClk(id) { gebi(id).focus(); gebi(id).click() }

function allWrd() {
    if (localStorage.getItem('stWrdEn')) {
        enWrd = stToDiv('En'); arWrd = stToDiv('Ar'); frWrd = stToDiv('Fr');
        cntn()
    } else {

        fetch("https://raw.githubusercontent.com/tpspd/tpspd.github.io/main/atr/wrds.json")
            .then(rs => rs.json())
            .then(rp => {
                enWrd = rp.enWrd; arWrd = rp.arWrd; frWrd = rp.frWrd;
                wToSt('En', enWrd); wToSt('Ar', arWrd); wToSt('Fr', frWrd);
                cntn()

            })
    }
}
