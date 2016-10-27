(function() {
  'use strict';
angular.module('todoApp')
  .filter('mySorting', function() {
    return function(input, selectedCriterion, tag) {
      input = input || '';
      if (!angular.isObject(input)) return input;
      //il seguente filtro ordina la lista di task di input secondo il criterio passatogli
      //CRITERI >> 1: by Deadline; 2: by Title; 3: by estwork, 4: by tag
      console.log("Filter order by " + selectedCriterion);

      switch(selectedCriterion) {
                case 1: //ordinamento per deadline
                    input.sort(function(a, b){
                        if(a.deadline < b.deadline )return -1;
                        else{
                            if(a.deadline > b.deadline)return 1;
                            else return 0;
                        }
                    });
                    break;
                case 2: //ordinamento per titolo
                    input.sort(function(a, b){
                        if(a.title < b.title )return -1;
                        else{
                            if(a.title > b.title)return 1;
                            else return 0;
                        }
                    });
                    break;
                case 3: //ordinamento per lavoro stimato
                    input.sort(function(a, b){

                        return a.estimatedwork - b.estimatedwork;
                    });
                    break;
                case 4: //ricerca per tag
                    var result = [];
                    if(tag == undefined) return input; //se non viene specificato il tag, viene restituita l'intera lista
                    console.log("search by " + tag);
                    console.log(input);
                    var i = 0;
                    for(i = 0; i < input.length; i++){
                        console.log(input[i].tags);
                        if(input[i].tags.indexOf(tag) > -1) result.push(input[i]);
                    }
                    return result;
                    break;
                default:
                    return input;         
      }

      return input;
    };
  })

})();