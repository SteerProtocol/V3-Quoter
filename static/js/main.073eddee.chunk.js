(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{284:function(e,t){},312:function(e,t){},353:function(e,t){},355:function(e,t){},379:function(e,t){},381:function(e,t){},393:function(e,t){},408:function(e,t){},411:function(e,t){},414:function(e,t){},416:function(e,t){},508:function(e,t){},521:function(e,t,n){},524:function(e,t,n){"use strict";n.r(t);var a=n(9),r=n.n(a),c=n(259),s=n.n(c),o=n(0),i=n.n(o),u=n(6),l=n(17),b=n(50),d=n(166),f=n(163),j=n(274),m=n(272),p=n.n(m),h="460f40a260564ac4a4f4b3fffb032dad",x="kovan";var O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(a.useState)(),n=Object(l.a)(t,2),r=n[0],c=n[1],s=Object(a.useState)(),o=Object(l.a)(s,2),b=o[0],d=o[1],m=Object(a.useState)(!1),O=Object(l.a)(m,2),v=O[0],g=O[1],k=e.autoLoad,w=void 0===k||k,C=e.infuraId,F=void 0===C?h:C,y=e.network,N=void 0===y?x:y,S=Object(a.useMemo)((function(){return new p.a({network:N,cacheProvider:!0,providerOptions:{walletconnect:{package:j.a,options:{infuraId:F}}}})}),[F,N]),E=Object(a.useCallback)(Object(u.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.connect();case 2:return t=e.sent,c(new f.a(t)),e.next=6,window.ethereum.request({method:"eth_requestAccounts"});case 6:n=e.sent,d(n[0]);case 8:case"end":return e.stop()}}),e)}))),[S]),A=Object(a.useCallback)(Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.clearCachedProvider();case 2:window.location.reload();case 3:case"end":return e.stop()}}),e)}))),[S]);return Object(a.useEffect)((function(){null!==r&&function(){var e=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("provider",r),d("0xabcE56CF919319a323843E682C6e62F25E728612");case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[r]),Object(a.useEffect)((function(){w&&!v&&S.cachedProvider&&(E(),g(!0))}),[w,v,E,g,S.cachedProvider]),[r,b,E,A]},v=n.e(3).then(n.t.bind(null,532,3)),g=function(){var e=Object(u.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={},e.next=3,v;case 3:if(e.t1=t=e.sent.default,e.t0=null!==e.t1,!e.t0){e.next=7;break}e.t0=void 0!==t;case 7:if(!e.t0){e.next=11;break}e.t2=t,e.next=12;break;case 11:e.t2={};case 12:return n.deployedContracts=e.t2,e.abrupt("return",n);case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(a.useState)({}),t=Object(l.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){(function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g();case 2:t=e.sent,r(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),n},w=(n(521),n(15)),C=n(523).abi,F=[{symbol:"WETH",address:"0xd0A1E359811322d97991E03f863a0C30C2cF029C"},{symbol:"DAI",address:"0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"},{symbol:"LINK",address:"0xa36085F69e2889c224210F603D836748e7dC0088"},{symbol:"UNI",address:"0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"},{symbol:"MKR",address:"0xAaF64BFCC32d0F15873a02163e7E500671a4ffcD"}];var y=function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(!1),s=Object(l.a)(c,2),o=s[0],f=s[1],j=Object(a.useState)(0),m=Object(l.a)(j,2),p=m[0],h=m[1],x=Object(a.useState)(""),v=Object(l.a)(x,2),g=v[0],y=v[1],N=Object(a.useState)(!1),S=Object(l.a)(N,2),E=S[0],A=S[1],U=Object(a.useState)(),D=Object(l.a)(U,2),T=D[0],M=D[1],B=Object(a.useState)(),I=Object(l.a)(B,2),L=I[0],P=I[1],q=Object(a.useState)(),Q=Object(l.a)(q,2),V=Q[0],_=Q[1],H=O(),J=Object(l.a)(H,4),K=J[0],Y=(J[1],J[2]),R=(J[3],k()),W=Object(d.d)(K),z=Object(d.c)(W.signer,R,42);Object(a.useEffect)((function(){}),[]);var G=function(e){r(e),setTimeout((function(){r("")}),5e3)},X=function(e){y(e),setTimeout((function(){y("")}),1e4)},Z=function(){var e=Object(u.a)(i.a.mark((function e(){var t,n,a,r,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(p<=0)){e.next=3;break}return G("Amount cannot be 0 or negative"),e.abrupt("return");case 3:return A(!0),Y(),e.prev=5,e.next=8,z.Quoter.doesPoolExist(T,L);case 8:if(e.sent){e.next=13;break}G("Pool does not exist"),e.next=34;break;case 13:if(t=b.a.utils.parseEther(p),n=new b.a.Contract("0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",C,K),a=0,r=0,o){e.next=26;break}return e.next=20,z.Quoter.estimateMaxSwapUniswapV3(T,L,t,V);case 20:return a=e.sent,e.next=23,n.callStatic.quoteExactInputSingle(T,L,V,t,0);case 23:r=e.sent,e.next=32;break;case 26:return e.next=28,z.Quoter.estimateMinSwapUniswapV3(L,T,t,V);case 28:return a=e.sent,e.next=31,n.callStatic.quoteExactOutputSingle(T,L,V,t,0);case 31:r=e.sent;case 32:c="You would ".concat(o?"give":"receive"," ").concat(b.a.utils.formatUnits(a,18)," tokens. Uniswap lens quoter returned ").concat(b.a.utils.formatUnits(r,18)," tokens."),X(c);case 34:e.next=40;break;case 36:e.prev=36,e.t0=e.catch(5),console.log(e.t0),G("MetaMask Provider Error");case 40:A(!1);case 41:case"end":return e.stop()}}),e,null,[[5,36]])})));return function(){return e.apply(this,arguments)}}();return Object(w.jsx)("main",{className:"text-center form-signin",children:Object(w.jsxs)("form",{children:[Object(w.jsx)("img",{className:"mb-4",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Uniswap_Logo.svg/1026px-Uniswap_Logo.svg.png",alt:"Uniswap logo",width:"72",height:"72"}),Object(w.jsx)("h1",{className:"mb-3 h3 fw-normal",children:"Uniswap V3 Quoter"}),Object(w.jsxs)("div",{className:"mb-3 btn-group",role:"group",children:[Object(w.jsx)("input",{type:"radio",className:"btn-check",name:"btnradio",id:"buy",onChange:function(){return f(!0)},autoComplete:"off",checked:o}),Object(w.jsx)("label",{className:"btn btn-outline-primary",htmlFor:"buy",children:"BUY"}),Object(w.jsx)("input",{type:"radio",className:"btn-check",name:"btnradio",id:"sell",onChange:function(){return f(!1)},autoComplete:"off",checked:!o}),Object(w.jsx)("label",{className:"btn btn-outline-primary",htmlFor:"sell",children:"SELL"})]}),Object(w.jsxs)("div",{className:"form-floating",children:[Object(w.jsxs)("select",{className:"form-select",id:"floatingSourceToken",value:T,onChange:function(e){return M(e.target.value)},children:[Object(w.jsx)("option",{children:"Choose..."}),F.filter((function(e){return e.address!==L})).map((function(e,t){return Object(w.jsx)("option",{value:e.address,children:e.symbol},t)}))]}),Object(w.jsx)("label",{htmlFor:"floatingSourceToken",children:"Source Token"})]}),Object(w.jsxs)("div",{className:"form-floating",children:[Object(w.jsxs)("select",{className:"form-select",id:"floatingDestToken",value:L,onChange:function(e){return P(e.target.value)},children:[Object(w.jsx)("option",{children:"Choose..."}),F.filter((function(e){return e.address!==T})).map((function(e,t){return Object(w.jsx)("option",{value:e.address,children:e.symbol},t)}))]}),Object(w.jsx)("label",{htmlFor:"floatingDestToken",children:"Destination Token"})]}),Object(w.jsxs)("div",{className:"form-floating",children:[Object(w.jsx)("input",{type:"number",className:"form-control",id:"floatingAmount",value:p,onChange:function(e){return h(e.target.value)}}),Object(w.jsxs)("label",{htmlFor:"floatingAmount",children:[!o&&Object(w.jsx)(w.Fragment,{children:"Amount in source tokens"}),o&&Object(w.jsx)(w.Fragment,{children:"Amount in destination tokens"})]})]}),Object(w.jsxs)("div",{className:"form-floating",children:[Object(w.jsxs)("select",{className:"form-select",id:"floatingFee",onChange:function(e){return _(e.target.value)},children:[Object(w.jsx)("option",{children:"Choose..."}),[500,3e3,1e4].map((function(e,t){return Object(w.jsx)("option",{value:e,children:(e/1e4).toFixed(2)+"%"},t)}))]}),Object(w.jsx)("label",{htmlFor:"floatingFee",children:"Fee"})]}),Object(w.jsx)("br",{}),!E&&Object(w.jsx)("button",{className:"w-100 btn btn-lg btn-primary",type:"button",onClick:function(){return Z()},children:"Quote"}),E&&Object(w.jsxs)("button",{className:"w-100 btn btn-lg btn-primary",type:"button",disabled:!0,children:[Object(w.jsx)("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"}),"\xa0Loading..."]}),""!==g&&Object(w.jsx)("div",{className:"alert alert-primary text-wrap",role:"alert",children:g}),""!==n&&Object(w.jsx)("div",{className:"alert alert-danger text-wrap",role:"alert",children:n}),Object(w.jsx)("p",{className:"mt-5 mb-3 text-muted",children:"Made for Unicode Hack - v1.0.1"})]})})};s.a.render(Object(w.jsx)(r.a.StrictMode,{children:Object(w.jsx)(y,{})}),document.getElementById("root"))}},[[524,1,2]]]);
//# sourceMappingURL=main.073eddee.chunk.js.map