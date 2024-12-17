Base Tool:
heatmap
This is a command-line tool for creating heatmaps with all customizable parameters.

Example call

heatmap -index "raw_*2020*" -query "location.country_code2:DE  AND not loction.city_name.keyword" -o test.png -box "55.3,5.34,47.0,15.2" -dotsize 30 -effect 0.002 -width 4000 -height 4000 -precision 12

Help message

Usage of ./heatmap:
  -batch string
    	Description file for batch processing
  -blur float
    	For adjusting the blur of a dot (default 1)
  -box string
    	North west latitude and longitude, south east latitude und longitude; Comma separated (default "75,-180,-65,180")
  -dotsize int
    	Defines the value of one heatmap dot (default 100)
  -effect float
    	For adjusting the scale (default 0.5)
  -height int
    	Height of the resulting image (default 800)
  -i string
    	Path to csv file <lat,lng>
  -index string
    	Set the index to query
  -o string
    	Defines the filepath for the image
  -opacity uint
    	Defines the intensity of heatmap (default 128)
  -precision int
    	Location aggregation precision between 1 and 12 (default 8)
  -query string
    	Set the query string (default "_exists_:_index")
  -url string
    	Defines the url of elastic (default "http://localhost:9200")
  -width int
    	Width of the resulting image (default 1280)




Task:

**Create Heatmap Image Generation Page in React/Next.js App**

Title: Implement a dynamic heatmap image generation page that allows users to input data and display a heatmap image using React and Next.js.

**User Story:**
    As a frontend developer,
    I want to create a heatmap image generation page that can handle different input types (Elasticsearch data, CSV file, IP file),
    So that users can easily generate heatmaps for their specific use cases.

**Acceptance Criteria (Definition of Done):**
* The page is created using React and Next.js.
* The page takes various inputs (Elasticsearch query and index, CSV file path, IP file path) and generates a heatmap image.
* The page handles different data types and formats correctly.
* The generated heatmap image is displayed correctly on the page.
* The page is responsive and works well with different screen sizes.

**Description:**
The user should be able to select one or more input types (Elasticsearch query and index, CSV file path, IP file path) and generate a heatmap image.
The page should handle scenarios such as invalid inputs, missing data, and errors correctly.

* Handle Elasticsearch data:
	+ Take the Elasticsearch query and index as inputs.
	+ Make API calls to retrieve data from Elasticsearch using the following structure:
		- Query: `GET /my_index/_search` // example
		- Body: `{ "query": { "match_all": {} } }` // example
	+ Generate the heatmap image using the retrieved data.

* Handle CSV file input:
	+ Take the CSV file path as an input.
	+ Read the CSV file and extract relevant data using the following structure:

		- Header: `id, name, value` // example
		- Data: `[ ["1", "John Doe", 10], ["2", "Jane Doe", 20] ]` // example

* Handle IP file input:
	+ Take the IP file path as an input.
	+ Read the IP file and extract relevant data using the following structure:

		- Header: `id, name, ip` // example
		- Data: `[ ["1", "John Doe", "192.168.1.1"], ["2", "Jane Doe", "192.168.1.2"] ]` // example

**API Endpoints:**
Define API Endpoints to enable the communication to the tool.
