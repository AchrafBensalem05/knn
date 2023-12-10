# Function to check and install packages
install_and_load_package <- function(package_name) {
  if (!requireNamespace(package_name, quietly = TRUE)) {
    install.packages(package_name, dependencies = TRUE)
  }
  library(package_name, character.only = TRUE)
}

# Install and load required packages
install_and_load_package("jsonlite")
install_and_load_package("caret")

# Load the KNN model
loadedKnnModel <- readRDS("C:/Achraf/Model/knn_model.rds")

# Function to perform predictions
predict_api <- function(inputData_json) {
  # Parse JSON input
  inputData_list <- jsonlite::fromJSON(inputData_json, flatten = TRUE)
  
  # Make sure all elements in the list are numeric
  inputData_list <- lapply(inputData_list, function(x) {
    if (!is.numeric(x)) {
      cat("Non-numeric value found:", x, "\n")
      # Handle non-numeric values if needed
      # For example, you can replace non-numeric values with NA
      # x <- as.numeric(ifelse(is.numeric(x), x, NA))
    }
    as.numeric(x)
  })

  # Create a data frame from the list
  inputData_df <- as.data.frame(t(inputData_list))
  inputData_df[]<- lapply(inputData_df, as.numeric)
  
  # Predict using the loaded KNN model
  predictions <- predict(loadedKnnModel, newdata = inputData_df)
  
  # Return predictions as JSON
  jsonlite::toJSON(predictions)
}

# Handle command-line arguments
args <- commandArgs(trailingOnly = TRUE)

# Check if there is at least one command-line argument
if (length(args) < 1) {
  stop("No input data provided.")
}

# Read the first command-line argument as JSON
inputData_json <- args[1]

# Perform predictions
tryCatch({
  predictions_json <- predict_api(inputData_json)
  cat(predictions_json)
}, error = function(e) {
  cat('{"error": "Prediction failed", "message": "', conditionMessage(e), '"}')
})
