import React, { useEffect, useState } from 'react';

export default function NotFound() {
    const [show, setShow] = useState(false);
    const [hoverHome, setHoverHome] = useState(false);
    const [hoverBack, setHoverBack] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 80);
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html, body { height: 100%; font-family: 'Inter', sans-serif; background: #f5f5f7; }
                #error-root { height: 100%; }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes pulse-ring {
                    0% { transform: scale(0.95); opacity: 0.6; }
                    100% { transform: scale(1.15); opacity: 0; }
                }
                @keyframes drift1 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(8px, -12px) rotate(8deg); }
                    66% { transform: translate(-6px, 6px) rotate(-4deg); }
                }
                @keyframes drift2 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(-10px, 8px) rotate(-6deg); }
                    66% { transform: translate(6px, -10px) rotate(5deg); }
                }
                @keyframes drift3 {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(5px, -8px); }
                }
                .blob1 { animation: drift1 7s ease-in-out infinite; }
                .blob2 { animation: drift2 9s ease-in-out infinite; }
                .blob3 { animation: drift3 5s ease-in-out infinite; }
                .icon-float { animation: float 3s ease-in-out infinite; }
                .pulse-ring {
                    position: absolute; inset: -12px; border-radius: 50%;
                    border: 2px solid #4f46e5;
                    animation: pulse-ring 2s ease-out infinite;
                }
            `}</style>

            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px 16px',
                    background:
                        'linear-gradient(135deg, #f0f0ff 0%, #f5f5f7 50%, #fff0f5 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Decorative blobs */}
                <div
                    className="blob1"
                    style={{
                        position: 'absolute',
                        top: '8%',
                        left: '6%',
                        width: 'clamp(120px, 18vw, 220px)',
                        height: 'clamp(120px, 18vw, 220px)',
                        borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
                        background:
                            'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                        opacity: 0.5,
                    }}
                />
                <div
                    className="blob2"
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '5%',
                        width: 'clamp(100px, 15vw, 180px)',
                        height: 'clamp(100px, 15vw, 180px)',
                        borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%',
                        background:
                            'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                        opacity: 0.5,
                    }}
                />
                <div
                    className="blob3"
                    style={{
                        position: 'absolute',
                        top: '55%',
                        left: '3%',
                        width: 'clamp(60px, 8vw, 100px)',
                        height: 'clamp(60px, 8vw, 100px)',
                        borderRadius: '50%',
                        background:
                            'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                        opacity: 0.4,
                    }}
                />

                {/* Card */}
                <div
                    style={{
                        background: 'rgba(255,255,255,0.85)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '28px',
                        border: '1px solid rgba(255,255,255,0.9)',
                        boxShadow:
                            '0 20px 60px rgba(79,70,229,0.08), 0 4px 20px rgba(0,0,0,0.04)',
                        padding:
                            'clamp(32px, 6vw, 64px) clamp(24px, 6vw, 60px)',
                        maxWidth: '520px',
                        width: '100%',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 1,
                        opacity: show ? 1 : 0,
                        transform: show
                            ? 'translateY(0) scale(1)'
                            : 'translateY(32px) scale(0.97)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}
                >
                    {/* Icon */}
                    <div
                        style={{
                            position: 'relative',
                            display: 'inline-block',
                            marginBottom: '28px',
                        }}
                    >
                        <div className="pulse-ring" />
                        <div
                            className="icon-float"
                            style={{
                                width: '88px',
                                height: '88px',
                                background:
                                    'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                boxShadow: '0 12px 32px rgba(79,70,229,0.3)',
                            }}
                        >
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 110-16 8 8 0 010 16z"
                                    stroke="white"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* 404 */}
                    <div
                        style={{
                            fontSize: 'clamp(64px, 18vw, 120px)',
                            fontWeight: 900,
                            lineHeight: 1,
                            letterSpacing: '-4px',
                            background:
                                'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginBottom: '16px',
                            userSelect: 'none',
                        }}
                    >
                        404
                    </div>

                    {/* Heading */}
                    <h1
                        style={{
                            fontSize: 'clamp(20px, 4vw, 26px)',
                            fontWeight: 700,
                            color: '#111827',
                            marginBottom: '12px',
                            letterSpacing: '-0.3px',
                        }}
                    >
                        Oops! Page not found
                    </h1>

                    {/* Subtext */}
                    <p
                        style={{
                            fontSize: 'clamp(13px, 2vw, 15px)',
                            color: '#6b7280',
                            lineHeight: 1.75,
                            marginBottom: '36px',
                            maxWidth: '340px',
                            margin: '0 auto 36px',
                        }}
                    >
                        The page you're looking for doesn't exist or may have
                        been moved. Let's get you back on track.
                    </p>

                    {/* Buttons */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '12px',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            marginBottom: '32px',
                        }}
                    >
                        <a
                            href="/"
                            onMouseEnter={() => setHoverHome(true)}
                            onMouseLeave={() => setHoverHome(false)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '13px 28px',
                                borderRadius: '14px',
                                fontWeight: 600,
                                fontSize: '14px',
                                textDecoration: 'none',
                                background: hoverHome
                                    ? 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)'
                                    : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                color: 'white',
                                boxShadow: hoverHome
                                    ? '0 8px 24px rgba(79,70,229,0.45)'
                                    : '0 4px 16px rgba(79,70,229,0.3)',
                                transform: hoverHome
                                    ? 'translateY(-1px)'
                                    : 'translateY(0)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    stroke="white"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Go Home
                        </a>

                        <button
                            onClick={() => window.history.back()}
                            onMouseEnter={() => setHoverBack(true)}
                            onMouseLeave={() => setHoverBack(false)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '13px 28px',
                                borderRadius: '14px',
                                fontWeight: 600,
                                fontSize: '14px',
                                background: hoverBack ? '#f3f4f6' : 'white',
                                color: '#374151',
                                border: '1.5px solid #e5e7eb',
                                cursor: 'pointer',
                                boxShadow: hoverBack
                                    ? '0 4px 12px rgba(0,0,0,0.06)'
                                    : '0 2px 6px rgba(0,0,0,0.04)',
                                transform: hoverBack
                                    ? 'translateY(-1px)'
                                    : 'translateY(0)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    stroke="#374151"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Go Back
                        </button>
                    </div>

                    {/* Divider */}
                    <div
                        style={{
                            height: '1px',
                            background:
                                'linear-gradient(90deg, transparent, #e5e7eb, transparent)',
                            marginBottom: '20px',
                        }}
                    />

                    {/* Quick links */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            flexWrap: 'wrap',
                        }}
                    >
                        {[
                            { label: 'Shop', href: '/shop/u/products' },
                            { label: 'Contact', href: '/contact' },
                            { label: 'Dashboard', href: '/dashboard' },
                        ].map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                style={{
                                    fontSize: '13px',
                                    color: '#4f46e5',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    opacity: 0.8,
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.opacity = '1')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.opacity = '0.8')
                                }
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Footer */}
                    <p
                        style={{
                            marginTop: '24px',
                            fontSize: '11px',
                            color: '#d1d5db',
                            letterSpacing: '0.3px',
                        }}
                    >
                        © {new Date().getFullYear()} ShopWithOlamide
                    </p>
                </div>
            </div>
        </>
    );
}
