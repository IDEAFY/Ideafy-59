/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","CouchDBDocument","Store","Bind.plugin","Event.plugin","service/avatar","service/utils","lib/spin.min","Promise"],function(e,t,i,s,n,a,o,l,r,d){function c(){var e=this,c=new s([]),u=new i,g=t.get("labels"),m=t.get("user"),p="null",v=new r({color:"#9AC9CD",lines:10,length:10,width:6,radius:10,top:20}).spin();u.setTransport(t.get("transport")),e.plugins.addAll({labels:new n(g),model:new n(u,{setReadonly:function(e){e?(this.setAttribute("contenteditable",!1),this.setAttribute("style","display:none;")):(this.setAttribute("style","dispaly:table-cell;"),this.setAttribute("contenteditable",!0))},setHeight:function(e){e?this.classList.add("extended"):this.classList.remove("extended")}}),chat:new n(c,{setLiStyle:function(e){e===p?this.setAttribute("style","text-align: right;"):this.setAttribute("style","text-align: left;")},setInnerMsgStyle:function(e){"SYS"===e?this.setAttribute("style","background: none; border: none"):e===p?this.setAttribute("style","background: #9AC9CD; border: 1px solid #808080; border-radius: 5px;"):this.setAttribute("style","background: #E6E6E6; border: 1px solid #808080; border-radius: 5px;float: left;max-width: 556px;")},setTime:function(e){e&&(this.innerHTML=l.formatTime(e))},setAvatar:function(e){var t,i,s;"SYS"===e?(this.classList.remove("invisible"),this.classList.add("doctor-deedee")):e===p?this.classList.add("invisible"):"number"==typeof e&&(this.classList.remove("invisible"),t=document.createDocumentFragment(),s=u.get("users")[e].userid,i=new o([s]),i.place(t),this.hasChildNodes()?this.replaceChild(t,this.firstChild):this.appendChild(t))},setUserName:function(e){"number"==typeof e&&e!==p&&(this.innerHTML=" "+u.get("users")[e].username+g.get("said"))},setMsg:function(e){var t,i;e?(this.innerHTML=e,this.setAttribute("style","color: #292929; font-size: 14px;")):(this.setAttribute("style","color: #CCCCCC; font-size: 12px;"),t=this.getAttribute("data-chat_id"),i=c.get(t).type,this.innerHTML=3>=i?u.get("users")[c.get(t).arg].username+g.get("chatmsg"+i):5===i?g.get("chatmsg"+i)+g.get(c.get(t).arg):g.get("chatmsg"+i))}}),chatevent:new a(e)}),e.template='<div class="mubchat"><div id="chatspinner"></div><div class="chatread" data-model="bind:setHeight, readonly"><ul class="chatmessages" data-chat="foreach"><li data-chat="bind:setLiStyle, user"><div class="container" data-chat="bind:setAvatar, user"></div><div class="innerchatmsg" data-chat="bind:setInnerMsgStyle, user"><span class="time" data-chat="bind: setTime, time"></span><span class="username" data-chat="bind:setUserName, user"></span><br/><span class="chatmsg" data-chat="bind: setMsg, msg"></span></div></li></ul></div><div class="chatwrite placeholder" data-model="bind:setReadonly, readonly" data-labels="bind:innerHTML, typemsg" data-chatevent = "listen:mousedown, removePlaceholder; listen: keypress, post"></div></div>',e.removePlaceholder=function(e,t){t.innerHTML===g.get("typemsg")&&(t.innerHTML="",t.classList.remove("placeholder"))},e.post=function(t,i){var s,n,a;13===t.keyCode&&""!==i.innerHTML&&(s=(new Date).getTime(),n=u.get("msg"),c.alter("push",{user:p,time:s,msg:i.innerHTML}),a=c.getNbItems()-1,e.dom.querySelector("li[data-chat_id='"+a+"']").scrollIntoView(),n.push({user:p,time:s,msg:i.innerHTML}),u.set("msg",n),i.innerHTML=g.get("typemsg"),i.classList.add("placeholder"),i.blur(),u.upload())},e.setReadonly=function(){u.set("readonly",!0)},e.conclude=function(t){e.setReadonly(),e.setMessage(t)},e.setMessage=function(t,i){var s,n,a=(new Date).getTime(),o=u.get("msg"),l=new d;switch(t){case"start":n={user:"SYS",time:a,type:4};break;case"end":c.alter("push",{user:"SYS",type:2,time:a,arg:p}),o.push({user:"SYS",type:2,time:a,arg:p}),a=(new Date).getTime(),n={user:"SYS",time:a,type:7},e.setReadonly();break;case"leave":n={user:"SYS",type:2,time:a,arg:p};break;case"next":n={user:"SYS",type:6,time:a};break;case"initStep":n={user:"SYS",type:5,time:a,arg:i}}return c.alter("push",n),s=c.getNbItems()-1,e.dom.querySelector("li[data-chat_id='"+s+"']").scrollIntoView(),o.push(n),u.set("msg",o),u.upload().then(function(){l.fulfill()}),l},e.clear=function(){c.reset([])},e.reset=function(i){var s=new d;return p="null",e.dom.querySelector(".chatwrite").classList.add("placeholder"),e.dom.querySelector(".chatwrite").innerHTML=g.get("typemsg"),u.unsync(),u.reset({}),c.reset([]),v.spin(e.dom.querySelector("#chatspinner")),u.sync(t.get("db"),i).then(function(){var t,i=u.get("users");for(t=0;t<i.length;t++)if(i[t].userid===m.get("_id")){p=t;break}isNaN(p)&&!u.get("readonly")?e.joinChat().then(function(){v.stop(),s.fulfill()}):(c.reset(u.get("msg")),v.stop(),s.fulfill())}),s},e.joinChat=function(){var e=new d,t=u.get("users"),i=t.length,s=(new Date).getTime(),n=u.get("msg");return t.push({username:m.get("username"),userid:m.get("_id")}),u.set("users",t),u.get("_id").search("_0")>-1&&(n.push({user:"SYS",time:s,type:1,arg:i}),u.set("msg",n),c.reset(n)),u.upload().then(function(){p=i,e.fulfill()}),e},e.leave=function(){var t=new d;return u.get("users"),e.setMessage("leave").then(function(){return u.upload()}).then(function(){t.fulfill(),u.unsync(),u.reset(),c.reset([])}),t},e.cancel=function(){u.remove(),u.unsync(),u.reset({}),c.reset([])},e.getModel=function(){return u},u.watchValue("msg",function(t){var i=t.length-1;c.reset(t),e.dom.querySelector("li[data-chat_id='"+i+"']").scrollIntoView()})}return function(){return c.prototype=new e,new c}});