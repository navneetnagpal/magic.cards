 angular.module('magicCards', ['magicCards.controllers', 'magicCards.services', 'magicCards.directives']);
 angular.module('magicCards.controllers', []);
 angular.module('magicCards.directives', []);
 angular.module('magicCards.services', []);
 angular.module('magicCards.controllers').controller('magicCardsCtrl', ['$scope', 'cardService',
     function($scope, cardService) {
         $scope.cards = cardService.getRandomCards(21);
         $scope.showCards=true;
         
         $scope.currentSet=1;
         var totalSets=3;
         $scope.finalCard = false;
         $scope.set1=[];
         $scope.set2=[];
         $scope.set3=[];
         $scope.set_pos = function(index){
         	return {
                backround:"red"
            }
         }
         $scope.magicNext  = function() {
            $scope.showCards=false;  
            $scope.showSlot = true;         
            $scope.newCards=$scope.cards.slice();
            $scope.magicSlot($scope.currentSet);
         }
         $scope.resetSlots = function(){
            $scope.set1=[];
            $scope.set2=[];
            $scope.set3=[];
         }
         $scope.magicSlot = function(){
            if ( $scope.currentSet<=totalSets) {
                var a=0;
                 while (a<$scope.newCards.length) {
                    $scope.newCards[a].id=Math.random();
                    $scope.set1.push($scope.newCards[a++]);
                    $scope.newCards[a].id=Math.random();
                    $scope.set2.push($scope.newCards[a++]);
                    $scope.newCards[a].id=Math.random();
                    $scope.set3.push($scope.newCards[a++]);
                }
                $scope.currentSet++;
            } else {
                $scope.showSlot = false;
                $scope.finalCard =$scope.newCards[10];
            } 
         }
         $scope.animateSlots = function(){
              
         }
         $scope.magicStart = function(){
            $scope.finalCard= null;
            $scope.showCards = true;
            $scope.showSlot=false;
            $scope.cards = cardService.getRandomCards(21);
            $scope.currentSet=1;
             $scope.finalCard = false;
             $scope.set1=[];
             $scope.set2=[];
             $scope.set3=[];
         }
         $scope.mergeCards = function(selectedSlot) {
            var newArray=[];
            switch(selectedSlot){
                case 1:
                    newArray = newArray.concat($scope.set2.slice());
                    newArray = newArray.concat($scope.set1.slice());
                    newArray = newArray.concat($scope.set3.slice());
                    break;
                case 2:
                    newArray = newArray.concat($scope.set1.slice());
                    newArray = newArray.concat($scope.set2.slice());
                    newArray = newArray.concat($scope.set3.slice());
                    break;
                case 3:
                    newArray = newArray.concat($scope.set1.slice());
                    newArray = newArray.concat($scope.set3.slice());
                    newArray = newArray.concat($scope.set2.slice());
                    break;
            }
            $scope.newCards = newArray;
         }
         $scope.nextSlot=function(slot) {
            $scope.mergeCards(slot);
            $scope.resetSlots();
            $scope.magicSlot();
         }
     }
 ]);
 angular.module('magicCards.directives').directive('magicCards', [

     function() {
         return {
             link: function(scope, element, artts) {

             }
         }
     }
 ]);

 angular.module('magicCards.directives').directive('card', [

     function() {
         return {
         	restrict:"A",
     //     	template:'<div class="card "  card="" data-rank="">'+
					// 	'<span class="text"></span>'+
					// 	'<div class="icon ">'+							
					// 	'</div>'+
					// '</div>',
             link: function(scope, element, artts) {
             	console.log(scope.card);
             }
         }
     }
 ]);
 angular.module('magicCards.services').factory('cardService', [
     function() {
         function Card(type, rank) {
             this.type = type;
             this.rank = rank;
             this.name = this.getName(rank);
         }
         Card.prototype.getName = function() {
             switch (this.rank) {
                 case 1:
                     return "A";
                 case 11:
                     return "J";
                 case 12:
                     return "Q";
                 case 13:
                     return "K";
                 default:
                     return this.rank.toString();
             }
         }


         var deck = [],
             types = {
                 'heart': {},
                 'spade': {},
                 'diamond': {},
                 'club': {}
             };

         function makeCards() {
             for (var type in types) {
                 for (var a = 1; a <= 13; a++) {
                     deck.push(new Card(type, a));
                 }
             }
         }
         makeCards();

         function getRandomArbitrary(min, max) {
             return parseInt(Math.random() * (max - min) + min, 0);
         }

         function getRandomCards(num) {
             var randCards = [];
             var cardInserted = {},
                 nCard = null;
             for (var count = 1; count <= num;) {
                 nCard = getRandomArbitrary(1, 52);
                 if (!cardInserted[nCard]) {
                     randCards.push($.extend({id:Math.random()}, deck[nCard-1]));
                     cardInserted[nCard] = true;
                     count++;
                 }
             }
             return randCards;
         }


         return {
             getRandomCards: getRandomCards
         }
     }
 ]);