import React, { useEffect, useState } from 'react';

export default function NotFound() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 100);
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
                * { font-family: 'Inter', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #f9fafb; }
                .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
                .fade-in.show { opacity: 1; transform: translateY(0); }
                .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 12px; font-weight: 600; font-size: 14px; text-decoration: none; cursor: pointer; border: none; transition: all 0.2s; }
                .btn-primary { background: #4f46e5; color: white; }
                .btn-primary:hover { background: #4338ca; }
                .btn-secondary { background: white; color: #374151; border: 1px solid #e5e7eb; }
                .btn-secondary:hover { background: #f9fafb; }
                .four-o-four { font-size: clamp(80px, 20vw, 160px); font-weight: 900; color: #4f46e5; line-height: 1; letter-spacing: -4px; opacity: 0.12; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none; user-select: none; }
            `}</style>

            <div
                className="fade-in"
                style={{
                    opacity: show ? 1 : 0,
                    transform: show ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
            >
                {/* Big 404 number */}
                <div style={{ position: 'relative', marginBottom: '32px' }}>
                    <div style={{
                        fontSize: 'clamp(100px, 22vw, 180px)',
                        fontWeight: 900,
                        color: '#4f46e5',
                        lineHeight: 1,
                        letterSpacing: '-6px',
                        opacity: 0.08,
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}>
                        404
                    </div>
                    {/* Icon centered over the 404 */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80px',
                        height: '80px',
                        background: '#ede9fe',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 110-16 8 8 0 010 16z"
                                stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                {/* Text */}
                <h1 style={{
                    fontSize: 'clamp(22px, 4vw, 32px)',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '12px',
                }}>
                    Page not found
                </h1>
                <p style={{
                    fontSize: '15px',
                    color: '#6b7280',
                    maxWidth: '380px',
                    lineHeight: 1.7,
                    marginBottom: '36px',
                }}>
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="/" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '12px 28px', borderRadius: '12px', fontWeight: 600,
                        fontSize: '14px', textDecoration: 'none', background: '#4f46e5',
                        color: 'white', transition: 'background 0.2s',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#4338ca')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#4f46e5')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Go Home
                    </a>
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '12px 28px', borderRadius: '12px', fontWeight: 600,
                            fontSize: '14px', background: 'white', color: '#374151',
                            border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Go Back
                    </button>
                </div>

                {/* Footer hint */}
                <p style={{ marginTop: '48px', fontSize: '12px', color: '#9ca3af' }}>
                    ShopWithOlamide · Need help?{' '}
                    <a href="/contact" style={{ color: '#4f46e5', textDecoration: 'none' }}>
                        Contact support
                    </a>
                </p>
            </div>
        </div>
    );
}