angular.module("controllers")
  .controller("userCreateController", ['User', 'Auth', '$location', 'flash', 'config', function(User, Auth, $location, flash, config) {
    var vm = this;

    vm.saveUser = function() {
      vm.processing = true;

      User.create(vm.userData)
        .success(function(data) {
          vm.processing = false;
          if (!data.errors) {
            Auth.login(vm.userData.email, vm.userData.password)
              .success(function(data){
                flash.setMessage("Welcome, " + vm.userData.email + "!");
                $location.path(config.main_path);
              });
          } else
            flash.setErrors(data);
        });
    };
  }])

  .controller("userEditController", ['User', 'Auth', '$location', 'flash', 'config', function(User, Auth, $location, flash, config) {
    var vm = this;

    //form population
    currentUser = Auth.getCurrentUser()
    vm.userData = {}
    vm.userData.firstname = currentUser.firstname
    vm.userData.lastname = currentUser.lastname

    vm.saveUser = function() {
      vm.processing = true;

      User.update(vm.userData)
        .success(function(data) {
          vm.processing = false;
          if (!data.errors) {
            Auth.updateCurrentUser(data)
            flash.setMessage(data.message);
            $location.path(config.main_path);
          } else
            flash.setErrors(data);
        });
    };
  }])