// import React from "react";
// import { Link } from "react-router-dom";

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
//       <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
//         Welcome to AR Restaurant Menu 🍽️
//       </h1>
//       <p className="text-lg md:text-2xl mb-8 text-center max-w-2xl">
//         Explore your dishes in Augmented Reality. Restaurants can create menus,
//         upload 3D dishes, and customers can view them live!
//       </p>

//       <div className="flex gap-4">
//         <Link
//           to="/register"
//           className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
//         >
//           Get Started
//         </Link>
//         <Link
//           to="/login"
//           className="bg-transparent border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition"
//         >
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


// import React from "react";
// import "./landingpage.css";

// export default function LandingPage() {
//   return (
//     <>
//       <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
//                 <i className="fas fa-cube text-white"></i>
//               </div>
//               <span className="text-xl font-bold gradient-text">AR Menu</span>
//             </div>

//             <div className="hidden md:flex items-center space-x-8">
//               <a href="#features" className="text-gray-700 hover:text-purple-600 transition">Features</a>
//               <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition">How it Works</a>
//               <a href="#benefits" className="text-gray-700 hover:text-purple-600 transition">Benefits</a>
//               <a href="#demo" className="text-gray-700 hover:text-purple-600 transition">Demo</a>
//               <a href="/register" className="hero-gradient text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
//                 Get Started
//               </a>
//             </div>

//             <button className="md:hidden text-gray-700" onclick="toggleMobileMenu()">
//               <i className="fas fa-bars text-2xl"></i>
//             </button>
//           </div>
//         </div>

//         <div id="mobileMenu" className="hidden md:hidden bg-white border-t">
//           <div className="container mx-auto px-6 py-4 space-y-4">
//             <a href="#features" className="block text-gray-700 hover:text-purple-600">Features</a>
//             <a href="#how-it-works" className="block text-gray-700 hover:text-purple-600">How it Works</a>
//             <a href="#benefits" className="block text-gray-700 hover:text-purple-600">Benefits</a>
//             <a href="#demo" className="block text-gray-700 hover:text-purple-600">Demo</a>
//             <button className="w-full hero-gradient text-white px-6 py-2 rounded-lg">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </nav>

//       <section className="pt-32 pb-20 px-6">
//         <div className="container mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div className="scroll-reveal">
//               <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
//                 Transform Your Menu into an
//                 <span className="gradient-text">AR Experience</span>
//               </h1>
//               <p className="text-xl text-gray-600 mb-8">
//                 Bring your dishes to life with augmented reality. Let customers see, rotate, and explore menu items in 3D before ordering.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="hero-gradient text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition transform hover:scale-105">
//                   Start Free Trial
//                 </button>
//                 <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50 transition">
//                   Watch Demo
//                 </button>
//               </div>
//               <div className="mt-8 flex items-center space-x-6">
//                 <div className="flex -space-x-2">
//                   <img src="https://picsum.photos/seed/user1/40/40" className="w-10 h-10 rounded-full border-2 border-white" />
//                   <img src="https://picsum.photos/seed/user2/40/40" className="w-10 h-10 rounded-full border-2 border-white" />
//                   <img src="https://picsum.photos/seed/user3/40/40" className="w-10 h-10 rounded-full border-2 border-white" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-900">Trusted by 500+ restaurants</p>
//                   <div className="flex text-yellow-400">
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                     <i className="fas fa-star"></i>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="relative scroll-reveal">
//               <div className="ar-frame bg-white p-8 rounded-2xl shadow-2xl">
//                 <div className="relative">
//                   <img src="https://picsum.photos/seed/ardemo/600/400" alt="AR Menu Demo" className="rounded-lg w-full" />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 pulse-dot">
//                       <i className="fas fa-play text-purple-600 text-3xl ml-1"></i>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-6 flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <i className="fas fa-mobile-alt text-purple-600"></i>
//                     </div>
//                     <div>
//                       <p className="font-semibold">Scan QR Code</p>
//                       <p className="text-sm text-gray-600">View in AR</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-2xl font-bold gradient-text">3D</p>
//                     <p className="text-sm text-gray-600">Interactive</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute -bottom-4 -right-4 w-24 h-24 hero-gradient rounded-2xl floating opacity-20"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="features" className="py-20 px-6 bg-white">
//         <div className="container mx-auto">
//           <div className="text-center mb-16 scroll-reveal">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Powerful <span className="gradient-text">AR Features</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Everything you need to create an immersive dining experience
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="card-hover bg-gray-50 p-8 rounded-2xl scroll-reveal">
//               <div className="w-16 h-16 hero-gradient rounded-xl flex items-center justify-center mb-6">
//                 <i className="fas fa-cube text-white text-2xl"></i>
//               </div>
//               <h3 className="text-2xl font-semibold mb-4">3D Food Models</h3>
//               <p className="text-gray-600">
//                 Create stunning 3D models of your dishes that customers can rotate and examine from every angle.
//               </p>
//             </div>

//             <div className="card-hover bg-gray-50 p-8 rounded-2xl scroll-reveal">
//               <div className="w-16 h-16 hero-gradient rounded-xl flex items-center justify-center mb-6">
//                 <i className="fas fa-qrcode text-white text-2xl"></i>
//               </div>
//               <h3 className="text-2xl font-semibold mb-4">QR Code Integration</h3>
//               <p className="text-gray-600">
//                 Generate unique QR codes for each menu item. Customers scan to instantly view dishes in AR.
//               </p>
//             </div>

//             <div className="card-hover bg-gray-50 p-8 rounded-2xl scroll-reveal">
//               <div className="w-16 h-16 hero-gradient rounded-xl flex items-center justify-center mb-6">
//                 <i className="fas fa-chart-line text-white text-2xl"></i>
//               </div>
//               <h3 className="text-2xl font-semibold mb-4">Analytics Dashboard</h3>
//               <p className="text-gray-600">
//                 Track engagement, popular items, and customer behavior with detailed analytics and insights.
//               </p>
//             </div>

//             <div className="card-hover bg-gray-50 p-8 rounded-2xl scroll-reveal">
//               <div className="w-16 h-16 hero-gradient rounded-xl flex items-center justify-center mb-6">
//                 <i className="fas fa-mobile-alt text-white text-2xl"></i>
//               </div>
//               <h3 className="text-2xl font-semibold mb-4">Cross-Platform</h3>
//               <p className="text-gray-600">
//                 Works seamlessly on iOS and Android devices without requiring any app downloads.
//               </p>
//             </div>

//             <div className="card-hover bg-gray-50 p-8 rounded-2xl scroll-reveal">
//               <div className="w-16 h-16 hero-gradient rounded-xl flex items-center justify-center mb-6">
//                 <i className="fas fa-palette text-white text-2xl"></i>
//               </div>
//               <h3 className="text-2xl font-semibold mb-4">Custom Branding</h3>
//               <p className="text-gray-600">
//                 Customize colors, logos, and AR viewer design to match your restaurant's brand identity.
//               </p>
//             </div>

//             <div className="card-hover bg-gray-50 p-8 rounded-2xl scroll-reveal">
//               <div className="w-16 h-16 hero-gradient rounded-xl flex items-center justify-center mb-6">
//                 <i className="fas fa-sync text-white text-2xl"></i>
//               </div>
//               <h3 className="text-2xl font-semibold mb-4">Real-time Updates</h3>
//               <p className="text-gray-600">
//                 Update menu items, prices, and 3D models instantly across all locations and devices.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="how-it-works" className="py-20 px-6">
//         <div className="container mx-auto">
//           <div className="text-center mb-16 scroll-reveal">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               How <span className="gradient-text">AR Menu</span> Works
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Simple steps to revolutionize your restaurant's menu experience
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="text-center scroll-reveal">
//               <div className="relative">
//                 <div className="w-20 h-20 hero-gradient rounded-full flex items-center justify-center mx-auto mb-6">
//                   <span className="text-white text-2xl font-bold">1</span>
//                 </div>
//                 <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-purple-200"></div>
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Upload Menu</h3>
//               <p className="text-gray-600">
//                 Add your dishes and upload 3D models or photos
//               </p>
//             </div>

//             <div className="text-center scroll-reveal">
//               <div className="relative">
//                 <div className="w-20 h-20 hero-gradient rounded-full flex items-center justify-center mx-auto mb-6">
//                   <span className="text-white text-2xl font-bold">2</span>
//                 </div>
//                 <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-purple-200"></div>
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Generate QR</h3>
//               <p className="text-gray-600">
//                 Create QR codes for each menu item
//               </p>
//             </div>

//             <div className="text-center scroll-reveal">
//               <div className="relative">
//                 <div className="w-20 h-20 hero-gradient rounded-full flex items-center justify-center mx-auto mb-6">
//                   <span className="text-white text-2xl font-bold">3</span>
//                 </div>
//                 <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-purple-200"></div>
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Place on Menu</h3>
//               <p className="text-gray-600">
//                 Add QR codes to your physical or digital menu
//               </p>
//             </div>

//             <div className="text-center scroll-reveal">
//               <div className="w-20 h-20 hero-gradient rounded-full flex items-center justify-center mx-auto mb-6">
//                 <span className="text-white text-2xl font-bold">4</span>
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Customer Scans</h3>
//               <p className="text-gray-600">
//                 Customers scan and view dishes in AR
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="benefits" className="py-20 px-6 bg-white">
//         <div className="container mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div className="scroll-reveal">
//               <h2 className="text-4xl font-bold text-gray-900 mb-6">
//                 Benefits for <span className="gradient-text">Your Restaurant</span>
//               </h2>
//               <div className="space-y-6">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <i className="fas fa-chart-line text-green-600"></i>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Increase Sales</h3>
//                     <p className="text-gray-600">
//                       Visual menus increase order value by up to 30% and reduce decision time.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <i className="fas fa-users text-blue-600"></i>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Enhance Experience</h3>
//                     <p className="text-gray-600">
//                       Create memorable dining experiences that customers share on social media.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <i className="fas fa-leaf text-purple-600"></i>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Go Paperless</h3>
//                     <p className="text-gray-600">
//                       Reduce printing costs and environmental impact with digital AR menus.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4">
//                   <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <i className="fas fa-clock text-orange-600"></i>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold mb-2">Easy Updates</h3>
//                     <p className="text-gray-600">
//                       Instantly update prices, add new items, or remove sold-out dishes.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="scroll-reveal">
//               <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
//                 <h3 className="text-2xl font-bold mb-6">Customer Benefits</h3>
//                 <div className="space-y-4">
//                   <div className="bg-white p-6 rounded-xl">
//                     <div className="flex items-center justify-between mb-2">
//                       <h4 className="font-semibold">Better Decision Making</h4>
//                       <span className="text-3xl">🎯</span>
//                     </div>
//                     <p className="text-gray-600 text-sm">See exactly what you're ordering before it arrives</p>
//                   </div>

//                   <div className="bg-white p-6 rounded-xl">
//                     <div className="flex items-center justify-between mb-2">
//                       <h4 className="font-semibold">Interactive Experience</h4>
//                       <span className="text-3xl">🎮</span>
//                     </div>
//                     <p className="text-gray-600 text-sm">Rotate and explore dishes in 3D space</p>
//                   </div>

//                   <div className="bg-white p-6 rounded-xl">
//                     <div className="flex items-center justify-between mb-2">
//                       <h4 className="font-semibold">Allergen Information</h4>
//                       <span className="text-3xl">🥗</span>
//                     </div>
//                     <p className="text-gray-600 text-sm">Instant access to dietary and allergen details</p>
//                   </div>

//                   <div className="bg-white p-6 rounded-xl">
//                     <div className="flex items-center justify-between mb-2">
//                       <h4 className="font-semibold">Language Support</h4>
//                       <span className="text-3xl">🌍</span>
//                     </div>
//                     <p className="text-gray-600 text-sm">View menus in multiple languages automatically</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="demo" className="py-20 px-6">
//         <div className="container mx-auto">
//           <div className="text-center mb-16 scroll-reveal">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               See It in <span className="gradient-text">Action</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Experience the future of restaurant menus
//             </p>
//           </div>

//           <div className="max-w-4xl mx-auto scroll-reveal">
//             <div className="ar-frame bg-white p-8 rounded-2xl shadow-2xl">
//               <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
//                 <div className="text-center">
//                   <i className="fas fa-cube text-6xl text-purple-600 mb-4 floating"></i>
//                   <p className="text-xl font-semibold text-gray-700">Interactive AR Demo</p>
//                   <p className="text-gray-600 mt-2">Scan the QR code to view in AR</p>
//                 </div>
//               </div>
//               <div className="mt-8 grid grid-cols-2 gap-4">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <i className="fas fa-qrcode text-purple-600"></i>
//                     </div>
//                     <div>
//                       <p className="font-semibold">QR Code</p>
//                       <p className="text-sm text-gray-600">Scan with any smartphone</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                       <i className="fas fa-mobile-alt text-green-600"></i>
//                     </div>
//                     <div>
//                       <p className="font-semibold">No App Required</p>
//                       <p className="text-sm text-gray-600">Works in any browser</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-6 bg-white">
//         <div className="container mx-auto">
//           <div className="text-center mb-16 scroll-reveal">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               What <span className="gradient-text">Restaurants</span> Say
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Join hundreds of restaurants transforming their dining experience
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-gray-50 p-8 rounded-2xl scroll-reveal">
//               <div className="flex items-center mb-4">
//                 <img src="https://picsum.photos/seed/chef1/60/60" className="w-12 h-12 rounded-full mr-4"/>
//                   <div>
//                     <h4 className="font-semibold">Maria Rodriguez</h4>
//                     <p className="text-sm text-gray-600">Owner, Bella Vista</p>
//                   </div>
//               </div>
//               <div className="flex text-yellow-400 mb-4">
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//               </div>
//               <p className="text-gray-600">
//                 "AR Menu has revolutionized how our customers interact with our dishes. Sales have increased by 35% since we implemented it!"
//               </p>
//             </div>

//             <div className="bg-gray-50 p-8 rounded-2xl scroll-reveal">
//               <div className="flex items-center mb-4">
//                 <img src="https://picsum.photos/seed/chef2/60/60" className="w-12 h-12 rounded-full mr-4"/>
//                   <div>
//                     <h4 className="font-semibold">James Chen</h4>
//                     <p className="text-sm text-gray-600">Manager, Sushi Palace</p>
//                   </div>
//               </div>
//               <div className="flex text-yellow-400 mb-4">
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//               </div>
//               <p className="text-gray-600">
//                 "The 3D models look incredible! Our customers love being able to see exactly how each sushi roll is constructed before ordering."
//               </p>
//             </div>

//             <div className="bg-gray-50 p-8 rounded-2xl scroll-reveal">
//               <div className="flex items-center mb-4">
//                 <img src="https://picsum.photos/seed/chef3/60/60" className="w-12 h-12 rounded-full mr-4"/>
//                   <div>
//                     <h4 className="font-semibold">Sarah Johnson</h4>
//                     <p className="text-sm text-gray-600">Director, The Garden</p>
//                   </div>
//               </div>
//               <div className="flex text-yellow-400 mb-4">
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//                 <i className="fas fa-star"></i>
//               </div>
//               <p className="text-gray-600">
//                 "Best decision we made this year. Easy to set up, our staff loves it, and customers are constantly taking photos of the AR experience."
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-6">
//         <div className="container mx-auto">
//           <div className="hero-gradient rounded-3xl p-12 md:p-20 text-white text-center scroll-reveal">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               Ready to Transform Your Menu?
//             </h2>
//             <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
//               Join thousands of restaurants already using AR Menu to create unforgettable dining experiences.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition transform hover:scale-105">
//                 Start Free Trial
//               </button>
//               <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition">
//                 Schedule Demo
//               </button>
//             </div>
//             <p className="mt-6 text-sm opacity-75">
//               No credit card required • 14-day free trial • Cancel anytime
//             </p>
//           </div>
//         </div>
//       </section>

//       <footer className="bg-gray-900 text-white py-12 px-6">
//         <div className="container mx-auto">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
//                   <i className="fas fa-cube text-purple-600"></i>
//                 </div>
//                 <span className="text-xl font-bold">AR Menu</span>
//               </div>
//               <p className="text-gray-400">
//                 Transforming dining experiences with augmented reality technology.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Product</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition">Features</a></li>
//                 <li><a href="#" className="hover:text-white transition">Pricing</a></li>
//                 <li><a href="#" className="hover:text-white transition">Demo</a></li>
//                 <li><a href="#" className="hover:text-white transition">API</a></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition">About</a></li>
//                 <li><a href="#" className="hover:text-white transition">Blog</a></li>
//                 <li><a href="#" className="hover:text-white transition">Careers</a></li>
//                 <li><a href="#" className="hover:text-white transition">Contact</a></li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4">Connect</h4>
//               <div className="flex space-x-4 mb-4">
//                 <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition">
//                   <i className="fab fa-facebook-f"></i>
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition">
//                   <i className="fab fa-twitter"></i>
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition">
//                   <i className="fab fa-instagram"></i>
//                 </a>
//                 <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition">
//                   <i className="fab fa-linkedin-in"></i>
//                 </a>
//               </div>
//               <p className="text-gray-400">
//                 Subscribe to our newsletter for updates
//               </p>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 AR Menu. All rights reserved. | <a href="#" className="hover:text-white transition">Privacy Policy</a> | <a href="#" className="hover:text-white transition">Terms of Service</a></p>
//           </div>
//         </div>
//       </footer>
//     </>
//   )
// }



import React from 'react';
import { Helmet } from 'react-helmet';
import "./landingpage.css"
import ARMenuLanding from '../components/landingpage/ARMenuLanding';

function App() {
  return (
    <>
      <Helmet>
        <title>ARMenu - Revolutionary AR Restaurant Experience</title>
        <meta name="description" content="Transform your restaurant with cutting-edge AR menu technology. Interactive 3D food visualization, multilingual support, and seamless ordering experience." />
        <meta property="og:title" content="ARMenu - Revolutionary AR Restaurant Experience" />
        <meta property="og:description" content="Transform your restaurant with cutting-edge AR menu technology. Interactive 3D food visualization, multilingual support, and seamless ordering experience." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <ARMenuLanding/>
      </div>
    </>
  );
}

export default App;