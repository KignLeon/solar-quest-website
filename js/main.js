/* ============================================
   SOLARQUEST POWER — FRUTIGER AERO × 2026
   Energy Particles · Before/After · WhatsApp AI
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── 1. LEAF PARTICLE SYSTEM (disabled for SolarQuest Power) ─── */
    const canvas = document.getElementById('leaf-canvas');
    if (false) {
        const ctx = canvas.getContext('2d');
        let leaves = [];
        const LEAF_COLORS = ['#E87C2A', '#f5a623', '#4D8C2A', '#8BC34A', '#5B9BD5', '#38bdf8'];
        const LEAF_SHAPES = ['☀️', '⚡', '🔋', '🌱', '💡'];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Leaf {
            constructor(x, y, burst = false) {
                this.x = x || Math.random() * canvas.width;
                this.y = y || -20;
                this.size = Math.random() * 18 + 10;
                this.speedY = burst ? (Math.random() * -6 - 2) : (Math.random() * 1.5 + 0.5);
                this.speedX = burst ? (Math.random() * 8 - 4) : (Math.random() * 2 - 1);
                this.rotation = Math.random() * 360;
                this.rotSpeed = (Math.random() - 0.5) * 4;
                this.opacity = burst ? 1 : (Math.random() * 0.4 + 0.3);
                this.shape = LEAF_SHAPES[Math.floor(Math.random() * LEAF_SHAPES.length)];
                this.gravity = burst ? 0.15 : 0;
                this.life = burst ? 120 : Infinity;
                this.age = 0;
                this.wobble = Math.random() * Math.PI * 2;
                this.wobbleSpeed = Math.random() * 0.03 + 0.01;
            }
            update() {
                this.age++;
                this.wobble += this.wobbleSpeed;
                this.x += this.speedX + Math.sin(this.wobble) * 0.5;
                this.y += this.speedY;
                this.speedY += this.gravity;
                this.rotation += this.rotSpeed;
                if (this.life !== Infinity) {
                    this.opacity = Math.max(0, 1 - this.age / this.life);
                }
                return this.y < canvas.height + 30 && this.age < this.life && this.opacity > 0;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.font = `${this.size}px serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.shape, 0, 0);
                ctx.restore();
            }
        }

        // Ambient leaves (gentle rain)
        function spawnAmbient() {
            if (leaves.length < 15 && Math.random() < 0.03) {
                leaves.push(new Leaf());
            }
        }

        // Burst leaves on click
        function burstLeaves(x, y, count = 12) {
            for (let i = 0; i < count; i++) {
                leaves.push(new Leaf(x, y, true));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            spawnAmbient();
            leaves = leaves.filter(l => {
                l.draw();
                return l.update();
            });
            requestAnimationFrame(animate);
        }
        animate();

        // Attach leaf burst to all buttons and CTAs
        window.burstLeaves = burstLeaves;
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn, .btn-glow, .sticky-btn, .wa-fab, .wa-quick, .faq-q');
            if (btn) {
                const rect = btn.getBoundingClientRect();
                burstLeaves(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);
            }
        });
    }

    /* ─── 2. NAVBAR SCROLL EFFECT ─── */
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (navbar) {
            navbar.classList.toggle('scrolled', y > 60);
            navbar.classList.toggle('nav-hidden', y > lastScroll && y > 300);
        }
        lastScroll = y;
    });

    /* ─── 3. MOBILE MENU ─── */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ─── 4. SMOOTH SCROLLING ─── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id === '#' || id === '#quote-modal') return;
            e.preventDefault();
            const el = document.querySelector(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ─── 5. QUOTE MODAL ─── */
    const modalOverlay = document.getElementById('quote-modal');
    const modalClose = document.getElementById('modal-close');
    const openModalBtns = document.querySelectorAll('[href="#quote-modal"]');

    function openModal(e) {
        if (e) e.preventDefault();
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    openModalBtns.forEach(b => b.addEventListener('click', openModal));
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    /* ─── 6. FORM SUBMISSION (DEMO) ─── */
    ['contact-form', 'quote-form', 'hero-quote-form'].forEach(id => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const original = btn.textContent;
                btn.textContent = '✓ Sent! We\'ll be in touch.';
                btn.style.background = 'var(--green-600)';
                setTimeout(() => {
                    btn.textContent = original;
                    btn.style.background = '';
                    form.reset();
                    if (id === 'quote-form') closeModal();
                }, 2500);
            });
        }
    });

    /* ─── 7. FAQ ACCORDION ─── */
    document.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
            // Toggle current
            if (!isOpen) item.classList.add('open');
        });
    });

    /* ─── 8. SCROLL ANIMATIONS (IntersectionObserver) ─── */
    const animElements = document.querySelectorAll('.anim-fade-up, .anim-slide-left, .anim-slide-right');
    if (animElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Add stagger delay for cards in grids
                    const parent = entry.target.parentElement;
                    if (parent && (parent.classList.contains('services-grid') || parent.classList.contains('gallery-grid') || parent.classList.contains('reviews-grid') || parent.classList.contains('stats-grid'))) {
                        const siblings = Array.from(parent.children);
                        const idx = siblings.indexOf(entry.target);
                        entry.target.style.transitionDelay = `${idx * 0.08}s`;
                    }
                    entry.target.classList.add('anim-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        animElements.forEach(el => observer.observe(el));
    }

    /* ─── 9. BEFORE / AFTER SLIDER ─── */
    const baSlider = document.getElementById('ba-slider');
    const baHandle = document.getElementById('ba-handle');
    if (baSlider && baHandle) {
        let isDragging = false;

        function setPosition(x) {
            const rect = baSlider.getBoundingClientRect();
            let pct = ((x - rect.left) / rect.width) * 100;
            pct = Math.max(2, Math.min(98, pct));
            baSlider.style.setProperty('--ba-pos', pct + '%');
        }

        baHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        baHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
        }, { passive: true });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) setPosition(e.clientX);
        });
        window.addEventListener('touchmove', (e) => {
            if (isDragging) setPosition(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('touchend', () => isDragging = false);

        // Click anywhere on slider to move
        baSlider.addEventListener('click', (e) => {
            if (e.target !== baHandle && !baHandle.contains(e.target)) {
                setPosition(e.clientX);
            }
        });
    }

    /* ─── 10. WHATSAPP AI CHAT ─── */
    const waFab = document.getElementById('wa-fab');
    const waChatWindow = document.getElementById('wa-chat-window');
    const waClose = document.getElementById('wa-close');
    const waInput = document.getElementById('wa-input');
    const waSend = document.getElementById('wa-send');
    const waChatBody = document.getElementById('wa-chat-body');

    // Knowledge base for the AI
    const KB = {
        services: "We offer professional solar & energy services:\n☀️ Residential Solar Installation\n🏢 Commercial Solar Systems\n🔋 Solar + Battery Storage\n🔌 EV Charger Installation\n🔧 Electrical Panel Upgrades\n📊 Solar System Monitoring\n💰 Solar Financing Consultation\n🏠 Roof Assessment & Solar Design\n⚡ Net Metering & Utility Interconnection",
        areas: "We serve all of San Diego County including Chula Vista, El Cajon, Lakeside, Santee, Poway, La Mesa, Spring Valley, and surrounding cities throughout Southern California.",
        hours: "📍 Office Hours:\nMonday – Saturday: 8:00 AM – 6:00 PM\nSunday: By Appointment\n\n📞 Call: (619) 292-8062\n📧 Email: info@solarquestpower.com",
        quote: "We'd love to give you a free solar quote! You can:\n1️⃣ Call us at (619) 292-8062\n2️⃣ Fill out the quote form on this page\n3️⃣ Message us on WhatsApp\n\nWe typically respond within 24 hours!",
        about: "SolarQuest Power has been serving San Diego for over 15 years. We're a C-10 licensed contractor (#992252), fully insured, and we use only Tier 1 solar panels from manufacturers like QCell, LG, Kyocera, and Solaria.",
        payment: "We offer $0 down financing options! We also accept cash, check, and all major credit/debit cards. Ask us about our flexible solar financing plans.",
        experience: "With 15+ years of hands-on solar experience, our C-10 licensed team has completed over 1,000 solar installations across San Diego County. We're BPI/HERS certified and use only Tier 1 panels.",
        financing: "Great news! We offer $0 down financing on all solar installations. Start saving from day one with no upfront cost. Ask our team about available financing plans and federal/state solar incentives like the 30% Federal Solar Tax Credit!"
    };

    function getAIResponse(msg) {
        const lower = msg.toLowerCase();
        if (lower.includes('service') || lower.includes('offer') || lower.includes('do you do') || lower.includes('what do') || lower.includes('solar service')) {
            return KB.services;
        } else if (lower.includes('area') || lower.includes('serve') || lower.includes('location') || lower.includes('where')) {
            return KB.areas;
        } else if (lower.includes('hour') || lower.includes('open') || lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('call')) {
            return KB.hours;
        } else if (lower.includes('quote') || lower.includes('estimate') || lower.includes('price') || lower.includes('cost') || lower.includes('free')) {
            return KB.quote;
        } else if (lower.includes('about') || lower.includes('who') || lower.includes('company') || lower.includes('history')) {
            return KB.about;
        } else if (lower.includes('pay') || lower.includes('cash') || lower.includes('check') || lower.includes('credit')) {
            return KB.payment;
        } else if (lower.includes('financ') || lower.includes('loan') || lower.includes('down payment') || lower.includes('$0')) {
            return KB.financing;
        } else if (lower.includes('experience') || lower.includes('year') || lower.includes('how long')) {
            return KB.experience;
        } else {
            return "Thanks for reaching out! ☀️ I can help with:\n• Our solar services\n• Service areas\n• Getting a free solar quote\n• $0 down financing options\n• Business hours & contact\n\nOr tap the WhatsApp button below to chat directly!";
        }
    }

    function addMessage(text, isBot = false) {
        const quickReplies = document.getElementById('wa-quick-replies');
        const msgDiv = document.createElement('div');
        msgDiv.className = `wa-msg ${isBot ? 'wa-msg-bot' : 'wa-msg-user'}`;

        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        msgDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p><span class="wa-time">${time}</span>`;

        // Insert before quick replies
        if (quickReplies) {
            waChatBody.insertBefore(msgDiv, quickReplies);
        } else {
            waChatBody.appendChild(msgDiv);
        }

        // Scroll to bottom
        waChatBody.scrollTop = waChatBody.scrollHeight;
        return msgDiv;
    }

    function handleUserMessage(msg) {
        if (!msg.trim()) return;
        addMessage(msg, false);
        waInput.value = '';

        // Hide quick replies after first message
        const qr = document.getElementById('wa-quick-replies');
        if (qr) qr.style.display = 'none';

        // Typing indicator
        const typing = document.createElement('div');
        typing.className = 'wa-msg wa-msg-bot wa-typing';
        typing.innerHTML = '<p><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>';
        waChatBody.appendChild(typing);
        waChatBody.scrollTop = waChatBody.scrollHeight;

        setTimeout(() => {
            typing.remove();
            addMessage(getAIResponse(msg), true);
        }, 800 + Math.random() * 600);
    }

    if (waFab && waChatWindow) {
        waFab.addEventListener('click', () => {
            waChatWindow.classList.toggle('open');
            waFab.classList.toggle('active');
        });
        waClose.addEventListener('click', () => {
            waChatWindow.classList.remove('open');
            waFab.classList.remove('active');
        });
    }

    if (waSend) {
        waSend.addEventListener('click', () => handleUserMessage(waInput.value));
    }
    if (waInput) {
        waInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage(waInput.value);
        });
    }

    // Quick replies
    document.querySelectorAll('.wa-quick').forEach(btn => {
        btn.addEventListener('click', () => {
            handleUserMessage(btn.dataset.msg);
        });
    });

    /* ─── 11. MOBILE STICKY BAR ─── */
    const mobileSticky = document.getElementById('mobile-sticky');
    if (mobileSticky) {
        window.addEventListener('scroll', () => {
            mobileSticky.classList.toggle('visible', window.scrollY > 400);
        });
    }

    /* ─── 12. PARALLAX ORBS (subtle) ─── */
    window.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.orb');
        const mx = e.clientX / window.innerWidth - 0.5;
        const my = e.clientY / window.innerHeight - 0.5;
        orbs.forEach((orb, i) => {
            const depth = (i + 1) * 12;
            orb.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
        });
    });

    /* ─── 13. SERVICE CARD TILT (3D hover) ─── */
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ─── 14. COUNTER ANIMATION ─── */
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    const match = text.match(/^([\d.]+)/);
                    if (match) {
                        const target = parseFloat(match[1]);
                        const suffix = text.replace(match[1], '');
                        const isFloat = text.includes('.');
                        let current = 0;
                        const step = target / 40;
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            el.innerHTML = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
                        }, 30);
                    }
                    countObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        stats.forEach(s => countObserver.observe(s));
    }

    /* ─── 15. ACTIVE NAV LINK HIGHLIGHT ─── */
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                link.classList.toggle('active', scrollY >= top && scrollY < top + height);
            }
        });
    });

    /* ─── 16. GOOGLE REVIEW REROUTING SYSTEM ─── */

    /* Lightweight sparkle ring — pure CSS transitions, zero canvas cost */
    function cssSparkleRing(triggerEl) {
        const rect = triggerEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const emojis = ['⚡', '💡', '✨', '⚡', '🔌', '🌟', '✨', '🔋'];
        emojis.forEach((em, i) => {
            const el = document.createElement('span');
            el.textContent = em;
            const angle = (i / emojis.length) * 360;
            const dist = 70 + Math.random() * 40;
            const rad = (angle * Math.PI) / 180;
            const tx = Math.cos(rad) * dist;
            const ty = Math.sin(rad) * dist;
            Object.assign(el.style, {
                position: 'fixed',
                left: cx + 'px',
                top: cy + 'px',
                fontSize: (16 + Math.random() * 10) + 'px',
                lineHeight: '1',
                pointerEvents: 'none',
                zIndex: '99999',
                transform: 'translate(-50%,-50%) scale(0)',
                opacity: '1',
                transition: 'transform 0.5s cubic-bezier(.2,1.4,.4,1), opacity 0.5s ease',
                willChange: 'transform, opacity'
            });
            document.body.appendChild(el);
            requestAnimationFrame(() => requestAnimationFrame(() => {
                el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`;
                el.style.opacity = '0';
            }));
            setTimeout(() => el.remove(), 550);
        });
    }

    const reviewModal = document.getElementById('review-modal');
    const reviewModalClose = document.getElementById('review-modal-close');
    const openReviewBtn = document.getElementById('open-review-btn');
    const stickyReviewBtn = document.getElementById('sticky-review-btn');

    const step1 = document.getElementById('review-step-1');
    const stepFeed = document.getElementById('review-step-feedback');
    const stepGoogle = document.getElementById('review-step-google');
    const stepDone = document.getElementById('review-step-done');
    const stars = document.querySelectorAll('.star');

    function showStep(step) {
        [step1, stepFeed, stepGoogle, stepDone].forEach(s => {
            if (s) s.classList.add('hidden');
        });
        if (step) step.classList.remove('hidden');
    }

    function openReviewModal(e) {
        if (e) e.preventDefault();
        // Reset to step 1
        showStep(step1);
        stars.forEach(s => s.classList.remove('active', 'hover'));
        if (reviewModal) {
            reviewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Lightweight CSS sparkle ring — no canvas cost
            const origin = (e && e.currentTarget) ? e.currentTarget : document.getElementById('open-review-btn');
            if (origin) cssSparkleRing(origin);
        }
    }

    function closeReviewModal() {
        if (reviewModal) {
            reviewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Open triggers
    if (openReviewBtn) openReviewBtn.addEventListener('click', openReviewModal);
    if (stickyReviewBtn) stickyReviewBtn.addEventListener('click', openReviewModal);

    // Close triggers
    if (reviewModalClose) reviewModalClose.addEventListener('click', closeReviewModal);
    if (reviewModal) {
        reviewModal.addEventListener('click', (e) => {
            if (e.target === reviewModal) closeReviewModal();
        });
    }

    // Skip / close buttons inside modal
    const skipBtn = document.getElementById('review-skip-btn');
    const doneCloseBtn = document.getElementById('review-done-close');
    if (skipBtn) skipBtn.addEventListener('click', closeReviewModal);
    if (doneCloseBtn) doneCloseBtn.addEventListener('click', closeReviewModal);

    // Star hover & click logic
    stars.forEach((star, idx) => {
        // Hover — highlight up to hovered star
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                s.classList.toggle('hover', i <= idx);
            });
        });

        // Mouse leave — restore active state
        star.addEventListener('mouseleave', () => {
            stars.forEach(s => s.classList.remove('hover'));
        });

        // Click — set rating and navigate
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.value, 10);

            // Mark active stars
            stars.forEach((s, i) => {
                s.classList.toggle('active', i < rating);
                s.classList.remove('hover');
            });

            // Route based on rating
            setTimeout(() => {
                if (rating <= 3) {
                    showStep(stepFeed);
                } else {
                    showStep(stepGoogle);
                }
            }, 350);
        });
    });

    // Private feedback form submission
    const privateFeedbackForm = document.getElementById('private-feedback-form');
    if (privateFeedbackForm) {
        privateFeedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = privateFeedbackForm.querySelector('button[type="submit"]');
            btn.textContent = '✓ Sending…';
            btn.disabled = true;
            // Simulate submission delay, then show thank you
            setTimeout(() => {
                privateFeedbackForm.reset();
                btn.textContent = 'Send Private Feedback';
                btn.disabled = false;
                showStep(stepDone);
            }, 1200);
        });
    }

});
