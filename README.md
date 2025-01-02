
# Personal Website Portfolio

This is a personal website portfolio built with [Three.js](https://threejs.org/) and [Vite](https://vitejs.dev/). This project serves as a portfolio to demonstrate skills in software engineering, 3D graphics, web development, and interactive design.

Find the website [here](https://www.zachbernard.com).

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Building and Deploying](#building-and-deploying)
- [Making Changes](#making-changes)
- [License](#license)

## Features

- Interactive 3D model viewer using Three.js
- Mouse controls for rotating the model
- Click-to-view information popup for detailed descriptions
- Responsive design for different screen sizes

## Getting Started

To get started with this project, you will need to have [Node.js](https://nodejs.org/) installed on your machine. This project uses [Vite](https://vitejs.dev/) as the build tool for fast development and optimized builds.

### Prerequisites

Make sure you have Node.js installed:

```bash
node -v
npm -v
```

If not, download and install Node.js from [the official website](https://nodejs.org/).

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/your-repository-name.git
   cd your-repository-name
   ```

2. **Install the required dependencies**:

   Run the following command in the root of the project directory to install all necessary packages:

   ```bash
   npm install
   ```

3. **Install Vite**:

   Vite is required for development and building the project. It should be installed as part of the dependencies, but to install it globally (optional), run:

   ```bash
   npm install -g vite
   ```

## Building and Deploying

To build the project and deploy it to the `dist` folder, use the following command:

```bash
npm run build
```

This will create an optimized build of the project in the `dist` directory.

### Deploying to GitHub Pages

If you are deploying to GitHub Pages, make sure the `dist` folder is properly set up for deployment. You can use a tool like [gh-pages](https://www.npmjs.com/package/gh-pages) or manually copy the `dist` folder contents to your GitHub repository's `gh-pages` branch.

## Making Changes

To make changes to the project:

1. Open the project in your preferred code editor.
2. Make a new branch

3. Make changes. You can edit existing components or add new ones as needed.


7. After making changes, build and deploy the updated version by following the [Building and Deploying](#building-and-deploying) steps.
8. Open a new PR, once reviewed and actions run, upload DNS to gh-pages in settings. make sure to deploy from gh-pages branch
