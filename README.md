# SLDS Component Demo

This project demonstrates the Salesforce Lightning Design System (SLDS) components and design patterns in a modular, component-based structure.

## Project Overview

This application showcases SLDS components and styling through a component-based architecture. The project uses vanilla JavaScript to dynamically load HTML components, providing a modular approach without requiring a full JavaScript framework.

## Features

- **Modular Architecture**: Components are separated into individual HTML files
- **Dynamic Component Loading**: JavaScript utility for loading components on demand
- **Responsive Design**: Mobile-friendly layout using SLDS grid system
- **Interactive Components**: Forms with validation, tabs, notifications, etc.
- **Follows Accessibility Guidelines**: ARIA attributes and semantic HTML

## Project Structure

```
/Users/tyrelleadams/SFDev/SLDS/
├── index.html              # Main HTML shell
├── components/             # Individual HTML components
│   ├── header.html         # Global header component
│   ├── footer.html         # Footer component
│   ├── main-content.html   # Main content with tabs
│   ├── page-header.html    # Page header component
│   ├── path.html           # Path/progress indicator
│   └── sidebar.html        # Sidebar with navigation
├── css/
│   └── custom.css          # Custom styles extending SLDS
├── js/
│   ├── app.js              # Main application logic
│   └── component-loader.js # Utility to load HTML components
└── .vscode/                # VS Code configuration
    ├── extensions.json     # Recommended extensions
    └── settings.json       # Editor settings
```

## Getting Started

### Prerequisites

- Node.js and npm (to install SLDS)
- Web server (like Live Server VS Code extension)

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd SLDS
   ```

2. Install SLDS via npm:

   ```bash
   npm install @salesforce-ux/design-system
   ```

3. Launch the web server:
   - If using VS Code with Live Server: right-click `index.html` and select "Open with Live Server"
   - Or use any local web server of your choice

## Development

### Adding New Components

1. Create a new HTML file in the `components` directory
2. Add SLDS markup to the component
3. Register the component in `js/app.js`:
   ```javascript
   await ComponentLoader.loadComponents([
     // Add your new component here
     {
       filePath: "components/your-component.html",
       targetSelector: "#your-container"
     }
   ]);
   ```
4. Add a container div with the target selector ID in `index.html`

### Modifying Existing Components

Simply edit the HTML files in the `components` directory. The changes will be reflected when the page is reloaded.

## SLDS Resources

- [SLDS Website](https://www.lightningdesignsystem.com/)
- [SLDS GitHub Repository](https://github.com/salesforce-ux/design-system)
- [Trailhead: Lightning Design System](https://trailhead.salesforce.com/en/content/learn/modules/lightning-design-system)

## VS Code Configuration

This project includes recommended VS Code settings and extensions for optimal development experience:

- Prettier for code formatting
- ESLint for code quality
- Live Server for local development
- HTML/CSS class name completion
- And more

To use these recommendations, install the "Recommended Extensions" shown in VS Code.
