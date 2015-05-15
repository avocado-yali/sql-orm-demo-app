angular.module('starter.services', [])
.service('persistencejs', function() {
  // persistence.store.websql.config(persistence, 'donler', 'todo database', 5*1024*1024);
  
  persistence.store.cordovasql.config(
    persistence,
    'donler',
    '1.0',                // DB version
    'donler_db',          // DB display name
    5 * 1024 * 1024,        // DB size
    0                       // SQLitePlugin Background processing disabled
  );
  var Playlists = persistence.define('Playlists', {
    title: "TEXT"
  });
  persistence.schemaSync();
  return {
    add: function(item){
      var t = new Playlists();
      persistence.add(t);     
      t.title = item.title;
      console.log(t);
      persistence.flush(function(){
        // 6 persistence (server-side/mysql)        
        // Playlists.syncAll(
        //   function(){alert('Callback');},
        //   function(){alert("Done!");},
        //   function(){alert("Error");}
        // );                  
      });
    },
    
    edit: function(startContent, endContent){
      Playlists.all().filter('content','=',startContent).one(function(item){
        item.content = endContent;
        persistence.flush(function(){
          // 6 persistence (server-side/mysql)          
          Playlists.syncAll(
            function(){alert('Callback');},
            function(){alert("Done!");},
            function(){alert("Error");}
          );
                    
        });
      });
    },
    
    changeStatus: function(item){
      Playlists.all().filter('content','=',item.content).one(function(todo){
        todo.done = item.done;
        persistence.flush(function(){
          // 6 persistence (server-side/mysql)          
          Playlists.syncAll(
            function(){alert('Callback');},
            function(){alert("Done!");},
            function(){alert("Error");}
          );
                  
        });
      });
    },
    
    clearCompletedItems: function(){
      Playlists.all().filter('done','=',true).destroyAll(function(){
        // 6 persistence (server-side/mysql)        
        Playlists.syncAll(
          function(){alert('Callback');},
          function(){
            Playlists.all().filter('done','=',true).destroyAll(function(){
              alert("Done!");
            });
          },
          function(){alert("Error");}
        );
              
      });
    },
    
    remove: function(item){
      Playlists.all().filter('content','=',item.content).destroyAll(function(){
        // 6 persistence (server-side/mysql)        
        Playlists.syncAll(
          function(){alert('Callback');},
          function(){
            Playlists.all().filter('content','=',item.content).destroyAll(function(){
              alert("Done!");
            });
          },
          function(){alert("Error");}
        );
                      
      });
    },
    
    fetchAll: function(callback){
      Playlists.all().list(function(items){
        var itemCount = items.length;
        var playlists = [];
        items.forEach(function(item){
          playlists.push({
            title: item.title,
            id: item.id
          });
          if(--itemCount == 0){
            callback(null, playlists)
          }
        });                 
      });
    }
  };
});


