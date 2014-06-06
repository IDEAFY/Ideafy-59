/**
 * https://github.com/IDEAFY/Ideafy
 * Proprietary License - All rights reserved
 * Author: Olivier Wietrich <olivier.wietrich@gmail.com>
 * Copyright (c) 2012-2014 IDEAFY LLC
 */

/* deps load before main script??*/
require.config({
        waitSeconds: 60,
        baseUrl : "js-default/packages",
        paths: {
                lib : "../libs",
                service : "../services",
                public : "public",
                connect : "connect",
                dashboard : "dashboard",
                library : "library",
                brainstorm : "brainstorm",
                twocents : "twocents",
                attachments : "attach"
        },
        deps: ["lib/socket.io.min", "lib/CouchDBTools","lib/Emily.min",  "lib/Olives.min", "lib/amy2", "lib/spin.min"]
        
});

require(["main"]);