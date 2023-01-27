# TravelLog-api


## Contexte
TravelLog est une application mobile faite avec Angular et Ionic dans le cadre du cours devmob à l'
HEIG-VD. Elle utilise l'API [travel-log](https://travel-log-sqtk.onrender.com/) qui gère la partie back-end. L'application permet de créer ses propres voyages avec la possibilité d'inclure plusieurs lieux dans un voyage. On peut également consulter les voyages et les lieux qui ont été crées et visités par les autres utilisateurs.



## Installation
Pour pouvoir utiliser l'application, il faut installer [NodeJS](https://nodejs.org/en/) sur sa machine et toutes les dépendances du projet.

Il faut d'abord cloner le projet dans une invite de commande (cmd, bash, ...)

`git clone git@github.com:Alinettes/TravelLog-api.git`

### Installer les dépendances du projet

`npm install`

### Démarrer l'application en local

`ionic serve`


## Utilisation

### Auth
Pour pouvoir utiliser l'application, les utilisateurs devront se connecter

(montrer screen login)

### Application

Une fois le login validé, l'utilisateur arrive sur la page d'accueil. Cette page recense les derniers voyages crées ainsi que les lieux visités par les utilisateurs de ce service. Il est également possible de consulter plus en détails les voyages et les lieux en cliquant dessus. 

(montrer screen accueil + view voyage et lieu)



En revenant sur la page d'accueil, on peut ouvrir un formulaire en cliquant sur *le bouton + en bleu* et créer un voyage ou un lieu.

(montrer screen form)


Depuis le voyage, on crée des places
(montrer screen formulaire)

### Carte

Dans la section Carte, on accède la localisation actuelle de l'utilisateur connecté avec un point jaune (seulement si l'on a accepté d'être localisé). Lorsqu'on dézoome, on aperçoit des points bleus qui représentent les lieux crées par les autres utilisateurs. On peut cliquer dessus, et voir le détail du lieu sélectionné.


On peut voir les places dans la map (et être localisé)
