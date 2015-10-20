 angular.module('teenPatti', ['teenPatti.controllers', 'teenPatti.services', 'teenPatti.directives']);
 angular.module('teenPatti.controllers', []);
 angular.module('teenPatti.directives', []);
 angular.module('teenPatti.services', []);
 angular.module('teenPatti.controllers').controller('teenPattiCtrl', ['$scope', 'cardService',
     function($scope, cardService) {
        $scope.currentPlayer=1;
        $scope.getTable  = function(level){
            var table={boot:8,maxBet:1028,potLimit:10020,lastAmount:8,blind:true,show:false};
            if(!level) {

            }
            return table;
        }

         $scope.start = function() {
             cardService.shuffle();
             $scope.cards = cardService.getCards().slice();
         }

         $scope.reset = function() {
             $scope.p1 = {amount:10000,cards:[],blind:true,deal:false};
             $scope.p2 = {amount:10000,cards:[],blind:true,deal:false};
             $scope.p3 = {amount:10000,cards:[],blind:true,deal:false};
             $scope.p4 = {amount:10000,cards:[],blind:true,deal:false};
             $scope.p5 = {amount:10000,cards:[],blind:true,deal:false};
         }

         $scope.gameStart = function(){
            for(var count=1;count<=3;count++) {
                for(var i=1;i<=5;i++){
                    $scope["p"+i].cards.push($scope.cards.pop());
                }
            }
         }

         $scope.startNew = function(){
            $scope.start();
            $scope.reset();
            $scope.gameStart();
            $scope.table= $scope.getTable();
            $scope["p"+$scope.currentPlayer].deal=true;
         }

         $scope.getAmount= function(){
            var bet=$scope.table.lastAmount;
            if (bet>$scope.table.maxBet) {
                return $scope.table.maxBet;
            }
            return bet;
         }

         $scope.start();
         $scope.reset();
         $scope.gameStart();

     }
 ]);
 angular.module('teenPatti.directives').directive('playerSet', ['$timeout',

     function($timeout) {
         return {
             scope: {
                 playerData: '='
             },
             templateUrl: 'card-template.html',
             link: function(scope, element, artts) {
                 $timeout(function() {
                     console.log(scope);
                 }, 10);
             }
         }
     }
 ]);

 angular.module('teenPatti.directives').directive('card', [

     function() {
         return {
             restrict: "A",
             link: function(scope, element, artts) {}
         }
     }
 ]);
 angular.module('teenPatti.services').factory('cardService', [

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

         function getCards() {
             return deck;
         }

         function getRandomArbitrary(min, max) {
             return parseInt(Math.random() * (max - min) + min, 0);
         }

         function shuffle() {
             var len = deck.length,
                 tempVal, randIdx;
             while (0 !== len) {
                 randIdx = Math.floor(Math.random() * len);
                 len--;
                 deck[len].id=Math.random();
                 deck[randIdx].id=Math.random();
                 tempVal = deck[len];
                 deck[len] = deck[randIdx];
                 deck[randIdx] = tempVal;
             }
         }

         function getRandomCards(num) {
             var randCards = [];
             var cardInserted = {},
                 nCard = null;
             for (var count = 1; count <= num;) {
                 nCard = getRandomArbitrary(1, 52);
                 if (!cardInserted[nCard]) {
                     randCards.push($.extend({
                         id: Math.random()
                     }, deck[nCard - 1]));
                     cardInserted[nCard] = true;
                     count++;
                 }
             }
             return randCards;
         }


         return {
             getCards: getCards,
             getRandomCards: getRandomCards,
             shuffle: shuffle
         }
     }
 ]);