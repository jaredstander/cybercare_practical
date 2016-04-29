angular.module('customerRecordApp', [])

  .controller('customerRecordAppController', function($scope, $window, $http){

    $scope.saveCustomerList = function() {
      // Below code does not use an external file.
      // window.localStorage['customerRecordAppStorage'] = angular.toJson($scope.customers);
      var jsonFileData = new Blob($scope.customers, {type: 'application/json'});
      jsonFile = window.URL.createObjectURL(jsonFileData);
    }

    $scope.createCustomer = function() {
      if($scope.customerName === undefined){
        alert("At least a customer name is required.");
        console.log("Attempted to create record without any information.");
      }else{
        $scope.customers.push({name: $scope.customerName, email: $scope.customerEmail, telephone: $scope.customerTelephone, street: $scope.customerStreet, city: $scope.customerCity, state: $scope.customerState, zipcode: $scope.customerZipcode});
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
    // function init() {
    //   $scope.formAction = "Create Record";
    //   console.log("Initializing... Checking for existing data...");
    //   // Load existing JSON data if there is any.
    //   if(window.localStorage['customerRecordAppStorage'] === undefined) {
    //     $scope.customers = [];
    //     console.log("No JSON storage found, creating black customer array...");
    //   }else{
    //     $scope.customers = JSON.parse(window.localStorage['customerRecordAppStorage']);
    //     console.log("JSON storage found, loading customer array...")
    //   }
    // };

    // init();

    function init(){
      var request = $http({url: 'customerData.json', dataType: 'json', method: 'GET'});
      return (request.then(handleSuccess, handleFailure))
    }

    function handleSuccess(response){
      // poop
    }

    function handleFailure(response){
      // poop
    }

    init();

    // $http({
    //   url: 'customerData.json',
    //   dataType: 'json',
    //   method: 'POST',
    //   data: '',
    //   headers: {
    //       "Content-Type": "application/json"
    //   }
    // }).success(function(response){
    //     $scope.customers = JSON.parse(response);
    // }).error(function(error){
    //     $scope.names = [];
    //     console.log(error);
    // });  

  });