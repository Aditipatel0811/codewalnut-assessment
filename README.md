# Pokémon Explorer App

This project is a Pokémon Explorer app built with Next.js, featuring authentication, Pokémon exploration, and team management functionalities. It leverages the PokeAPI to fetch Pokémon data and allows users to browse, search, and manage a team of their favorite Pokémon.

## Features

- **Authentication:** Login and registration with mock authentication.
- **Pokémon Explorer:** Browse a list of Pokémon with pagination.
- **Search & Filter:** Search Pokémon by name and filter by type.
- **Sorting:** Sort Pokémon by name or base experience.
- **Pokémon Details:** View detailed information, including stats, abilities, and evolution.
- **Team Management:** Create and manage a team of Pokémon, with a maximum of 6 per team.
- **Responsive Design:** Works on both desktop and mobile devices.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [pnpm](https://pnpm.io/) (preferred for package management)

### Installation

1. **Clone the Repository**

   ```bash
   git clone (https://github.com/Aditipatel0811/codewalnut-assessment.git)
   cd pokemon-explorer
   ```

2. **Install Dependencies**

   Use pnpm to install the required dependencies:

   ```bash
   npm install -g pnpm
   pnpm install
   ```

## Usage

### Running the Development Server

To start the development server, run:

```bash
pnpm dev
```

This will launch the app in development mode at `http://localhost:3000`.

### Building for Production

To build the app for production, run:

```bash
pnpm build
```

Then, to serve the built app:

```bash
pnpm start
```

## Technologies Used

- **Next.js**: React framework for server-rendered applications.
- **React Context API**: For state management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **PokeAPI**: REST API for fetching Pokémon data.
- **pnpm**: Fast, disk space efficient package manager.

## Features Implemented

1. **Authentication**
   - Simple mock authentication using React Context.
   - Registration and login forms with error handling.

2. **Pokémon Explorer**
   - Browse Pokémon with pagination using the PokeAPI.
   - Search functionality to filter Pokémon by name.
   - Sort and filter Pokémon based on type or base experience.

3. **Pokémon Details**
   - Show detailed information including Pokémon stats, abilities, and evolution chain.

4. **Responsive Design**
   - Ensured mobile and desktop compatibility.
