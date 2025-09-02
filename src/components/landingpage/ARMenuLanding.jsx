import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ARMenuLanding = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const [email, setEmail] = useState('');
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const isDraggingRef = useRef(false);
    const [selectedDish, setSelectedDish] = useState(0);

    const dishes = [
        { name: "Pasta Carbonara", emoji: "🍝", price: "$18.99", description: "Fresh pasta with eggs, cheese, and pancetta" },
        { name: "Margherita Pizza", emoji: "🍕", price: "$16.99", description: "Classic tomato sauce and fresh mozzarella" },
        { name: "Caesar Salad", emoji: "🥗", price: "$12.99", description: "Crisp romaine with parmesan and croutons" },
        { name: "Chocolate Cake", emoji: "🍰", price: "$8.99", description: "Rich dark chocolate with ganache" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        isDraggingRef.current = isDragging;
    }, [isDragging]);

    useEffect(() => {
        let interval;
        if (isHovering && !isDragging) {
            interval = setInterval(() => {
                setRotation(prev => prev + 1);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isHovering, isDragging]);

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/register");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you! We'll contact you at ${email} soon.`);
        setEmail('');
    };

    const handleMouseDown = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isDraggingRef.current) return;
        setRotation(prev => prev + e.movementX * 0.5);
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const features = [
        {
            title: "3D Food Visualization",
            description: "See dishes in stunning 3D before ordering",
            icon: "🍔"
        },
        {
            title: "Interactive Experience",
            description: "Rotate, zoom, and explore dishes from every angle",
            icon: "🎯"
        },
        {
            title: "Real-time Updates",
            description: "Menu changes sync instantly across all devices",
            icon: "⚡"
        }
    ];

    const benefits = [
        {
            title: "Increased Orders",
            description: "Customers order 30% more when they can see dishes in 3D",
            stat: "+30%"
        },
        {
            title: "Reduced Returns",
            description: "Clear expectations lead to fewer order returns",
            stat: "-50%"
        },
        {
            title: "Customer Satisfaction",
            description: "Enhanced dining experience with modern technology",
            stat: "95%"
        },
        {
            title: "Brand Innovation",
            description: "Stand out with cutting-edge AR technology",
            stat: "100%"
        }
    ];

    return (
        <div className="ar-menu-landing">
            {/* Navigation */}
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <div className="nav-logo">
                        <span className="logo-icon"><img src='/icon.svg' width={30}/></span>
                        <span className="logo-text">ARMenu</span>
                    </div>
                    <div className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How it Works</a>
                        <a href="#benefits">Benefits</a>
                        <a href="#demo">Demo</a>
                        <button className="nav-cta" onClick={handleGetStarted}>Get Started</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Transform Your Menu with <span className="gradient-text">Augmented Reality</span>
                        </h1>
                        <p className="hero-subtitle">
                            Bring your dishes to life with 3D AR visualization. Let customers see, rotate, and explore every item on your menu before they order.
                        </p>
                        <div className="hero-actions">
                            <button className="cta-primary" onClick={handleGetStarted}>Start Free Trial</button>
                            <button className="cta-secondary"><a href='#demo'>Watch Demo</a></button>
                        </div>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">Restaurants</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">2M+</span>
                                <span className="stat-label">Happy Customers</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">4.9★</span>
                                <span className="stat-label">Rating</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="phone-mockup">
                            <div className="phone-screen">
                                <div className="ar-menu-demo">
                                    <div className="floating-dish">🍕</div>
                                    <div className="ar-controls">
                                        <div className="control-btn">🔄</div>
                                        <div className="control-btn">🔍</div>
                                        <div className="control-btn">📷</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-wave">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="section-header">
                    <h2 className="section-title">Powerful AR Features</h2>
                    <p className="section-subtitle">Everything you need to create an immersive menu experience</p>
                </div>

                <div className="features-showcase">
                    <div className="features-visual">
                        <div className="feature-display">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`feature-visual-item ${activeFeature === index ? 'active' : ''}`}
                                >
                                    <div className="feature-visual-icon">{feature.icon}</div>
                                    <div className="feature-visual-content">
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`feature-card ${activeFeature === index ? 'highlighted' : ''}`}
                                onMouseEnter={() => setActiveFeature(index)}
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works">
                <div className="section-header">
                    <h2 className="section-title">How ARMenu Works</h2>
                    <p className="section-subtitle">Get started in minutes with our simple 3-step process</p>
                </div>

                <div className="steps-container">
                    <div className="steps">
                        {[
                            {
                                step: "1",
                                title: "Upload Your Menu",
                                description: "Simply upload your existing menu items and photos"
                            },
                            {
                                step: "2",
                                title: "Customize 3D Models",
                                description: "Our AI creates stunning 3D models of your dishes"
                            },
                            {
                                step: "3",
                                title: "Go Live",
                                description: "Share your AR menu with customers instantly"
                            }
                        ].map((step, index) => (
                            <div key={index} className="step">
                                <div className="step-number">{step.step}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                                {index < 2 && <div className="step-arrow">→</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="benefits">
                <div className="benefits-content">
                    <div className="benefits-left">
                        <h2 className="benefits-title">Why Restaurants Love ARMenu</h2>
                        <p className="benefits-subtitle">Join thousands of restaurants transforming their customer experience</p>

                        <div className="benefits-list">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="benefit-item">
                                    <div className="benefit-stat">{benefit.stat}</div>
                                    <div className="benefit-text">
                                        <h4>{benefit.title}</h4>
                                        <p>{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="benefits-right">
                        <div className="testimonial-card">
                            <div className="testimonial-header">
                                <img src="https://picsum.photos/seed/restaurant1/50/50.jpg" alt="Restaurant" className="testimonial-avatar" />
                                <div>
                                    <h4>Maria Rodriguez</h4>
                                    <p>Owner, Bella Vista</p>
                                </div>
                            </div>
                            <div className="testimonial-content">
                                <p>"ARMenu has completely transformed how our customers interact with our menu. Orders have increased by 35% and customers love the experience!"</p>
                                <div className="testimonial-rating">★★★★★</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section id="demo" className="demo">
                <div className="demo-container">
                    <div className="demo-content">
                        <h2 className="demo-title">See ARMenu in Action</h2>
                        <p className="demo-subtitle">Experience the future of restaurant menus today</p>

                        <div className="demo-interactive">
                            <div className="demo-phone">
                                <div className="demo-screen">
                                    <div className="menu-item-demo">
                                        <div className="menu-item-3d">
                                            <div
                                                className={`dish-3d ${isDragging ? 'grabbing' : 'grab'}`}
                                                style={{ transform: `rotate(${rotation}deg)` }}
                                                onMouseDown={handleMouseDown}
                                                onMouseEnter={() => setIsHovering(true)}
                                                onMouseLeave={() => {
                                                    setIsHovering(false);
                                                    setIsDragging(false);
                                                }}
                                            >
                                                {dishes[selectedDish].emoji}
                                            </div>
                                            <div className="rotation-hint">← Drag to rotate →</div>
                                        </div>
                                        <div className="menu-item-info">
                                            <h4>{dishes[selectedDish].name}</h4>
                                            <p>{dishes[selectedDish].description}</p>
                                            <div className="menu-item-price">{dishes[selectedDish].price}</div>
                                        </div>
                                    </div>
                                    <div className="menu-selector">
                                        {dishes.map((dish, index) => (
                                            <button
                                                key={index}
                                                className={`menu-option ${selectedDish === index ? 'active' : ''}`}
                                                onClick={() => setSelectedDish(index)}
                                            >
                                                {dish.emoji} {dish.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="demo-features">
                            <div className="demo-feature">
                                <div className="demo-feature-icon">👆</div>
                                <h4>Touch to Rotate</h4>
                                <p>Rotate dishes 360° with simple gestures</p>
                            </div>
                            <div className="demo-feature">
                                <div className="demo-feature-icon">📱</div>
                                <h4>Any Device</h4>
                                <p>Works on smartphones, tablets, and AR glasses</p>
                            </div>
                            <div className="demo-feature">
                                <div className="demo-feature-icon">⚡</div>
                                <h4>Instant Loading</h4>
                                <p>Ultra-fast 3D rendering for smooth experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Transform Your Restaurant?</h2>
                    <p className="cta-subtitle">Join thousands of restaurants using ARMenu to boost sales and customer satisfaction</p>

                    <form onSubmit={handleSubmit} className="cta-form">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                            className="cta-input"
                        />
                        <button type="submit" className="cta-button">Get Started Free</button>
                    </form>

                    <p className="cta-note">No credit card required • 14-day free trial • Cancel anytime</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <span className="logo-icon" style={{color: 'white'}}><img src='/icon.svg' width={30}/></span>
                            <span className="logo-text">ARMenu</span>
                        </div>
                        <p className="footer-tagline">The future of restaurant menus</p>
                        <div className="social-links">
                            <a href="#" className="social-link"><i className="fa-brands fa-facebook"></i></a>
                            <a href="#" className="social-link"><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="#" className="social-link"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#" className="social-link"><i className="fa-brands fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Product</h4>
                        <ul>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Demo</a></li>
                            <li><a href="#">Integrations</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 ARMenu. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ARMenuLanding;