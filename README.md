# SimpleChat

A simple real-time chat application built with Express.js, Socket.io, and TailwindCSS.

## Features

- Guest chatting (no login required)
- Chat room links for inviting others
- Real-time messaging
- User presence indicators
- Simple and clean UI

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/AticMatic/SimpleChat.git
   cd SimpleChat
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   ```

4. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

## Usage

### Creating a new chat room
1. Visit the homepage
2. Click "Create New Chat Room"
3. Enter your display name
4. Share the URL with others to invite them

### Joining an existing chat room
1. Visit the homepage
2. Enter the room ID in the "Join Existing Room" field
3. Click "Join"
4. Enter your display name
5. Start chatting!

## Technology Stack

- **Backend**: Node.js, Express
- **Frontend**: TailwindCSS, EJS templates
- **Real-time Communication**: Socket.io
- **Other**: UUID for room ID generation

## Project Structure

```
simple-chat/
├── package.json
├── server.js
├── .env
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── views/
    ├── index.ejs
    └── chat.ejs
```

## Deployment

To deploy this application to a production environment, consider using platforms like:
- Heroku
- Vercel
- Render
- Railway

Remember to set the appropriate environment variables in your hosting platform.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.