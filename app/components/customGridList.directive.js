(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('customGridList', directive);

    function directive() {
        return {
            scope: {},
            bindToController: {
                items: '=',
                selectedItem: '=',
                filterFunction: '=',
            },
            controller: customGridListController,
            controllerAs: 'customGridListCtrl',
            transclude: true,
            restrict: 'E',
            templateUrl: 'app/components/customGridList.template.html' 
        };
    }


    customGridListController.$inject = ['storageService', 'mySortingFilter'];

    //Directive controller
    function customGridListController(storageService, mySortingFilter) {
        var vm = this;
        vm.changePriority = changePriority;
        vm.checkStateChanged = checkStateChanged;
        vm.toggleSelection = toggleSelection;

        vm.order_items = order_items;
        vm.chooseColor = chooseColor;

        //criteri di ordinamento
        vm.availablecriteria = [];
        vm.availablecriteria.push({label: 'Deadline', value: 1});
        vm.availablecriteria.push({label: 'Title', value: 2});
        vm.availablecriteria.push({label: 'Estimated work', value: 3});
        vm.availablecriteria.push({label: 'Tag', value: 4});

        //Changes the priority of the given item
        function changePriority(item) {

            var p = 0;

            if (item.priority <= 0)
                    item.priority++;
            else
                item.priority = -1;

            p = item.priority;
            if (vm.selectedItem.length > 0){
                var i = 0;
                for(i = 0; i < vm.selectedItem.length; i++)
                    vm.selectedItem[i].priority = p;
            }

            storageService.set(vm.items);
        }

        //Occurs when the status of an items changes
        function checkStateChanged(item) {

            if (vm.selectedItem.length > 0){
                var i = 0;
                for(i = 0; i < vm.selectedItem.length; i++)
                    vm.selectedItem[i].done = item.done;
            }

            storageService.set(vm.items);
        }

        //Select or deselect the given item
        function toggleSelection(item) {
            /*if (vm.selectedItem == null || vm.selectedItem != item){
                vm.selectedItem = item;
       
            }
            else
                vm.selectedItem = null;*/

            var idx = vm.selectedItem.indexOf(item);

            if (vm.selectedItem.length == 0 || idx <= -1){
                vm.selectedItem.push(item);
                return;
            }

            if (vm.selectedItem.length > 0 && idx > -1){
                
                vm.selectedItem.splice(idx, 1);
                return;
            }
            
        }

        //ordinamento secondo il criterio selezionato
        function order_items(crit, q){
            vm.items = mySortingFilter(storageService.get(), crit, q);
            console.log("order direttiva");
        }

        //funzione di generazione del colore in base all'indice in lista'
        function chooseColor(idx){
            console.log("Color: " + idx);
            switch(idx%12) {
                case 0: return "orange";
                case 1:
                    return "red";

                case 2: return "green";
                case 3: return "darkBlue";
                case 4:
                    return "blue";

                case 5:
                    return "yellow";

                case 6: return "pink";      
                case 7: return "darkBlue";   
                case 8: return "purple";    
                case 9: return "deepBlue";  
                case 10: return "lightPurple"; 
                case 11: return "yellow"; 
            }

      }

    }
})();