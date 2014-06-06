/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Bind.plugin","Event.plugin","service/config","Store","CouchDBView"],function(e,t,i,n,s,a,o){return new function(){var r=new e,l=s.get("labels"),c=new o([]),d=s.get("user"),u=new a([]),p=new a({});return c.setTransport(s.get("transport")),r.plugins.addAll({labels:new i(l),tip:new i(p,{setTitle:function(e){this.innerHTML="TIP:0"===e?l.get("signupwelcomeobject"):l.get("dyknow")}}),tipevent:new n(r)}),r.template='<div id="tip-popup"><div class="help-doctor"></div><div class="close-tip" data-tipevent="listen:mousedown, close"></div><div class="tip-screen"><legend data-tip="bind:setTitle, id"></legend><p data-tip = "bind: innerHTML, body"></p><div class="next-button" data-labels = "bind: innerHTML, nextbutton" data-tipevent="listen: mousedown, press; listen:mouseup, next"></div></div><div class="tip-footer"><input type="checkbox" data-tipevent="listen: change, doNotShow"><label data-labels="bind: innerHTML, notips"></label></div></div>',r.init=function(e){c.sync(s.get("db"),"about","_view/tip").then(function(){var i=d.get("lang");c.loop(function(e){var t=e.value;t.default_lang!==i&&t.translations[i]?u.alter("push",{id:t._id,title:t.translations[i].title,body:t.translations[i].body}):u.alter("push",{id:t._id,title:t.title,body:t.body})}),c.unsync(),e?p.reset(u.get(0)):(u.alter("splice",0,1),r.getRandomTip()),r.place(t.get("tip-popup")),document.getElementById("tip-popup").classList.add("visible"),document.getElementById("cache").classList.add("appear")})},r.getRandomTip=function(){var e=u.getNbItems(),t=Math.floor(Math.random()*e);0===e?r.close():(p.reset(u.get(t)),u.alter("splice",t,1))},r.press=function(e,t){t.classList.add("pressed")},r.next=function(e,t){t.classList.remove("pressed"),r.getRandomTip()},r.close=function(){document.getElementById("tip-popup").classList.remove("visible"),document.getElementById("cache").classList.remove("appear")},r.doNotShow=function(e,t){var i;t.setAttribute("readonly","readonly"),t.checked===d.get("settings").showTips&&(i=d.get("settings"),i.showTips=!t.checked,d.set("settings",i),d.upload().then(function(){t.removeAttribute("readonly")}))},r}});