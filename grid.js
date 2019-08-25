var Grid = function(opt){
    
    opt = opt || {};
    this.w = opt.w || 8;
    this.h = opt.h || 6;
    this.nodes = [];
    
    this.buildCleanNodes();
    
};

// just build a clean array of nodes for the gird
Grid.prototype.buildCleanNodes = function(){
    this.nodes = [];
    var y = 0,x,row;
    while(y < this.h){
        x = 0;
        row = [];
        while(x < this.w){
            row.push(0);
            x += 1;
        }
        this.nodes.push(row);
        y += 1;
    }
    return this.nodes;
};
