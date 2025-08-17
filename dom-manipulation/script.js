// Default quotes array (used when no quotes exist in local storage)
const defaultQuotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens to you while you're busy making other plans.", category: "Life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
    { text: "It is during our darkest moments that we must focus to see the light.", category: "Inspiration" },
    { text: "The only impossible journey is the one you never begin.", category: "Success" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Friendship" },
    { text: "Be yourself; everyone else is already taken.", category: "Authenticity" }
];

// Function to load quotes from local storage
function loadQuotes() {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
        return JSON.parse(savedQuotes);
    }
    return defaultQuotes;
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Initialize quotes array from local storage or use defaults
let quotes = loadQuotes();

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const exportQuotesButton = document.getElementById('exportQuotes');
const importFileInput = document.getElementById('importFile');

// Function to show a random quote
function showRandomQuote() {
    // Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Clear previous content
    quoteDisplay.innerHTML = '';
    
    // Create quote container
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'quote-container';
    quoteContainer.style.cssText = `
        background: #f8f9fa;
        border-left: 4px solid #007bff;
        padding: 20px;
        margin: 20px 0;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        transition: transform 0.3s ease;
    `;
    
    // Add hover effect
    quoteContainer.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
    });
    
    quoteContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    });
    
    // Create quote text element
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${randomQuote.text}"`;
    quoteText.style.cssText = `
        font-size: 1.2em;
        line-height: 1.6;
        margin: 0 0 10px 0;
        color: #333;
        font-style: italic;
    `;
    
    // Create category badge
    const categoryBadge = document.createElement('span');
    categoryBadge.textContent = randomQuote.category;
    categoryBadge.className = 'category-badge';
    categoryBadge.style.cssText = `
        background: #007bff;
        color: white;
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 0.85em;
        font-weight: 500;
        display: inline-block;
    `;
    
    // Append elements
    quoteContainer.appendChild(quoteText);
    quoteContainer.appendChild(categoryBadge);
    quoteDisplay.appendChild(quoteContainer);
    
    // Add fade-in animation
    quoteContainer.style.opacity = '0';
    setTimeout(() => {
        quoteContainer.style.transition = 'opacity 0.5s ease';
        quoteContainer.style.opacity = '1';
    }, 10);
}

// Function to add a quote (as specified in the task requirements)
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    
    if (newQuoteText && newQuoteCategory) {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();
        
        if (quoteText && quoteCategory) {
            // Add new quote to the array
            const newQuote = {
                text: quoteText,
                category: quoteCategory
            };
            quotes.push(newQuote);
            
            // Save quotes to local storage
            saveQuotes();
            
            // Show success message
            showSuccessMessage('Quote added successfully!');
            
            // Clear the form inputs
            newQuoteText.value = '';
            newQuoteCategory.value = '';
            
            // Display the newly added quote
            showRandomQuote();
            
            // Update the show all quotes button count
            const showAllBtn = document.querySelector('[data-action="showAll"]');
            if (showAllBtn) {
                showAllBtn.textContent = `Show All Quotes (${quotes.length})`;
            }
        } else {
            alert('Please enter both quote text and category.');
        }
    }
}

// Function to create and display the add quote form
function createAddQuoteForm() {
    // Check if form already exists to avoid duplicates
    const existingForm = document.getElementById('addQuoteForm');
    if (existingForm) {
        existingForm.remove();
        return;
    }
    
    // Create the form as specified in the task requirements
    const formContainer = document.createElement('div');
    formContainer.id = 'addQuoteForm';
    formContainer.innerHTML = `
        <div style="
            background: #ffffff;
            border: 2px solid #e9ecef;
            border-radius: 10px;
            padding: 25px;
            margin: 20px auto;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            max-width: 500px;
        ">
            <h3 style="
                color: #333;
                margin-bottom: 20px;
                font-size: 1.4em;
                text-align: center;
            ">Add New Quote</h3>
            <div>
                <input id="newQuoteText" type="text" placeholder="Enter a new quote" style="
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #ddd;
                    border-radius: 6px;
                    font-size: 1em;
                    margin-bottom: 15px;
                    box-sizing: border-box;
                    font-family: inherit;
                    transition: border-color 0.3s ease;
                " />
                <input id="newQuoteCategory" type="text" placeholder="Enter quote category" style="
                    width: 100%;
                    padding: 12px;
                    border: 2px solid #ddd;
                    border-radius: 6px;
                    font-size: 1em;
                    margin-bottom: 20px;
                    box-sizing: border-box;
                    font-family: inherit;
                    transition: border-color 0.3s ease;
                " />
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="addQuote()" style="
                        background: #28a745;
                        color: white;
                        padding: 12px 24px;
                        border: none;
                        border-radius: 6px;
                        font-size: 1em;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    ">Add Quote</button>
                    <button onclick="document.getElementById('addQuoteForm').remove()" style="
                        background: #6c757d;
                        color: white;
                        padding: 12px 24px;
                        border: none;
                        border-radius: 6px;
                        font-size: 1em;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    ">Cancel</button>
                </div>
            </div>
        </div>
    `;
    
    // Insert form after quote display
    quoteDisplay.parentNode.insertBefore(formContainer, quoteDisplay.nextSibling);
    
    // Add entrance animation and focus
    setTimeout(() => {
        const newQuoteTextInput = document.getElementById('newQuoteText');
        const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
        
        // Add focus effects
        [newQuoteTextInput, newQuoteCategoryInput].forEach(input => {
            if (input) {
                input.addEventListener('focus', function() {
                    this.style.borderColor = '#007bff';
                    this.style.outline = 'none';
                });
                
                input.addEventListener('blur', function() {
                    this.style.borderColor = '#ddd';
                });
            }
        });
        
        // Focus on first input
        if (newQuoteTextInput) {
            newQuoteTextInput.focus();
        }
    }, 100);
}

// Function to show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
        padding: 15px;
        border-radius: 6px;
        margin: 10px 0;
        text-align: center;
        font-weight: 500;
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

// Function to clear all quotes (useful for testing)
function clearAllQuotes() {
    if (confirm('Are you sure you want to clear all quotes? This will reset to default quotes.')) {
        quotes.length = 0; // Clear the array
        quotes.push(...defaultQuotes); // Add default quotes back
        saveQuotes();
        showSuccessMessage('Quotes reset to defaults!');
        
        // Update the show all quotes button count
        const showAllBtn = document.querySelector('[data-action="showAll"]');
        if (showAllBtn) {
            showAllBtn.textContent = `Show All Quotes (${quotes.length})`;
        }
        
        // Show a random quote
        showRandomQuote();
    }
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        alert('Please select a valid JSON file.');
        return;
    }
    
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const fileContent = event.target.result;
            let importedData = JSON.parse(fileContent);
            
            // Handle different JSON formats
            let importedQuotes = [];
            
            // If the JSON has a quotes array (exported format)
            if (importedData.quotes && Array.isArray(importedData.quotes)) {
                importedQuotes = importedData.quotes;
            }
            // If the JSON is directly an array of quotes
            else if (Array.isArray(importedData)) {
                importedQuotes = importedData;
            }
            // If single quote object
            else if (importedData.text && importedData.category) {
                importedQuotes = [importedData];
            }
            else {
                throw new Error('Invalid JSON format');
            }
            
            // Validate quote structure
            const validQuotes = importedQuotes.filter(quote => {
                return quote && 
                       typeof quote.text === 'string' && 
                       typeof quote.category === 'string' && 
                       quote.text.trim() !== '' && 
                       quote.category.trim() !== '';
            });
            
            if (validQuotes.length === 0) {
                alert('No valid quotes found in the file. Each quote should have "text" and "category" properties.');
                return;
            }
            
            // Add imported quotes to existing quotes
            const initialCount = quotes.length;
            quotes.push(...validQuotes);
            saveQuotes();
            
            // Show success message
            const importedCount = validQuotes.length;
            const skippedCount = importedQuotes.length - validQuotes.length;
            let message = `Successfully imported ${importedCount} quote${importedCount !== 1 ? 's' : ''}!`;
            if (skippedCount > 0) {
                message += ` (${skippedCount} invalid quote${skippedCount !== 1 ? 's' : ''} skipped)`;
            }
            showSuccessMessage(message);
            
            // Update UI
            const showAllBtn = document.querySelector('[data-action="showAll"]');
            if (showAllBtn) {
                showAllBtn.textContent = `Show All Quotes (${quotes.length})`;
            }
            
            // Show a random quote to reflect the update
            showRandomQuote();
            
            // Reset the file input
            event.target.value = '';
            
        } catch (error) {
            console.error('Error importing quotes:', error);
            alert('Error reading the file. Please make sure it\'s a valid JSON file with the correct format.');
        }
    };
    
    fileReader.onerror = function() {
        alert('Error reading the file. Please try again.');
    };
    
    fileReader.readAsText(file);
}

// Enhanced function to export quotes as JSON (for backup)
// Enhanced function to export quotes as JSON (for backup)
function exportToJsonFile() {
    const quotesData = {
        exportDate: new Date().toISOString(),
        exportedBy: "Dynamic Quote Generator",
        version: "1.0",
        quotesCount: quotes.length,
        quotes: quotes
    };
    
    const dataStr = JSON.stringify(quotesData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `quotes-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
    
    showSuccessMessage(`Exported ${quotes.length} quotes successfully!`);
}

// Function to create import/export controls
function createImportExportControls() {
    const importExportContainer = document.createElement('div');
    importExportContainer.style.cssText = `
        background: #ffffff;
        border: 2px solid #e9ecef;
        border-radius: 10px;
        padding: 20px;
        margin: 20px auto;
        max-width: 600px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    `;
    
    const title = document.createElement('h3');
    title.textContent = 'Import & Export Quotes';
    title.style.cssText = `
        color: #333;
        margin-bottom: 20px;
        font-size: 1.3em;
        text-align: center;
    `;
    
    // Import section
    const importSection = document.createElement('div');
    importSection.style.cssText = 'margin-bottom: 20px;';
    
    const importLabel = document.createElement('label');
    importLabel.textContent = 'Import Quotes from JSON:';
    importLabel.style.cssText = `
        display: block;
        margin-bottom: 10px;
        font-weight: 600;
        color: #555;
    `;
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'importFile';
    fileInput.accept = '.json,application/json';
    fileInput.onchange = importFromJsonFile;
    fileInput.style.cssText = `
        width: 100%;
        padding: 10px;
        border: 2px solid #ddd;
        border-radius: 6px;
        font-size: 1em;
        margin-bottom: 10px;
        background: #f8f9fa;
        cursor: pointer;
    `;
    
    const importInfo = document.createElement('small');
    importInfo.innerHTML = `
        <strong>Supported formats:</strong><br>
        • Exported JSON from this app<br>
        • Array of quote objects: [{"text": "...", "category": "..."}]<br>
        • Single quote object: {"text": "...", "category": "..."}
    `;
    importInfo.style.cssText = 'color: #6c757d; line-height: 1.4;';
    
    // Export section
    const exportSection = document.createElement('div');
    exportSection.style.cssText = 'border-top: 1px solid #eee; padding-top: 20px;';
    
    const exportLabel = document.createElement('label');
    exportLabel.textContent = 'Export Current Quotes:';
    exportLabel.style.cssText = `
        display: block;
        margin-bottom: 10px;
        font-weight: 600;
        color: #555;
    `;
    
    const exportBtn = document.createElement('button');
    exportBtn.textContent = `Export ${quotes.length} Quotes to JSON`;
    exportBtn.onclick = exportToJsonFile;
    exportBtn.style.cssText = `
        background: #28a745;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        font-size: 1em;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        transition: background-color 0.3s ease;
    `;
    
    exportBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#218838';
    });
    
    exportBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#28a745';
    });
    
    const exportInfo = document.createElement('small');
    exportInfo.textContent = 'Downloads a JSON file with all your quotes that can be imported later.';
    exportInfo.style.cssText = 'color: #6c757d; display: block; margin-top: 10px;';
    
    // Assemble the container
    importSection.appendChild(importLabel);
    importSection.appendChild(fileInput);
    importSection.appendChild(importInfo);
    
    exportSection.appendChild(exportLabel);
    exportSection.appendChild(exportBtn);
    exportSection.appendChild(exportInfo);
    
    importExportContainer.appendChild(title);
    importExportContainer.appendChild(importSection);
    importExportContainer.appendChild(exportSection);
    
    return importExportContainer;
}

// Function to create additional controls
function createAdditionalControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.style.cssText = `
        display: flex;
        gap: 10px;
        justify-content: center;
        margin: 20px 0;
        flex-wrap: wrap;
    `;
    
    // Add Quote button
    const addQuoteBtn = document.createElement('button');
    addQuoteBtn.textContent = 'Add New Quote';
    addQuoteBtn.style.cssText = `
        background: #007bff;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1em;
        font-weight: 500;
        transition: background-color 0.3s ease;
    `;
    
    addQuoteBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#0056b3';
    });
    
    addQuoteBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#007bff';
    });
    
    addQuoteBtn.addEventListener('click', createAddQuoteForm);
    
    // Show all quotes button
    const showAllBtn = document.createElement('button');
    showAllBtn.textContent = `Show All Quotes (${quotes.length})`;
    showAllBtn.setAttribute('data-action', 'showAll'); // Add identifier for updating count
    showAllBtn.style.cssText = `
        background: #17a2b8;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1em;
        font-weight: 500;
        transition: background-color 0.3s ease;
    `;
    
    showAllBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#138496';
    });
    
    showAllBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#17a2b8';
    });
    
    showAllBtn.addEventListener('click', function() {
        this.textContent = `Show All Quotes (${quotes.length})`;
        showAllQuotes();
    });
    
    // Clear quotes button (for testing/management)
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Reset Quotes';
    clearBtn.style.cssText = `
        background: #dc3545;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1em;
        font-weight: 500;
        transition: background-color 0.3s ease;
    `;
    
    clearBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#c82333';
    });
    
    clearBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#dc3545';
    });
    
    clearBtn.addEventListener('click', clearAllQuotes);
    
    // Import/Export button
    const importExportBtn = document.createElement('button');
    importExportBtn.textContent = 'Import/Export';
    importExportBtn.style.cssText = `
        background: #6f42c1;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1em;
        font-weight: 500;
        transition: background-color 0.3s ease;
    `;
    
    importExportBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#5a32a3';
    });
    
    importExportBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#6f42c1';
    });
    
    importExportBtn.addEventListener('click', function() {
        // Toggle import/export panel
        const existingPanel = document.getElementById('importExportPanel');
        if (existingPanel) {
            existingPanel.remove();
        } else {
            const panel = createImportExportControls();
            panel.id = 'importExportPanel';
            document.body.appendChild(panel);
            
            // Add close functionality
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '× Close';
            closeBtn.style.cssText = `
                background: #dc3545;
                color: white;
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 15px;
                float: right;
                font-size: 0.9em;
            `;
            closeBtn.onclick = () => panel.remove();
            panel.appendChild(closeBtn);
            
            // Scroll to panel
            panel.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    controlsContainer.appendChild(addQuoteBtn);
    controlsContainer.appendChild(showAllBtn);
    controlsContainer.appendChild(clearBtn);
    controlsContainer.appendChild(importExportBtn);
    
    // Insert after the new quote button
    newQuoteButton.parentNode.insertBefore(controlsContainer, newQuoteButton.nextSibling);
}

// Function to show all quotes
function showAllQuotes() {
    const existingAll = document.getElementById('allQuotesContainer');
    if (existingAll) {
        existingAll.remove();
        return;
    }
    
    const allQuotesContainer = document.createElement('div');
    allQuotesContainer.id = 'allQuotesContainer';
    allQuotesContainer.style.cssText = `
        background: #f8f9fa;
        border-radius: 10px;
        padding: 20px;
        margin: 20px 0;
        max-height: 400px;
        overflow-y: auto;
        border: 2px solid #e9ecef;
    `;
    
    const title = document.createElement('h3');
    title.textContent = 'All Quotes';
    title.style.cssText = 'text-align: center; color: #333; margin-bottom: 20px;';
    
    allQuotesContainer.appendChild(title);
    
    quotes.forEach((quote, index) => {
        const quoteItem = document.createElement('div');
        quoteItem.style.cssText = `
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 6px;
            border-left: 4px solid #007bff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        `;
        
        const quoteText = document.createElement('p');
        quoteText.textContent = `"${quote.text}"`;
        quoteText.style.cssText = 'margin: 0 0 8px 0; font-style: italic;';
        
        const quoteCategory = document.createElement('small');
        quoteCategory.textContent = quote.category;
        quoteCategory.style.cssText = `
            background: #007bff;
            color: white;
            padding: 3px 8px;
            border-radius: 10px;
            font-size: 0.8em;
        `;
        
        quoteItem.appendChild(quoteText);
        quoteItem.appendChild(quoteCategory);
        allQuotesContainer.appendChild(quoteItem);
    });
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = `
        background: #dc3545;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    `;
    
    closeBtn.addEventListener('click', () => allQuotesContainer.remove());
    allQuotesContainer.appendChild(closeBtn);
    
    document.body.appendChild(allQuotesContainer);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Display loading message with quote count
    const quotesCount = quotes.length;
    const isLoadedFromStorage = localStorage.getItem('quotes') !== null;
    
    if (isLoadedFromStorage) {
        showSuccessMessage(`Loaded ${quotesCount} quotes from local storage!`);
    } else {
        showSuccessMessage(`Initialized with ${quotesCount} default quotes!`);
    }
    
    // Set up event listener for the new quote button
    newQuoteButton.addEventListener('click', showRandomQuote);
    
    // Set up event listener for the export quotes button
    exportQuotesButton.addEventListener('click', exportToJsonFile);
    
    // Create additional controls
    createAdditionalControls();
    
    // Show initial random quote
    showRandomQuote();
    
    // Add some basic styling to the page
    document.body.style.cssText = `
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        line-height: 1.6;
    `;
    
    // Style the main heading
    const heading = document.querySelector('h1');
    if (heading) {
        heading.style.cssText = `
            text-align: center;
            color: white;
            margin-bottom: 30px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        `;
    }
    
    // Style the new quote button
    newQuoteButton.style.cssText = `
        background: #28a745;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        font-size: 1em;
        font-weight: 600;
        cursor: pointer;
        display: block;
        margin: 20px auto;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    newQuoteButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#218838';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    });
    
    newQuoteButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#28a745';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
    
    // Style the export quotes button
    exportQuotesButton.style.cssText = `
        background: #007bff;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        font-size: 1em;
        font-weight: 600;
        cursor: pointer;
        display: block;
        margin: 20px auto;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    exportQuotesButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#0056b3';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    });
    
    exportQuotesButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#007bff';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
    
    // Style the import file input
    importFileInput.style.cssText = `
        background: #ffffff;
        color: #333;
        padding: 12px;
        border: 2px solid #6f42c1;
        border-radius: 6px;
        font-size: 1em;
        font-weight: 500;
        cursor: pointer;
        display: block;
        margin: 20px auto;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        max-width: 300px;
    `;
    
    importFileInput.addEventListener('mouseenter', function() {
        this.style.borderColor = '#5a32a3';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
    });
    
    importFileInput.addEventListener('mouseleave', function() {
        this.style.borderColor = '#6f42c1';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    });
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        quotes,
        showRandomQuote,
        createAddQuoteForm,
        addQuote,
        loadQuotes,
        saveQuotes,
        clearAllQuotes,
        exportQuotes: exportToJsonFile,
        importFromJsonFile,
        createImportExportControls
    };
}