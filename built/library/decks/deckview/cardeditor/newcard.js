/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","Bind.plugin","Event.plugin","Amy/Stack-plugin","service/config","Store","CouchDBDocument","./editchar","./editcard","./importcard","Promise"],function(e,t,n,i,s,a,o,r,c,l,d){return function(u){var p=new e,h=new i,g=new a;return cardCDB=new o,labels=s.get("labels"),user=s.get("user"),transport=s.get("transport"),close=function(){p.dom.classList.add("invisible")},updateDeck=function(e,t){var n=new d,i=g.get("deckId"),a=new o,r="characters";switch(e){case 1:r="characters";break;case 2:r="contexts";break;case 3:r="problems";break;case 4:r="techno";break;default:console.log("no type detected")}return a.setTransport(transport),a.sync(s.get("db"),i).then(function(){var e=new Date,n=a.get("content"),i=n[r];return i.indexOf(t)<0&&(i.push(t),n[r]=i,a.set("content",n)),a.set("last_updated",[e.getFullYear(),e.getMonth(),e.getDate()]),a.upload()}).then(function(){a.unsync(),u("updated",i,e),n.fulfill()}),n},removeCard=function(e){var t=new o,n=new d;return t.setTransport(transport),t.sync(s.get("db"),e).then(function(){var e=t.get("deck")||[],n=new d;return e.splice(e.indexOf(g.get("deckId")),1),e.length?(t.set("deck",e),t.upload().then(function(){n.fulfill()})):(-1===file.search("img/decks")&&(json={type:"card",file:file},transport.request("DeleteAttachment",json,function(e){"ok"!==e&&console.log(e)})),t.remove().then(function(){n.fulfill()})),n}).then(function(){return n}),n},addToDeck=function(e){var t=new o,n=new d;return t.setTransport(transport),t.sync(s.get("db"),e).then(function(){var e=t.get("deck")||[],n=g.get("deckId");return e.indexOf(n)<0&&e.push(n),t.set("deck",e),t.upload()}).then(function(){n.fulfill(),t.unsync()}),n},updateImport=function(e){var t=new d,n=g.get("deckId"),i=new o,a=[],r=[],c=new Date;return i.setTransport(transport),i.sync(s.get("db"),n).then(function(){var t,n={},s={characters:e.characters.concat(),contexts:e.contexts.concat(),problems:e.problems.concat(),techno:e.techno.concat()},o=!1;return t=i.get("translations")?i.get("translations"):{},t.hasOwnProperty(user.get("lang"))&&(o=!0),o?(["characters","contexts","problems","techno"].forEach(function(e){n[e]=t[user.get("lang")].content[e].concat()}),t[user.get("lang")].content=s,i.set("translations",t)):(["characters","contexts","problems","techno"].forEach(function(e){n[e]=i.get("content")[e].concat()}),i.set("content",s)),["characters","contexts","problems","techno"].forEach(function(e){var t,i,o,c,l=n[e],d=s[e];for(t=0,c=l.length;c>t;t++)d.indexOf(l[t])<0&&r.push(l[t]);for(i=0,o=d.length;o>i;i++)l.indexOf(d[i])<0&&a.push(d[i])}),a.forEach(function(e){addToDeck(e)}),r.forEach(function(e){removeCard(e)}),(a.length||r.length)&&i.set("last_updated",[c.getFullYear(),c.getMonth(),c.getDate()]),i.upload()}).then(function(){u("updated",n,null),t.fulfill()}),t},editCard=new c(updateDeck,close),editChar=new r(updateDeck,close),importCard=new l(updateImport,close),p.template='<div id="card_creation" class="invisible"><div class="header blue-dark" data-label="bind: innerHTML, cardeditor"></div><div class="create_header"><label data-label="bind:innerHTML, createnew"></label><select class="changetype" data-setup="bind: selectedIndex, type" data-newcardevent="listen: change, changeType"><option data-label="bind:innerHTML, char"></option><option data-label="bind:innerHTML, context"></option><option data-label="bind:innerHTML, problem"></option><option data-label="bind:innerHTML, techno"></option><option data-label="bind:innerHTML, importcard"></option></select></div><div class="createcontentstack" data-newcardcontentstack="destination"></div></div>',p.plugins.addAll({label:new t(labels),setup:new t(g),newcardcontentstack:h,newcardevent:new n(p)}),p.close=close,p.reset=function(e,t,n,i){document.getElementById("card_creation").classList.remove("invisible"),g.reset({deckId:n,title:i,type:["characters","contexts","problems","techno"].indexOf(t)}),"characters"===t?(editChar.reset(n,e),h.getStack().show("editchar")):(editCard.reset(n,e,t),h.getStack().show("editcard"))},p.press=function(e,t){t.classList.add("pressed")},p.changeType=function(e,t){var n=t.selectedIndex;4===n?(importCard.reset(g.get("deckId")),h.getStack().show("importcard")):0===n?(editChar.reset(g.get("deckId"),"newcard"),h.getStack().show("editchar")):(editCard.reset(g.get("deckId"),"newcard",g.get("type")),h.getStack().show("editcard"),editCard.changeType(n))},p.init=function(){h.getStack().add("editchar",editChar),h.getStack().add("editcard",editCard),h.getStack().add("importcard",importCard)},p.init(),p}});