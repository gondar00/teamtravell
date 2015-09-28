angular.module('starter.controllers', [])

// .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   // Form data for the login modal
//   $scope.loginData = {};

//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });

//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };

//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     console.log('Doing login', $scope.loginData);

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };
// })

.controller('PlaylistsCtrl', function($rootScope,$scope,$http) {  

var message = 0;
$rootScope.equals = function(){
  $rootScope.replan = true;
  // alert("clicked")
  var original = $rootScope.names2.resource1.fare;
  console.log("original", original)
  var beforeoriginal = $rootScope.maxScore;
  console.log("beforeoriginal", beforeoriginal)
  var afteroriginal = $rootScope.lowFare;
  console.log("afteroriginal", afteroriginal)

  if(beforeoriginal > afteroriginal){
    after();
  }else{
    before();
  }

function before(){
 if(original == beforeoriginal){
     $rootScope.message = 1;
  }else if(original > beforeoriginal){
    $rootScope.message = 2;
    $rootScope.difference = original - beforeoriginal;
    $rootScope.beforeoriginaldate = $rootScope.maxDate;
    // $scope.beforeDate= moment().format('MMMM Do YYYY');
    console.log("beforeoriginaldate",$scope.beforeoriginaldate)
  } 
}
function after(){
  if(original == afteroriginal){
     $rootScope.message = 1;
  }
else if(original > afteroriginal){
    $rootScope.message = 3;
    $rootScope.difference = original - afteroriginal;
    $rootScope.afteroriginaldate = $rootScope.lowFareDate;
    // console.log("afteroriginaldate",afteroriginaldate)
    // $scope.afterDate= moment().format('MMMM Do YYYY');
  }
}
  // if(original == beforeoriginal){
  //    $scope.message = 1;
  // }else if(original > beforeoriginal){
  //   $scope.message = 2;
  //   $scope.difference = original - beforeoriginal;
  //   $scope.beforeoriginaldate = $rootScope.maxDate;
  //   // $scope.beforeDate= moment().format('MMMM Do YYYY');
  //   console.log("beforeoriginaldate",$scope.beforeoriginaldate)
  // }else if(original > afteroriginal){
  //   $scope.message = 3;
  //   $scope.difference = original - afteroriginal;
  //   $scope.afteroriginaldate = $rootScope.lowFareDate;
  //   // console.log("afteroriginaldate",afteroriginaldate)
  //   // $scope.afterDate= moment().format('MMMM Do YYYY');
  // }
}

$scope.fetch=function(a,b,c,d,ab){
var e = moment(c).format('YYYYMMDD');
console.log("depart in YYYYMMDD",e)
var f = moment(d).format('YYYYMMDD');
console.log("arrive in YYYYMMDD",f)
$http.get("http://developer.goibibo.com/api/search/?app_id=fdf2a162&app_key=dd8955ba39d606e4a3789d7c61b3a7f6&format=json&source="+a+"&destination="+b+"&dateofdeparture="+e+"&seatingclass="+ab+"&adults=1&children=0&infants=0")
    .success(function(response) {
      $rootScope.res = response;
      console.log("res",$rootScope.res)
  });
$http.get("http://developer.goibibo.com/api/stats/minfare/?app_id=fdf2a162&app_key=dd8955ba39d606e4a3789d7c61b3a7f6&format=json&vertical=flight&source="+a+"&destination="+b+"&mode=one&sdate="+e+"&class="+ab+"")
    .success(function(response) {
      $rootScope.names2 = response;
    console.log("on",$rootScope.names2.resource1.fare)});
/*var g = moment(c).add(1,'days').format('YYYYMMDD')
console.log(g);*/
var g = []; 
var h = [];
var names = [];
var names1 = [];
var farecheck = [];
var farecheck1 = [];
function lowest(arr){
  //please work baby :* 
      var lowest = Number.POSITIVE_INFINITY;
      // var highest = Number.NEGATIVE_INFINITY;
      var tmp;
  for (var i=arr.length-1; i>=0; i--) {
    tmp = arr[i].fare;
    if (tmp < lowest) lowest = tmp;
    // if (tmp > highest) highest = tmp;
}
  return lowest;

}
      function getHighestScore(array) {
   
    for (var i = 0; i < array.length; i++) {
       var max = array[i].fare;
        if (array[i].fare < (max || 0))
            max = array[i].fare;

    }
    return max;
}
function getByValue(arr, value) {

  for (var i=0, iLen=arr.length; i<iLen; i++) {

    if (arr[i].fare == value) return arr[i].date;
  } 
}
for(i=0;i<3;i++){
g[i]= moment(c).add(i+1,'days').format('YYYYMMDD')
h[i]= moment(c).subtract(i+1,'days').format('YYYYMMDD')
// console.log(g[i]);
// console.log(h[i]);
$http.get("http://developer.goibibo.com/api/stats/minfare/?app_id=fdf2a162&app_key=dd8955ba39d606e4a3789d7c61b3a7f6&format=json&vertical=flight&source="+a+"&destination="+b+"&mode=one&sdate="+g[i]+"&class="+ab+"")
    .success(function(response) {

      names[i] = response;
      console.log("ff",names[i].resource1);
      farecheck.push({fare:names[i].resource1.fare,date:names[i].resource1.date})
      var lowFare = lowest(farecheck);
      console.log("lowFare",lowFare);
      $rootScope.lowFare = lowFare;
      var lowFareDate = getByValue(farecheck,lowFare)
      console.log("lowFareDate",lowFareDate);
      $rootScope.lowFareDate = lowFareDate;
      // var min1 = Math.min.apply(null,farecheck);
      // console.log("f",farecheck,min1)
      // $rootScope.min1 = min1;
    console.log("after",names[i].resource1.fare,names[i].resource1.date)
  });

$http.get("http://developer.goibibo.com/api/stats/minfare/?app_id=fdf2a162&app_key=dd8955ba39d606e4a3789d7c61b3a7f6&format=json&vertical=flight&source="+a+"&destination="+b+"&mode=one&sdate="+h[i]+"&class="+ab+"")
    .success(function(response) {
      names1[i] = response;
      $scope.result = response;
      console.log("i m mad",farecheck1);
      farecheck1.push({fare:names1[i].resource1.fare,date:names1[i].resource1.date}); 
      // var res = Math.min.apply(Math,farecheck1.map(function(o){return o.fare;}))

      var maxScore = lowest(farecheck1);
      console.log("maxScore",maxScore);
      $rootScope.maxScore = maxScore;
      var maxDate = getByValue(farecheck1,maxScore)
      console.log("maxDate",maxDate);
      $rootScope.maxDate = maxDate;
    console.log("before",names1[i].resource1.fare)

  });

}
$rootScope.active = true;
}
})
.controller('PlaylistCtrl', function($scope) {
$scope.config = {
itemsPerPage: 10,
fillLastPage: false
}
}).controller('BusCtrl',function($scope,$http,$rootScope){
$scope.fetch = function(a,b,c){
var e = moment(c).format('YYYYMMDD');
console.log("depart in YYYYMMDD",e)
$http.get("http://developer.goibibo.com/api/bus/search/?app_id=fdf2a162&app_key=dd8955ba39d606e4a3789d7c61b3a7f6&format=json&source="+a+"&destination="+b+"&dateofdeparture="+e+"")
    .success(function(response) {
      $rootScope.busresult = response;
      console.log("busresult",$rootScope.busresult)
  });
};
}).controller('BusTripCtrl',function($scope){
$scope.config = {
itemsPerPage: 15,
fillLastPage: false
}
}).controller('todoController',['$scope','$http', function($scope,$http){
   
  $scope.init = function(){
    $scope.todos = [];
    $scope.todoItem ={};
    
    $http.get('js/data.json').success(function(data){
      $scope.todos = data;
      console.log(data);
    });
    
  };
  
  $scope.countDoneItem = function(){
    var todoDone = 0;
    $scope.todos.forEach(function (todo) {
            if (todo.isDone===true) {
                todoDone += 1;
            }
    });
    
    return todoDone;
  };
  
  $scope.addToDo = function(todo){
    todo.isDone=false;
    $scope.todos.push(todo);
    $scope.todoItem ={};
  };
  $scope.deleteItem = function(index){
    $scope.todos.splice(index,1);
  };
  
  $scope.deleteAllItems = function(index){
    $scope.todos =[];
  };
  
  $scope.markDone = function(index){
    $scope.todos[index].isDone = true;
  };
  
  $scope.markAllDone = function(){
    $scope.todos.forEach(function(todo){
      todo.isDone = true;
    });
  };
  
  $scope.markAllUnDone = function(){
    $scope.todos.forEach(function(todo){
      todo.isDone = false;
    });
    console.log($scope);
  };
  
  $scope.resetTodo = function(index){
    $scope.todos[index].isDone = false;
  };
  
  $scope.$watch('todos',function(){
    $scope.totalDone = $scope.countDoneItem() || 0;
    $scope.totalItems = $scope.todos.length || 0;
  },true);
  
}]).controller("teamController",function($scope,$http,$rootScope){
$scope.config = {
itemsPerPage: 10,
fillLastPage: false
}

$scope.teamfetch = function(source,destination,depart,clas,adults){

var e = moment(depart).format('YYYYMMDD');
console.log("depart in YYYYMMDD",e)
// var f = moment(d).format('YYYYMMDD');
// console.log("arrive in YYYYMMDD",f)
$http.get("http://developer.goibibo.com/api/stats/minfare/?app_id=fdf2a162&app_key=dd8955ba39d606e4a3789d7c61b3a7f6&format=json&vertical=flight&source="+source+"&destination="+destination+"&mode=one&sdate="+e+"&class="+clas+"")
    .success(function(response) {
      if (adults>1) {
      var newFare = {};
      newFare = adults * response.resource1.fare;
      console.log(newFare)
      var lowestFare = response;
      lowestFare.resource1.fare = newFare;
      // lowestFare[resource1[fare]] = newFare;
      console.log(lowestFare)
       $rootScope.lowestFare = lowestFare;
      // var tempData = new Array();
      // tempData.push(lowestFare);
      // console.log(tempData);
      // $rootScope.increasedFare = adults * response.resource1.fare;
      // console.log("lowestFare",$rootScope.increasedFare)
    } else{
      $rootScope.lowestFare = response;
      console.log("lowestFare",$rootScope.lowestFare)
      // console.log("table",$rootScope.lowestFare.resource1.fare)
    };


     
  });
$http.get("http://developer.goibibo.com/api/voyager/?app_id=fdf2a162&app_key=dd8955ba39d606e4a3789d7c61b3a7f6&method=hotels.get_hotels_data&id_list=%5B3155310559579478816%2C1017089108070373346%2C+6085103403340214927%5D&id_type=_id")
.success(function(response){
  $rootScope.hotels=response;
  console.log("hotels",$rootScope.hotels)

})

}
  

});