/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent@ideafy.com>
 * Copyright (c) 2014 IDEAFY LLC
 */

define(["OObject","Bind.plugin","Event.plugin","service/config","service/utils","Store"],function(e,t,i,n,s,a){function o(e){var s,o=new a([]),r=n.get("avatars");for(this.plugins.addAll({avatar:new t(o,{setAvatar:function(e){this.setAttribute("style","background-image: url('"+e+"');")}}),event:new i(this)}),this.template='<ul data-avatar="foreach"><li data-avatar="bind: setAvatar, img; bind: name, id"></li></ul>',s=0;s<e.length;s++)e[s]===n.get("user").get("_id")?o.alter("push",{id:e[s],img:n.get("avatar")}):r.get(e[s])?o.alter("push",{id:e[s],img:r.get(e[s])}):n.get("transport").request("GetAvatar",{id:e[s]},function(t){t.error||o.alter("push",{id:e[s],img:t})})}return function(t){return o.prototype=new e,new o(t)}});