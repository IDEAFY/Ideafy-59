/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","Bind.plugin","Event.plugin","Store","CouchDBDocument"],function(e,t,s,i,n,a){return function(){var o=new e,c=t.get("labels"),r=t.get("user"),l=new n({body:"",result:""}),d=new n({}),u=new n({}),p=new a,g=new a;return p.setTransport(t.get("transport")),g.setTransport(t.get("transport")),o.plugins.addAll({labels:new s(c),support:new s(l),news:new s(d,{setVisible:function(e){e?this.classList.remove("invisible"):this.classList.add("invisible")}}),maintenance:new s(u,{setVisible:function(e){e?this.classList.remove("invisible"):this.classList.add("invisible")},setDate:function(e){this.innerHTML=new Date(e).toString()}}),supportevent:new i(o)}),o.template='<div class="aboutcontent"><p class="supportmsg invisible" data-news="bind:setVisible, active; bind:innerHTML, content"></p><legend class="support" data-labels="bind:innerHTML, supportlegend"></legend><textarea class="input" data-labels="bind:placeholder, supportplaceholder" data-support="bind: value, body"></textarea><span data-support="bind:innerHTML, result"></span><div class="cancel" data-labels="bind: innerHTML, cancellbl" data-supportevent="listen: mousedown, press; listen: mouseup, cancel"></div><div class="send" data-labels="bind: innerHTML, sendlbl" data-supportevent="listen: mousedown, press; listen: mouseup, send"></div><div class="maintenancemsg invisible" data-maintenance="bind:setVisible,active"><legend data-labels="bind:innerHTML, schedmaintenance"></legend><p><span data-labels="bind: innerHTML, nextmaintenance"></span><span class="dateandtime" data-maintenance="bind:setDate, date">Sunday April 7th 6:00 EST</span><br/><span data-maintenance="bind:innerHTML, comment"></span></p></div><div class="supportus"><legend data-labels="bind: innerHTML, twoway"></legend><p data-labels="bind: innerHTML, supportusintro"><ul><li><h4 data-labels="bind: innerHTML, asanideafyer"></h4><p data-labels="bind: innerHTML, ideafyerhelp"></p></li><li><h4 data-labels="bind: innerHTML, asanexec"></h4><p data-labels="bind: innerHTML, exechelp"></p></li><li><h4 data-labels="bind: innerHTML, asadev"></h4><p data-labels="bind: innerHTML, devhelp"></p></li><li><h4 data-labels="bind: innerHTML, asaninvest"></h4><p data-labels="bind: innerHTML, investhelp"></p></li></ul></p></div></div>',o.send=function(e,t){t.classList.remove("pressed"),o.sendRequest(l.get("body"))},o.cancel=function(e,t){t.classList.remove("pressed"),l.set("body","")},o.press=function(e,t){t.classList.add("pressed")},o.sendRequest=function(e){var s={},i=new Date;s.request=e,s.date=i.getTime(),s.userid=t.get("user").get("_id"),t.get("transport").request("Support",s,function(e){"ok"===e?l.set("result",c.get("requestsent")):l.set("result",e),setTimeout(function(){l.set("result",""),l.set("body","")},3e3)})},o.setSupportMSG=function(e){p.sync(t.get("db"),"SUPPORTMSG").then(function(){p.get("lang")!==e&&p.get("translations")[e]?d.reset(p.get("translations")[e]):d.reset(JSON.parse(p.toJSON())),p.unsync()})},o.setMaintenanceMSG=function(e){g.sync(t.get("db"),"MAINTENANCE").then(function(){g.get("lang")!==e&&g.get("translations")[e]?u.reset(g.get("translations")[e]):u.reset(JSON.parse(g.toJSON())),g.unsync()})},o.setSupportMSG(r.get("lang")),o.setMaintenanceMSG(r.get("lang")),o.refresh=function(){o.setSupportMSG(r.get("lang")),o.setMaintenanceMSG(r.get("lang"))},r.watchValue("lang",function(){o.setSupportMSG(r.get("lang"),"SUPPORTMSG"),o.setMaintenanceMSG(r.get("lang"),"MAINTENANCE")}),p.watchValue("active",function(){o.setSupportMSG(r.get("lang"))}),g.watchValue("active",function(){o.setMaintenanceMSG(r.get("lang"))}),o}});