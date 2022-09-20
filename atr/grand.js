let hidDiv, inp = gebi('inpWrd'), enter = 'idStart', strt = 1, nmGm = localStorage.nmGmr,
arWrd, enWrd, frWrd, nmbr = 0, nbWrd = 0, lftTm, fxCngr, cngrt = '', tmLft, wrdEdt = false, lngTm, afPl = false, inpAdd = document.querySelectorAll(".inpAdd"), ds = {
    "ar": '',
    "en": '',
    "fr": ''
},
upbt = 'nwFr', dwbt = 'nwAr', nmCh = 3, kyBt = 'ent';

opnSite();

function mdf(i) {
    if (afPl) {
        afPl = false; return 0
    }
    opnDiv('addWrd', 'nwEn', 'nwAr');
    gebi('pAdd').innerText = 'edit words';
    gebi('okAdd').innerText = 'edit';
    gebi('nmW').innerText = i;
    mdInp('En', enWrd[i]); mdInp('Fr', frWrd[i]); mdInp('Ar', arWrd[i]); wrdEdt = true;

    function mdInp(lng, arr) {
        gebi('nw'+lng).innerText = arr;
        if (arr) {
            gebi('nw'+lng).nextElementSibling.style.display = 'none'
        }
    }
}

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

    setTimeout(() => {
        gebi('divplac').className += ' hidplac';
    }, 20)
    hidDiv = setTimeout(() => {
        gebi('idStart').focus();
        gebi('divplac').className = 'dvPlc';
        document.querySelectorAll('.hidjs').forEach(el => {
            dsply(el.id, 'none')});
        if (wrdEdt) {
            fedt()}
    },
        320);
    if (cngrt != '') {
        clearInterval(fxCngr); cngrt = ''
    }
}

function nmGmr() {
    let gNam = gebi('nmGm').innerText;
    gebi('spNmGm').innerText = gNam; hiding();
    localStorage.nmGmr = gNam;
}

function topScrl(time) {
    if (time == '∞') {
        gebi('tpScrl').innerText = ''; return false
    }
    if (localStorage['top' + time]) {
        gebi('tpScrl').innerHTML = `Top Score : <span >${localStorage['topGmr' + time]} ,
        ${localStorage['top' + time]}</span> words in <span>${clTm(time, 1)}</span>`
    } else {
        gebi('tpScrl').innerText = 'Top Score : no One'
    }
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
    if (time == '∞') {
        return '∞'
    }
    let mtm = 0,
    stm,
    ttlTm,
    s = '';
    if (time > 59) {
        mtm = Math.floor(time / 60); stm = time % 60
    } else {
        stm = time
    }
    if (plc == 1) {
        if (mtm > 0) {
            if (mtm > 1) {
                s = 's'
            } return mtm + ' minute' + s
        } else {
            return stm + ' seconds'
        }
    }
    if (stm < 10) {
        stm = '0' + stm
    }
    mtm = '0' + mtm; ttlTm = ' ' + mtm + ':' + stm;
    return ttlTm
}

function gogame() {
    chTyp(inp);
    if (enWrd.length == 0 || strt == 0) {
        return false
    }

    dsply('idStart', 'none'); dsply('wrdDsply', 'flex'); gebi('inpWrd').focus(); enter = 'tpScrl'; strt = 0;
    gebi('mbrWrd').innerText = 0; nbWrd = 0; lftTm = localStorage.lvlTim;
    if (lftTm == '∞') {
        return false
    }
    let sntLft,
    lngLfTm = lftTm * 25,
    rstLngtm = lngLfTm,
    rslt;
    tmLft = setInterval(() => {
        lftTm--; sntLft = clTm(lftTm); gebi('tmLft').innerText = sntLft;
        if (lftTm == 0) {
            clrngTm(); resulte();
        }
    },
        1000);

    lngTm = setInterval(() => {
        rstLngtm--; rslt = (rstLngtm * 100 / lngLfTm).toFixed(1) + '%';
        gebi('lngTm').style.width = rslt;
    },
        40);
}

function clrngTm() {
    clearInterval(tmLft); clearInterval(lngTm);
    gebi('lngTm').style.width = '100%'
}

function resulte() {
    if (gebi('cntnr').style.display == 'block') {
        hiding(); setTimeout(() => {
            resulte()
        }, 500); return false
    }
    lftTm = localStorage.lvlTim; dsply('wrdDsply', 'none'); dsply('idStart', 'block'); strt = 1; inp.value = '';
    let tpSc = localStorage['top' + lftTm],
    nmGmr = gebi('spNmGm').innerText;
    gebi('tmLft').innerText = clTm(lftTm); dsply('cntnr', 'block');

    if ((nbWrd > 0 && tpSc == undefined) || nbWrd > tpSc) {
        cngrt = `<div>congratulations <span> ${nmGmr}</span></div>
        <div>You wrote <span> ${nbWrd}</span> words in <span> ${clTm(lftTm, 1)}</span>
        <div id="okcng" onclick="hiding()" class="okbtn okCng nofcs">Ok thanks</div></div>`;
        gebi('cngrtl').innerHTML = cngrt; opnDiv('cngrtl', 'okcng'); gebi('okcng').focus();
        fxCngr = setInterval(() => {
            if (gebi('cngrtl').innerHTML != cngrt) {
                gebi('cngrtl').innerHTML = cngrt
            }
        },
            500);
        localStorage['top' + lftTm] = nbWrd; localStorage['topGmr' + lftTm] = nmGmr; topScrl(lftTm)
    } else {
        opnDiv('gmOvr', 'okgmOvr');
    }
    gebi('btnLng').focus();
}

function hidWrd(nm) {
    afPl = true;
    if (enWrd.length == 1) {
        dltall(); return false
    }
    let lng = enWrd.length-1,
    ldv = gebi('wrdDiv' + lng),
    dvdlt = gebi('wrdDiv' + nm);
    dvdlt.className = 'hdDv';
    
    dlt(arWrd, 'Ar'); dlt(enWrd, 'En'); dlt(frWrd, 'Fr');
  
    setTimeout(()=> {
      ldv.innerHTML = inDv(nm); 
      dvdlt.remove(); ldv.id = 'wrdDiv'+nm;
    }, 300)
    
    function dlt(v1, v2) {
        [v1[nm], v1[lng]] = [v1[lng],
        v1[nm]]; v1.splice(lng, 1); wToSt(v2, v1)}
    gebi('nmbWrd').innerText = lng;
    stWrd()
}

function chInp(el, ent, up, dw = ent) {
    enter = ent; upbt = up; dwbt = dw;
    if (el.style.display == 'none') {
        const ky = {
            up: upbt,
            dw: dwbt,
            ent: enter
        };
        fxClk(ky[kyBt]);
    }
}

function chTyp(el) {
    el.type = 'search'; /*setTimeout(() => { el.type = 'text'  }, 1000)*/
}

function edt() {
    let tLng = alvlin(); tLng = rep(tLng, ' ', '');
    if (!tLng) {
        return false
    }
    let i = gebi('nmW').innerText*1;
    arWrd[i] = gebi('nwAr').innerText;
    isEdt(arWrd, 'Ar'); isEdt(frWrd, 'Fr');
    isEdt(enWrd, 'En');

    gebi('wrdDiv'+i).innerHTML = inDv(i);

    function isEdt(arr, lng) {
        let vlinp = gebi('nw'+lng).innerText;

        vlinp = vlinp.trim();
        if (ind(vlinp, '@#') > -1) {
            vlinp = rep(vlinp, '@#', '/@/#/')
        }
        arr[i] = vlinp; wToSt(lng, arr)
    }
    hiding();
}
function fedt() {
    gebi('pAdd').innerText = 'add New words';
    gebi('okAdd').innerText = 'add';
    vidInp(); wrdEdt = false
}

function addWrds() {
    if (rinTxt('pAdd') != 'add New words') {
        edt(); return 0
    }
    let inpEn = gebi('nwEn'),
    inpAr = gebi('nwAr'),
    inpFr = gebi('nwFr'),
    tLng = alvlin(),
    lng = enWrd.length;
    enter = 'nwEn';
    tLng = rep(tLng, ' ', '');
    if (!tLng) {
        dsply('notAdd', 'block'); dsply('isAdd', 'none');
        setTimeout(() => {
            dsply('notAdd', 'none');
        }, 1000);
    } else {
        dsply('notAdd', 'none'); dsply('isAdd', 'block');
        setTimeout(() => {
            dsply('isAdd', 'none')
        }, 1000);
        isAddWrd(inpEn, enWrd, 'En'); isAddWrd(inpAr, arWrd, 'Ar'); isAddWrd(inpFr, frWrd, 'Fr');
        let ldv = document.createElement("div");
        ldv.id = 'wrdDiv'+lng;
        ldv.className ='hdDv';
        ldv.innerHTML = inDv(lng);
        gebi('cntWrds').prepend(ldv);
        vidInp();
        setTimeout(()=>{
            ldv.className='adDv'
        },0)
    }
    fxClk('nwAr');

}
function isAddWrd(inpWrd, arrWrd, lng) {
    let vlinp = inpWrd.innerText;
    vlinp = vlinp.trim();
    if (ind(vlinp, '@#') > -1) {
        vlinp = rep(vlinp, '@#', '/@/#/')
    }
    arrWrd.push(vlinp); wToSt(lng, arrWrd)
}
function inDv(i) {
    return `<p onclick="mdf(${i})"><span class="hidWrd" onclick="hidWrd(${i})">×</span><span class="${ds.ar}">${arWrd[i]}</span><span class="${ds.en}">${enWrd[i]}</span><span class="${ds.fr}">${frWrd[i]}</span></p>`
}
function vidInp() {
    inpAdd.forEach(el => {
        el.innerText = '';
        if (el.style.display != 'none') {
            el.nextElementSibling.style.display = 'inline-block'
        }
    })
}

function dltall() {
    cntWrd = gebi('cntWrds').innerHTML = '';

    // dsply('wrdDsply', 'none'); dsply('idStart', 'block');

    enWrd = []; arWrd = []; frWrd = []; nmbr = 0;
    localStorage.removeItem('stWrdEn'); localStorage.removeItem('stWrdAr');
    localStorage.removeItem('stWrdFr'); gebi('nmbWrd').innerText = 0;
    hiding();
}

function opnSite() {
    let idInp, txtInp;
    document.addEventListener('keyup',
        (ev) => {
            let evKy = ev.key;

            if (txtInp.indexOf('\n', 0)>-1) {
                kyBt = 'ent';
                txtInp = txtInp.replaceAll('\n', ''); idInp.innerText = txtInp; fxClk(enter); return false
            }
            if (evKy == 'Enter' || evKy == 'ArrowDown' || evKy == 'ArrowUp') {

                ev.preventDefault();
                if (evKy == 'Enter') {
                    fxClk(enter); kyBt = 'ent'
                }
                if (evKy == 'ArrowDown') {
                    fxClk(upbt); kyBt = 'up'
                }
                if (evKy == 'ArrowUp') {
                    fxClk(dwbt); kyBt = 'dw'
                }
            }
        });
    let inpAdd = document.querySelectorAll(".inpAdd");
    inpAdd.forEach((el, a, b) => {

        ['input',
            'focus'].forEach(ev=> {
                el.addEventListener(ev, () => {
                    idInp = el;
                    txtInp = el.innerText;

                    if (!txtInp) {
                        if (alvlin()) {
                            gebi('okAdd').style.backgroundColor = 'var(--mnCl)'
                        } else {
                            gebi('okAdd').style.backgroundColor = '#2196f396'
                        }
                    } else {
                        gebi('okAdd').style.backgroundColor = 'var(--mnCl)'
                    }


                    if (el.innerText != '' || el.style.display == 'none') {
                        el.nextElementSibling.style.display = 'none'
                    } else {
                        el.nextElementSibling.style.display = 'inline-block'
                    }


                })

            })
    });

    inp.oninput = () => {
        let vinp = inp.value.toLocaleLowerCase(), en = enWrd[nmbr].toLocaleLowerCase(),
        fr = frWrd[nmbr].toLocaleLowerCase();
        if (ind([arWrd[nmbr], en, fr], vinp)>-1 && vinp && strt == 0) {
            nmbr++; stWrd(); inp.value = ''; nbWrd++; gebi('mbrWrd').innerText = nbWrd
        }

    }

    gebi('divplac').addEventListener('click', e => {
        e.stopPropagation()
    });
    /* //////// localStorage for gimer ... ext */
    if (nmGm) {
        gebi('spNmGm').innerText = nmGm; gebi('nmGm').innerText = nmGm
    } else {
        gebi('spNmGm').innerText = 'Unknown'
    }
    if (localStorage.lvlTim) {
        valScnd(localStorage.lvlTim)
    } else {
        valScnd(30)
    }
    /*//////// list words \\\\\\\\\  */
    allWrd();

}

function cntn() {
    let rnNmb,
    i = 0,
    nwEn = [],
    nwAr = [],
    nwFr = [],
    lstNmbr = [];
    while (i < enWrd.length) {
        rnNmb = Math.floor(Math.random() * enWrd.length);
        if (ind(lstNmbr, rnNmb) == -1) {
            lstNmbr.push(rnNmb); i++;
            nwEn.push(enWrd[rnNmb]); nwAr.push(arWrd[rnNmb]); nwFr.push(frWrd[rnNmb]);
        }
    }
    enWrd = nwEn; arWrd = nwAr; frWrd = nwFr;

    gebi('nmbWrd').innerText = enWrd.length;
    document.querySelectorAll('.ch input').forEach(el => {
        let ln = el.value;
        el.addEventListener('change', () => {
            if (el.checked) {
                chcd('inline-block', '', 1)
            } else {
                if (nmCh < 2) {
                    el.checked = true; return false
                }
                chcd('none', 'n', -1)
            }
            dsply('plWt', 'block');
            el.disabled = true;
            setTimeout(()=> {
                lstWrd(); stWrd(); dsply('plWt', 'none');
                el.disabled = false
            }, 100)
        });
        function chcd(dsp,
            n,
            nm) {
            ds[ln] = n; nmCh += nm;
            document.querySelectorAll('.'+ln).forEach(chnCl => {
                chnCl.style.display = dsp
            });
            localStorage['ch' + el.id] = dsp
        }

        if (localStorage['ch' + el.id] == 'none') {
            chcd('none', 'n', -1); el.checked = false
        }

    });

    lstWrd(); stWrd();
    gebi('clVu').innerHTML += `<iframe src="https://maktaeliliktroniya.blogspot.com/2022/08/typing-speed.html"
    frameborder="0"></iframe>`;
    dsply('clVu',
        'none')
}

/* ////// create list words */
function lstWrd() {
    let cntWrd = gebi('cntWrds'), dvWrd = ``, i = 0;

    function lpng(cnt) {
        for (; i < cnt; i++) {
            dvWrd += `<div id="wrdDiv${i}">${inDv(i)}</div>`;
        }
    }

    lpng(enWrd.length);
    dvWrd += `<div id="spdlt" class="add aldlt"onclick="opnDiv('dltAll','yesbtn')" >delete all</div>`;
    cntWrd.innerHTML = "";
    cntWrd.innerHTML = dvWrd;

    gebi('nmbWrd').innerText = enWrd.length;
}

function stWrd() {
    if (nmbr == enWrd.length) {
        nmbr = 0
    }
    inTxt('lng0', arWrd[nmbr]);
    inTxt('lng1', enWrd[nmbr]); inTxt('lng2', frWrd[nmbr]);
}


/* ////// short function \\\\\\\\\\ */
function ind(inpt, pr, pr2 = 0) {
    inpt = inpt.indexOf(pr, pr2); return inpt
}
function gebi(pr) {
    return document.getElementById(pr)
}
function dsply(id, dsply) {
    gebi(id).style.display = dsply
}
function stToDiv(lng) {
    let Hist = localStorage['stWrd' + lng]; Hist = Hist.split('@#'); return Hist
}
function wToSt(lng, lsWrd) {
    localStorage['stWrd' + lng] = lsWrd.join('@#')
}
function rep(inp, pr1, pr2) {
    return inp.replaceAll(pr1, pr2)
}
function fxClk(id) {
    gebi(id).focus(); gebi(id).click()
}
function rinTxt(id) {
    return gebi(id).innerText
}
function inTxt(id, vl) {
    gebi(id).innerText = vl
}
function alvlin() {
    return rinTxt('nwAr')+rinTxt('nwEn')+rinTxt('nwFr')}

async function allWrd() {
    function strg(st) {
        return localStorage.getItem(st)}
    if (strg('stWrdAr') || strg('stWrdEn') || strg('stWrdFr')) {
        enWrd = stToDiv('En'); arWrd = stToDiv('Ar'); frWrd = stToDiv('Fr');
    } else {
        await fetch("https://raw.githubusercontent.com/tpspd/tpspd.github.io/main/atr/wrds.json")
        .then(rs => rs.json())
        .then(rp => {
            enWrd = rp.enWrd; arWrd = rp.arWrd; frWrd = rp.frWrd;
            wToSt('En', enWrd); wToSt('Ar', arWrd); wToSt('Fr', frWrd);


        })
    }
    cntn()
}
