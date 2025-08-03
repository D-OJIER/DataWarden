# DataWarden - AI-Powered Analytics Dashboard

A modern, responsive web application that provides AI-powered analytics insights from CSV data. Built with Next.js, TypeScript, Tailwind CSS, and integrated with Google Gemini AI.

## 🚀 Features

- **Modern Dashboard Layout**: Clean sidebar navigation with collapsible sidebar and dark/light mode toggle
- **CSV Upload**: Enhanced drag & drop with smooth animations and real-time feedback
- **Data Visualization**: Interactive charts using Recharts (line, bar, pie charts) with chart type switching
- **AI Insights**: Gemini AI powered analysis with animated loading states and error handling
- **Settings Page**: Comprehensive settings with theme, notifications, and data preferences
- **Responsive Design**: Fully responsive layout that works on all devices
- **Smooth Animations**: Framer Motion animations throughout the application
- **TypeScript**: Full type safety throughout the application
- **Enhanced UX**: Interactive elements, hover effects, and micro-animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **CSV Parsing**: PapaParse for CSV file processing
- **AI Integration**: Google Gemini AI API
- **Animations**: Framer Motion with AnimatePresence
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd datawarden
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_APP_NAME=DataWarden
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Gemini AI API Key
To use the AI insights feature, you'll need a Google Gemini API key:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file as `GOOGLE_GEMINI_API_KEY`

### Environment Variables
- `GOOGLE_GEMINI_API_KEY`: Your Google Gemini API key for AI insights
- `NEXT_PUBLIC_APP_NAME`: Application name (optional)
- `NEXT_PUBLIC_APP_URL`: Application URL (optional)

## 📊 Usage

1. **Upload Data**: Drag and drop a CSV file or click to browse with enhanced feedback
2. **View Visualizations**: Switch between line, bar, and pie charts with smooth transitions
3. **Get AI Insights**: Click "Generate Insights" to get AI-powered analysis with animated loading
4. **Customize Settings**: Access settings page for theme, notifications, and data preferences
5. **Monitor Usage**: Track your AI API usage in the AI Usage section

## 📁 Project Structure

```
datawarden/
├── app/
│   ├── api/
│   │   └── ai/
│   │       └── route.ts          # AI insights API endpoint
│   ├── settings/
│   │   └── page.tsx              # Settings page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main dashboard page
├── components/
│   ├── ai-insights.tsx           # AI insights component
│   ├── ai-usage.tsx              # AI usage tracking
│   ├── data-display.tsx          # Enhanced charts and visualizations
│   ├── header.tsx                # Enhanced header with user menu
│   ├── sidebar.tsx               # Collapsible sidebar navigation
│   ├── theme-provider.tsx        # Theme context provider
│   └── upload-form.tsx           # Enhanced CSV upload component
├── public/
│   └── sample-data.csv           # Sample CSV for testing
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Design System

The application uses a comprehensive design system with:

- **Color Scheme**: Light and dark mode support with smooth transitions
- **Typography**: Inter font family
- **Spacing**: Consistent spacing using Tailwind's scale
- **Components**: Reusable components with consistent styling
- **Animations**: Smooth transitions, hover effects, and micro-interactions
- **Interactive Elements**: Enhanced buttons, cards, and form elements

## ✨ New Features

### Enhanced Animations
- **Smooth Transitions**: All page transitions and component updates
- **Hover Effects**: Interactive elements with scale and color changes
- **Loading States**: Animated spinners and progress indicators
- **Micro-interactions**: Subtle animations for better user feedback

### Improved Navigation
- **Collapsible Sidebar**: Toggle sidebar width for more screen space
- **Active States**: Visual feedback for current page
- **Smooth Transitions**: Animated navigation between pages

### Enhanced Data Visualization
- **Chart Switching**: Toggle between line, bar, and pie charts
- **Interactive Charts**: Hover effects and tooltips
- **Real Data Processing**: Actual CSV data analysis
- **Animated Stats**: Cards with hover effects and change indicators

### Better User Experience
- **Enhanced Upload**: Drag and drop with visual feedback
- **Error Handling**: Graceful error messages with animations
- **Loading States**: Animated loading indicators
- **Success Feedback**: Visual confirmation for successful actions

## 🔌 API Endpoints

### POST /api/ai
Generates AI insights from uploaded data using Google Gemini AI.

**Request Body:**
```json
{
  "data": [
    {
      "column1": "value1",
      "column2": "value2"
    }
  ]
}
```

**Response:**
```json
{
  "insight": "Natural language analysis of the data..."
}
```

## 📈 Sample Data

A sample CSV file is included in the `public/` directory for testing:

```csv
Date,Sales,Category,Region,Customer_Satisfaction
2024-01-01,1200,Electronics,North,4.2
2024-01-02,1500,Clothing,South,4.5
2024-01-03,800,Electronics,East,3.8
2024-01-04,2000,Clothing,West,4.7
2024-01-05,1100,Electronics,North,4.1
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Ensure your Gemini API key is correctly set
3. Verify your CSV file format
4. Check the browser's network tab for API errors

## 🔮 Future Enhancements

- [ ] Export insights to PDF
- [ ] More chart types (scatter plots, heatmaps)
- [ ] Data filtering and sorting
- [ ] User authentication
- [ ] Data persistence
- [ ] Real-time data updates
- [ ] Custom chart themes
- [ ] Advanced AI prompts
- [ ] Team collaboration features
- [ ] Advanced analytics tools 