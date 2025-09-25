# Zorgplanning

## Hoe de app te starten
Met het commando `nx serve zorgplanning`

## Library structuur
Ik heb drie feature libs, namelijk `feature-clients-dashboard`, `feature-client-details` en `feature-form-care-moment`. Ik heb gekozen voor deze drie feature libs, want dit zijn de hoofdonderdelen van de app. Je komt binnen op het dashboard, hier zie je een rij cliënten. Als je op een cliënt klikt ga je naar het detailsscherm. Hier zie je ook de zorgmomenten en is het mogelijk om een zorgmoment toe te voegen via het formulier.

Ik heb er ook voor gekozen om een data-service lib te maken met hierin een data service, modellen en de validatatie. Ik heb er voor gekozen om deze hier ook in te doen, omdat ze alles te maken hebben met de data. Ik heb geen data services in de feature libs, hoewel dit wel in het document stond. Ik vind het wel handig om alle data op 1 plek te hebben.

Daarnaast heb ik nog een `ui-components` lib met hierin de gedeelde ui componenten. Dit zijn `button-component`, `client-card-component`, `input-component`, `list-care-moments`, `page-header-component` en `select-component`. Ik heb voor deze components gekozen, omdat dit components zijn die vaker gebruikt kunnen worden.

## User-stories

### 1. Overzicht cliënten bekijken (Dashboard)
Je ziet als je de app opstart een overzicht van alle cliënten, op cliëntkaarten. Op een kaart staan de naam van de Cliënt, de geboortenaam en de naam van de contactpersoon. Als je er op klikt kom je in het detailscherm.

### 2. Cliëntdetails en geplande zorgmomenten bekijken
Boven het detailsscherm staan dezelfde gegevens nog een keer van de gekozen cliënt. Hier zouden natuurlijk meer details bij kunnen staan. Hieronder staan de geplande zorgmomenten in een tabel. In elke rij staan voor dat zorgmoment de datum wanneer het plaatsvinden moet, het type zorg, de naam van de zorgverlener en de datum wanneer het toegevoegd is.

### 3. Nieuw zorgmoment inplannen
Op het detailscherm is het ook mogelijk op de link "Voeg een zorgmoment toe" te klikken om een modal te openen waarin een formulier staat om een zorgmoment toe te voegen. Dit formulier heeft de velden Datum, een native date input veld. Tijd, het lijkt me dat een zorgmoment ook een tijd nodig heeft. Ik heb dit apart gedaan om het duidelijk te maken voor de gebruiker en ik heb er voor gerkozen om deze niet verplicht te maken, zodat ook alleen een zorgmoment op datum kan ingevoerd worden. Type zorg, een text-input, dit zou ook een select kunnen zijn, als het om vaste types gaat, maar die informatie heb ik niet, dus heb ik gekozen voor vrije invoer. Zorgverlener, dit is een select geworden. Hier heb ik voor gekozen zodat gebruikers ook geen type fouten kunnen maken en als ze een naam niet zeker weten kunnen ze kijken of deze persoon er tussen staat.

Er zit validatie op, behalve tijd, zal er een melding verschijnen bij de velden als ze niet ingevuld zijn. Dit geldt ook als de datum in het verleden ligt. De validatie verschijnt pas bij het verzenden van het formulier, zodat gebruikers het rustig kunnen invullen zonder direct in de stress te schieten.

Als een zorgmoment wordt toegevoegd, staat het meteen tussen de anderen in de lijst.

### 4. Validatie & feedback
Als er iets niet klopt bij het verzenden van het formulier komt er eenm bericht bij het veld te staan wat er niet klopt. Als het verplicht is om iets in te voeren, en dit is niet gedaan bij een veld, komt de melding "Dit veld moet verplicht ingevuld worden." er bij te staan. Als de datum in het verleden ligt, komt de melding te staan "De datum mag niet in het verleden liggen." Dit zijn duidelijke aanwijzingen waarmee de gebruiker snel weet wat hij/zij moet doen om het toch valide te maken.

### 5. Sorteren/filteren
Het is mogelijk de lijst met zorgmomenten te sorteren op Datum afspraak, Zorgtype, Zorgverlener en datum toegevoegd. In beide richtingen. Ik heb datum toegevoegd er bijgezet, omdat in de user story staat "Als zorgverlener wil ik zorgmomenten kunnen sorteren op datum,
zodat nieuwe afspraken overzichtelijk bovenaan staan." en dit is niet mogelijk met de datum afspraak. Deze heb ik wel als default sortering gedaan, want het lijkt me logisch dat de gebruiker wil zien wat de het volgende zorgmoment is, maar zo is het ook mogelijk om de laatst toegevoegde bovenaan te zien.
# try-angular
