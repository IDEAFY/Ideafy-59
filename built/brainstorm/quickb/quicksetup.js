/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Bind.plugin","Event.plugin","service/config","CouchDBDocument","Store","Promise","service/cardpopup","service/help","service/utils","lib/spin.min"],function(e,t,s,i,n,a,o,r,d,c,l,u){return function(p,g,m,v,h){var b,f,w=new e,y=t.get("quicksetup"),L=n.get("labels"),S=n.get("transport"),k=n.get("db"),T=(n.get("user"),{}),x=new o({timer:null,display:!1}),q=new o({"char":{selected:!1,left:null,popup:!1},context:{selected:!1,left:null,popup:!1},problem:{selected:!1,left:null,popup:!1}}),A=new o({"char":{id:"",title:L.get("char"),pic:""},context:{id:"",title:L.get("context"),pic:""},problem:{id:"",title:L.get("problem"),pic:""}}),M={"char":0,context:0,problem:0},I=!0,D={"char":new o,context:new o,problem:new o},H="",N=null,_=0,C="step",P=new u({color:"#657B99",lines:10,length:8,width:4,radius:8,top:373,left:373}).spin();return w.plugins.addAll({labels:new s(L),quicksetup:new s(q,{setReload:function(e){0===e?this.classList.add("reload"):this.classList.remove("reload")},updateNext:function(){q.get("char").selected&&q.get("context").selected&&q.get("problem").selected?this.classList.remove("invisible"):this.classList.add("invisible")},popup:function(e){e?this.classList.add("highlighted"):this.classList.remove("highlighted")},setSelected:function(e){e?this.classList.add("pushed"):this.classList.remove("pushed")}}),quicksetuptimer:new s(x,{setTime:function(e){this.innerHTML=l.formatDuration(e)},displayTimer:function(e){e?this.classList.add("showtimer"):this.classList.remove("showtimer")}}),quicksetupcards:new s(A,{removeDefault:function(e){e?this.classList.remove("defaultcard"):this.classList.add("defaultcard")},formatTitle:function(e){this.innerHTML=e?e.substring(0,1).toUpperCase()+e.substring(1).toLowerCase():e},setPic:function(e){var t=this;e?e.search("img/decks")>-1?this.setAttribute("style","background-image:url('"+e+"');"):(json={dir:"cards",filename:e},n.get("transport").request("GetFile",json,function(e){t.setAttribute("style","background:white; background-image: url('"+e+"'); background-repeat: no-repeat; background-position: center center; background-size:contain;")})):this.setAttribute("style","background-image: none;")}}),quicksetupevent:new i(w)}),w.template='<div id = "quicksetup"><div class="previousbutton" data-quicksetupevent="listen: mousedown, press; listen: mousedown, prev"></div><div id="quicksetup-popup" class="invisible"></div><div class="brainstorm-header header blue-light" data-labels="bind: innerHTML, quicksetup" data-quicksetupevent="listen:mousedown, toggleProgress"></div><div class="timer" data-quicksetuptimer="bind:setTime, timer; bind: displayTimer, display" data-quicksetupevent="listen:mousedown,toggleTimer"></div><div class="help-brainstorm" data-quicksetupevent="listen:mousedown, help"></div><div class="drawarea"><div class="decks"><div class="drawbutton drawchar" name="char" data-quicksetupevent="listen: mousedown, push; listen:mouseup, draw" data-quicksetup="bind: setReload, char.left"></div><div class="drawbutton drawcontext" name="context" data-quicksetupevent="listen: mousedown, push; listen:mouseup, draw" data-quicksetup="bind:setReload, context.left"></div><div class="drawbutton drawproblem" name="problem" data-quicksetupevent="listen: mousedown, push; listen:mouseup, draw" data-quicksetup="bind:setReload, problem.left"></div></div><div class="cards"><div class="card char defaultcard" name="char" data-quicksetupevent="listen:mousedown, zoom" data-quicksetupcards="bind:removeDefault, char.pic" data-quicksetup="bind: popup, char.popup"><div class="cardpicture" data-quicksetupcards="bind: setPic, char.pic"></div><div class="cardtitle" data-quicksetupcards="bind:formatTitle, char.title">Character</div></div><div class="card context defaultcard" name="context" data-quicksetupevent="listen:mousedown, zoom" data-quicksetupcards="bind:removeDefault, context.pic" data-quicksetup="bind: popup, context.popup"><div class="cardpicture" data-quicksetupcards="bind: setPic, context.pic"></div><div class="cardtitle" data-quicksetupcards="bind:formatTitle, context.title">Context</div></div><div class="card problem defaultcard" name="problem" data-quicksetupevent="listen:mousedown, zoom" data-quicksetupcards="bind:removeDefault, problem.pic" data-quicksetup="bind: popup, problem.popup"><div class="cardpicture" data-quicksetupcards="bind: setPic, problem.pic"></div><div class="cardtitle" data-quicksetupcards="bind:formatTitle, problem.title">Problem</div></div></div><div class="confirmdraw"><div class="drawok" name="char" data-quicksetup="bind:setSelected, char.selected" data-quicksetupevent="listen: mousedown, push; listen:mouseup, accept"></div><div class="drawok" name="context" data-quicksetup="bind:setSelected, context.selected" data-quicksetupevent="listen: mousedown, push; listen:mouseup, accept"></div><div class="drawok" name="problem" data-quicksetup="bind:setSelected, problem.selected" data-quicksetupevent="listen: mousedown, push; listen:mouseup, accept"></div></div><div class="next-button invisible" data-labels="bind:innerHTML, nextbutton" data-quicksetupevent="listen: mousedown, press; listen:mouseup, next" data-quicksetup="bind:updateNext, char.selected;bind:updateNext, context.selected;bind:updateNext, problem.selected"></div></div></div>',w.place(y),w.press=function(e,t){t.classList.add("pressed")},w.next=function(e,t){P.spin(t.parentNode),t.classList.add("invisible"),t.classList.remove("pressed"),"step"===C?(C="screen",g.set("characters",A.get("char")),g.set("contexts",A.get("context")),g.set("problems",A.get("problem")),clearInterval(f),x.set("display",!0),w.updateSessionScore(x.get("timer")).then(function(){return p.unsync(),p.sync(n.get("db"),p.get("_id"))}).then(function(){p.set("elapsedTimers",{quicksetup:x.get("timer")}),p.set("characters",[A.get("char").id]),p.set("contexts",[A.get("context").id]),p.set("problems",[A.get("problem").id]),v("quicksetup")})):v("quicksetup")},w.stopSpinner=function(){P.stop(),w.dom.querySelector(".next-button").classList.remove("invisible")},w.help=function(){c.setContent("quicksetuphelp"),document.getElementById("cache").classList.add("appear"),document.getElementById("help-popup").classList.add("appear")},w.prev=function(e,t){t.classList.remove("pressed"),m("quicksetup")},w.toggleProgress=function(){h()},w.toggleTimer=function(){x.set("display",!x.get("display"))},w.push=function(e,t){"screen"!==C&&t.classList.add("pushed")},w.draw=function(e,t){var s=t.getAttribute("name"),i=q.get(s);_now=new Date,"step"===C&&I&&(0===i.left&&(T[s]=g.get("deck")[s].concat(),i.left=T[s].length,q.set(s,i)),i.selected&&alert("please unlock selected card first"),I&&!i.selected&&(I=!1,i.selected===!1?w.drawCard(s).then(function(){var e=!1;t.classList.remove("pushed"),I=!0,q.loop(function(t){t.popup===!0&&(e=!0)}),e&&w.setPopup(s)}):(t.classList.remove("pushed"),I=!0)))},w.accept=function(e,t){var s=t.getAttribute("name"),i=q.get(s);"step"===C&&(A.get(s).id?i.selected?(i.selected=!1,q.set(s,i)):(i.selected=!0,q.set(s,i)):(i.selected=!1,q.set(s,i)))},w.zoom=function(e,t){var s=t.getAttribute("name");w.setPopup(s)},w.setPopup=function(e){var t={x:0,y:337},s="left",i=q.get(H)||"",n=q.get(e);i&&(i.popup=!1,q.set(H,i)),n.popup=!0,q.set(e,n),H=e,"char"===e&&(t.x=382),"context"===e&&(t.x=102,s="right"),"problem"===e&&(t.x=249,s="right"),D[e].getNbItems()&&b.reset(D[e].toJSON(),t,s,document.getElementById("quicksetup-popup"))},w.closePopup=function(){var e=q.get(H);e.popup=!1,q.set(H,e),H=""},b=new d(w.closePopup),w.initTimer=function(e){var t=new Date,s=t.getTime(),i=e||0;x.set("display",!1),x.set("timer",i),"quicksetup"===p.get("step")&&(f=setInterval(function(){var e=new Date;x.set("timer",i+e.getTime()-s)},1e3))},w.reset=function(e){C="step",e?(_=p.get("elapsedTimers").quicksetup||0,p.get("characters").length?(C="screen",q.reset({"char":{selected:!0,left:1,popup:!1},context:{selected:!0,left:1,popup:!1},problem:{selected:!0,left:1,popup:!1}}),H="",x.set("timer",_),x.set("display",!0),w.getDeck(p.get("deck")).then(function(){return w.getCard(p.get("characters")[0],D.char)}).then(function(){var e=D.char;return A.set("char",{id:e.get("_id"),title:e.get("title"),pic:e.get("picture_file")}),g.set("characters",A.get("char")),w.getCard(p.get("contexts")[0],D.context)}).then(function(){var e=D.context;return A.set("context",{id:e.get("_id"),title:e.get("title"),pic:e.get("picture_file")}),g.set("contexts",A.get("context")),w.getCard(p.get("problems")[0],D.problem)}).then(function(){var e=D.problem;A.set("problem",{id:e.get("_id"),title:e.get("title"),pic:e.get("picture_file")}),g.set("problems",A.get("problem"))})):(w.init(),w.initTimer(_))):w.init()},w.getDeck=function(e){var t=new r,s=new a;return s.setTransport(S),s.sync(k,e).then(function(){var e,i={},a=n.get("user").get("lang");e=s.get("default_lang")&&s.get("default_lang")!==a?s.get("translations")&&s.get("translations")[a]?s.get("translations")[a]:JSON.parse(s.toJSON()):JSON.parse(s.toJSON()),i.char=e.content.characters,i.context=e.content.contexts,i.problem=e.content.problems,i.techno=e.content.techno,["char","context","problem","techno"].forEach(function(e){"newcard"===i[e][0]&&i[e].shift()}),g.set("deck",i),t.fulfill(),setTimeout(function(){s.unsync()},2e3)}),t},w.getCard=function(e,t){var s=new r,i=new a;return i.setTransport(S),i.sync(k,e).then(function(){t.reset(JSON.parse(i.toJSON())),s.fulfill(),i.unsync()}),s},w.drawCard=function(e){var t=new r,s=q.get(e),i=A.get(e),n=Math.floor(Math.random()*T[e].length),a=T[e][n];return w.getCard(a,D[e]).then(function(){var o=D[e];M[e]++,T[e].splice(n,1),i.id=a,i.title=o.get("title"),i.pic=o.get("picture_file"),A.set(e,i),s.left=T[e].length,q.set(e,s),t.fulfill()}),t},w.updateSessionScore=function(e){var t=new r,s={sid:p.get("_id"),step:"quicksetup",time:e,cards:M.char+M.context+M.problem};return S.request("UpdateSessionScore",s,function(e){"ok"===e.res?t.fulfill():t.reject()}),t},w.init=function(){w.getDeck(n.get("user").get("active_deck")).then(function(){var e=g.get("deck");T.char=e.char.concat(),T.context=e.context.concat(),T.problem=e.problem.concat(),M.char=0,M.context=0,M.problem=0,D={"char":new o,context:new o,problem:new o},H="",I=!0,N=null,A.reset({"char":{id:"",title:L.get("char"),pic:""},context:{id:"",title:L.get("context"),pic:""},problem:{id:"",title:L.get("problem"),pic:""}}),q.reset({"char":{selected:!1,left:null,popup:!1},context:{selected:!1,left:null,popup:!1},problem:{selected:!1,left:null,popup:!1}})})},w}});