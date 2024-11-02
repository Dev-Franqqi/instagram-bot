# Instagram Bot Project

This project is a Puppeteer-powered Instagram bot that automates sending messages to users from the comment section of any chosen Instagram post. The bot scrapes user data, saves it to a CSV, and integrates with a NestJS backend for dynamic page navigation, allowing users to view commenters' names, profile pictures, and send messages based on selected profiles.

## Features

- **Scrapes User Data**: Retrieves commenters' names and profile links from Instagram posts.
- **Data Export**: Saves scraped data into a CSV file for easy access.
- **Dynamic Backend Integration**: Uses NestJS to display commenter profiles and images on a frontend interface.
- **Automated Messaging**: Enables sending personalized messages to selected users directly from the scraped data.

## Prerequisites

- **Node.js**: Ensure Node.js is installed (v14.x or higher is recommended).
- **Instagram Account**: You’ll need an Instagram account to run the bot.
- **Puppeteer Dependencies**: Puppeteer might require additional libraries to be installed depending on your OS (e.g., `libx11`, `libx11-xcb` on Linux).

## Installation

1. **Clone the repository**:
   
   git clone https://github.com/Dev-Franqqi/instagram-bot.git
   cd instagram-bot

2. **Install the dependencies**:
    ```bash 
    npm install

3. **Set up Environment Variable**:
    PROFILE_LINK = any_profile_link

## Usage

To run the bot, simply execute the following command:
node index

The bot will do the following

- Scrape commenters' data from the specified Instagram post.
- Save data in a CSV file named `commenters.csv`.


