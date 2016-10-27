(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('customList', directive);

    function directive() {
        return {
            scope: {},
            bindToController: {
                items: '=',
                selectedItem: '=',
                filterFunction: '=',
            },
            controller: customListController,
            controllerAs: 'customListCtrl',
            transclude: true,
            restrict: 'E',
            templateUrl: 'app/components/customList.template.html' 
        };
    }


    customListController.$inject = ['storageService', 'mySortingFilter'];

    //Directive controller
    function customListController(storageService, mySortingFilter) {
        var vm = this;
        vm.changePriority = changePriority;
        vm.checkStateChanged = checkStateChanged;
        vm.toggleSelection = toggleSelection;

        vm.order_items = order_items;

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

    }
})();