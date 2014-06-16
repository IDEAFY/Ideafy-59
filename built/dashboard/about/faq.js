/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","CouchDBView","Bind.plugin","Event.plugin","Store"],function(e,t,s,i,n,a){return function(){var o=new e,c=new s,r=t.get("user");return faqlist=new a([]),o.plugins.addAll({faq:new i(faqlist),faqevent:new n(o)}),o.template='<div class="aboutcontent"><ul data-faq="foreach"><li><legend data-faq="bind:innerHTML, question"></legend><p data-faq="bind: innerHTML, response"></p></li></ul></div>',c.setTransport(t.get("transport")),o.fetch=function(e){c.unsync(),c.reset([]),faqlist.reset([]),c.sync(t.get("db"),"about","_view/faq").then(function(){c.loop(function(t){t.value.default_lang!==e&&t.value.translations[e]?faqlist.alter("push",t.value.translations[e]):faqlist.alter("push",t.value)}),c.unsync()})},o.fetch(r.get("lang")),r.watchValue("lang",function(){o.fetch(r.get("lang"))}),o}});