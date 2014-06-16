/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","Bind.plugin","Store","service/avatar"],function(e,t,i,n){function s(e){var s=new i([]);e.forEach(function(e){s.alter("push",{id:e})}),this.plugins.addAll({avatar:new t(s,{setAvatar:function(e){if(e){var t=document.createDocumentFragment(),i=new n([e]);i.place(t),this.hasChildNodes()?this.replaceChild(t,this.firstChild):this.appendChild(t)}}})}),this.template='<ul data-avatar="foreach"><li data-avatar="bind: setAvatar, id"></li></ul>'}return function(t){return s.prototype=new e,new s(t)}});