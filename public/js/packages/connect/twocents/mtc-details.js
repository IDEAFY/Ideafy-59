/**
 * https://github.com/TAIAUT/Ideafy
 * Proprietary License - All rights reserved
 * Author: Vincent Weyl <vincent.weyl@taiaut.com>
 * Copyright (c) 2012-2013 TAIAUT
 */

define(["Olives/OObject", "service/config", "Store", "Olives/Model-plugin", "Olives/Event-plugin", "twocents/writetwocent", "twocents/twocentlist", "service/avatar", "service/utils"],
        function(Widget, Config, Store, Model, Event, WriteTwocent, TwocentList, Avatar, Utils){
                
                return function MTCDetailsConstructor(){
                        
                        var mtcDetailUI = new Widget(),
                            labels = Config.get("labels"),
                            user = Config.get("user"),
                            twocentList = new TwocentList();
                        
                        mtcDetailUI.plugins.addAll({
                                "labels" : new Model(labels)      
                        });
                        
                        mtcDetailUI.template = '<div class="twocent-detail"><div class="header blue-dark"><span data-labels="bind: innerHTML, mytwocentwall"></span></div><div class = "detail-contents"><div id="connect-twocents" class="twocents"></div></div></div>';
                       
                       mtcDetailUI.reset = function reset(){
                                twocentList.reset(user.get("_id"), "connect");        
                       };
                                              
                        return mtcDetailUI;       
                };
        });

