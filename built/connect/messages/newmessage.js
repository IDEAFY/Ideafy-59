/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","Bind.plugin","Event.plugin","service/config","Store","Promise","service/autocontact","lib/spin.min"],function(e,t,s,n,a,o,r,c){return function(d){var u=new e,p=new a,g=new a({errormsg:""}),m=n.get("labels"),v=n.get("user"),b=n.get("transport"),h=!1,f=new c({color:"#8cab68",lines:10,length:8,width:4,radius:8,top:-8,left:340}).spin(),w={},y=function(e){var t=p.get("toList").toLowerCase().split(/,|;/),s=p.get("ccList").toLowerCase().split(/,|;/),n=JSON.stringify(v.get("connections")).toLowerCase(),a=[],r={},c=new o;for(arr=[],i=0,l=t.length;l>i;i++){if(!(n.search(t[i].trim())>-1)){g.set("errormsg",m.get("tolbl")+" : "+t[i].trim()+m.get("notavalidcontact")),h=!1,c.reject();break}a.push(t[i].trim())}if(!g.get("errormsg")&&""!==s[0])for(i=0,l=s.length;l>i;i++){if(!(n.search(s[i].trim())>-1)){g.set("errormsg",m.get("tolbl")+" : "+s[i].trim()+m.get("notavalidcontact")),h=!1,c.reject();break}a.push(s[i].trim())}return g.get("errormsg")||(r.list=a,b.request("CheckRecipientList",r,function(t){var s=[];if(t.error)g.set("errormsg",t.error),c.reject();else{for(i=0,l=t.length;l>i;i++)s.push(t[i].value);e(s),c.fulfill()}})),c};return u.plugins.addAll({labels:new t(m),errormsg:new t(g),newmessage:new t(p,{setAvatar:function(){this.setAttribute("style","background: url('"+n.get("avatar")+"') no-repeat center center;background-size:cover;")}}),newmessageevent:new s(u)}),u.template='<div id="newmsg"><div class="header blue-dark"><span data-labels="bind: innerHTML, newmsg">New message</span></div><div class="avatar" data-newmessage="bind: setAvatar, author"></div><form class="form"><p><textarea class="mail-header" name="toList" data-newmessage="bind: value, toList" data-newmessageevent="listen: mousedown, displayAutoContact; listen:keyup, updateAutoContact" data-labels="bind:placeholder, tocontactlbl"></textarea></p><div id="tolistauto" class="invisible"></div><p><textarea class="mail-header" name="ccList" data-newmessage="bind: value, ccList" data-labels="bind:placeholder, cclbl" data-newmessageevent="listen: mousedown, displayAutoContact; listen:keyup, updateAutoContact"></textarea></p><div id="cclistauto" class="invisible"></div><p><input type="text" class="input" data-newmessage="bind:value, object" data-labels="bind:placeholder, subjectlbl"></p><p><textarea class="input" data-newmessage="bind:value, body"></textarea></p><p><legend>Signature</legend><textarea class="signature" data-newmessage="bind:value, signature"></textarea></p><div class="sendmail-footer"><p class="send"><label class="cancelmail" data-labels="bind:innerHTML, cancellbl" data-newmessageevent="listen: mousedown, press; listen:mouseup, cancel">Cancel</label><label class="sendmail" data-labels="bind:innerHTML, sendlbl" data-newmessageevent="listen:mousedown, press; listen:mouseup, send">Send</label><label class="editerror" data-errormsg="bind:innerHTML, errormsg"></label></p></div></form></div>',u.reset=function(e){var t,s,i="";if(p.reset({author:v.get("_id"),username:v.get("username"),firstname:v.get("firstname"),type:"MSG",signature:v.get("username"),toList:"",ccList:"",object:"",body:"",date:null}),v.get("signature")?p.set("signature",v.get("signature")):p.set("signature",v.get("username")),g.reset({errormsg:""}),e)if("user"===e.type)p.set("toList",e.username);else{for(t=0,s=e.contacts.length;s>t;t++)i=i?i+", "+e.contacts[t].username:e.contacts[t].username;p.set("toList",i)}},u.press=function(e,t){t.classList.add("pressed")},u.cancel=function(e,t){t.classList.remove("pressed"),h=!1,u.reset(),d("#defaultPage")},u.displayAutoContact=function(e,t){var s,i,n=t.getAttribute("name"),a=function(e){p.set(n,e)};s="toList"===n?document.getElementById("tolistauto"):document.getElementById("cclistauto"),i=new r(s,t,a),w.name=i,s.classList.remove("invisible")},u.updateAutoContact=function(e,t){t.getAttribute("name"),13===e.keyCode?t.removeChild(t.firstChild):186===e.keyCode||188===e.keyCode?w.name.init():w.name.updateList()},u.send=function(e,t){var s=new Date,i={};t.classList.add("invisible"),t.classList.remove("pressed"),f.spin(t.parentNode),h||(h=!0,g.set("errormsg",""),i.author=p.get("author"),i.username=p.get("username"),i.firstname=p.get("firstname"),i.signature=p.get("signature"),i.toList=p.get("toList"),i.ccList=p.get("ccList"),i.object=p.get("object"),i.body=p.get("body"),i.type="MSG",p.get("object")||(g.set("errormsg",m.get("entersubjectlbl")),h=!1,f.stop(),t.classList.remove("invisible")),i.dest=[],y(function(e){i.dest=e}).then(function(){g.get("errormsg")?(h=!1,f.stop(),t.classList.remove("invisible")):(i.date=[s.getFullYear(),s.getMonth(),s.getDate(),s.getHours(),s.getMinutes(),s.getSeconds()],b.request("Notify",i,function(){h=!1,f.stop(),t.classList.remove("invisible"),u.reset(),g.set("errormsg",m.get("messagesentok")),setTimeout(function(){g.set("errormsg",""),t.classList.remove("invisible"),d("#defaultPage")},2e3)}))}))},u}});