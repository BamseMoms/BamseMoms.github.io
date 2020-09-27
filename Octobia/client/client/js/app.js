angular.module('contactManager', ['ngRoute','firebase'])

    // 'ngRoute' module routes the application to different pages without reloading the entire application ( SPA: Single Page Application )
    //  'firebase' module provides $firebaseObject and $firebaseArray service
        // $firebaseObject: synchronized object with database
        // $firebaseArray: synchronized array with database


// route configuration, binding view-controller: for each address is associated a view and a controller
    .config(function($routeProvider,$locationProvider) {
        $locationProvider.hashPrefix('');


        $routeProvider
            .when("/", {
                templateUrl: "./views/home.htm",
                controller: 'contactCtrl'
            })
            .when("/addContact", {
                templateUrl: "./views/addContact.htm",
                controller: 'addCtrl'
            })

            .when("/viewContact", {
                templateUrl: "./views/viewContact.htm",
                controller: 'viewCtrl'
            })


            .otherwise({redirectTo: "/"});
    })

    // Service provides a method to communicate data across the controllers in a consistent way
    // Service 'idContact' is used in controller 'contactCtrl' and 'viewCtrl' to pass l'ID of contact to visualize in his page
    .service('idContact', function() {
        var id = '';
        this.setIdContact = function(a) { id = a};
        this.getIdContact = function() { return id};
    })


    // Data binding in AngularJS is the synchronization between the model and the view.
    // the controller can be completely separated from the view, and simply concentrate on the model data: AngularJS controllers control the data of AngularJS applications.
    // Thanks to the data binding in AngularJS, the view will reflect any changes made in the controller.

    // $scope is the binding part between the HTML (view) and the JavaScript (controller).
    // $scope is an object with the available properties and methods

    // controller contactCtrl of view 'home.htm'
    .controller('contactCtrl', function($scope,$firebaseArray,idContact) {

        //model for order and search the list of contacts by field.
        $scope.sortField = 'surname';
        $scope.sortDecrescent = false;


        // reference to child "contacts" of database
        var ref = firebase.database().ref().child("contacts");
        // create a synchronized array ( three-way data binding ): contacts model
        $scope.contacts = $firebaseArray(ref);

        $scope.setId = function(id){
            idContact.setIdContact(id);
        }
    })

    // controller addCtrl of view 'addContact.htm'
    .controller('addCtrl', function($scope,$firebaseArray,$location){
        var ref = firebase.database().ref().child("contacts");
        //contacts model
        var list = $firebaseArray(ref);

        // new contact model
        // 'null' because can be filled only some field to save contact in database
        $scope.nameModel = null;
        $scope.surnameModel = null;
        $scope.mailModel = null;
        $scope.phoneModel = null;
        $scope.notesModel = null;

        $scope.sendData = function() {

            var data = { 'name': $scope.nameModel, 'surname': $scope.surnameModel, 'mail': $scope.mailModel, 'phone': $scope.phoneModel, 'notes': $scope.notesModel      };
            // add new contact in database ( with the synchronization )
            list.$add( data ).then(function(ref) {
                // back in home
                $location.path('/');

                // reset form
                $scope.nameModel = null;
                $scope.surnameModel = null;
                $scope.mailModel = null;
                $scope.phoneModel = null;
                $scope.notesModel = null;


            });
        }
    })

    // controller 'viewCtrl' of view 'viewContact.htm'
    .controller('viewCtrl', function($scope,$firebaseArray,$firebaseObject,$location,idContact){
        $scope.modifyFlag = false;
        var ref = firebase.database().ref().child("contacts");
        var list = $firebaseArray(ref);
        var id;
        var refTags;

        //Returns a promise which is resolved when the initial array data has been downloaded from the database.
        list.$loaded().then(function() {
            id = idContact.getIdContact();
            refTags = ref.child(id).child('tags');
            // Returns the record from the list ( synchronize with "contacts" ) for the given id
            // selected contact model ( by id )
            $scope.user = list.$getRecord(id);

        });

        document.getElementById("confirmClickActionElementId").addEventListener("click", function( e ){ //e => event
            if( ! confirm("🔔 Vil Du slette denne kontakten! 🔔") ){
                e.preventDefault(); // ! => don't want to do this
            } else {
                //want to do this! => maybe do something about it?
                alert('🔔 Er du sikker på at du vil?, Siste sjanse 🔔');
            }
        });

        $scope.deleteContact = function(){
            // remove a record from the database and from the local array
            list.$remove($scope.user).then(function(ref) {
                $location.path('/');
            });
        };
        // Extra feature!
        $scope.editContact = function(){
            $scope.modifyFlag = true;

        };
        $scope.acceptEdit = function(){
            $scope.modifyFlag = false;
            // save an existing, modified local record back to the database and update database
            list.$save($scope.user).then( function(ref){});

        };

        $scope.cancelEdit = function(){
            // it cancel the changes made restoring contact data from database
            list = $firebaseArray(ref);
            list.$loaded().then(function() {
                $scope.user = list.$getRecord(id);
                $scope.modifyFlag = false;
            });

        };
        //Extra feature!
        $scope.addTag = function() {
            // add tag in object "tags" of specific contact
            refTags.push($scope.tag);
            $scope.tag = '';
        };

        $scope.removeTag = function(idTag){
            refTags.child(idTag).remove();

        }


    });








