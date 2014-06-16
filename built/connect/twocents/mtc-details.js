/*
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","service/config","Store","Bind.plugin","Event.plugin","twocents/writetwocent","twocents/twocentlist","service/avatar","service/utils","Place.plugin"],function(e,t,s,i,n,a,o,r,c,l){return function(){var s=new e,n=t.get("labels"),a=t.get("user"),r=new o("connect");return s.plugins.addAll({labels:new i(n),place:new l({TwocentUI:r})}),s.template='<div class="twocent-detail"><div class="header blue-dark"><span data-labels="bind: innerHTML, mytwocentwall"></span></div><div class = "detail-contents"><div id="connect-twocents" class="twocents" data-place="place: TwocentUI"></div></div></div>',s.reset=function(){r.reset(a.get("_id"),"connect")},s}});