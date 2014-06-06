/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Amy/Stack-plugin","Bind.plugin","Event.plugin","./mustart","./musetup","./muscenario","./mutech","./muidea","./muwrapup","CouchDBDocument","service/config","Promise","Store","lib/spin.min","Place.plugin","service/confirm","service/utils"],function(e,t,s,i,n,a,o,r,l,d,c,u,g,p,m,v,h,b,f){return function(t){var w,y,L,S,T,k,A,M=new e,I=new e,D=(document.createDocumentFragment(),new s),H=g.get("labels"),C=[{name:"mustart",label:H.get("quickstepstart"),currentStep:!1,status:"done"},{name:"musetup",label:H.get("quickstepsetup"),currentStep:!1,status:null},{name:"muscenario",label:H.get("quickstepscenario"),currentStep:!1,status:null},{name:"mutech",label:H.get("quicksteptech"),currentStep:!1,status:null},{name:"muidea",label:H.get("quickstepidea"),currentStep:!1,status:null},{name:"muwrapup",label:H.get("quickstepwrapup"),currentStep:!1,status:null}],_=new m(C),q=g.get("user"),x=g.get("db"),N=new u,P=new m,E=new m({msg:""}),B={listener:null},O=new v({color:"#9AC9CD",lines:10,length:20,width:8,radius:15}).spin();return I.plugins.addAll({labels:new i(H),step:new i(_,{setCurrent:function(e){e?this.classList.add("pressed"):this.classList.remove("pressed")},setActive:function(e){e?this.classList.remove("inactive"):this.classList.add("inactive")}}),progressevent:new n(I)}),I.template='<div class = "progressbar invisible"><ul id = "musteplist" class="steplist" data-step="foreach"><li class="step inactive" data-step="bind: innerHTML, label; bind:setCurrent, currentStep; bind:setActive, status" data-progressevent="listen: mousedown, changeStep"></li></ul><div class="exit-brainstorm" data-progressevent="listen: mousedown, press; listen:mouseup, exit"></div></div>',I.changeStep=function(e,t){var s=t.getAttribute("data-step_id");_.get(s).status?(_.loop(function(e,t){s==t?_.update(t,"currentStep",!0):_.update(t,"currentStep",!1)}),D.getStack().show(_.get(s).name)):e.stopImmediatePropagation()},I.press=function(e,t){t.classList.add("pressed")},I.exit=function(e,s){s.classList.remove("pressed"),q.get("sessionInProgress").id!==N.get("_id")?t():"muwrapup"===N.get("step")?N.get("initiator").id===q.get("_id")?k.getChatUI().setMessage("end").then(function(){return q.set("sessionInProgress",""),q.upload()}).then(function(){t(),document.removeEventListener("mousedown",B.listener,!0)}):(k.getChatUI().leave(),q.set("sessionInProgress",""),q.upload().then(function(){t(),document.removeEventListener("mousedown",B.listener,!0)})):M.leave()},M.template='<div id="musession"><div data-place="place:progress"></div><div class="sessionmsg invisible"> <span data-info="bind:innerHTML, msg"></div><div class="stack" data-musessionstack="destination"></div></div>',M.plugins.addAll({musessionstack:D,place:new h({progress:I}),info:new i(E)}),M.toggleProgress=function(e){e?I.exit():I.dom.classList.toggle("invisible")},A=function(e){e?"muwrapup"!==N.get("step")?(q.set("sessionInProgress",""),q.upload(),N.get("initiator").id===user.get("_id")?M.cancelSession():M.leaveSession()):(b.hide(),M.exitSession()):b.hide()},M.exitSession=function(){N.get("initiator").id===q.get("_id")?k.getChatUI().setMessage("end").then(function(){return q.set("sessionInProgress",""),q.upload()}).then(function(){M.goToScreen()}):(k.getChatUI().leave(),q.set("sessionInProgress",""),q.upload().then(function(){t()}))},M.goToScreen=function(){var e;t(),document.removeEventListener("mousedown",B.listener,!0),exitDest.getAttribute&&exitDest.getAttribute("data-notify_id")?(g.get("observer").notify("goto-screen","#connect"),e=exitDest.getAttribute("data-notify_id"),observer.notify("display-message",parseInt(e,10))):["#public","#library","#brainstorm","#connect","#dashboard"].forEach(function(e){exitDest===e&&g.get("observer").notify("goto-screen",e)})},M.leaveSession=function(){var e,s=N.get("participants"),i=D.getStack().get(N.get("step"));for(e=s.length-1;e>=0;e--)if(s[e].id===q.get("_id")){s.splice(e,1);break}N.set("participants",s),N.upload().then(function(){i.getChatUI().leave(),N.unsync(),b.hide()}),q.set("sessionInProgress",""),q.upload().then(function(){t(),document.removeEventListener("mousedown",B.listener,!0)})},M.cancelSession=function(){var e=5e3;M.displayInfo("deleting",e).then(function(){t(),document.removeEventListener("mousedown",B.listener,!0)})},M.displayInfo=function(e,t){var s,i=document.querySelector(".sessionmsg"),n=new p,a=function(){i.classList.add("invisible"),clearInterval(s),E.set("msg",""),n.fulfill()};return b.hide(),i.classList.remove("invisible"),s=setInterval(function(){switch(e){case"deleting":E.set("msg",H.get("deletingsession")+t/1e3+"s");break;case"participantsleft":E.set("msg",H.get("participantsleft")+" "+t/1e3+"s");break;default:e!==E.get("msg")&&E.set("msg",e)}0>=t&&a(),t-=1e3},1e3),("deleting"===e||"participantsleft"===e)&&(N.set("status","deleted"),N.upload().then(function(){return q.set("sessionInProgress",""),q.upload()}).then(function(){var e=N.get("chat"),t=e.length,s=new p;return t?e.forEach(function(e){var i=new u;i.setTransport(g.get("transport")),i.sync(x,e).then(function(){return i.remove()}).then(function(){t--,0>=t&&s.fulfill})}):s.fulfill(),s}).then(function(){N.remove()})),n},M.createChat=function(e){var t,s,i=new u,n=(new Date).getTime(),a=[],o=new p;switch(a.push({username:N.get("initiator").username,userid:N.get("initiator").id}),N.get("participants").forEach(function(e){a.push({username:e.username,userid:e.id})}),i.set("users",a),e){case 1:t="quicksetup";break;case 2:t="quickscenario";break;case 3:t="quicktech";break;case 4:t="quickidea";break;case 5:t="quickwrapup";break;default:t="quickstart"}return i.set("msg",[{user:"SYS",type:5,arg:t,time:n}]),i.set("sid",N.get("_id")),i.set("lang",N.get("lang")),i.set("readonly",!1),i.set("step",e),i.set("type",17),s=i.get("sid")+"_"+e,i.setTransport(g.get("transport")),i.sync(x,s).then(function(){return i.upload()}).then(function(){var e=N.get("chat").concat();i.unsync(),e.push(s),N.set("chat",e),o.fulfill()}),o},M.retrieveSession=function(e,t){var s=new p;return O.spin(document.getElementById("brainstorm")),N.reset({}),N.sync(x,e).then(function(){var e=N.get("step"),i=1e4;_.getNbItems(),_.loop(function(s,n){i>n&&(D.getStack().get(s.name).reset(t),_.update(n,"status","done"),s.name===e&&(i=n,_.update(n,"currentStep",!0),"muwrapup"===s.name?_.update(n,"status","done"):_.update(n,"status","ongoing")))}),t?(O.stop(),s.fulfill(),D.getStack().show("muwrapup")):(N.get("initiator").id===q.get("_id")?b.reset(H.get("leaderleave"),A):b.reset(H.get("participantleave"),A),O.stop(),s.fulfill(),D.getStack().show(e))}),s},M.leave=function(){var e="";e=N.get("initiator").id===q.get("_id")?"muwrapup"===N.get("step")?labels.get("leaderexit"):labels.get("leaderleave"):"muwrapup"===N.get("step")?labels.get("participantexit"):labels.get("participantleave"),b.reset(e,A,"musession-confirm"),b.show()},M.reset=function(e,t){N.unsync(),P.reset(),_.reset([{name:"mustart",label:H.get("quickstepstart"),currentStep:!1,status:"done"},{name:"musetup",label:H.get("quickstepsetup"),currentStep:!1,status:null},{name:"muscenario",label:H.get("quickstepscenario"),currentStep:!1,status:null},{name:"mutech",label:H.get("quicksteptech"),currentStep:!1,status:null},{name:"muidea",label:H.get("quickstepidea"),currentStep:!1,status:null},{name:"muwrapup",label:H.get("quickstepwrapup"),currentStep:!1,status:null}]),e&&M.retrieveSession(e,t).then(function(){t||(B.listener=f.exitListener("musession",M.leave))})},M.prev=function(e){var s;_.loop(function(t,i){t.name===e&&(s=i)}),s>0?(_.update(s,"currentStep",!1),_.update(s-1,"currentStep",!0),D.getStack().show(_.get(s-1).name)):(alert("Exiting session"),t())},M.next=function(e){var t,s,i=D.getStack().get(e),n="",a=new p;return _.loop(function(s,i){s.name===e&&(t=i)}),t<_.getNbItems()&&(n=_.get(t+1).name,s=D.getStack().get(n),_.update(t,"currentStep",!1),_.update(t+1,"currentStep",!0),"done"!==_.get(t).status?(_.update(t,"status","done"),_.update(t+1,"status","ongoing"),"muwrapup"===_.get(t+1).name&&_.update(t+1,"status","done"),s.reset(),M.createChat(t+1).then(function(){return N.set("step",n),N.upload()}).then(function(){s.initTimer&&s.initTimer(),i.stopSpinner(),D.getStack().show(n),"muwrapup"===n?(q.unsync(),q.sync(g.get("db"),q.get("_id")).then(function(){return q.set("sessionInProgress",""),q.upload()}).then(function(){a.fulfill()})):a.fulfill()})):(i.stopSpinner(),D.getStack().show(n),a.fulfill())),a},M.init=function(){w=new a(N,M.prev,M.next,M.toggleProgress),y=new o(N,P,M.prev,M.next,M.toggleProgress),L=new r(N,P,M.prev,M.next,M.toggleProgress),S=new l(N,P,M.prev,M.next,M.toggleProgress),T=new d(N,P,M.prev,M.next,M.toggleProgress),k=new c(N,P,M.prev,M.next,M.toggleProgress),N.setTransport(g.get("transport")),D.getStack().add("mustart",w),D.getStack().add("musetup",y),D.getStack().add("muscenario",L),D.getStack().add("mutech",S),D.getStack().add("muidea",T),D.getStack().add("muwrapup",k)},M.init(),N.watchValue("status",function(e){"deleted"===e&&N.get("initiator").id!==q.get("_id")&&(q.set("sessionInProgress",""),q.upload(),M.displayInfo(H.get("canceledbyleader"),2e3).then(function(){N.unsync(),t(),document.removeEventListener("mousedown",B.listener,!0)}))}),N.watchValue("step",function(e){var t,s=N.get("step");N.get("initiator")&&N.get("initiator").id!==q.get("_id")&&(_.loop(function(e,i){e.name===s&&(t=i)}),_.update(t-1,"status","done"),_.update(t,"status","ongoing"),_.update(t-1,"currentStep",!1),_.update(t,"currentStep",!0),D.getStack().get(e).reset(),D.getStack().show(e)),"muwrapup"===step&&(q.unsync(),q.sync(g.get("db"),q.get("_id")).then(function(){return q.set("sessionInProgress",""),q.upload()}))}),N.watchValue("participants",function(e){0===e.length&&"muwrapup"!==N.get("step")&&M.displayInfo("participantsleft",1e4).then(function(){return q.set("sessionInProgress",""),q.upload()}).then(function(){t()})}),M}});