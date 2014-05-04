/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","CouchDBDocument","Bind.plugin","Event.plugin","Store","service/utils","lib/spin.min"],function(e,t,n,i,s,a,o,r){return function(c,l){var d,u=new e,p=t.get("user"),g=t.get("labels"),h={_id:"",default_lang:p.get("lang"),title:"",didYouKnow:"",deck:[],category:"",coefficient:1,sources:[],created_by:p.get("_id"),created_on:[],picture_credit:"",type:null,picture_file:""},m=new n,f=new a({error:""}),v=87,b=87,w=function(e){var t,n,i=document.createElement("canvas"),s=i.getContext("2d");return t=e.width,n=e.height,n>t?(n*=v/t,t=v):(t*=b/n,n=b),i.width=t,i.height=n,s.drawImage(e,0,0,t,n),i.toDataURL("image/png")},y=function(e,t){var n,i,s=new Image,a=document.createElement("canvas"),o=a.getContext("2d"),r=v,c=b;s.src=e,setTimeout(function(){a.width=r,a.height=c,n=Math.floor(Math.max(0,(s.width-r)/2)),i=Math.floor(Math.max(0,(s.height-c)/2)),o.drawImage(s,n,i,r,c,0,0,r,c),t(a.toDataURL("image/png"))},300)},L=function(){var e="/upload",t=new FormData,n="cardpic",i="cards",s=d;t.append("type",n),t.append("dir",i),t.append("filename",m.get("_id")),t.append("dataString",s),o.uploadFile(e,t,null,function(e){"ok"!==e.response&&console.log(e)})},k=new r({color:"#8cab68",lines:10,length:8,width:4,radius:8,top:-7,left:28}).spin();return m.setTransport(t.get("transport")),u.plugins.addAll({label:new i(g),model:new i(m,{setTitle:function(e){e&&""!==e&&"<br>"!==e?(this.innerHTML=e.toUpperCase(),this.setAttribute("style","color: white;")):(this.innerHTML=g.get("cardtitle"),this.setAttribute("style","color: whitesmoke;"))},formatTitle:function(e){switch(e){case 2:this.setAttribute("style","background: #5f8f28");break;case 3:this.setAttribute("style","background: #bd262c");break;case 4:this.setAttribute("style","background: #f27b3d")}},setSources:function(e){this.innerHTML=e&&e.length?e instanceof Array?e.join(", "):e:""},setPic:function(e){var n,i,s=this;e&&e.search("img/decks/")>-1?(i="background-image:url('"+e+"');background-repeat: no-repeat; background-position: center center; background-size: cover;",s.setAttribute("style",i)):e&&(n={dir:"cards",filename:e},t.get("transport").request("GetFile",n,function(e){s.setAttribute("style","background-image: url('"+e+"');background-repeat: no-repeat; background-position: center center; background-size: cover;")}))}}),error:new i(f),editevent:new s(u)}),u.template='<div class="cardpopup editcard"><div class="card-detail"><div class="cd-header blue-dark" data-model="bind:formatTitle, type"><div name="title" data-model="bind: setTitle, title" data-editevent="listen: mousedown, clearDefault; listen: blur, updateTitle" contenteditable=true></div></div><div class="cd-picarea"><div class ="cardpicture" data-model="bind:setPic, picture_file"></div><div class="picinfo"><span class="cd-creditslbl"data-label="bind:innerHTML, credits"></span><input type="text" class="input editcredit" data-label="bind: placeholder, picturecredit" data-model="bind:value, picture_credit"></div><span class="importbutton"><input type="file" enctype="multipart/form-data" accept = "image/gif, image/jpeg, image/png" data-editevent="listen: mousedown, selectpress; listen: change, uploadnDisplay"><div data-label="bind:innerHTML, importlbl" data-editevent="listen:mousedown, press; listen:mouseup, release"></div></span></div><div class="cd-contentarea"><span class="contentTitle" data-label="bind: innerHTML, dyknow"></span><textarea class="input enterdyknow" data-label="bind: placeholder, enterdyknow" data-model="bind:value,didYouKnow"></textarea><span class="cd-sourcelbl" data-label="bind:innerHTML, source"></span><textarea class="input entersources" data-label="bind: placeholder, dyknowsources" data-model="bind: value, sources"></textarea></div><label class="editerror" data-error="bind:innerHTML, error"></label><div class="cancelmail" data-editevent="listen:mousedown, press; listen:mouseup, cancel" data-label="bind:innerHTML, cancellbl"></div><div class="sendmail" data-editevent="listen:mousedown, press; listen:mouseup, upload" data-label="bind:innerHTML, savelbl">Save</div></div></div>',u.reset=function(e,n,i){var s=new Date;d=null,f.set("error",""),m.reset(),"newcard"===n?(m.reset(h),m.set("_id","C:"+s.getTime()),m.set("created_on",[s.getFullYear(),s.getMonth(),s.getDate()]),m.set("deck",[e]),"contexts"===i&&(m.set("type",2),m.set("picture_file","img/decks/context.png")),"problems"===i&&(m.set("type",3),m.set("picture_file","img/decks/problem.png")),"techno"===i&&(m.set("type",4),m.set("picture_file","img/decks/technology.png"))):m.sync(t.get("db"),n)},u.changeType=function(e){switch(e){case 1:m.set("type",2),m.set("picture_file","img/decks/context.png");break;case 2:m.set("type",3),m.set("picture_file","img/decks/problem.png");break;case 3:m.set("type",4),m.set("picture_file","img/decks/technology.png");break;default:m.set("type",2),m.set("picture_file","img/decks/context.png")}},u.clearDefault=function(e,t){var n=t.getAttribute("name");""===m.get(n)&&(t.innerHTML="")},u.updateTitle=function(e,t){var n=t.innerHTML;n=4===m.get("type")?n.toUpperCase():n.charAt(0).toUpperCase()+n.slice(1),m.set("title",n)},u.selectpress=function(e,t){t.value=""},u.release=function(e,t){setTimeout(function(){t.classList.remove("pressed")},300)},u.uploadnDisplay=function(e,t){var n=new FileReader,i=new Image,s=u.dom.querySelector(".cardpicture"),a=new r({color:"#4d4d4d",lines:12,length:12,width:6,radius:10}).spin();s.setAttribute("style","background-image: none"),a.spin(s),n.onload=function(e){i.src=e.target.result,setTimeout(function(){y(w(i),function(e){s.setAttribute("style","background-image: url('"+e+"')"),a.stop(),d=e})},300)},n.readAsDataURL(t.files[0])},u.press=function(e,t){t.classList.add("pressed")},u.cancel=function(e,t){t.classList.remove("pressed"),l(),m.unsync(),m.reset({})},u.upload=function(e,n){var i=new Date;n.classList.remove("pressed"),f.set("error",""),k.spin(n),m.get("title")&&"<br>"!==m.get("title")||f.set("error",g.get("titlerequired")),f.get("error")?k.stop():m.get("_rev")?(m.set("last_modified",[i.getFullYear(),i.getMonth(),i.getDate()]),u.uploadCard(n)):m.sync(t.get("db"),m.get("_id")).then(function(){u.uploadCard()})},u.uploadCard=function(){d&&(L(),m.set("picture_file",m.get("_id"))),m.upload().then(function(){return c(m.get("type"),m.get("_id"))}).then(function(){k.stop(),l(),m.unsync(),m.reset({})})},u}});