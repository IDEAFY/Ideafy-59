/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Bind.plugin","Event.plugin","Place.plugin","service/config","CouchDBDocument","lib/spin.min","service/utils","Promise","attach/add"],function(e,t,i,n,s,a,o,r,l,c,d){return new function(){var t=new e,c=new d,u=a.get("transport"),p=new o(a.get("userLanguages")),g=a.get("user"),h=a.get("observer"),m=new o(a.get("ideaTemplate")),v=new o([]),f=function(){var e=g.get("lang").substring(0,2);m.set("lang",e),p.loop(function(t,i){t.name===e?p.update(i,"selected",!0):p.update(i,"selected",!1)})},b=a.get("labels"),y=new o({error:""}),w=new r({color:"#8cab68",lines:10,length:8,width:4,radius:8,top:-8,left:340}).spin();return m.setTransport(u),g.watchValue("lang",function(){f()}),t.plugins.addAll({newidea:new i(m,{displayLang:function(e){var t=e.substring(0,2);this.setAttribute("style","background-image:url('img/flags/"+t+".png');")},setVisibility:function(e){"public"===e?(this.innerHTML=b.get("publicidealbl"),this.setAttribute("style","background-image:url('img/brainstorm/publicforslider.png'); background-position: 135px center; background-repeat:no-repeat; background-size: 30px;")):(this.innerHTML=b.get("privateidealbl"),this.setAttribute("style","background-image:url('img/brainstorm/privateforslider.png'); background-position: 15px center; background-repeat:no-repeat; background-size: 20px;"))},setWarning:function(e){"public"===e?this.classList.remove("invisible"):this.classList.add("invisible")}}),alist:new i(v,{setType:function(e){var t=this;switch(e){case"pic":break;case"drawing":break;default:t.setAttribute("style","background-image:url('img/brainstorm/importDisable100.png');")}},setBg:function(e){var t=a.get("catColors"),i=this;i.setAttribute("style","background-color: transparent;"),a.get("cat").forEach(function(n,s){n===e&&i.setAttribute("style","background-color:"+t[s])})}}),select:new i(p,{setBg:function(e){this.setAttribute("style","background-image:url('img/flags/"+e+".png');")},setSelected:function(e){e?this.classList.add("selected"):this.classList.remove("selected")}}),place:new s({AddAttachment:c}),labels:new i(b),errormsg:new i(y,{setError:function(e){switch(e){case"notitle":this.innerHTML=b.get("titlefield")+b.get("emptyfielderror");break;case"nodesc":this.innerHTML=b.get("descriptionfield")+b.get("emptyfielderror");break;case"nosol":this.innerHTML=b.get("solutionfield")+b.get("emptyfielderror");break;case"noaname":this.innerHTML=b.get("noaname");break;case"noacat":this.innerHTML=b.get("noacat");break;default:this.innerHTML=e}this.setAttribute("style","color: #F27B3D;")}}),newideaevent:new n(t)}),t.template='<div id="newidea-popup"><div class = "header blue-dark"><span data-labels="bind: innerHTML, createidealbl"></span><div class="close-popup" data-newideaevent="listen:mousedown, cancel"></div></div><form class="form"><div class="idealang"><div class="currentlang" data-newidea="bind: displayLang, lang" data-newideaevent="listen: mouseup, showLang"></div><ul class="invisible" data-select="foreach"><li data-select="bind: setBg, name; bind: setSelected, selected" data-newideaevent="listen: mousedown, selectFlag; listen: mouseup, setLang"></li></ul></div><input maxlength=40 type="text" class="input newideatitle" data-labels="bind:placeholder, ideatitleplaceholder" data-newidea="bind: value, title" data-newideaevent="listen: input, resetError"><textarea class="description input" data-labels="bind:placeholder, ideadescplaceholder" data-newidea="bind: value, description" data-newideaevent="listen: input, resetError"></textarea><textarea class="solution input" data-labels="bind:placeholder, ideasolplaceholder" data-newidea="bind: value, solution" data-newideaevent="listen: input, resetError"></textarea><legend class="a-legend" data-labels="bind:innerHTML, alegend"></legend><div data-place="place:AddAttachment"></div><ul class="a-list" data-alist="foreach" style="display:none"><li data-alist="bind:setBg, category"><label class="a-type" data-alist="bind:setType, type"></label><label class="a-name" data-alist="bind:innerHTML, name"></label><div class="a-del" data-newideaevent="listen:mousedown, removeAttachment"></div></li></ul><div class="visibility-input"><input class="visibility-slider" type="range" min=0 max=1 value =1 data-newideaevent="listen:change, toggleVisibility"><div class="private" data-newidea="bind: setVisibility, visibility"></div></div><div class="newidea-footer"><div class="publicwarning invisible" data-newidea="bind: setWarning, visibility"><div data-labels="bind: innerHTML, publicwarning"></div><div class="close-warning" data-newideaevent="listen:mousedown, closeWarning"></div></div><span class="errormsg" data-errormsg="bind:setError, error"></span><div class="sendmail" data-newideaevent="listen:mousedown, press; listen:mouseup, upload" data-labels="bind:innerHTML, publishlbl">Publish</div></div></form></div>',t.reset=function(){document.getElementById("cache").classList.add("appear"),m.reset({title:"",sessionId:"",sessionReplay:!1,authors:[],description:"",solution:"",creation_date:[],character:"",problem:"",lang:"en-us",context:"",techno:[],type:6,sharedwith:[],modification_date:[],inspired_by:"",visibility:"private",votes:[],rating:"",authornames:"",twocents:[],attachments:[]}),f(),y.reset({error:""}),v.reset([]),t.resetAttachment(),t.dom.querySelector(".visibility-slider").value=1,t.dom.querySelector(".idealang ul").classList.add("invisible"),t.dom.classList.add("appear")},t.showLang=function(e){e.stopPropagation(),e.preventDefault(),t.dom.querySelector(".idealang ul").classList.remove("invisible")},t.selectFlag=function(e,t){var i;e.stopPropagation(),e.preventDefault(),i=parseInt(t.getAttribute("data-select_id"),10),p.loop(function(e,t){i===t?p.update(t,"selected",!0):p.update(t,"selected",!1)})},t.setLang=function(e,i){var n;e.stopPropagation(),n=i.getAttribute("data-select_id"),m.set("lang",p.get(n).name),t.dom.querySelector(".idealang ul").classList.add("invisible")},t.resetAttachment=function(){c.reset("new","idea",v)},t.removeAttachment=function(e,t){var i=parseInt(t.getAttribute("data-alist_id"),10),n=v.get(i).docId;v.alter("splice",i,1),l.deleteAttachmentDoc(n)},t.toggleVisibility=function(e,t){"1"===t.value?m.set("visibility","private"):m.set("visibility","public")},t.closeWarning=function(e,t){t.parentNode.classList.add("invisible")},t.press=function(e,i){i.classList.add("pressed"),t.dom.querySelector(".publicwarning").classList.add("invisible")},t.release=function(e,t){t.classList.remove("pressed")},t.clearAttachments=function(){c.getFileName()&&l.deleteAttachmentFile(c.getFileName()),v.getNbItems()&&v.loop(function(e){l.deleteAttachmentDoc(e.docId).then(function(){delCount++})}),c.reset()},t.closePopup=function(){document.getElementById("newidea-popup").classList.remove("appear"),document.getElementById("cache").classList.remove("appear"),c.getFileName()&&l.deleteAttachmentFile(m.get("_id"),c.getFileName()),t.resetAttachment(),c.abortReq(),m.unsync()},t.resetError=function(e,t){var i;t.scrollTop=99999,y.get("error")&&(i=t.classList.contains("description")?"nodesc":t.classList.contains("solution")?"nosol":"notitle",y.get("error")===i&&t.value&&y.set("error",""))},t.cancel=function(){v.getNbItems()&&t.clearAttachments(),t.closePopup()},t.upload=function(e,i){var n,s=new Date,o=c.getDocId()||"I:"+s.getTime(),r=m.get("attachments")||[];i.classList.remove("pressed"),m.get("title")?m.get("description")?m.get("solution")||y.set("error","nosol"):y.set("error","nodesc"):y.set("error","notitle"),y.get("error")||(i.classList.add("invisible"),w.spin(i.parentNode),n=setInterval(function(){y.get("error")===b.get("uploadinprogress")?y.set("error",b.get("uploadinprogress")+"..."):y.set("error",b.get("uploadinprogress"))},100),m.set("authors",[g.get("_id")]),m.set("authornames",g.get("username")),m.set("creation_date",[s.getFullYear(),s.getMonth(),s.getDate(),s.getHours(),s.getMinutes(),s.getSeconds()]),v.getNbItems()&&(v.loop(function(e){r.push(e)}),r.sort(function(e,t){return e.category>t.category?1:e.category<t.category?-1:e.name>t.name?1:-1}),m.set("attachments",r)),m.sync(a.get("db"),o).then(function(){return m.upload()}).then(function(){"public"===m.get("visibility")?(h.notify("NewIdea",o,"public"),u.request("UpdateUIP",{userid:g.get("_id"),type:m.get("type"),docId:o,docTitle:m.get("title")},function(e){"ok"!==e&&console.log(e),w.stop(),i.classList.remove("invisible"),t.closePopup(),clearInterval(n)})):(h.notify("NewIdea",o),w.stop(),i.classList.remove("invisible"),t.closePopup(),clearInterval(n))}))},["added","updated","deleted"].forEach(function(e){v.watch(e,function(){var e=t.dom.querySelector(".a-list");v.getNbItems()?e.setAttribute("style","display:block;"):e.setAttribute("style","display:none;")})}),t}});