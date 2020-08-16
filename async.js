
var Async =  function(){
    var self = this;

    this.map = function(array, func, callback){
    // array => images
    // func =>  downloadImage
    // callback => function anonyme
     var count = array.length;
     var errors = [];
     var results = [];
    
    for( var i =0; i < array.length; i++){
       ( function(i) {
        func(array[i], function(error, result){
           
           count--;
            if(error)
                errors[i] = error; //stock error
            else  
                results[i] = result; //stock result
    
            if (count < 1 ) return callback((errors.length > 0) ? errors : null, results);
    
        });
        })(i);
     }
    
    
    };

    this.Waterfall = function(/*jobs, callback*/){
        //precedente fonction sans résultat:
        //[0] jobs
        //[1] callback
    
        //precedente fonction avec resultat:
        //[0] jobs
        //[1] result (data) //de la précédente fonction
        //[2] callback
       
    
        var jobs = arguments[0];
        var callback = (arguments.length > 2) ? arguments[2] : arguments[1];
    
        var job = jobs.shift();
    
        var callbackAfter = function(error, result){
            if(error)
                return callback(error);
            if(jobs.length < 1)
                return callback(null, result);
    
        var args = [];
        args.push(jobs);
        if(result != undefined)
            args.push(result);
        args.push(function(error, result){
            if(error)
                return callback(error);
            else
                return callback(null, result);
        })
        
        self.Waterfall.apply(this, args);
    };
    
        // sans précédent argument
        //[0] callback
    
        //avec précédent résultat (data)
        //[0] result // de la précédente fonction
        //[1] callback 
    
        var args = [];
    
        if (arguments.length > 2)
            args.push(arguments[1]);
        args.push(callbackAfter);
    
        job.apply(this, args);
    
    };
};

module.exports = new Async();