// Node Constructor
var Node = function(opt){
    var opt = opt || {};
    this.x = opt.x;
    this.y = opt.y;
    this.i = opt.i;
    this.walkable = opt.walkable === undefined ? true: opt.walkable;
};

// Main Grid Constructor
var Grid = function(opt){
    opt = opt || {};
    this.w = opt.w || 8;
    this.h = opt.h || 6;
    this.nodes = [];
    this.buildCleanNodes();
};

// FromMatrix static method can be used to clone a Grid
Grid.fromMatrix = function(matrix){
    var grid = new Grid({
        w: matrix[0].length,
        h: matrix.length
    });
    var y=0,x,m;
    while(y < grid.h){
        x = 0;
        while(x < grid.w){
            m = matrix[y][x];
            grid.nodes[y][x] = new Node({
                x:x,
                y:y,
                i:m.i,
                walkable: m.walkable
            });
            x += 1;
        }
        y += 1;
    }
    return grid;
};

// just build a clean array of nodes for the gird
Grid.prototype.buildCleanNodes = function(){
    this.nodes = [];
    var y = 0,x,row;
    while(y < this.h){
        x = 0;
        row = [];
        while(x < this.w){
            row.push(new Node({
                x: x,
                y: y,
                i: y * this.w + x,
                walkable: true
            }));
            x += 1;
        }
        this.nodes.push(row);
        y += 1;
    }
    return this.nodes;
};

// return true if the given x and y position is in bounds
Grid.prototype.isInBounds = function(x,y){
    return (x >= 0 && x < this.w) && (y >= 0 && y < this.h);
};

Grid.prototype.isWalkable = function(x,y){
    if(this.isInBounds(x,y)){
        return this.nodes[y][x].walkable;
    }
    return false;
};

// get the four Neighbors of a node
Grid.prototype.getNeighbors = function(node){
    var x = node.x,
    y = node.y,
    neighbors = [];
    if(this.isWalkable(x,y-1)){
        neighbors.push(this.nodes[y-1][x]);
    }
    if(this.isWalkable(x,y + 1)){
        neighbors.push(this.nodes[y+1][x]);
    }
    if(this.isWalkable(x - 1,y)){
        neighbors.push(this.nodes[y][x-1]);
    }
    if(this.isWalkable(x + 1,y)){
        neighbors.push(this.nodes[y][x+1]);
    }
    return neighbors;    
};

// Find path from start node to end node
Grid.prototype.findPath = function(startNode, endNode){
    
    var grid = Grid.fromMatrix(this.nodes),
    path = [],
    opened = [],
    node;
    
    opened.push(startNode);
    startNode.opened = true;
    
    //console.log(opened);
    while(opened.length > 0){
        node = opened.pop();
        node.closed = true;
        
        if(node === endNode){
            return path;
        }
        
        var neighbors = grid.getNeighbors(node);
        console.log(neighbors);
        var ni = 0,
        nl = neighbors.length;
        
        // loop current neighbors
        while(ni < nl){
            var neighbor = neighbors[ni];
            if (neighbor.closed) {
                ni += 1;
                continue;
            }
            
            ni += 1;
        }
        
    }
    
    return [];
    
};
