# Notes Management Application

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- npm package manager

## 🏃‍♂️ Running the Application

### 1. Start the API Server

Navigate to the API project directory and run:

```bash
cd Notes.Api
dotnet restore
dotnet run
```

The API will be available at `https://localhost:7146`

- **Swagger UI**: `https://localhost:7146/swagger`
- **API Base URL**: `https://localhost:7146/api`

### 2. Start the Client Application

Navigate to the frontend project directory and run:

```bash
cd notes.frontend
npm install
npm run dev
```

The React application will be available at `http://localhost:61573`

## 📋 Available Scripts

### Frontend Scripts

In the `notes.frontend` directory, you can run:

- **`npm run dev`** - Runs the app in development mode with hot reload
- **`npm run build`** - Builds the app for production to the `dist` folder
- **`npm run preview`** - Locally preview the production build
- **`npm run lint`** - Runs ESLint to check code quality

### API Scripts

In the `Notes.Api` directory, you can run:

- **`dotnet run`** - Starts the development server
- **`dotnet build`** - Builds the project
- **`dotnet test`** - Runs unit tests (if available)
- **`dotnet publish`** - Publishes the app for deployment

## 🧪 Running Tests

### End-to-End Tests with Cypress

Make sure both API and client applications are running, then:

```bash
cd Notes.Api
npm install cypress
```

**Interactive mode (recommended for development):**
```bash
npx cypress open
```

**Headless mode (for CI/CD):**
```bash
npx cypress run
```

### Test Configuration

Before running tests, ensure:

1. **API is running** on `https://localhost:7146`
2. **Client app is running** on `http://localhost:61573`
3. **Test database** is set up (if using separate test DB)

### Writing Custom Tests

Test files are located in `cypress/e2e/` directory. Example test structure:

```javascript
describe('Notes App', () => {
  it('should create a new note', () => {
    cy.visit('http://localhost:61573');
    // Your test code here
  });
});
```

## 🛠️ Development Workflow

1. **Start API server**: `dotnet run` in `Notes.Api/`
2. **Start client app**: `npm run dev` in `notes.frontend/`
3. **Open browser**: Navigate to `http://localhost:61573`
4. **API documentation**: Visit `https://localhost:7146/swagger`

## 🌍 Features

- **Multi-language support** (English/Ukrainian)
- **CRUD operations** for notes
- **Responsive design**
- **Real-time validation**
- **Confirmation dialogs**

## 🔧 Configuration

### Client Configuration

- **API URL**: Configured in `src/services/apiService.js`
- **Default language**: Set in `src/i18n.js`
- **Port**: Can be changed in `vite.config.js`

### API Configuration

- **CORS settings**: Configured in `Program.cs`
- **Database**: Connection string in `appsettings.json`
- **Swagger**: Enabled in development mode

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/Notes` | Get all notes |
| GET | `/api/Notes/{id}` | Get note by ID |
| POST | `/api/Notes` | Create new note |
| PUT | `/api/Notes/{id}` | Update note |
| DELETE | `/api/Notes/{id}` | Delete note |

## 🐛 Troubleshooting

### Common Issues

**Port conflicts:**
- API default port: 7146 (HTTPS), 5146 (HTTP)
- Client default port: 61573
- Change ports in `launchSettings.json` (API) or `vite.config.js` (Client)

**CORS errors:**
- Ensure API CORS is configured for client URL
- Check `Program.cs` CORS policy

**Database connection:**
- Verify connection string in `appsettings.json`
- Run database migrations if needed

### Logs and Debugging

- **API logs**: Check console output when running `dotnet run`
- **Client logs**: Open browser DevTools → Console
- **Network requests**: Browser DevTools → Network tab
