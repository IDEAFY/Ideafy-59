/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Bind.plugin","Event.plugin","service/config","Store"],function(e,t,i,n,s,a){return new function(){var o=new e,r=s.get("labels"),l=new a({html:""});return o.plugins.addAll({help:new i(l),helpevent:new n(o)}),o.template='<div><div class="help-doctor"></div><div class="close-help" data-helpevent="listen:mousedown, closeHelp"></div><div class="help-screen" data-help="bind:innerHTML,html"></div></div>',o.render(),o.place(t.get("help-popup")),o.setContent=function(e){l.set("html",r.get(e))},o.closeHelp=function(){document.getElementById("help-popup").classList.remove("appear"),document.getElementById("cache").classList.remove("appear")},o}});