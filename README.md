# Environment Variable Manager

| ![Environment Variable Manager](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/environment-variable-manager.png?raw=true) |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                       **_Figure 1:_** _Environment Variable Manager_                                                                       |

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

## ❓ How to Use

Once the Environment Variable Manager control has been deployed, follow these steps to add and use it within your Power Platform environment:

### Add the Control to Your App

1. Open your Power Apps environment
2. Navigate to the desired app
3. Click "Add Page" in the navigation
4. Select "Add Navigation Link"

| ![Add Control to App Navegation](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/how-to-use-1.png?raw=true) |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                               **_Figure 2:_** _Add Control to App Navegation_                                                               |

5. Insert the following URL, replacing the placeholders with your environment details:
   ```
   https://<your-environment-url.com>/main.aspx?appid=<your-app-id>&pagetype=control&controlName=nl_novalogica.EnvironmentVariableManager&data=true
   ```
6. Click "Add" to insert the control

| ![Add Control Url](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/how-to-use-1.1.png?raw=true) |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                **_Figure 3:_** _Add Control Url_                                                                |

7. Publish your app to make the changes live

| ![Enjoy your Environment Variable Manager](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/enjoy-environment-variable-manager.png?raw=true) |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                          **_Figure 4:_** _Enjoy your Environment Variable Manager_                                                                          |

**\*Note:** Replace all placeholder values (enclosed in < >) with your actual environment details before using the provided URLs.\*

## 🤝 Contributing

Contributions to improve or enhance this control are welcome. If you encounter issues or have feature requests, please create an issue or submit a pull request in the repository.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
