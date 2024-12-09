# The Slack Clone

A collaborative chat and video-calling application inspired by Slack, built using Next.js, TypeScript, and Stream's Video and Chat SDKs. This Slack clone offers real-time messaging, video calls, rich text formatting, and more, providing a complete team communication solution.

<p align="center">
    <a href="https://tropicolx.hashnode.dev/building-a-slack-clone-with-nextjs-and-tailwindcss-part-one" style="display: block;" align="center">
        <img src="https://res.cloudinary.com/tropicolx/image/upload/v1732563279/Slack%20clone/pzsikrnn7odrwyylzflh.png" alt="Building a Slack Clone with Next.js, TailwindCSS, and Stream" width="60%" />
    </a>
</p>
<p align="center"><a href="https://tropicolx.hashnode.dev/building-a-slack-clone-with-nextjs-and-tailwindcss-part-one" align="center">Click to read!</a></p>

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

- **User Authentication**: Secure user authentication using Clerk for registered users and guests.
- **Workspace and Channel Management**: Users can create workspaces and channels, allowing organized conversations.
- **Rich Text Messaging**: Rich text formatting, emojis, and reactions for more expressive messages.
- **Dynamic Video Calling**: Integrated video call functionality using Stream's Video SDK, similar to Slack's "Huddle" feature.
- **Screen Sharing**: Participants can share screens during video calls for easier collaboration.
- **File Sharing**: Upload and share files within a channel.
- **Interactive Controls**: Users can mute/unmute audio, enable/disable video, and more.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.

## Demo

You can access a live demo of the application [here](https://slack-clone-nine-jet.vercel.app/).

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Stream Account**: Sign up for a free account at [Stream](https://getstream.io/)
- **Clerk Account**: Sign up for a free account at [Clerk](https://clerk.dev/)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/tropicolx/slack-clone.git
   cd slack-clone
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```
3. **[Set Up Database](https://tropicolx.hashnode.dev/building-a-slack-clone-with-nextjs-and-tailwindcss-part-one#heading-running-prisma-migrations)**
4. **Set Up Stream Dashboard**
   
   - Create a new Stream app with chat messaging and video calling enabled.
   - Update Permissions:
      - Navigate to **Roles & Permissions** under **Chat messaging**.
      - Select the **user** role and **messaging** scope.
      - Edit permissions to enable:
         - **Create Message**
         - **Read Channel**
         - **Read Channel Members**
         - **Create Reaction**
         - **Upload Attachments**
         - **Create Attachments**
      - Save and confirm changes.

5. **Set Up Clerk Dashboard**
   
   [Create and setup a new Clerk application](https://tropicolx.hashnode.dev/building-a-slack-clone-with-nextjs-tailwindcss-and-stream#heading-creating-a-new-clerk-project).

6. **Set Up Environment Variables**

   Create a `.env.local` file in the root directory and add your Stream and Clerk API keys:

   ```env
   NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```

## Usage

1. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

2. **Create a New Workspace**

   - Visit `http://localhost:3000`.
   - Click on **Create Workspace** to start a new workspace and add channels for communication.

3. **Join a Workspace and Start a Huddle**

   - Users can join an existing workspace and initiate a Huddle (video call) within any channel.

## Technologies Used

- **Next.js**: React framework for server-side rendering and routing.
- **TypeScript**: Typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
- **Stream Video SDK**: Provides video calling functionality.
- **Stream Chat SDK**: Enables real-time messaging.
- **Clerk**: User management and authentication.
