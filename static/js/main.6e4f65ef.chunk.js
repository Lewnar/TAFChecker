(this.webpackJsonptafchecker=this.webpackJsonptafchecker||[]).push([[0],[,,,,function(t,e,a){t.exports=a(11)},,,,,function(t,e,a){},function(t,e,a){},function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),c=a(2),u=a.n(c),l=(a(9),a(3)),o=(a(10),function(t){var e=r.a.useState(""),a=Object(l.a)(e,2),n=a[0],c=a[1],u=/\n/,o=/\s/,i=/(TAF)/,s=/(AMD)/,h=/(COR)/,m=/[A-Z]{4}/,p=/[0-9]{6}[Z]/,v=/(BECMG)/,f=/(TEMPO)/,d=/[0-3][0-9][0-2][0-9][/][0-3][0-9][0-2][0-9]/,y=/([0-3][0-9][0]|(VRB))[0-9][0-9]((KT)|(G)[0-9][0-9](KT))/,T=/((9999)|(9000)|(8000)|(7000)|(6000)|(5000)|(4800)|(4700)|(4500)|(4400)|(4000)|(3700)|(3600)|(3400)|(3200)|(3000)|(2800)|(2600)|(2400)|(2200)|(2000)|(1800)|(1700)|(1600)|(1500)|(1400)|(1300)|(1200)|(1100)|(1000)|(0900)|(0800)|(0700)|(0600)|(0500)|(0400)|(0300)|(0200)|(0100)|(0000)|([-]0200))/,S=/((RA)|([-]RA)|([+]RA)|(SN)|([-]SN)|([+]SN)|(TS)|([-]TS)|([+]TS)|(TSRA)|([-]TSRA)|([+]TSRA))/,E=/((SKC)|(((FEW)|(SCT)|(BKN)|(OVC))([0-9]{3}|[0-9]{3}(CB)))|((VV)[0-9]{3}))/,N=/(QNH)[0-9]{4}(INS)/,w=/(6)[0-9]{5}/,b=/((5)[0-9]{5})/,A=/((((TX)[0-9]{2})|((TXM)[0-9]{2}))[/][0-3][0-9][0-2][0-9](Z))/,C=/(((((TN)[0-9]{2})|((TNM)[0-9]{2}))[/][0-3][0-9][0-2][0-9](Z)))/,g=function(t){var e=t.split(u),a=[],n=!0,r=!1,c=void 0;try{for(var l,i=e[Symbol.iterator]();!(n=(l=i.next()).done);n=!0){var s=l.value.split(o);a.push(I(s))}}catch(h){r=!0,c=h}finally{try{n||null==i.return||i.return()}finally{if(r)throw c}}return a},k=function(t){var e=[],a=function(t){var e=t[0].slice(1,2),a=t[0].slice(6),n=[],r=[],c=!0,u=!1,l=void 0;try{for(var o,v=e[Symbol.iterator]();!(c=(o=v.next()).done);c=!0){var f=o.value;f.match(s)?(r.push(i,s,m,p,d,y,T),a=t[0].slice(7)):f.match(h)?(r.push(i,h,m,p,d,y,T),a=t[0].slice(7)):r.push(i,m,p,d,y,T)}}catch(M){u=!0,l=M}finally{try{c||null==v.return||v.return()}finally{if(u)throw l}}var g=!0,k=!1,x=void 0;try{for(var B,I=a[Symbol.iterator]();!(g=(B=I.next()).done);g=!0){var R=B.value;R.match(S)?n.push(S):R.match(E)?n.push(E):R.match(N)?n.push(N):R.match(w)?n.push(w):R.match(b)?n.push(b):R.match(A)?n.push(A):R.match(C)?n.push(C):n.push("")}}catch(M){k=!0,x=M}finally{try{g||null==I.return||I.return()}finally{if(k)throw x}}return r.concat(n)}(t),n=function(n){var r=parseInt(n),c=t[r],u=[];u=0===r?a:function(t){var e=t.slice(0,1),a=[],n=[],r=!0,c=!1,u=void 0;try{for(var l,o=e[Symbol.iterator]();!(r=(l=o.next()).done);r=!0){var i=l.value,s=t.slice(4);if(i.match(v)){n.push(v,d,y,T);var h=!0,m=!1,p=void 0;try{for(var g,k=s[Symbol.iterator]();!(h=(g=k.next()).done);h=!0){var x=g.value;x.match(S)?a.push(S):x.match(E)?a.push(E):x.match(N)?a.push(N):x.match(w)?a.push(w):x.match(b)?a.push(b):x.match(A)?a.push(A):x.match(C)?a.push(C):a.push("")}}catch(H){m=!0,p=H}finally{try{h||null==k.return||k.return()}finally{if(m)throw p}}}else{n.push(f,d),s=t.slice(2);var B=!0,I=!1,R=void 0;try{for(var M,O=s[Symbol.iterator]();!(B=(M=O.next()).done);B=!0){var F=M.value;F.match(y)?a.push(y):F.match(T)?a.push(T):F.match(S)?a.push(S):F.match(E)?a.push(E):F.match(N)?a.push(N):F.match(w)?a.push(w):F.match(b)?a.push(b):F.match(A)?a.push(A):F.match(C)?a.push(C):a.push("")}}catch(H){I=!0,R=H}finally{try{B||null==O.return||O.return()}finally{if(I)throw R}}}}}catch(H){c=!0,u=H}finally{try{r||null==o.return||o.return()}finally{if(c)throw u}}return n.concat(a)}(c);var l=c.map((function(t,e){var a,n,c=(n=r,!(a=t).match(d)||9!==a.length||0!==n||24-parseInt(a.slice(2,4))+parseInt(a.slice(7))===30);return!!(u[e]&&u[e].test(t)&&c)}));e.push(l)};for(var r in t)n(r);return e},x=function(t,e){var a=document.createElement("div");for(var n in t){var r="";for(var c in t[n])r=e[n][c]?r+" "+t[n][c]:r+" "+'<span style="background:red">'.concat(t[n][c],"</span>");var u=document.createElement("div");n>0&&u.classList.add("indent"),u.innerHTML=r,a.appendChild(u)}return a},B=function(t){var e=document.getElementById("output");e.innerHTML="",e.appendChild(t)},I=function(t){return t.filter((function(t){return""!==t}))};return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"Header"},"TAF Checker"),r.a.createElement("div",{className:"Taf-Webpage"},r.a.createElement("div",{className:"Taf-Input"},r.a.createElement("textarea",{className:"TAF-Check",rows:"10",cols:"100",onChange:function(t){c(t.target.value)}})),r.a.createElement("div",{className:"taf-button"},r.a.createElement("button",{className:"button",onClick:function(t){!function(t){var e=g(n),a=k(e),r=x(e,a);B(r)}()}},"Check Taf")),r.a.createElement("div",{id:"p1",className:"Taf-Output"},r.a.createElement("p",null,"Info Area"),r.a.createElement("div",{id:"output",className:"App-text"}))),r.a.createElement("div",{className:"footer"},"Copyright \xa9 By Shaun Lewis (2019 - 2020)"))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(o,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[4,1,2]]]);
//# sourceMappingURL=main.6e4f65ef.chunk.js.map