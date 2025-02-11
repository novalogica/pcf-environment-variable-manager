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

### 1 - Add the Control to Your App Navigation

1. Open your Power Apps environment
2. Navigate to the desired app
3. Click "Add Page" in the navigation
4. Select "Add Navigation Link"

| ![Add Control to App Navigation](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/how-to-use-1.png?raw=true) |
|:---:|
| **_Figure 2:_** _Add Control to App Navigation_ |

5. Insert the following URL, replacing the placeholders with your environment details:
   ```
   https://<your-environment-url.com>/main.aspx?appid=<your-app-id>&pagetype=control&controlName=nl_novalogica.EnvironmentVariableManager&data={"notificationPosition": "<notification-position>"}
   ```

   Where `<notification-position>` can be one of the following values:
   - `"top-right"` (default)
   - `"bottom-right"`
   - `"top-center"`
   - `"bottom-center"`
   - `"top-left"`
   - `"bottom-left"`

6. Click "Add" to insert the control

| ![Add Control URL](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/how-to-use-1.1.png?raw=true) |
|:---:|
| **_Figure 3:_** _Add Control URL_ |

### Example URLs:

```
# Default top-right notifications
https://contoso.crm.dynamics.com/main.aspx?appid=12345678-1234-1234-1234-123456789012&pagetype=control&controlName=nl_novalogica.EnvironmentVariableManager&data={"notificationPosition": "top-right"}

# bottom-center notifications
https://contoso.crm.dynamics.com/main.aspx?appid=12345678-1234-1234-1234-123456789012&pagetype=control&controlName=nl_novalogica.EnvironmentVariableManager&data={"notificationPosition": "bottom-center"}
```

7. Publish your app to make the changes live

| ![Environment Variable Manager](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/enjoy-environment-variable-manager.png?raw=true) |
|:---:|
| **_Figure 4:_** _Environment Variable Manager_ |

**Notes:** 
- Replace `<your-environment-url.com>` and `<your-app-id>` with your actual environment details before using the provided URLs.
- If an invalid notification position is provided, the control will default to **`top-right`**.
- The `data` parameter must be a valid JSON string with the `notificationPosition` property.

---

### 2 - Add the Control to Your Form

To integrate the Environment Variable Manager into your form, follow these steps:

#### 2.1 - Create the Column

1. Open your solution in Power Apps
2. Navigate to the entity where you want to add the control
3. Create a new field with the following properties:
   - Data Type: **Multiple Lines of Text**
   - Display Name: **Environment Variable Manager** (or your preferred name)
   - Schema Name: **environmentvariablemanager** (or your preferred schema name)
   
| ![Column Configuration](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/how-to-use-2.1.png?raw=true) |
|:---:|
| **_Figure 5:_** _Column Configuration_ |

#### 2.2 - Configure the Form

1. Open the form editor for your entity
2. Either:
   - Create a new tab by clicking "Add Tab" in the form designer, or
   - Select an existing tab where you want to place the control
3. Add a new section to your chosen tab if needed

| ![Form Configuration](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/how-to-use-2.2.png?raw=true) |
|:---:|
| **_Figure 6:_** _Form Configuration Example_ |

#### 2.3 - Add the Custom Control

1. With your field selected, navigate to the "Components" tab in the right panel
2. Click "Get more components"
3. In the components gallery, search for "Environment Variable Manager"
4. Select the control from the search results

| ![Add Control](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/how-to-use-2.3.png?raw=true) |
|:---:|
| **_Figure 7:_** _Add Control_ |

5. Configure the control properties:
   - Set the "Table Column"
   - Set the "Notification Position" to your preferred location:
     - `top-right` (default)
     - `bottom-right`
     - `top-center`
     - `bottom-center`
     - `top-left`
     - `bottom-left`
6. Click "Done" to add the control

| ![Control Configuration](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/how-to-use-2.3.1.png?raw=true) |
|:---:|
| **_Figure 8:_** _Control Configuration_ |

#### 2.4 - Save and Publish

1. Save your form changes
2. Publish the customizations to make them available to users

| ![Environment Variable Manager](https://github.com/novalogica/pcf-environment-variable-manager/blob/main/EnvironmentVariableManager/screenshots/how-to-use-2.4.png?raw=true) |
|:---:|
| **_Figure 9:_** _Environment Variable Manager_ |

**Note:** If no notification position is specified, the control will default to **`top-right`** positioning.


## 🤝 Contributing

Contributions to improve or enhance this control are welcome. If you encounter issues or have feature requests, please create an issue or submit a pull request in the repository.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
