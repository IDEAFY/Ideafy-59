/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/map","Bind.plugin","Event.plugin","service/config","Store"],function(e,t,i,n,s,a){return new function(){var t=new e,o=s.get("labels"),r=new a({html:""});return t.plugins.addAll({help:new i(r),helpevent:new n(t)}),t.template='<div id="help-popup"><div class="help-doctor"></div><div class="close-help" data-helpevent="listen:mousedown, closeHelp"></div><div class="help-screen" data-help="bind:innerHTML,html"></div></div>',t.setContent=function(e){r.set("html",o.get(e))},t.closeHelp=function(){t.dom.classList.remove("appear"),document.getElementById("cache").classList.remove("appear")},t}});