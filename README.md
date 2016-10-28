<h2><b>Introduzione</b></h2>

In merito al Laboratorio di AngularJS tenuto dalla BaxEnergy presso il Corso di Laurea Magistrale in Ingegneria Informatica dell'Università degli Studi di Catania (A.A. 2016/17), il presente documento contiene la descrizione delle funzionalità con cui è stata estesa l'applicazione WEB di gestione dei task, implementata durante una delle lezioni del corso, da parte dello studente Niccolò Fabrizio Pagano (matricola O55000281). 
L'intero progetto è stato esteso utilizzando la libreria Material Design per AngularJS. Le funzionalità che sono state aggiunte verranno illustrate una per una, indicando per ognuna di esse il comportamento dell'applicazione finale. Tuttavia, per una migliore comprensione della stessa, si consiglia di lanciarla prima di procedere ulteriormente alla lettura della presente relazione. Il codice sorgente è consultabile e scaricabile al seguente link di Github:
https://github.com/NickFP5/pagano_angularjs

Di seguito viene riportata la struttura delle directory del progetto:
<pre>
pagano_angularjs
	app
		components
			customGridList.directive.js
			customGridList.template.html
			customList.directive.js
			customList.template.html
		mySorting.filter.js
		storage.service.js
		todo.controller.js
		todoApp.config.js
		todoApp.module.js
	lib
		...
	pages
		editTaskForm.html
		taskForm.html
	styles
		style.css
		...
	index.html
  </pre>

<h2><b>Form per l'inserimento di un task</b></h2>

La prima funzionalità introdotta nell'applicazione riguarda la costruzione di una form per l'inserimento di un nuovo task a quelli già presenti nel localStorage del browser. Anzichè utilizzare il metodo prompt del servizio $mdDialog, si è utilizzato il metodo show, a cui è stato passato un template HTML contenente la form. Questa contiene campi required e campi opzionali. Nello specifico sono campi required il titolo, la deadline, la quantità di lavoro stimato e la priorità del task, in quanto attributi utilizzati per altre funzionalità illustrate successivamente. Il mancato inserimento di uno di questi campi impedisce la memorizzazione del task e produce un aggiornamento della form presentando gli errori all'utente. Campi opzionali sono la descrizione e la lista dei tag associati al task (la lista dei tag è predefinita ed offerta all'utente tramite un vocabolario statico). 


La stessa form viene utilizzata per la modifica di un task precedentemente inserito. In tal caso è necessario effettuare la selezione del task e successivamente aprire la form di modifica tramite l'apposito bottone presente in alto a destra della pagina.



<h2><b>Selezione multipla, cambio di stato o priorità e cancellazione</b></h2>

La seconda funzionalità introdotta riguarda la possibilità di selezionare più task ed avviare la loro cancellazione in modo collettivo. In tal caso verrà presentata una schermata di conferma per l'eliminazione di ognuno dei task selezionati. 

Oltre a questo, è possibile, tramite selezione multipla dei task, variarne collettivamente stato (done o not-done) e priorità (low, medium o high).

<h2><b>Ordinamenti e ricerche</b></h2>

La terza funzionalità introdotta riguarda ordinamenti e ricerche. Nella vista ad elenco di task sono stati infatti introdotti dei radio button per la selezione del criterio di ordinamento e dei campi per la ricerca di un task o per tag o per una sequenza di caratteri contenuta in uno o più campi del task stesso. Ciò è stato realizzato tramite la creazione di un filtro che ordina i task sulla base del criterio selezionato. In particolare gli ordinamenti possibili sono: per deadline, per quantità di lavoro stimato e per titolo.


<h2><b>Vista a Grid</b></h2>

Alla vista a lista è stata poi affiancata una vista a griglia, in cui ogni tile rappresenta un task. Nell'header del tile è stato posto il titolo mentre nel footer, se presente, sono inserite la deadline e la quantità di lavoro stimata. Per una maggiore semplicità di lettura i task sono innanzitutto differenziati per icona, in modo da distinguere facilmente task completati da quelli work in progress. Inoltre per quelli completati viene omessa la deadline. Per quelli con una quantità di lavoro stimato relativamente piccola ( minore di 10 ore) viene omessa questa informazione a prescindere che il task sia stato o meno completato. Per far sì che l'utente possa avere una visione chiara e comoda dei task a cui dare precedenza, la dimensione dei tile viene scelta in funzione della loro priorità (che influenza il rowspan) e del lavoro stimato (colspan).
Anche in questa vista sono disponibili gli ordinamenti e le ricerche illustrate al paragrafo precedente.
