# 🏪 Wholesale & Distributor Registration Forms

A comprehensive React-based registration system for wholesale and distributor applications, featuring signature canvas functionality, form validation, and responsive design.

## ✨ Features

- **📝 Dual Form System**: Wholesale Registration & Distributor Registration forms
- **🎨 Signature Canvas**: Interactive signature capture with undo, save, and clear functionality
- **🔔 Toast Notifications**: Real-time feedback with react-hot-toast
- **✅ Form Validation**: Comprehensive client-side validation
- **📱 Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **🎯 Professional UI**: Clean, modern design with white and light green theme
- **📁 File Uploads**: Support for business licenses, certificates, and documents
- **📅 Date Picker**: Native HTML5 date inputs with default values

## 🚀 Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Pure CSS (no framework dependencies)
- **Signature**: react-signature-canvas
- **Notifications**: react-hot-toast  
- **Build Tool**: Vite
- **Deployment**: Ready for Vercel/Netlify

## 📋 Form Features

### Wholesale Registration Form
- Company & Contact Information
- Business Address & Details
- Legal & Tax Information
- Compliance & Certifications
- Payment & Shipping Preferences
- Digital Signature Capture

### Distributor Registration Form
- Extended Business Information
- Sales & Capacity Details
- Marketing & Promotion Plans
- Territory & Brand Distribution
- Insurance & Compliance Requirements
- Advanced Signature Functionality

## 🛠 Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd wholesale-forms
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 📦 Dependencies

- `react` - UI library
- `react-hot-toast` - Toast notifications
- `react-signature-canvas` - Signature functionality
- `prop-types` - Type checking
- `vite` - Build tool and dev server

## 🎨 Design Features

- **Color Scheme**: White backgrounds with light green accents
- **Typography**: Clean, professional font hierarchy
- **Layout**: Centered forms with proper spacing
- **Responsive**: Mobile, tablet, and desktop optimized
- **Accessibility**: Proper labels, focus states, and keyboard navigation

## 🔧 Signature Canvas Features

- **Interactive Drawing**: Smooth signature capture
- **Undo Functionality**: Step-by-step undo with history
- **Save & Clear**: Save signatures and auto-clear for next use
- **Validation**: Required signature validation
- **Toast Feedback**: Real-time user feedback
- **Mobile Responsive**: Touch-friendly on all devices

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🚀 Deployment

The project is configured for easy deployment to:

### Vercel
```bash
npx vercel --prod
```

### Netlify
- Connect your GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

Built with ❤️ using React and Vite+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
