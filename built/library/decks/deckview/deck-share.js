/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","service/config","Bind.plugin","Event.plugin","Store","service/avatar","service/utils","service/autocontact","CouchDBDocument","Promise","lib/spin.min"],function(e,t,n,s,a,o,r,c,l,d,u,p){return function(){var t=new e,r=new o({errormsg:""}),c=n.get("user"),l=n.get("transport"),g=n.get("labels"),h=new o({body:"",docId:"",docType:"",attachment:"",docTitle:"",signature:c.get("signature")}),m=new o([]),f=new o([]),v=!1,b=new p({color:"#5F8F28",lines:8,length:8,width:4,radius:8,left:30,top:-6}).spin();return t.plugins.addAll({labels:new s(g),share:new s(h,{setHeader:function(e){this.innerHTML=g.get("sharing")+e}}),contacts:new s(f,{setSelected:function(e){this.innerHTML=e?"&#10003;":""}}),auto:new s(m,{highlight:function(e){e?this.classList.add("selected"):this.classList.remove("selected")}}),shareevent:new a(t),errormsg:new s(r)}),t.template='<div class="deck-share invisible"><div class="header blue-dark"><span data-share="bind:setHeader, docTitle">Sharing idea</span></div><form class="form"><legend>Select contacts</legend><div class="selectall" data-labels="bind:innerHTML, selectall" data-shareevent="listen: mousedown, press; listen:mouseup, selectAll">Select all</div><input class="search" data-shareevent="listen:mousedown, displayAutoContact; listen:input, updateAutoContact" data-labels="bind:placeholder, tocontactlbl"><div id="sharelistauto" class="autocontact invisible"><div class="autoclose" data-shareevent="listen:mouseup,close"></div><ul data-auto="foreach"><li data-auto="bind:innerHTML, username; bind:highlight, selected" data-shareevent="listen:mouseup, select"></li></ul></div><div class="sharecontactlist"><ul data-contacts="foreach"><li class = "contact list-item" data-shareevent="listen:mousedown, discardContact"><p class="contact-name" data-contacts="bind:innerHTML, username"></p><div class="remove-contact"></div><p class="contact-intro" data-contacts="bind:innerHTML, intro"></p></li></ul></div><p><legend>Add a message</legend><textarea class="input sharemessage" data-share="bind:value, body"></textarea></p><p><legend>Signature</legend><textarea class="signature" data-share="bind:value, signature"></textarea></p><div class="sendmail-footer"><p class="send"><label class="cancelmail" data-labels="bind:innerHTML, cancellbl" data-shareevent="listen: mousedown, press; listen:mouseup, cancel">Cancel</label><label class="sendmail" data-labels="bind:innerHTML, sharelbl" data-shareevent="listen:mousedown, press; listen:mouseup, share">Share</label><label class="editerror" data-errormsg="bind:innerHTML, errormsg"></label></p></div></form></div>',t.show=function(){t.dom.classList.remove("invisible"),document.getElementById("deckview").setAttribute("style","overflow-y: scroll;")},t.hide=function(){t.dom.classList.add("invisible"),document.getElementById("deckview")&&document.getElementById("deckview").setAttribute("style","overflow-y: none;"),h.reset({body:"",docId:"",docType:"",docTitle:"",signature:c.get("username")+" <"+c.get("_id")+">"}),r.reset({errormsg:""}),f.reset([]),m.reset(c.get("connections").concat())},t.reset=function(e){r.reset({errormsg:""}),h.reset({body:"",docId:e,docType:"",docTitle:"",signature:c.get("username")+" <"+c.get("_id")+">"}),t.getDocDetails(e),c.get("signature")&&h.set("signature",c.get("signature")),f.reset([]),m.reset(c.get("connections").concat())},t.getDocDetails=function(e){var t=new d({});t.setTransport(l),t.sync(n.get("db"),e).then(function(){h.set("docType",t.get("type")),h.set("docTitle",t.get("title")),t.unsync()})},t.updateAutoContact=function(e,t){var n,s=JSON.parse(m.toJSON()),a=c.get("connections").concat(),o=t.value.toLowerCase();if(""===t.value)m.reset(a);else{for(i=s.length-1;i>=0;i--)n=s[i].username.toLowerCase(),0!==n.search(o)&&s.splice(i,1);m.reset(s)}m.loop(function(e,t){f.toJSON().search(e.userid)>-1&&m.update(t,"selected",!0)})},t.close=function(e,t){t.parentNode.classList.add("invisible")},t.displayAutoContact=function(){t.dom.querySelector("#sharelistauto").classList.remove("invisible"),m.reset(c.get("connections").concat())},t.discardContact=function(e,n){var i=n.getAttribute("data-contacts_id"),s=f.get(i).userid;f.alter("splice",i,1),m.loop(function(e,t){e.userid===s&&setTimeout(function(){m.update(t,"selected",!1)},200)}),t.unselectGroup(s)},t.select=function(e,n){var i=n.getAttribute("data-auto_id");m.get(i).selected?(t.removeContact(m.get(i)),setTimeout(function(){m.update(i,"selected",!1),document.getElementById("sharelistauto").classList.add("invisible")},200)):(t.addContact(m.get(i)),t.selectGroup(),setTimeout(function(){m.update(i,"selected",!0),document.getElementById("sharelistauto").classList.add("invisible")},200))},t.selectAll=function(e,t){t.classList.remove("pressed"),f.reset([]),m.reset(c.get("connections").concat()),m.loop(function(e,t){m.update(t,"selected",!0),"user"===e.type&&f.alter("push",e)})},t.removeContact=function(e){if("group"===e.type)for(j=e.contacts.length-1;j>=0;j--)t.removeContact(e.contacts[j]);else f.loop(function(t,n){t.userid===e.userid&&f.alter("splice",n,1)}),t.unselectGroup(e.userid),m.loop(function(t,n){t.userid===e.userid&&m.update(n,"selected",!1)})},t.selectGroup=function(){var e,t=!1;m.loop(function(n,i){if("group"===n.type&&!n.selected){for(e=n.contacts,t=!0,j=e.length-1;j>=0;j--)if(f.toJSON().search(e[j].userid)<0){t=!1;break}t&&m.update(i,"selected",!0)}})},t.unselectGroup=function(e){m.loop(function(t,n){"group"===t.type&&t.selected&&JSON.stringify(t.contacts).search(e)>0&&m.update(n,"selected",!1)})},t.addContact=function(e){var t,n,i=!0;if("user"===e.type)f.alter("push",e);else for(t=0,n=e.contacts.length;n>t;t++)f.loop(function(n){n.userid===e.contacts[t].userid&&(i=!1)}),i&&(f.alter("push",e.contacts[t]),m.loop(function(n,i){n.userid===e.contacts[t].userid&&m.update(i,"selected",!0)}))},t.press=function(e,t){t.classList.add("pressed")},t.share=function(e,n){var i=new Date,s=new u,a={type:"DOC",status:"unread",date:[i.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),i.getMinutes()],author:c.get("_id"),username:c.get("username"),firstname:c.get("firstname"),toList:"",ccList:"",object:"",body:h.get("body"),signature:h.get("signature"),docId:h.get("docId"),docType:h.get("docType"),docTitle:h.get("docTitle"),dest:[]};v||(v=!0,b.spin(n),t.buildRecipientList(a.docId,a.dest).then(function(){a.dest.length?(l.request("ShareDeck",{idList:a.dest,docId:a.docId},function(e){"ok"===e&&s.fulfill()}),s.then(function(){l.request("Notify",a,function(){r.set("errormsg",g.get("shareok")),n.classList.remove("pressed"),v=!1,setTimeout(function(){b.stop(),t.reset(a.docId),t.dom.querySelector("#sharelistauto").classList.add("invisible"),m.reset(c.get("connections").concat()),t.hide()},2500)})})):(r.set("errormsg",g.get("alreadyshared")),n.classList.remove("pressed"),v=!1,setTimeout(function(){b.stop(),t.reset(a.docId),t.dom.querySelector("#sharelistauto").classList.add("invisible"),m.reset(c.get("connections").concat()),t.hide()},2500))}))},t.cancel=function(e,n){n.classList.remove("pressed"),t.hide()},t.buildRecipientList=function(e,t){var i=new u,s=new d;return s.setTransport(l),s.sync(n.get("db"),e).then(function(){var e=s.get("sharedwith")||[];return f.loop(function(n){e.length?e.indexOf(n.userid)<0&&(e.push(n.userid),t.push(n.userid)):(e.push(n.userid),t.push(n.userid))}),s.set("sharedwith",e),s.upload()}).then(function(){i.fulfill()}),i},t}});