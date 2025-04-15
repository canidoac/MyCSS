(function () {
    $(document).ready(function () {
        tableau.extensions.initializeAsync().then(function () {
            const unregisterHandlerFunctions = [];
            // Function to handle dashboard changes
            function dashboardChanged() {
                // Clear all added elements
                $('.tab-styled').remove();
                const dashboard = tableau.extensions.dashboardContent.dashboard;
                // Get all worksheets
                dashboard.worksheets.forEach(worksheet => {
                    // Add an event listener to each worksheet to watch for size changes
                    worksheet.addEventListener(tableau.TableauEventType.SizeChanged, function (sizeEvent) {
                        // Get the object name with classes
                        let objName = worksheet.name;
                        // Split the object name to separate the name and the classes
                        let nameAndClasses = objName.split('|');
                        // Check if there are classes to add
                        if (nameAndClasses.length > 1) {
                            // Get the position and size of the object
                            let size = worksheet.getBoundingRectAsync();
                            // Handle when the size is resolved
                            size.then(rect => {
                                // Get the classes to add to the object
                                let styleClasses = nameAndClasses[1];
                                // Get the object name without the classes
                                let objectName = nameAndClasses[0];
                                // Check if the object is visible
                                if (rect.width > 0 && rect.height > 0) {
                                    // Create a new div element
                                    let newDiv = document.createElement('div');
                                    // Add the classes to the div element
                                    newDiv.className = styleClasses;
                                    // Set the position of the div element
                                    newDiv.style.position = 'absolute';
                                    newDiv.style.left = rect.left + 'px';
                                    newDiv.style.top = rect.top + 'px';
                                    newDiv.style.width = rect.width + 'px';
                                    newDiv.style.height = rect.height + 'px';
                                    newDiv.style.zIndex = 0;
                                    // Add a class to identify the div as a styled div
                                    newDiv.classList.add('tab-styled');
                                    newDiv.id = objectName;
                                    // Add the div to the body
                                    document.body.appendChild(newDiv);
                                }
                            });
                        }
                    });
                    // Get the object name with classes
                    let objName = worksheet.name;
                    // Split the object name to separate the name and the classes
                    let nameAndClasses = objName.split('|');
                    // Check if there are classes to add
                    if (nameAndClasses.length > 1) {
                        // Get the position and size of the object
                        let size = worksheet.getBoundingRectAsync();
                        // Handle when the size is resolved
                        size.then(rect => {
                            // Get the classes to add to the object
                            let styleClasses = nameAndClasses[1];
                            // Get the object name without the classes
                            let objectName = nameAndClasses[0];
                            // Check if the object is visible
                            if (rect.width > 0 && rect.height > 0) {
                                // Create a new div element
                                let newDiv = document.createElement('div');
                                // Add the classes to the div element
                                newDiv.className = styleClasses;
                                // Set the position of the div element
                                newDiv.style.position = 'absolute';
                                newDiv.style.left = rect.left + 'px';
                                newDiv.style.top = rect.top + 'px';
                                newDiv.style.width = rect.width + 'px';
                                newDiv.style.height = rect.height + 'px';
                                newDiv.style.zIndex = 0;
                                // Add a class to identify the div as a styled div
                                newDiv.classList.add('tab-styled');
                                newDiv.id = objectName;
                                // Add the div to the body
                                document.body.appendChild(newDiv);
                            }
                        });
                    }
                });
            }
            // Add an event listener for when the dashboard changes
            dashboard.addEventListener(tableau.TableauEventType.FilterChanged, dashboardChanged);
            dashboard.addEventListener(tableau.TableauEventType.ParameterChanged, dashboardChanged);
            // Call the function to handle the dashboard
            dashboardChanged();
        }, function (err) {
            // If there is an error, log it to the console
            console.log(err);
        });
    });
})();
