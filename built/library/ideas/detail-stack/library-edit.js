/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Store","CouchDBDocument","Bind.plugin","Event.plugin","service/config","service/confirm","Promise","Place.plugin","attach/attachment","attach/add"],function(e,t,n,s,a,o,r,c,l,d,u,p){return function(g){var h,m=new e,f=u,v=new p,b=new s,w=new n(r.get("userLanguages")),y=(r.get("user"),r.get("transport")),L=function(){w.loop(function(e,t){b.get("lang")&&e.name===b.get("lang").substring(0,2)?w.update(t,"selected",!0):w.update(t,"selected",!1)})},k=r.get("labels"),S=new n({error:""}),T=new n([]),M=[],C=[];return b.setTransport(y),m.plugins.addAll({editlabel:new a(k),editidea:new a(b,{displayLang:function(e){var t;e&&(t=e.substring(0,2),this.setAttribute("style","background-image:url('img/flags/"+t+".png');"))},setVisibility:function(e){this.innerHTML="public"===e?k.get("publiclbl"):k.get("privatelbl")},hideVisibility:function(e){"public"===e?this.setAttribute("style","display:none"):this.setAttribute("style","display:inline-block")},setVisibleIcon:function(e){"public"===e?this.setAttribute("style","background:url('img/public/publicForList.png') no-repeat left center; background-size: 14px 12px;"):this.setAttribute("style","background-image:url('img/public/privateForList.png');")},setReplay:function(e){e&&-1===e.search("deleted")?this.setAttribute("style","display:inline-block"):this.setAttribute("style","display:none")},setIdeafyStatus:function(e){this.innerHTML=e?k.get("enabledreplaylbl"):k.get("disabledreplaylbl")},setSessionReplay:function(e){this.innerHTML=e?k.get("disablereplaylbl"):k.get("enablereplaylbl")},showAttachments:function(e){e&&e.length?this.classList.remove("invisible"):this.classList.add("invisible")}}),alist:new a(T,{setCat:function(e){var t=r.get("cat"),n=r.get("catColors"),i=t.indexOf(e);i>-1?(this.innerHTML=k.get(e),this.setAttribute("style","color:"+n[i])):(this.innerHTML=e,this.setAttribute("style","color: #404040"))},setType:function(e){switch(e){default:this.setAttribute("style","background-image: url('../img/r2/download.png')")}},setRef:function(e){var t=r.get("location")+"/downloads";this.getAttribute("data-alist_id"),e&&(t+="?atype=idea&docid="+b.get("_id")+"&file="+e,this.setAttribute("href",t))},setRating:function(e){var t,n=this;e&&(t=new s,t.setTransport(y),t.sync(r.get("db"),e).then(function(){var e=t.get("votes")||[],i=e.length;n.innerHTML=0===i?"":Math.round(100*(e.reduce(function(e,t){return e+t})/i))/100}))}}),select:new a(w,{setBg:function(e){e&&this.setAttribute("style","background-image:url('img/flags/"+e+".png');")},setSelected:function(e){e?this.classList.add("selected"):this.classList.remove("selected")}}),place:new d({AddAttachmentUI:v}),editevent:new o(m),errormsg:new a(S,{setError:function(e){switch(e){case"notitle":this.innerHTML=k.get("titlefield")+k.get("emptyfielderror");break;case"nodesc":this.innerHTML=k.get("descriptionfield")+k.get("emptyfielderror");break;case"nosol":this.innerHTML=k.get("solutionfield")+k.get("emptyfielderror");break;default:this.innerHTML=""}}})}),m.template='<div class="idea-edit"><div class="header blue-dark"><span data-editlabel="bind:innerHTML, modifyidealbl"></span></div><form class="form"><div class="idealang"><div class="currentlang" data-editidea="bind: displayLang, lang" data-editevent="listen: mouseup, showLang"></div><ul class="invisible" data-select="foreach"><li data-select="bind: setBg, name; bind: setSelected, selected" data-editevent="listen: mousedown, selectFlag; listen: mouseup, setLang"></li></ul></div><p><legend class="idealegend" data-editlabel="bind:innerHTML, title"></legend><input type="text" class="input" data-editidea="bind: value, title"></p><p><legend class="idealegend" data-editlabel="bind:innerHTML, principle"></legend><textarea class="description input" data-editidea="bind: value, description"></textarea></p><p><legend class="idealegend" data-editlabel="bind:innerHTML, solution"></legend><textarea class="solution input" data-editidea="bind: value, solution"></textarea></p><div class="options"><div class="current-visibility" data-editidea="bind:setVisibleIcon, visibility"><span class="label" data-editlabel="bind:innerHTML,ideavisiblelbl"></span><span data-editlabel="bind:innerHTML, privatelbl" data-editidea="bind:setVisibility, visibility"></span></div><div class="edit-visibility" data-editidea="bind:hideVisibility, visibility"><span class="label" data-editlabel="bind:innerHTML,setideavisiblelbl"></span><div class="visibility public" data-editlabel="bind:innerHTML, publiclbl" data-editevent="listen:mousedown, editVisibility"></div></div></div><div class="options invisible" data-editidea="bind:setReplay, sessionId"><div class="current-visibility replay"><span class="label" data-editlabel="bind:innerHTML,ideafyreplaylbl"></span><span data-editlabel="bind:innerHTML, disabledreplaylbl" data-editidea="bind:setIdeafyStatus, sessionReplay"></span></div><div class="edit-visibility replay"><span class="label" data-editlabel="bind:innerHTML, ideafysetreplaylbl"></span><div class="toggle-replay" data-editidea = "bind: setSessionReplay, sessionReplay" data-editevent="listen:mousedown, press; listen:mouseup, enableReplay" data-editlabel="bind:innerHTML, enablereplaylbl"></div></div></div><p class="submit"><label class="publish pressed-btn" data-editlabel="bind:innerHTML, publishlbl" data-editevent="listen: mousedown, press; listen:mouseup, upload"></label><label class="cancel pressed-btn" data-editlabel="bind:innerHTML, cancellbl" data-editevent="listen: mousedown, press;listen:mouseup, cancel"></label><label class="editerror" data-errormsg="bind:setError, error"></label></p></form><div class="attachments"><legend class="idealegend" data-editlabel="bind:innerHTML, attachments"></legend><div class="toggleattach" data-editevent="listen: mousedown, toggleAttachments"></div><ul class="a-list" data-alist="foreach"><li><a class="a-type" data-alist="bind:setType, type; bind: setRef, fileName" data-editevent="listen: mousedown, press; listen: mouseup, release"></a><label class="a-name" data-alist="bind:innerHTML, name">Name</label><label class="a-cat" data-alist="bind:setCat, category"></label><label class="a-delete" data-editevent="listen:mousedown, press; listen:mouseup, removeAttachment"></label><label class="a-zoom" data-editevent="listen: mousedown, press; listen: mouseup, release; listen:mouseup, zoom"></label></li></ul><legend class="a-legend" data-editlabel="bind:innerHTML, alegend"></legend><div data-place="place: AddAttachmentUI"></div></div></div>',m.place(t.get("library-edit")),m.reset=function(e){b.unsync(),b.reset(),M=[],C=[],b.sync(r.get("db"),e).then(function(){L(),b.get("attachments")?T.reset(b.get("attachments").concat()):T.reset([]),v.reset(e,"idea",T),T.watch("added",function(e,t){M.push(t.docId)})}),h=!1},m.showLang=function(){m.dom.querySelector(".idealang ul").classList.remove("invisible")},m.selectFlag=function(e,t){var n;e.stopPropagation(),n=parseInt(t.getAttribute("data-select_id"),10),w.loop(function(e,t){n===t?w.update(t,"selected",!0):w.update(t,"selected",!1)})},m.setLang=function(e,t){var n;e.stopPropagation(),n=t.getAttribute("data-select_id"),b.set("lang",w.get(n).name),m.dom.querySelector(".idealang ul").classList.add("invisible")},m.editVisibility=function(e,t){t.classList.add("pressed"),c.reset(k.get("setpublicquestion"),function(e){t.classList.remove("pressed"),e?b.set("visibility","public"):b.set("visibility","private"),c.hide()},"musession-confirm"),c.show()},m.press=function(e,t){t.classList.add("pressed")},m.release=function(e,t){t.classList.remove("pressed")},m.toggleAttachments=function(e,t){var n=m.dom.querySelector(".a-list");t.classList.contains("show")?(n.classList.remove("invisible"),t.classList.remove("show")):(n.classList.add("invisible"),t.classList.add("show"))},m.removeAttachment=function(e,t){var n=t.getAttribute("data-alist_id"),i=T.get(n).docId;C.push(i),T.alter("splice",n,1),t.classList.remove("pressed")},m.manageAttachments=function(){var e=M,t=C;t.length&&t.forEach(function(t){var n=-1,s=-1;for(i=0;i<e.length;i++)if(e[i]===t){n=i;break}n>-1&&e.splice(n,1),T.loop(function(e,n){e.docId===t&&(s=n)}),s>-1&&T.alter("splice",s,1),v.deleteAttachmentDoc(t)}),(e.length||t.length)&&b.set("attachments",JSON.parse(T.toJSON()))},m.zoom=function(e,t){var n=t.getAttribute("data-alist_id");f.reset(T.get(n).docId,"idea")},m.enableReplay=function(e,t){setTimeout(function(){b.get("sessionReplay")?b.set("sessionReplay",!1):b.set("sessionReplay",!0),h=!0,t.classList.remove("pressed")},300)},m.updateSessionReplay=function(e){var t=new l,n=new s;return n.setTransport(r.get("transport")),n.sync(r.get("db"),b.get("sessionId")).then(function(){var i,s=n.get("replayIdeas")||[];if(e)s.push(b.get("_id"));else for(i=s.length-1;i>=0;i--)s[i]===b.get("_id")&&s.splice(i,1);n.set("replayIdeas",s),n.upload().then(function(){t.fulfill(),n.unsync()})}),t},m.upload=function(e,t){var n=new Date,i=[n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds()];""===b.get("title")?S.set("error","notitle"):""===b.get("description")?S.set("error","nodesc"):""===b.get("solution")?S.set("error","nosol"):(m.manageAttachments(),b.set("modification_date",i),b.upload().then(function(){h&&m.updateSessionReplay(b.get("sessionReplay")).then(null,function(e){console.log(e)}),m.dom.querySelector(".idealang ul").classList.add("invisible"),g("close")})),t.classList.remove("pressed")},m.cancel=function(e,t){t.classList.remove("pressed"),m.dom.querySelector(".idealang ul").classList.add("invisible"),g("close")},m}});