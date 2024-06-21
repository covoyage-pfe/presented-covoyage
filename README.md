# OFPPT End-of-study Project(co-voyage)
## Introduction
As part of our final year project, we studied the implementation of a Co-voyage platform. Inspired by the increasing popularity of social services in recent years, especially through platforms such as AirBnB, Blablacar, or Couchsurfing, which are based on the principles of community life and mutual assistance, we propose a platform that will allow users to share rides and trips.

This platform will foster human interactions by offering people the opportunity to share pleasant moments during their travels and create memorable memories. It will also help reduce the stress and loneliness experienced during long journeys.

Our goal is to develop a user-friendly and secure interface, offering users the possibility to easily find travel companions for their trips.

## Déroulement
Here we expose the stages and objectives of this project, namely the creation of a website allowing users to indicate and book journeys. We also detail the scope of the project, the stakeholders involved, and the established deadlines.

### Needs Analysis
A thorough analysis of user needs as well as functional and non-functional requirements of the carpooling site was conducted. This step allowed us to define the main features, such as availability search, real-time booking, etc.
### System Design
We developed a detailed technical architecture for the deco-voyage site, focusing on security, scalability, and user-friendliness. Mock-ups and prototypes were also created to visualize the user interface.
### Development and Testing
This section presents the various phases of project development, using best practices in software development. Rigorous testing was conducted to ensure the stability, performance, and quality of the co-voyage site.
### Deployment
We detail the steps for deploying the co-voyage site, including server configuration, integration with third-party systems, and final testing before making it available to end users.
### Results and Achievements
We evaluate the results obtained at the end of the project, highlighting key features successfully implemented, issues encountered, and solutions adopted. Positive feedback from users(our supervisors) during beta testing is also presented.

## Technologies used
<div align="center">
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
	<code><img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="Next.js" title="Next.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/189715289-df3ee512-6eca-463f-a0f4-c10d94a06b2f.png" alt="Figma" title="Figma"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183912952-83784e94-629d-4c34-a961-ae2ae795b662.png" alt="Jira" title="Jira"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" alt="Git" title="Git"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" alt="GitHub" title="GitHub"/></code>
</div>

## Expression Fonctionnelle du Besoin
### Fonctionnalités principales
1. Recherche et correspondance :
o Permettre aux utilisateurs de rechercher des trajets et de trouver 
des compagnons de voyage compatibles.
o Critères de recherche incluent le lieu de départ, la destination, 
les préférences de voyage (transport, note minimum).
2. Profil utilisateur et évaluations :
o Création et gestion de profils utilisateurs détaillés.
o Système de notation et d’évaluation pour assurer la confiance et 
la sécurité entre les utilisateurs.
3. Réservation :
o Faciliter la réservation de trajets.
### Fonctions complémentaires
1. Notifications et alertes :
o Envoyer des notifications pour les mises à jour de trajets, les 
messages entre utilisateurs, et les rappels de voyage.
2. Historique et gestion des trajets :
o Permettre aux utilisateurs de voir l’historique de leurs voyages 
et de gérer leurs trajets futurs.
### Contraintes
1. Sécurité des données :
o Assurer la protection des données personnelles des utilisateurs 
conformément aux réglementations GDPR via un système 
d’authentification
### Règle de gestion
1) Un utilisateur connecté peut créer plusieurs voyage à la fois tant que 
le temps des voyages ne coïncident pas
2) Un utilisateur connecté peut s’abonner à plusieurs voyage tant que le 
temps des voyages ne coïncident pas
3) Un utilisateur connecté peut évaluer un autre utilisateur seulement s’il 
a déjà voyager avec ce dernier
15
4) Un utilisateur connecté peut évaluer un autre
5) Un utilisateur connecté peut modifier son nom, prénom, username, 
date de naissance, 
6) Un utilisateur connecté peut ajouter des photos de ces voyages
7) Un utilisateur connecté peut envoyer des messages à un autre 
utilisateur via mail
8) Un utilisateur connecté peut rechercher des voyages
### Solution Proposée
1. Recherche et correspondance
o Solution proposée : Description de l'algorithme de recherche, interface 
utilisateur, filtrage des résultats.
o Niveau atteint pour chaque critère d’appréciation : Détails sur la 
convivialité, la rapidité, et la précision de la recherche.
o Modalités de contrôle : Méthodes de test pour vérifier l'efficacité de la 
recherche (tests utilisateurs, benchmarks, etc.).
o Part du prix attribué à cette fonction : Coût estimé pour le développement 
et l'intégration de cette fonction.
2. Profil utilisateur et évaluations
o Solution proposée : Interface de création et de gestion des profils, 
système de notation.
o Niveau atteint pour chaque critère d’appréciation : Sécurité des données, 
facilité d’utilisation.
o Modalités de contrôle : Tests de sécurité, retours des utilisateurs.
o Part du prix attribué à cette fonction : Coût estimé pour cette fonction 
spécifique.
3. Réservation
o Solution proposée : Description du processus de réservation, intégration 
des options de paiement.
o Niveau atteint pour chaque critère d’appréciation : Sécurité des 
transactions, simplicité du processus
