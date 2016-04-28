angular.module('customerRecordApp', [])

  .controller('customerRecordAppController', function($scope){
    $scope.customers = [{name: 'Starfox', email: 'starfox.com', telephone: '666', street: '123 st', city: 'barktown', state: 'MA', zipcode: '00000'}];
    console.log($scope.customers);

    $scope.createCustomer = function() {
      $scope.customers.push({name: $scope.customerName, email: $scope.customerEmail, telephone: $scope.customerTelephone, street: $scope.customerStreet, city: $scope.customerCity, state: $scope.customerState, zipcode: $scope.customerZipcode});
      console.log('success');
    };

    $scope.deleteCustomer = function() {

    };

    $scope.updateCustomer = function() {

    };

  });