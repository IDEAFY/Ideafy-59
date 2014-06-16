/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","Store","Promise","Bind.plugin","Event.plugin","service/utils"],function(e,t,s,i,n,a){return new function(){var i=new e,o=new s([]),c=t.get("labels"),r=t.get("user");return i.template='<div class="calendar"></div>',i.plugins.addAll({labels:new n(c),model:new n(o),calevent:new a(i)}),i.add=function(e){var t,s,i;if(e.date&&e.docId&&e.type||console.log("error : wrong calendar entry format"),i=r.get("cal")&&r.get("cal").length?r.get("cal").concat():[],0===i.length)i.push(e);else{for(t=0,s=i.length;s>t&&!(i[t].date<=e.date);t++);i.splice(t,1,e)}return r.set("cal",i),r.upload()},i.init=function(){CAL=this},r.watchValue("cal",function(){o.reset(r.get("cal"))}),i}});