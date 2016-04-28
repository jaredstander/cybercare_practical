angular.module('customerRecordApp', [])

  .controller('customerRecordAppController', function($scope){

    $scope.saveCustomerList = function() {
      window.localStorage['customerRecordAppStorage'] = angular.toJson($scope.customers);
    }

    $scope.createCustomer = function() {
      $scope.customers.push({name: $scope.customerName, email: $scope.customerEmail, telephone: $scope.customerTelephone, street: $scope.customerStreet, city: $scope.customerCity, state: $scope.customerState, zipcode: $scope.customerZipcode});
      $scope.saveCustomerList();
      $scope.clearCustomerForm();
      console.log("Customer record pushed into customer array, saved into JSON.");
    };

    $scope.deleteCustomer = function(customerIndex) {
      // remove at index
      $scope.customers.splice(customerIndex, 1);
      $scope.saveCustomerList();
      console.log("Customer record deleted.");
    };

    $scope.updateCustomer = function(customerIndex) {
      // pop out the customer record, butfill the form with it.
      $scope.customerRecordToUpdate = $scope.customers.splice(customerIndex, 1);
      $scope.loadForm($scope.customerRecordToUpdate[0]);
      console.log("Customer record _replaced_. (removed at index, re-saved as a new record.)");
    };

    $scope.loadForm = function(customerHash) {
      $scope.customerName = customerHash['name'];
      $scope.customerEmail = customerHash['email'];
      $scope.customerTelephone = customerHash['telephone'];
      $scope.customerStreet = customerHash['street'];
      $scope.customerCity = customerHash['city'];
      $scope.customerState = customerHash['state'];
      $scope.customerZipcode = customerHash['zipcode'];
      console.log("Form data filled based on hash passed from customer array.");
    }

    $scope.clearCustomerForm = function() {
      $scope.customerName = "";
      $scope.customerEmail = "";
      $scope.customerTelephone = "";
      $scope.customerStreet = "";
      $scope.customerCity = "";
      $scope.customerState = "";
      $scope.customerZipcode = "";
      console.log("Customer fields have all been cleared.");
    };

    function init() {
      console.log("Initializing... Checking for existing data...");
      // Load existing JSON data if there is any.
      if(window.localStorage['customerRecordAppStorage'] === undefined) {
        $scope.customers = [];
        console.log("No JSON storage found, creating black customer array...");
      }else{
        $scope.customers = JSON.parse(window.localStorage['customerRecordAppStorage']);
        console.log("JSON storage found, loading customer array...")
      }
    };

    init();

  });