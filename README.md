
# WireGuard VPN Manager

A modern web-based management interface for WireGuard VPN servers. This application allows you to easily configure and manage your WireGuard VPN server through an intuitive dashboard.

![WireGuard Manager Dashboard](https://i.imgur.com/example.png)

## Features

- **Dashboard**: Monitor server status, active clients, and data usage
- **Client Management**: Add, remove, and manage client configurations
- **Server Configuration**: Configure and monitor your WireGuard server
- **QR Code Generation**: Generate QR codes for easy mobile client setup
- **Log Monitoring**: View system logs and connection events
- **Backup and Restore**: Backup your configurations and restore when needed

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- shadcn-ui Components
- WireGuard

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A server with WireGuard installed

### Installation

1. **Download and extract the project**

   Download the latest release from GitHub and extract it to your desired location.

2. **Install dependencies**

   ```bash
   cd wireguard-manager
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory and can be served using any web server.

## Deployment

### Running as a Service

For a production environment, it's recommended to run the application as a service:

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Install a web server like Nginx**

   ```bash
   sudo apt install nginx
   ```

3. **Configure Nginx to serve the built files**

   Create a file at `/etc/nginx/sites-available/wireguard-manager`:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/wireguard-manager/dist;
       index index.html;
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Enable the site and restart Nginx**

   ```bash
   sudo ln -s /etc/nginx/sites-available/wireguard-manager /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```

5. **Set up a service for the backend**

   You'll need to create a separate service for the backend functionality that interacts with WireGuard.

## Security Considerations

- Always use HTTPS in production
- Set up authentication for the web interface
- Restrict access to the management interface to trusted networks
- Regularly back up your WireGuard configurations

## Customizing the Application

### Environment Variables

You can customize certain aspects of the application by setting environment variables:

- `VITE_API_URL`: The URL of your backend API (if separate from the web interface)
- `VITE_SERVER_NAME`: The name of your WireGuard server

### Configuration

The application configuration can be modified in `src/config/index.ts`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [WireGuard](https://www.wireguard.com/) for the amazing VPN technology
- [shadcn-ui](https://ui.shadcn.com/) for the UI components
- All the open-source libraries used in this project

---

Made with ❤️ for the WireGuard community
