/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Bind.plugin","Place.plugin","Event.plugin","service/config","CouchDBDocument","Store","Promise","service/cardpopup","service/help","service/utils","lib/spin.min","./mubchat"],function(e,t,s,i,n,a,o,r,l,d,c,u,p,g){return function(t,m,v,h,b){var f,w,y=new e,L=new g,S=a.get("labels"),T=a.get("transport"),k=a.get("db"),x=a.get("user"),A={},M=new r({timer:null,display:!1}),I=new r({"char":{selected:!1,left:null,popup:!1},context:{selected:!1,left:null,popup:!1},problem:{selected:!1,left:null,popup:!1}}),D=new r({"char":{id:"",title:S.get("char"),pic:""},context:{id:"",title:S.get("context"),pic:""},problem:{id:"",title:S.get("problem"),pic:""}}),_={"char":0,context:0,problem:0},H=!0,C={"char":new r,context:new r,problem:new r},N="",q=0,P="step",O=new p({color:"#657B99",lines:10,length:8,width:4,radius:8,top:337,left:490}).spin(),B={};return y.plugins.addAll({labels:new s(S),musetup:new s(I,{setReload:function(e){0===e?this.classList.add("reload"):this.classList.remove("reload")},updateNext:function(){"step"===P&&I.get("char").selected&&I.get("context").selected&&I.get("problem").selected&&x.get("_id")===t.get("initiator").id?this.classList.remove("invisible"):this.classList.add("invisible")},popup:function(e){e?this.classList.add("highlighted"):this.classList.remove("highlighted")},setSelected:function(e){e?this.classList.add("pushed"):this.classList.remove("pushed")}}),musetuptimer:new s(M,{setTime:function(e){e&&(this.innerHTML=u.formatDuration(e))},displayTimer:function(e){e?this.classList.add("showtimer"):this.classList.remove("showtimer")}}),musetupcards:new s(D,{removeDefault:function(e){e?this.classList.remove("defaultcard"):this.classList.add("defaultcard")},formatTitle:function(e){this.innerHTML=e?e.substring(0,1).toUpperCase()+e.substring(1).toLowerCase():e},setPic:function(e){var t=this;e?e.search("img/decks")>-1?this.setAttribute("style","background-image:url('"+e+"');"):(json={dir:"cards",filename:e},a.get("transport").request("GetFile",json,function(e){t.setAttribute("style","background:white; background-image: url('"+e+"'); background-repeat: no-repeat; background-position: center center; background-size:contain;")})):this.setAttribute("style","background-image: none;")}}),place:new i({chat:L}),musetupevent:new n(y)}),y.template='<div id = "musetup"><div class="previousbutton" data-musetupevent="listen: mousedown, press; listen: mousedown, prev"></div><div id="musetup-popup" class="invisible"></div><div class="brainstorm-header header blue-light" data-labels="bind: innerHTML, musetup" data-musetupevent="listen:mousedown, toggleProgress"></div><div class="timer" data-musetuptimer="bind:setTime, timer; bind: displayTimer, display" data-musetupevent="listen:mousedown,toggleTimer"></div><div class="help-brainstorm" data-musetupevent="listen:mousedown, help"></div><div class="drawarea"><div class="decks"><div class="drawbutton drawchar" name="char" data-musetupevent="listen: mousedown, push; listen:mouseup, draw" data-musetup="bind: setReload, char.left"></div><div class="drawbutton drawcontext" name="context" data-musetupevent="listen: mousedown, push; listen:mouseup, draw" data-musetup="bind:setReload, context.left"></div><div class="drawbutton drawproblem" name="problem" data-musetupevent="listen: mousedown, push; listen:mouseup, draw" data-musetup="bind:setReload, problem.left"></div></div><div class="cards"><div class="card char defaultcard" name="char" data-musetupevent="listen:mousedown, zoom" data-musetupcards="bind:removeDefault, char.pic" data-musetup="bind: popup, char.popup"><div class="cardpicture" data-musetupcards="bind: setPic, char.pic"></div><div class="cardtitle" data-musetupcards="bind:formatTitle, char.title">Character</div></div><div class="card context defaultcard" name="context" data-musetupevent="listen:mousedown, zoom" data-musetupcards="bind:removeDefault, context.pic" data-musetup="bind: popup, context.popup"><div class="cardpicture" data-musetupcards="bind: setPic, context.pic"></div><div class="cardtitle" data-musetupcards="bind:formatTitle, context.title">Context</div></div><div class="card problem defaultcard" name="problem" data-musetupevent="listen:mousedown, zoom" data-musetupcards="bind:removeDefault, problem.pic" data-musetup="bind: popup, problem.popup"><div class="cardpicture" data-musetupcards="bind: setPic, problem.pic"></div><div class="cardtitle" data-musetupcards="bind:formatTitle, problem.title">Problem</div></div></div><div class="confirmdraw"><div class="drawok" name="char" data-musetup="bind:setSelected, char.selected" data-musetupevent="listen: mousedown, pushOk; listen:mouseup, accept"></div><div class="drawok" name="context" data-musetup="bind:setSelected, context.selected" data-musetupevent="listen: mousedown, pushOk; listen:mouseup, accept"></div><div class="drawok" name="problem" data-musetup="bind:setSelected, problem.selected" data-musetupevent="listen: mousedown, pushOk; listen:mouseup, accept"></div></div><div class="next-button invisible" data-labels="bind:innerHTML, nextbutton" data-musetupevent="listen: mousedown, press; listen:mouseup, next" data-musetup="bind:updateNext, char.selected;bind:updateNext, context.selected;bind:updateNext, problem.selected"></div></div><div class="sessionchat" data-place="place:chat"></div></div>',y.press=function(e,t){t.classList.add("pressed")},y.next=function(e,s){O.spin(s.parentNode),s.classList.add("invisible"),s.classList.remove("pressed"),"step"===P?(P="screen",m.set("characters",D.get("char")),m.set("contexts",D.get("context")),m.set("problems",D.get("problem")),clearInterval(w),M.set("display",!0),y.updateSessionScore(M.get("timer")).then(function(){return t.unsync(),t.sync(a.get("db"),t.get("_id"))}).then(function(){L.conclude("next"),t.set("elapsedTimers",{musetup:M.get("timer")}),t.set("characters",[D.get("char").id]),t.set("contexts",[D.get("context").id]),t.set("problems",[D.get("problem").id]),h("musetup")})):h("musetup")},y.stopSpinner=function(){O.stop()},y.help=function(){c.setContent("musetuphelp"),document.getElementById("cache").classList.add("appear"),document.getElementById("help-popup").classList.add("appear")},y.prev=function(e,t){t.classList.remove("pressed"),v("musetup")},y.toggleProgress=function(){b()},y.toggleTimer=function(){t.get("initiator").id===x.get("_id")&&M.set("display",!M.get("display"))},y.push=function(e,s){"screen"!==P&&x.get("_id")===t.get("initiator").id&&s.classList.add("pushed")},y.draw=function(e,s){var i=s.getAttribute("name"),n=I.get(i);_now=new Date,x.get("_id")===t.get("initiator").id&&"step"===P&&H&&(H=!1,0===n.left&&(A[i]=m.get("deck")[i].concat(),n.left=A[i].length,I.set(i,n)),n.selected?(H=!0,alert("please unlock selected card first")):n.selected===!1?y.drawCard(i).then(function(){var e=!1;s.classList.remove("pushed"),H=!0,I.loop(function(t){t.popup===!0&&(e=!0)}),e&&y.setPopup(i)}):(s.classList.remove("pushed"),H=!0))},y.pushOk=function(e,s){var i=B[s.getAttribute("name")]||null;x.get("_id")===t.get("initiator").id&&"step"===P&&(i?B[s.getAttribute("name")].spin(s):B[s.getAttribute("name")]=(new p).spin(s))},y.accept=function(e,s){var i=s.getAttribute("name"),n=I.get(i);"step"===P&&t.get("initiator").id===x.get("_id")&&(n.selected=D.get(i).id?!n.selected:!1,t.unsync(),t.sync(a.get("db"),t.get("_id")).then(function(){return t.set("selected_"+i,n.selected),t.upload()}).then(function(){B[s.getAttribute("name")].stop(),selection.set(i,n)}))},y.zoom=function(e,t){var s=t.getAttribute("name");y.setPopup(s)},y.setPopup=function(e){var t={x:0,y:257},s="left",i=I.get(N)||"",n=I.get(e);i&&(i.popup=!1,I.set(N,i)),n.popup=!0,I.set(e,n),N=e,"char"===e&&(t.x=382),"context"===e&&(t.x=102,s="right"),"problem"===e&&(t.x=249,s="right"),C[e].getNbItems()&&f.reset(C[e].toJSON(),t,s,document.getElementById("musetup-popup"))},y.closePopup=function(){var e=I.get(N);e.popup=!1,I.set(N,e),N=""},f=new d(y.closePopup),y.getChatUI=function(){return L},y.initTimer=function(e){var s=new Date,i=s.getTime(),n=e||0;M.set("timer",n),"musetup"===t.get("step")&&(clearInterval(w),w=setInterval(function(){var e=new Date;M.set("timer",n+e.getTime()-i)},1e3))},y.reset=function(e){L.clear(),t.get("chat")[1]&&L.reset(t.get("chat")[1]),e?(P="screen",L.dom.querySelector(".chatread").classList.add("extended"),q=t.get("elapsedTimers").musetup||0,I.reset({"char":{selected:!0,left:1,popup:!1},context:{selected:!0,left:1,popup:!1},problem:{selected:!0,left:1,popup:!1}}),N="",M.set("timer",q),M.set("display",!0),t.get("characters").length&&y.getDeck(t.get("deck")).then(function(){return y.getCard(t.get("characters")[0],C.char)}).then(function(){var e=C.char;return D.set("char",{id:e.get("_id"),title:e.get("title"),pic:e.get("picture_file")}),m.set("characters",D.get("char")),y.getCard(t.get("contexts")[0],C.context)}).then(function(){var e=C.context;return D.set("context",{id:e.get("_id"),title:e.get("title"),pic:e.get("picture_file")}),m.set("contexts",D.get("context")),y.getCard(t.get("problems")[0],C.problem)}).then(function(){var e=C.problem;D.set("problem",{id:e.get("_id"),title:e.get("title"),pic:e.get("picture_file")}),m.set("problems",D.get("problem"))})):y.init()},y.getDeck=function(e){var t=new l,s=new o;return s.setTransport(T),s.sync(k,e).then(function(){var e,i={},n=a.get("user").get("lang");e=s.get("default_lang")&&s.get("default_lang")!==n?s.get("translations")&&s.get("translations")[n]?s.get("translations")[n]:JSON.parse(s.toJSON()):JSON.parse(s.toJSON()),i.char=e.content.characters,i.context=e.content.contexts,i.problem=e.content.problems,i.techno=e.content.techno,["char","context","problem","techno"].forEach(function(e){"newcard"===i[e][0]&&i[e].shift()}),m.set("deck",i),t.fulfill(),s.unsync()}),t},y.getCard=function(e,t){var s=new l,i=new o;return i.setTransport(T),i.sync(k,e).then(function(){t.reset(JSON.parse(i.toJSON())),s.fulfill(),i.unsync()}),s},y.drawCard=function(e){var s=new l,i=Math.floor(Math.random()*A[e].length),n=A[e][i];return t.set("drawn_"+e,n),t.upload().then(function(){_[e]++,A[e].splice(i,1),s.fulfill()}),s},y.updateDrawnCard=function(e,t){var s,i,n=new l;return e&&t&&(s=I.get(e),i=D.get(e),y.getCard(t,C[e]).then(function(){var a=C[e];i.id=t,i.title=a.get("title"),i.pic=a.get("picture_file"),D.set(e,i),s.left=A[e].length,I.set(e,s),n.fulfill()})),n},y.updateSessionScore=function(e){var s=new l,i={sid:t.get("_id"),step:"musetup",time:e,cards:_.char+_.context+_.problem};return T.request("UpdateSessionScore",i,function(e){"ok"===e.res?s.fulfill():s.reject()}),s},y.init=function(){D.reset({"char":{id:"",title:S.get("char"),pic:""},context:{id:"",title:S.get("context"),pic:""},problem:{id:"",title:S.get("problem"),pic:""}}),I.reset({"char":{selected:!1,left:null,popup:!1},context:{selected:!1,left:null,popup:!1},problem:{selected:!1,left:null,popup:!1}}),_.char=0,_.context=0,_.problem=0,C={"char":new r,context:new r,problem:new r},N="",x.get("_id")===t.get("initiator").id?y.getDeck(t.get("deck")).then(function(){var e=m.get("deck");A.char=e.char.concat(),A.context=e.context.concat(),A.problem=e.problem.concat(),H=!0,y.initTimer()}):M.set("display",!1),P="step"},t.watchValue("drawn_char",function(e){e&&y.updateDrawnCard("char",e)}),t.watchValue("drawn_context",function(e){e&&y.updateDrawnCard("context",e)}),t.watchValue("drawn_problem",function(e){e&&y.updateDrawnCard("problem",e)}),t.watchValue("selected_char",function(e){var t;t=I.get("char"),t.selected=e,I.set("char",t),e&&m.set("characters",D.get("char"))}),t.watchValue("selected_context",function(e){var t;t=I.get("context"),t.selected=e,I.set("context",t),e&&m.set("contexts",D.get("context"))}),t.watchValue("selected_problem",function(e){var t;t=I.get("problem"),t.selected=e,I.set("problem",t),e&&m.set("problems",D.get("problem"))}),t.watchValue("elapsedTimers",function(e){e.musetup&&(M.set("timer",e.musetup),M.set("display",!0))}),y}});