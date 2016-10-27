(function(angular) {

    'use strict';

    angular
        .module('todoApp')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['storageService','$mdDialog'];


    function TodoController(storageService, $mdDialog) {
        var vm = this;

        vm.selectedItem = []; //null
        vm.items = storageService.get() || [];
        vm.notDone = notDone;
        vm.done = done;
        vm.all = all;
        vm.deleteItems = deleteItems; //per la cancellazione multipla
        vm.createItem = createItem;
        vm.addTask = addTask;
        vm.updateItem = updateItem;

        vm.deleteItem = deleteItem;


        function notDone(item) {
            return item.done == false;
        }

        function done(item) {
            return item.done == true;
        }

        function all(item) {
            return true;
        }

        //cancella i task presenti nel vettore dei task selezionati
        function deleteItems(ev) {
            console.log(vm.selectedItem[0]);
            var i = 0;

            deleteItem(ev, vm.selectedItem[0]);


        }

        //cancella il singolo task
        function deleteItem(ev, item) {
            console.log("Deleting: " + item);

            var confirm = $mdDialog.confirm() //chiedo conferma all'utente per la cancellazione del task

            .textContent('The task "' + item.title + '" will be deleted. Are you sure?')
                .ariaLabel('Delete task')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function(result) { //quando viene effettuata la hide del mdDialog..

                //..cancello il task dalla memoria dello storage
                if (result) {
                    var index = vm.items.indexOf(item);
                    if (index != -1) {
                        vm.items.splice(index, 1);
                        storageService.set(vm.items);
                    }

                    //..lo rimuovo dai task selezionati..
                    index = vm.selectedItem.indexOf(item);
                    if (index != -1) {
                        vm.selectedItem.splice(index, 1);
                    }

                    //..passo a cancellare il successivo task per ricorsione
                    console.log(vm.selectedItem.length);
                    if(vm.selectedItem.length > 0){
                        console.log("Next item to delete: " + vm.selectedItem[0]);
                        deleteItem(ev, vm.selectedItem[0]);
                    }
                }
            });


        }

        //Creates a new item with the given parameters
        function createItem(t) {
            vm.items.push({
                title: t.title,
                descr: t.descr,
                done: t.done || false,
                priority: t.priority || 0,
                deadline: t.deadline || Date.now(),
                estimatedwork: t.estimatedwork || 0,
                tags: t.tags
            });
            storageService.set(vm.items);
        }


        function updateItem(ev){
            console.log(vm.selectedItem[0].title);  

            $mdDialog.show({ //mostro la form di modifica del task
                controller: UpdateController,
                controllerAs: 'uc',
                templateUrl: 'pages/editTaskForm.html',
                locals: {task: vm.selectedItem[0], idx: vm.items.indexOf(vm.selectedItem[0])},
            // parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
            .then(function(item) { //quando viene risolta la promise tramite hide del mdDialog
                var i = 0;
                console.log("Updated " + item);

                //vm.items[item.idx] = item;
                storageService.set(vm.items); //.. aggiorno il localstorage con il task aggiornato (item)
                
            });

            function UpdateController($mdDialog) {
               
                var uc = this;

                uc.task = vm.selectedItem[0];
                uc.task.idx = vm.items.indexOf(vm.selectedItem[0]);


                //possibili priorità per la costruzione di un vocabolario statico
                uc.priorities = [];
                uc.priorities.push({title: 'High', value: 1});
                uc.priorities.push({title: 'Medium', value: 0});
                uc.priorities.push({title: 'Low', value: -1});

                //possibili tag, vocabolario statico
                uc.availabletags = ['tag01', 'tag02', 'tag03', 'tag04', 'tag05', 'Altro'];
        
                 uc.cancel = function() {
                    $mdDialog.cancel();
                 };

                 uc.update = function(t) {
                    //risolvo la promise solo quando tutti i campi required sono inseriti
                    if(t.title != undefined && t.priority != undefined && t.deadline != undefined && t.estimatedwork != undefined)
                        $mdDialog.hide(t);
                 };

                 uc.toggle = function (item, list) { //funzione per la gestione della lista di tags
                    var idx = list.indexOf(item);
                    if (idx > -1) {
                        list.splice(idx, 1);
                        console.log("Presente");
                    }
                    else {
                        list.push(item);
                        console.log("Assente");
                    }
                 };

                 uc.StrToDate = function (str) { //conversione stringa-date per la mdDatePicker
                    return new Date(str);
                 }

            
            }



        
    }


        //Add a new task to the items list 
    function addTask(ev) {
 


        $mdDialog.show({ //mostro la form di aggiunta di un nuovo task
        controller: DialogController,
        controllerAs: 'dc',
        templateUrl: 'pages/taskForm.html',
       // parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
        })
        .then(function(answer) { //quando la promise viene risolta, creo il nuovo task
                if (answer)
                    vm.createItem(answer);
        });

        function DialogController($mdDialog) {

           var dc = this;

           //possibili priorità per la costruzione di un vocabolario statico
           dc.priorities = [];
           dc.priorities.push({title: 'High', value: 1});
           dc.priorities.push({title: 'Medium', value: 0});
           dc.priorities.push({title: 'Low', value: -1});

           //possibili tag, vocabolario statico
           dc.availabletags = ['tag01', 'tag02', 'tag03', 'tag04', 'tag05', 'Altro'];

           dc.hide = function() {
                $mdDialog.hide();
           };
           dc.cancel = function() {
                $mdDialog.cancel();
           };

           dc.add = function(t) {
                //risolvo la promise solo quando tutti i campi required sono inseriti
                console.log(t);
                if(t.title != undefined && t.priority != undefined && t.deadline != undefined && t.estimatedwork != undefined)$mdDialog.hide(t);
           };

           dc.toggle = function (item, list) { //funzione per la gestione della lista di tags
                var idx = list.indexOf(item);
                if (idx > -1) {
                    list.splice(idx, 1);
                    console.log("Presente");
                }
                else {
                    list.push(item);
                    console.log("Assente");
                }
           };

        }



        };




    }

})(window.angular);