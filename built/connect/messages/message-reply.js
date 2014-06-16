/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","Store","Bind.plugin","Event.plugin","service/config","service/utils","Promise","service/autocontact"],function(e,t,s,n,a,o,r,c){return function(){var d,u=new e,p=new t,g={},m=new t({errormsg:""}),v=a.get("labels"),b=a.get("user"),h=a.get("transport"),f=!1,w=function(e){var t=p.get("toList").toLowerCase().split(/,|;/),s=p.get("ccList").toLowerCase().split(/,|;/),n=JSON.stringify(b.get("connections")).toLowerCase(),a=[],o={},c=new r;for(arr=[],i=0,l=t.length;l>i;i++){if(!(n.search(t[i].trim())>-1||d.toList.search(t[i].trim())>-1||d.ccList.search(t[i].trim())>-1)){m.set("errormsg",v.get("tolbl")+" : "+t[i].trim()+v.get("notavalidcontact")),f=!1,c.reject();break}a.push(t[i].trim())}if(!m.get("errormsg")&&""!==s[0])for(i=0,l=s.length;l>i;i++){if(!(n.search(s[i].trim())>-1||d.toList.search(s[i].trim())>-1||d.ccList.search(s[i].trim())>-1)){m.set("errormsg",v.get("tolbl")+" : "+s[i].trim()+v.get("notavalidcontact")),f=!1,c.reject();break}a.push(s[i].trim())}return m.get("errormsg")||(o.list=a,h.request("CheckRecipientList",o,function(t){var s=[];if(t.error)m.set("errormsg",t.error),c.reject();else{for(i=0,l=t.length;l>i;i++)s.push(t[i].value);e(s),c.fulfill()}})),c};return u.plugins.addAll({labels:new s(v),errormsg:new s(m),reply:new s(p,{setAvatar:function(){this.setAttribute("style","background: url('"+a.get("avatar")+"') no-repeat center center;background-size:cover;")},setCC:function(e){switch(e){case"replyall":break;case"forward":break;default:this.innerHTML=p.get("message").username}},setSubject:function(e){switch(e){case"replyall":break;case"forward":break;default:this.innerHTML="  Re : "+p.get("message").object}}}),replyevent:new n(u)}),u.template='<div><div class="avatar" data-reply="bind: setAvatar, message.author"></div><form class="form"><p><textarea name="toList" class="mail-header" data-labels="bind:placeholder, tocontactlbl" data-reply="bind: value, toList" data-replyevent="listen: mousedown, displayAutoContact; listen:keypress, updateAutoContact"></textarea></p><div id="tolistauto" class="invisible"></div><p><textarea name="ccList" class="mail-header" data-labels="bind:placeholder, cclbl" data-reply="bind: value, ccList" data-replyevent="listen: mousedown, displayAutoContact; listen:keypress, updateAutoContact"></textarea></p><div id="cclistauto" class="invisible"></div><p><span class="subject" data-labels="bind:innerHTML, subjectlbl"></span><span data-reply="bind:innerHTML, object"></span></p><p><textarea class="input" data-reply="bind:value, body"></textarea></p><blockquote class="original" data-reply="bind:innerHTML, original"></blockquote><p><legend>Signature</legend><textarea class="signature" data-reply="bind:value, signature"></textarea></p><div class="sendmail-footer"><p class="send"><label class="cancelmail" data-labels="bind:innerHTML, cancellbl" data-replyevent="listen: mousedown, press; listen:mouseup, cancel">Cancel</label><label class="sendmail" data-labels="bind:innerHTML, sendlbl" data-replyevent="listen:mousedown, press; listen:mouseup, send">Send</label><label class="editerror" data-errormsg="bind:innerHTML, errormsg"></label></p></div></div>',u.reset=function(e,t){switch(d=e,p.reset({signature:"",original:"",author:b.get("_id"),username:b.get("username"),firstname:b.get("firstname"),toList:"",ccList:"",object:"",body:""}),p.set("type",t),b.get("signature")?p.set("signature",b.get("signature")):p.set("signature",b.get("username")),p.set("original",v.get("on")+o.formatDate(e.date)+"</p><p>"+e.username+v.get("ideawrotelbl")+"</p><p>"+v.get("subjectlbl")+e.object+"</p><hr><p>"+e.body+"</p>"),t){case"replyall":e.ccList?p.set("toList",e.username.concat(", "+e.ccList)):p.set("toList",e.username),e.object&&0!==e.object.search("Re :")?p.set("object","Re : "+e.object):p.set("object",e.object);break;case"forward":p.set("toList",""),e.object&&0!==e.object.search("Fwd :")?p.set("object","Fwd : "+e.object):p.set("object",e.object);break;default:p.set("toList",e.username),e.object&&0!==e.object.search("Re :")?p.set("object","Re : "+e.object):p.set("object",e.object)}p.set("message",e),u.place(document.getElementById("msgreply"))},u.displayAutoContact=function(e,t){var s,i,n=t.getAttribute("name"),a=function(e){p.set(n,e)};s="toList"===n?document.getElementById("tolistauto"):document.getElementById("cclistauto"),i=new c(s,t,a),g.name=i,s.classList.remove("invisible")},u.updateAutoContact=function(e,t){t.getAttribute("name"),13===e.keyCode?t.removeChild(t.firstChild):186===e.keyCode||188===e.keyCode?g.name.init():g.name.updateList()},u.press=function(e,t){t.classList.add("pressed")},u.cancel=function(e,t){t.classList.remove("pressed"),f=!1,document.getElementById("msgreply").classList.add("invisible")},u.send=function(e,t){var s=new Date,i={};t.classList.remove("pressed"),f||(f=!0,m.set("errormsg",""),i=JSON.parse(p.toJSON()),i.type="MSG",i.body=i.body.concat("<br><br>"+i.original),i.dest=[],w(function(e){i.dest=e}).then(function(){m.get("errormsg")?(console.log(result),f=!1):(i.date=[s.getFullYear(),s.getMonth(),s.getDate(),s.getHours(),s.getMinutes(),s.getSeconds()],h.request("Notify",i,function(){f=!1,m.set("errormsg",v.get("messagesentok")),setTimeout(function(){m.set("errormsg",""),f=!1,document.getElementById("msgreply").classList.add("invisible")},2e3)}))}))},u}});