app.service('Diff', function($q, FileSystem, Connection, MergeView) {

  var me = this;

  me.diff = function(srcRev, srcFile, destRev, destFile) {
    var promises = [me._loadFile(srcRev, srcFile), me._loadFile(destRev, destFile)];
    $q.all(promises).then(function(files) {
      MergeView.showDiffs(files[0], files[1]);
    });
  };

  me._loadFile = function(rev, path) {
    var deferred = $q.defer();
    if(rev == null) {
      FileSystem.findFile(path).then(function(file) {
        deferred.resolve(file);
      });
    } else {
      Connection.send('read-blob', function(data) {
        deferred.resolve(data);
      });
    }
    return deferred.promise;
  }

});