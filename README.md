# Timer Application

This Timer Application is built with React and Zustand for state management. It allows users to create, edit, delete, and manage multiple timers. The application includes features like audio notifications when a timer ends and persistent storage using localStorage to save timers across page refreshes.

## Features

- **Create, Edit, and Delete Timers**: Easily manage multiple timers with intuitive controls.
- **Start, Pause, and Restart Timers**: Control the timers with start, pause, and restart functionalities.
- **Audio Notifications**: Receive audio alerts when a timer ends.
- **Persistent Storage**: Timers are saved in localStorage, ensuring they persist across page refreshes.
- **Responsive Design**: Snack bars are displayed in the top-right corner for desktop devices and at the bottom of the screen for mobile devices.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- pnpm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Prathamesh-Kulkarni01/Timer.git
   cd timer-app
   ```

2. Install dependencies:

   ```sh
   pnpm install
   ```

### Running the Application

To start the development server, run:

```sh
pnpm start
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build, run:

```sh
pnpm build
```

The production build will be available in the `build` directory.

## Project Structure

- `src/components`: Contains React components
- `src/store`: Contains Zustand store for state management
- `src/utils`: Contains utility functions and classes
- `src/types`: Contains TypeScript type definitions

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
