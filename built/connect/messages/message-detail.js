/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","Store","CouchDBDocument","Bind.plugin","Event.plugin","service/avatar","service/utils","./message-reply","lib/spin.min"],function(e,t,s,n,a,o,c,r,d,u){return function(p){var g=new e,m=new d,v=new s,h=new s({response:""}),b=new u({color:"#cccccc",lines:10,length:8,width:4,radius:8,top:-2,left:-10}).spin(),f=t.get("labels"),w=t.get("user"),y=t.get("observer"),L=t.get("transport");return g.template='<div id="msgdetail"><div class="header blue-dark"><span class="subjectlbl" data-label="bind:innerHTML, subjectlbl"></span><span data-message="bind:setObject, type"></span></div><div class="msgdetailarea"><div class = "detail-contents"><div class="detail-header"><div class="msgoptions" data-message="bind: showOptions, type"><div class="defaultmsgoption"><div name="reply" class="msgreply" data-messageevent="listen:mousedown, press; listen:mouseup, action"></div><div name="more" class="more" data-messageevent="listen:mousedown, press; listen:mouseup, action"></div></div><div class="msgoptionlist invisible"><div name="replyall" class="replyall sort-button" data-label="bind:innerHTML, replyalllbl" data-messageevent="listen:mousedown, press; listen:mouseup, action"></div><div name="forward" class="forward sort-button" data-label="bind:innerHTML, forwardlbl" data-messageevent="listen:mousedown, press; listen:mouseup, action"></div><div name="deletemsg" class="deletemsg sort-button" data-label="bind:innerHTML, deletelbl" data-messageevent="listen:mousedown, press; listen:mouseup, action"></div></div></div><div data-message="bind:setAvatar, author"></div><p data-message="bind:innerHTML, username"></p><p class="toList"><span data-label="bind: innerHTML, tolbl"></span><span data-message="bind: setToList, toList"></span></p><p class="toList invisible" data-message="bind:showCcList, ccList"><span data-label="bind: innerHTML, cclbl"></span><span data-message="bind: innerHTML, ccList"></span></p><p class="msgdate"><span class="date" data-message="bind: date, date"></span></p></div><div class="detail-body"><p data-message="bind:setBody, type"></p><p data-message="bind:setSignature, type"></p><p class="invisible" data-message="bind:setJoinMsg, sessionStatus"></p><div class="showdoc" data-message="bind: showDocBtn, type" data-messageevent="listen:mousedown, press; listen:mouseup, showDoc"></div><div class="gotosession invisible" data-message="bind: showSessionBtn, sessionStatus" data-messageevent="listen:mousedown, press; listen:mouseup, gotoSession"></div><div class="goto2q invisible" data-message = "bind: showTwoQ, type" data-messageevent="listen: mousedown, press; listen: mouseup, showTwoQ"></div><div class="acceptrejectCXR invisible" data-message="bind:showCXRbtn, type"><div class="acceptCXR" data-label="bind:innerHTML, accept" data-messageevent="listen:mousedown, press; listen:mouseup, acceptCXR"></div><div class="rejectCXR" data-label="bind:innerHTML, reject" data-messageevent="listen:mousedown, press; listen:mouseup, rejectCXR"></div></div></div></div><div id="msgreply" class="invisible"></div><div id="CXRconfirm" class="invisible" data-cxr="bind:setVisibility, response"><span class="CXRconfirmed" data-cxr="bind:setResponseMessage, response"></span></div></div></div>',g.plugins.addAll({label:new a(f),message:new a(v,{date:function k(k){var e=new Date,t=k[3],s=k[4],i=k[5];k&&k[0]===e.getFullYear()&&k[1]===e.getMonth()&&k[2]===e.getDate()?(10>t&&(t="0"+t),10>s&&(s="0"+s),10>i&&(i="0"+i),this.innerHTML=t+":"+s+":"+i):this.innerHTML=r.formatDate(k)+"  "+t+":"+s},setObject:function(e){switch(e){case"CXR":this.innerHTML=v.get("username")+f.get("CXRobject");break;case"INV":this.innerHTML=v.get("username")+f.get("INVObject");break;case"CXRaccept":this.innerHTML=v.get("username")+f.get("acceptedCXR");break;case"CXRreject":this.innerHTML=v.get("username")+f.get("rejectedCXR");break;case"CXCancel":this.innerHTML=v.get("username")+f.get("canceledCX");break;case"DOC":this.innerHTML=v.get("username")+f.get("sentdocmsg");break;case"2Q+":this.innerHTML=v.get("username")+f.get("askednew");break;case"2C+":this.innerHTML=v.get("username")+f.get("senttc");break;case"REF":this.innerHTML=v.get("username")+f.get("joinedideafy");break;default:this.innerHTML=v.get("object")}},setBody:function(e){switch(e){case"CXRaccept":this.innerHTML=f.get("youlbl")+f.get("nowconnected")+v.get("username");break;case"DOC":this.innerHTML="<p>"+v.get("body")+"</p><p>"+v.get("username")+"</p><p>"+v.get("signature")+"</p><br><br><p>"+f.get("clicktoview")+" : <b>"+v.get("docTitle")+"</b></p>";break;case"INV":this.innerHTML=v.get("username")+f.get("INVObject")+" : <b>"+v.get("docTitle")+"</b>";break;case"REF":this.innerHTML=f.get("referral");break;default:this.innerHTML=v.get("body").replace(/\n/g,"<br>")}},setSignature:function(e){"MSG"===e?(this.classList.remove("invisible"),this.innerHTML=v.get("signature")):this.classList.add("invisible")},showOptions:function(e){e.search("CX")>-1||"2Q+"===e||"INV"===e||"REF"===e?this.classList.add("invisible"):this.classList.remove("invisible")},setToList:function(e){this.innerHTML=e?e:f.get("melbl")},showCcList:function(e){e?this.classList.remove("invisible"):this.classList.add("invisible")},showCXRbtn:function(e){var t;if(this.classList.add("invisible"),console.log(e),"CXR"===e){for(t=w.get("connections"),userid=v.get("author"),i=0;i<t.length&&(!t[i].userid||t[i].userid!==userid);i++);this.classList.remove("invisible")}},showDocBtn:function(e){"DOC"===e?this.classList.remove("invisible"):this.classList.add("invisible")},showSessionBtn:function(e){e&&"waiting"===e&&!v.get("joined")?this.classList.remove("invisible"):this.classList.add("invisible")},setJoinMsg:function(e){e?(this.classList.remove("invisible"),"unavailable"===e?this.innerHTML=f.get("nolongerjoin"):"joined"===e?this.innerHTML=f.get("joinedsession"):"waiting"===e&&(this.innerHTML=f.get("clicktojoin"))):this.classList.add("invisible")},showTwoQ:function(e){"2Q+"===e||"2C+"===e?this.classList.remove("invisible"):this.classList.add("invisible")},setAvatar:function(e){var t=document.createDocumentFragment(),s=new c([e]);s.place(t),this.hasChildNodes()?this.replaceChild(t,this.firstChild):this.appendChild(t)}}),cxr:new a(h,{setVisibility:function(e){e?this.classList.remove("invisible"):this.classList.add("invisible")},setResponseMessage:function(e){this.innerHTML="YES"===e?f.get("CXRaccepted")+v.get("username")+f.get("isnowacontact"):f.get("CXRrejected")}}),messageevent:new o(g)}),g.showDoc=function(e,t){t.classList.remove("pushed"),"DOC"===v.get("type")&&y.notify("display-doc",v.get("docId"),v.get("docType"))},g.showTwoQ=function(e,t){t.classList.remove("pushed"),"2Q+"===v.get("type")&&y.notify("display-twoq",v.get("docId"),v.get("author")),"2C+"===v.get("type")&&y.notify("display-twoc")},g.press=function(e,t){t.classList.add("pushed")},g.action=function(e,t){var s=t.getAttribute("name"),i=document.getElementById("msgreply"),n=document.querySelector(".msgoptionlist");switch(s){case"more":n.classList.remove("invisible");break;case"reply":n.classList.add("invisible"),m.reset(JSON.parse(v.toJSON()),"reply"),i.classList.remove("invisible"),i.scrollIntoView();break;case"replyall":n.classList.add("invisible"),m.reset(JSON.parse(v.toJSON()),"replyall"),i.classList.remove("invisible"),i.scrollIntoView();break;case"forward":n.classList.add("invisible"),m.reset(JSON.parse(v.toJSON()),"forward"),i.classList.remove("invisible"),i.scrollIntoView();break;case"deletemsg":n.classList.add("invisible"),g.deletemsg(v),p("#defaultPage")}t.classList.remove("pushed")},g.deletemsg=function(e){var t,s=w.get("notifications").concat(),n=e.get("author");for(i=0,l=s.length;l>i;i++)if(s[i].userid&&s[i].userid===n){t=i;break}s.splice(t,1),w.set("notifications",s),w.upload()},g.acceptCXR=function(e,t){var s=w.get("connections").concat(),n=w.get("news").concat()||[],a=0,o=new Date,c=[o.getFullYear(),o.getMonth(),o.getDate(),o.getHours(),o.getMinutes(),o.getSeconds()];for(t.classList.remove("pushed"),t.nextSibling.classList.add("invisible"),b.spin(t),i=0,l=s.length;l>i;i++)"user"===s[i].type?(s[i].lastname<v.get("contactInfo").lastname&&a++,s[i].lastname===v.get("contactInfo").lastname&&s[i].firstname<v.get("contactInfo").firstname&&a++):s[i].username<v.get("contactInfo").lastname&&a++;s.splice(a,0,v.get("contactInfo")),w.set("connections",s),n.unshift({type:"CX+",date:c,content:{userid:v.get("author"),username:v.get("username")}}),w.set("news",n),w.upload().then(function(){var e={dest:[v.get("author")],date:c,original:"",type:"CXRaccept",author:w.get("_id"),username:w.get("username"),firstname:w.get("firstname"),toList:v.get("username"),ccList:"",object:w.get("username")+f.get("acceptedCXR"),body:f.get("youlbl")+f.get("nowconnected")+w.get("username"),signature:"",contactInfo:{firstname:w.get("firstname"),lastname:w.get("lastname"),userid:w.get("_id"),username:w.get("username"),intro:w.get("intro"),type:"user"}};h.set("response","YES"),L.request("Notify",e,function(t){console.log(e,t),b.stop(),"ok"===JSON.parse(t)[0].res&&setTimeout(function(){g.deletemsg(v),p("#defaultPage")},1e3)})})},g.rejectCXR=function(e,t){var s,i=new Date;t.classList.remove("pushed"),t.parentNode.classList.add("invisible"),h.set("response","NO"),s={dest:[v.get("author")],original:"",date:[i.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),i.getSeconds()],type:"CXRreject",author:w.get("_id"),username:w.get("username"),firstname:w.get("firstname"),toList:v.get("username"),ccList:"",object:w.get("username")+f.get("rejectedCXR"),body:"",signature:""},L.request("Notify",s,function(e){"ok"===JSON.parse(e)[0].res&&setTimeout(function(){g.deletemsg(v),p("#defaultPage")},1500)})},g.checkSessionStatus=function(e){var s=new n;s.setTransport(L),s.sync(t.get("db"),e).then(function(){"waiting"===s.get("status")?v.set("sessionStatus","waiting"):v.set("sessionStatus","unavailable"),s.unsync()},function(e){alert(e)})},g.gotoSession=function(e,s){var n=w.get("notifications");for(s.classList.remove("pushed"),v.set("joined",!0),t.get("observer").notify("join-musession",v.get("docId")),i=0,l=n.length;l>i;i++)if("INV"===n[i].type&&n[i].docId===v.get("docId")){n[i].joined=!0;break}w.set("notifications",n),w.upload()},g.reset=function(e){v.reset({}),h.reset({response:""}),v.reset(e),m.reset(e,"reply"),"INV"===v.get("type")&&(v.get("joined")?v.set("joined",!0):(v.set("sessionStatus",null),g.checkSessionStatus(v.get("docId"))))},CSPI=b,g}});