/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Bind.plugin","Event.plugin","service/config","Store"],function(e,t,i,n,s,a){return new function(){var t,o=new e,r=new a({userid:"",username:""}),l=s.get("user"),c=new a,d=s.get("labels"),u=s.get("transport"),p=!1,g=new a({error:""});return o.plugins.addAll({new2c:new i(c),dest:new i(r,{setHeader:function(e){this.innerHTML=d.get("sendtcprefix")+e+d.get("sendtcsuffix")}}),labels:new i(d),errormsg:new i(g),new2cevent:new n(o)}),o.template='<div id="new2c-popup"><div class = "header blue-dark"><span data-dest="bind: setHeader, username"></span><div class="close-popup" data-new2cevent="listen:mousedown, cancel"></div></div><form class="form"><p><textarea class="description input" data-labels="bind:placeholder, twocentplaceholder" data-new2c="bind: value, message"></textarea></p><div><span class="errormsg" data-errormsg="bind:innerHTML, error"></span><div class="sendmail" data-new2cevent="listen:mousedown, press; listen:mouseup, upload" data-labels="bind:innerHTML, sendlbl"></div></div></form></div>',o.render(),o.press=function(e,t){t.classList.add("pressed")},o.closePopup=function(){o.dom.classList.remove("appear"),document.getElementById("cache").classList.remove("appear"),c.reset(),r.reset(),g.reset({error:""})},o.reset=function(e){t=e,o.dom.classList.add("appear"),document.getElementById("cache").classList.add("appear"),r.set("userid",t.userid),r.set("username",t.username),c.reset({author:l.get("_id"),message:"",firstname:l.get("firstname"),username:l.get("username"),date:[],datemod:"",plusones:0,replies:[]}),p=!1},o.cancel=function(){o.closePopup()},o.upload=function(e,i){var n,s=new Date,a={};c.get("message")?(p=!0,n=setInterval(function(){g.get("error")===d.get("sendinginprogress")?g.set("error",d.get("sendinginprogress")+" ..."):g.set("error",d.get("sendinginprogress"))},150),c.set("date",[s.getFullYear(),s.getMonth(),s.getDate()]),a.tc=JSON.parse(c.toJSON()),a.userid=r.get("userid"),a.username=r.get("username"),u.request("SendTwocent",a,function(e){var s,r=t.twocents||[],c=l.get("connections");if("ok"===e){for(r.unshift(a.tc),t.twocents=r,s=c.length-1;s>=0;s--)"user"===c[s].type&&c[s].userid===t.userid&&c.splice(s,1,t);l.set("connections",c),l.upload().then(function(){clearInterval(n),i.classList.remove("pressed"),o.closePopup()})}else g.set("error","something went wrong - try again later"),clearInterval(n),i.classList.remove("pressed")})):(g.set("error",d.get("nomessage")),i.classList.remove("pressed"))},o}});