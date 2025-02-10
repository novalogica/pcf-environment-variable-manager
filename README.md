# Environment Variable Manager

| ![Environment Variable Manager](https://github.com/sj-cardoso/environment-variable-manager-pcf/blob/main/EnvironmentVariableManager/screenshots/environment-variable-manager.png) |
|:--:|

| ***Figure 1:*** *Environment Variable Manager* |

The **Environment Variable Manager** is a powerful **PowerApps Component Framework (PCF)** control that streamlines the visualization and management of environment variables within the Power Platform. This intuitive tool enables users to efficiently view and modify environment variables through an organized table interface.

## ✨ Key Features

### Core Functionality
- **Intuitive Table Interface**
  - View and edit environment variables through a clean, responsive table layout
  - Direct in-line editing capabilities for seamless value updates
  - Clear visual indicators for different data types and validation states

- **Smart Navigation**
  - Advanced pagination for handling large variable sets
  - Quick-access controls for adjusting page size and navigation
  - Single-click record opening in new browser tabs via **Schema Name**

### Data Management
- **Comprehensive Type Support**
  - **String** Environment Variables 
  - **Number** Environment Variables  
  - **Boolean** Environment Variables  
  - **JSON** Environment Variables  

- **Powerful Search & Filter**
  - Real-time search across **Schema Names** and **Display Names**
  - Type-based filtering for focused variable management
  - Boolean value filtering for quick state analysis
  - Dynamic sorting by modification date

### User Experience
- **Enhanced Visual Feedback**
  - Context-rich tooltips for values and descriptions
  - Clear modification timestamps for audit tracking
  - Success notifications for value updates
  - Validation feedback for data entry

## 📦 Deployment

Run the following commands to deploy the control:

#### 1. Create an authentication profile:
   ```sh
   pac auth create --url https://xyz.crm.dynamics.com
   ```
#### 2. List existing authentication profiles:
   ```sh
   pac auth list
   ```
#### 3. Switch to a specific authentication profile:
   ```sh
   pac auth select --index <index of the active profile>
   ```
#### 4. Ensure a valid connection and push the component:
   ```sh
   pac pcf push -pp <your publisher prefix>
   ```



## 🤝 Contributing

Contributions to improve or enhance this control are welcome. If you encounter issues or have feature requests, please create an issue or submit a pull request in the repository.



## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
