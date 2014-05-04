/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","service/config","Bind.plugin","Event.plugin","Store","service/avatar","service/utils"],function(e,t,n,s,a,o,r,c){return function(d){var u=new e,p=new o({errormsg:""}),g=n.get("user"),h=n.get("transport"),m=n.get("labels"),v=new o({toField:"",from:"",subject:"",body:"",signature:"",attachment:"",sent:!1});return u.plugins.addAll({labels:new s(m),mail:new s(v,{setUserAvatar:function(e){e&&this.setAttribute("style","background: url('"+n.get("avatar")+"') no-repeat center center; background-size: cover;")},date:function f(f){f&&(this.innerHTML=c.formatDate(f))},setAvatar:function(e){var t=document.createDocumentFragment(),i=new r(e);i.place(t),this.hasChildNodes()?this.replaceChild(t,this.firstChild):this.appendChild(t)},setRating:function(){},setVotes:function(){}}),mailevent:new a(u),errormsg:new s(p)}),u.template='<div class="idea-sendmail"><div class="header blue-dark"><a href="#public-2cents" class="option left"></a><span data-labels="bind:innerHTML, sendidealbl"></span><a href="#public-favorites" class="option right"></a></div><div class="avatar" data-mail="bind:setUserAvatar, from"></div><form class="form"><p><textarea class="mail-header" data-mail="bind: value, toField" data-labels="bind:placeholder, tolbl"></textarea></p><p><input type="text" class="input" data-mail="bind:value, subject" data-labels="bind:placeholder, subjectlbl"></textarea></p><p><textarea class="input" data-mail="bind:value, body"></textarea></p><p><legend data-labels="bind: innerHTML, signaturelbl"></legend><textarea class="signature" data-mail="bind:value, signature"></textarea></p><div class="attachment"><div class="attachment-header"><div data-mail="bind:setAvatar, attachment.authors"></div><span class="date" data-mail="bind:date, attachment.creation_date"></span><h2 data-mail="bind:innerHTML,attachment.title"></h2><span class="author" data-mail="bind:innerHTML,attachment.authornames"></span><span data-labels="bind:innerHTML, ideawrotelbl"></span><div class="visibility-icon private"></div></div><div class="attachment-body"><p data-mail="bind:innerHTML,attachment.description"></p><p data-mail="bind:innerHTML,attachment.solution"></p><div class = "rating" data-mail="bind:setRating, attachment.rating"></div><div class = "votes" data-mail="bind:setVotes, attachment. votes"></div></div></div><div class="sendmail-footer"><p class="send"><label class="cancelmail" data-labels="bind:innerHTML, cancellbl" data-mailevent="listen: mousedown, press; listen:mouseup, cancel">Cancel</label><label class="sendmail" data-labels="bind:innerHTML, sendlbl" data-mailevent="listen:mousedown, press; listen:mouseup, send">Send</label><label class="editerror" data-errormsg="bind:innerHTML, errormsg"></label></p></div></form></div>',u.place(t.get("public-sendmail")),u.reset=function(e){p.reset({errormsg:""}),v.reset({toField:"",from:g.get("username"),subject:"",body:"",signature:g.get("username")+" <"+g.get("_id"),attachment:e,sent:!1}),g.get("signature")&&v.set("signature",g.get("signature")),json={}},u.validateAddress=function(e){var t=/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,n=e.toLowerCase().split(/,|;/),s=!0;for(i=0,l=n.length;l>i;i++)if(!t.test(n[i].trim())){p.set("errormsg",n[i]+m.get("notavalidaddress")),s=!1;break}return s},u.validateMessage=function(){return v.get("toField")?u.validateAddress(v.get("toField")):p.set("errormsg",m.get("norecipient")),""===p.get("errormsg")},u.sendMail=function(){json.type="doc",json.recipient=v.get("toField"),json.cc=g.get("_id"),json.replyTo=g.get("_id"),json.subject=g.get("username")+m.get("sentdocmsg"),json.header=v.get("subject"),json.body=v.get("body"),json.signature=v.get("signature"),json.attachHeader="<div style='background:#657B99; font-family:Helvetica; padding:15px;'><p style='color:white;font-size:24px;font-weight:bold;margin-top:10px;'>"+v.get("attachment").title+"</p><p style='color: #F27B3D; font-size:16px; font-weight:bold;margin-bottom:10px;'>"+v.get("attachment").authornames+", <span style='color:black';>"+c.formatDate(v.get("attachment").creation_date)+"</span></p></div>",json.attachBody="<div style='border:1px solid #657b99;background:white'><p style='font-size:14px; font-family:Helvetica; text-align:justify; padding:15px;'>"+v.get("attachment").description+"</p><p style='font-size:14px; font-family:Helvetica; text-align:justify; padding:15px;'>"+v.get("attachment").solution+"</p></div>",h.request("SendMail",json,function(e){"ok"===e.sendmail?(p.set("errormsg",m.get("yourmessage")+e.recipient+m.get("sentoklbl")),setTimeout(function(){d("close")},350)):(p.set("errormsg",m.get("somethingwrong")),v.set("sent",!1),console.log("error",e.error),console.log("response",e.response))})},u.press=function(e,t){t.classList.contains("sendmail")&&v.get("sent")||t.classList.add("pressed")},u.send=function(e,t){v.get("sent")||(v.set("sent",!0),p.set("errormsg",""),t.classList.remove("pressed"),u.validateMessage()?u.sendMail():v.set("sent",!1))},u.cancel=function(e,t){t.classList.remove("pressed"),d("close")},u}});