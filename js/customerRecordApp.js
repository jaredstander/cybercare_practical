angular.module('customerRecordApp', [])

  .controller('customerRecordAppController', function($scope, $window, $http){

    $scope.saveCustomerList = function() {
      // Below code does not use an external file.
      window.localStorage['customerRecordAppStorage'] = angular.toJson($scope.customers);

      // External JSON file methods gave 405 method not allowed errors, seems to require server-side configuration.
      // $http.post('js/customerData.json', angular.toJson($scope.customers)).then(fileSaveSuccess, fileSaveError);
    }

    // function fileSaveSuccess(response){
    //   console.log("JSON file saved successfully.");
    //   console.log(response.data);
    // }

    // function fileSaveError(response){
    //   console.log("JSON file save error occured.");
    //   console.log(response.data);
    // }

    $scope.createCustomer = function() {
      if($scope.customerName === undefined){
        alert("At least a customer name is required.");
        console.log("Attempted to create record without any information.");
      }else{
        $scope.customers.push({name: $scope.customerName, email: $scope.customerEmail, telephone: $scope.customerTelephone, street: $scope.customerStreet, city: $scope.customerCity, state: $scope.customerState, zipcode: $scope.customerZipcode, creationDate: Date.now()});
        $scope.saveCustomerList();
        $scope.clearCustomerForm();
        $scope.formAction = "Create Record";
        console.log("Customer record pushed into customer array, saved into JSON.");
      }
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
      $scope.formAction = "Save Updated Record";
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

    // Original init function to use localStorage for storing customer records.
    function init() {
      $scope.formAction = "Create Record";
      console.log("Initializing... Checking for existing data...");
      // Load existing JSON data if there is any.
      if(window.localStorage['customerRecordAppStorage'] === "") {
        $scope.customers = [];
        console.log("No JSON storage found, creating black customer array...");
      }else{
        $scope.customers = JSON.parse(window.localStorage['customerRecordAppStorage']);
        console.log("JSON storage found, loading customer array...")
      }
    };

    init();

    // External storage method. Unable to test, as I was unable to get file writing to work.
    // function init(){
    //   $scope.formAction = "Create Record";
    //   $http({method: 'GET', url: 'js/customerData.json'}).then(function handleLoadSuccess(response){
    //     console.log(response.data);
    //     if(response.data === ""){
    //       $scope.customers = [];
    //       console.log("JSON file empty, creating empty array for customer data.");
    //     }else{
    //       $scope.customers = JSON.parse(response.data);
    //       console.log("JSON loaded successfully.");
    //     }
    //   }, function handleLoadFailure(response){
    //     $scope.customers = [];
    //     console.log("No JSON file found, creating empty array for customer data.");
    //   });
    // }

    // init();

  });