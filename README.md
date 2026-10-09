# UFV Computing Student Association Website

The Computing Student Association (CSA) represents computing students to University of the Fraser Valley (UFV) faculty and staff. The association supports student community, events, course and project help, and the Student Computing Centre (SCC) in room D224 at UFV's Abbotsford campus. The CSA acknowledges that it is situated in the traditional territory of the Stó:lō peoples.

**Site:** [csa.ufv.ca](https://csa.ufv.ca/)  
**Discord:** [Join Us](https://discord.gg/nu4kTTR)

## What the Site Includes

- CSA announcements, UFV news, upcoming events, and event details
- Executive profiles, meeting minutes, association history, constitution, and regulations
- SCC information, floor plan, 3D room model, and current room status
- A Sanity Studio for managing site content
- Discord integrations for event reminders, news, and association updates

## A Brief History

UFV's computing community began to take shape in 1993, when the university launched its Bachelor of Computer Information Systems degree and students formed the CIS Student Council to gain representation amid departmental changes. The council later became the well-known **Computer Information Systems Student Association (CISSA)**. As computing expanded beyond CIS, the association adopted the name **Computing Student Association (CSA)** in 2014 to include Computer Science and other computing-related students. Its website has evolved alongside the association through successive redesigns and platforms, with the current site launching in 2024. See the [CSA history timeline](https://csa.ufv.ca/history) for more milestones.

## Tech Stack

![Next.js 15](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS 3](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Sanity 4](https://img.shields.io/badge/Sanity-4-F03E2F?logo=sanity&logoColor=white)
![Node.js 24](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white)
![Discord API v10](https://img.shields.io/badge/Discord_API-v10-5865F2?logo=discord&logoColor=white)
![Ubuntu 22](https://img.shields.io/badge/Ubuntu-22-E95420?logo=ubuntu&logoColor=white)

## Development Setup

### Requirements

- Node.js 24 and npm
- Access to the project's Sanity dataset and any integrations needed for the feature you are working on

### Run Locally

1. Clone the repository and install dependencies:

	```bash
	git clone https://github.com/DevelopsS15/ufv-csa.git
	cd ufv-csa
	npm install
	```

2. Copy `sample.env` to `.env.local` and fill in the values required for your environment. Keep credentials private; never commit populated environment files.

3. Start the development server:

	```bash
	npm run dev
	```

4. Visit [http://localhost:3000](http://localhost:3000). The Sanity Studio is available at `/studio` for authorized CSA executives.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the production application and generate the sitemap |
| `npm run start` | Start the production server |
| `npm run lint` | Run the project's lint command |

## Production

Production host and scheduled job details are documented in [PRD operations](docs/PRD.md).

## Contributing

CSA members are welcome to contribute to this repository. Start by discussing the proposed change with the CSA executives or webmaster through the [CSA Discord](https://discord.gg/nu4kTTR), then submit a pull request (PR) with a summary and verification steps. Run `npm run lint` and `npm run build` before submitting.

Site content is managed in Sanity, and the Production Studio access is limited to CSA executives.