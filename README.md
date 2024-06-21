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

## Functional Expression of Need
### Main Features
1. Search and Match:
   - Allow users to search for trips and find compatible travel companions.
   - Search criteria include the departure location, destination, travel preferences (transport, minimum rating).
2. User Profiles and Ratings:
   - Creation and management of detailed user profiles.
   - Rating and evaluation system to ensure trust and safety among users.
3. Booking:
   - Facilitate the booking of trips.
### Additional Functions
1. Notifications and alerts:
	- Send notifications for trip updates, messages between users, and travel reminders.
2. History and trip management:
	- Allow users to view the history of their trips and manage their future trips.
### Constraints
1. Data Security:
	- Ensure the protection of users' personal data in accordance with GDPR regulations through an authentication system.
### Rule of management
1. A connected user can create multiple trips as long as the times of the trips do not overlap
2. A connected user can subscribe to multiple trips as long as the times of the trips do not coincide
3. A connected user can evaluate another user only if they have already traveled with the latter
4. A connected user can evaluate another
5. A connected user can modify their name, first name, username, date of birth,
6. A connected user can add photos of their trips
7. A connected user can send messages to another user via email
8. A connected user can search for trips
### Proposed Solution
1. Search and Match
   - Proposed Solution: Description of the search algorithm, user interface, result filtering.
   - Level reached for each evaluation criterion: Details on user-friendliness, speed, and accuracy of the search.
   - Control modalities: Testing methods to verify the effectiveness of the search (user tests, benchmarks, etc.).
   - Share of the price allocated to this function: Estimated cost for the development and integration of this function.
2. User Profile and Ratings
   - Proposed Solution: Profile creation and management interface, rating system.
   - Level reached for each evaluation criterion: Data security, ease of use.
   - Control modalities: Security tests, user feedback.
   - Share of the price allocated to this function: Estimated cost for this specific function.
3. Booking
   - Proposed Solution: Description of the booking process, integration of payment options.
   - Level reached for each evaluation criterion: Transaction security, simplicity of the process

## The execution on the client-side
See the entire videos of the execution [here on google drive](https://drive.google.com/drive/folders/1qpdSySbmsE1yrWuqQ8iF-mh6TaPVNgkA?usp=sharing)

## Conception of the database
[View on confluence](https://rayanetoko.atlassian.net/wiki/external/YjY3MmNjYjgzYWIyNDRlYzhiMjc1ZWNlZmIxYzhiNTA)

## Contributors
* **Rayane TOKO** =========> Backend development(API)
* **Kaoutar RBIE** =========> Frontend development(domain pages)
* **Youness FAIK** =========> Frontend development(user dashbord pages)
