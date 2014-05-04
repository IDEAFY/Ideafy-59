/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","Bind.plugin","Event.plugin","service/config","Store","service/utils","CouchDBView"],function(e,t,i,n,s,a,o){function r(e){var r=new s({img:"",online:!1}),l=n.get("avatars"),c=new o([]),d=e[0];c.setTransport(n.get("transport")),this.plugins.addAll({avatar:new t(r,{setStyle:function(e){e&&"in progress"!==e&&this.setAttribute("style","background-image: url('"+e+"');")},setStatus:function(e){e?this.classList.add("online"):this.classList.remove("online")}}),event:new i(this)}),this.template='<div class="avatar" data-avatar="bind: setStyle, img; bind: setStatus, online"></div>',a.isOnline(d,r),setInterval(function(){a.isOnline(d,r)},3e4),e.length>1?r.set("img","img/avatars/deedee6.png"):d===n.get("user").get("_id")?(r.set("img",n.get("avatar")),n.watchValue("avatar",function(){r.set("img",n.get("avatar"))})):"ideafy@taiaut.com"===d||"IDEAFY"===d?r.set("img","img/avatars/doctordeedee.png"):l.get(d)?"in progress"===l.get(d)?l.watchValue(d,function(e){e&&"in progress"!==e&&r.set("img",e)}):r.set("img",l.get(d)):a.getAvatarById(d).then(function(){r.set("img",l.get(d))})}return function(t){return r.prototype=new e,new r(t)}});