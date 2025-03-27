
# AI-Driven Universal Learning Platform

A comprehensive platform that provides equal learning opportunities for all students by integrating AI technologies for education.

## Features

- **Personalized Learning Path**: Adapts based on student's skill level
- **AI-Powered Learning Assistance**: Natural, conversational learning support
- **Multi-Language Support**: Content accessibility in various languages
- **Gamified Learning Experience**: Points, badges, and leaderboards
- **Offline Learning Support**: Access content without internet
- **Inclusive Features**: Visual aids, audio support, and interactive simulations
- **AI-Based Career Guidance**: Personalized career path suggestions
- **AI-Powered Exam Evaluation**: Detailed feedback on assessments
- **Virtual Peer-to-Peer Learning**: Connect with students from different regions

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (Authentication, Database, Storage)
- **State Management**: React Query
- **Deployment**: Lovable Platform

## Getting Started

### Prerequisites

- Node.js 16+ 
- Supabase account (for backend functionality)

### Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a Supabase project
4. Run the SQL from `supabase/schema.sql` in the Supabase SQL editor
5. Set up environment variables:
   ```
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
6. Start the development server: `npm run dev`

## Authentication Flow

The application uses Supabase Authentication with:
- Email/password signup and login
- Profile creation on user registration
- Protected routes for authenticated content

## Database Structure

- **profiles**: User profile information
- **courses**: Available courses
- **enrolled_courses**: Tracks user enrollment and progress
- **lessons**: Course content
- **scheduled_lessons**: Upcoming lessons for users
- **achievements**: Available achievements
- **user_achievements**: Tracks earned achievements
- **user_stats**: User statistics and progress metrics

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
