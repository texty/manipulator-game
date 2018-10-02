var api = (function(){
    var module = {};

    var API_HOST = 'http://api-x32.texty.org.ua/';

    module.submitAndGetUsers = function(name, score, cb) {
        var json_str = encodeURI(JSON.stringify({name: name, score: score}));

        d3.json(API_HOST + "manipulator/api/rating?json=" + json_str , function(err, users) {
            if (err) throw err;
            
            cb(users)
        })
    };


    return module;
})();