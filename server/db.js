import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, 'database.sqlite'));

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ─── CREATE TABLES ───────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    content_key TEXT NOT NULL,
    value_en TEXT NOT NULL DEFAULT '',
    value_fr TEXT NOT NULL DEFAULT '',
    UNIQUE(page, section, content_key)
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_en TEXT NOT NULL DEFAULT '',
    title_fr TEXT NOT NULL DEFAULT '',
    date TEXT NOT NULL DEFAULT '',
    time TEXT NOT NULL DEFAULT '',
    location_en TEXT NOT NULL DEFAULT '',
    location_fr TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'Festival',
    event_type TEXT NOT NULL DEFAULT 'organiser',
    description_en TEXT NOT NULL DEFAULT '',
    description_fr TEXT NOT NULL DEFAULT '',
    full_description_en TEXT NOT NULL DEFAULT '',
    full_description_fr TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '[]',
    attendees TEXT NOT NULL DEFAULT '',
    featured INTEGER NOT NULL DEFAULT 0,
    image_url TEXT NOT NULL DEFAULT '',
    video_url TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS studios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL DEFAULT '',
    address_en TEXT NOT NULL DEFAULT '',
    address_fr TEXT NOT NULL DEFAULT '',
    styles TEXT NOT NULL DEFAULT '[]',
    rating REAL NOT NULL DEFAULT 0,
    reviews INTEGER NOT NULL DEFAULT 0,
    image_url TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL DEFAULT '',
    price TEXT NOT NULL DEFAULT '',
    perfect_for_en TEXT NOT NULL DEFAULT '',
    perfect_for_fr TEXT NOT NULL DEFAULT '',
    available_on TEXT NOT NULL DEFAULT 'iPhone · Android',
    features_en TEXT NOT NULL DEFAULT '',
    features_fr TEXT NOT NULL DEFAULT '',
    is_popular INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_en TEXT NOT NULL DEFAULT '',
    question_fr TEXT NOT NULL DEFAULT '',
    answer_en TEXT NOT NULL DEFAULT '',
    answer_fr TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature_key TEXT UNIQUE NOT NULL,
    slug TEXT NOT NULL DEFAULT '',
    title_en TEXT NOT NULL DEFAULT '',
    title_fr TEXT NOT NULL DEFAULT '',
    subtitle_en TEXT NOT NULL DEFAULT '',
    subtitle_fr TEXT NOT NULL DEFAULT '',
    desc_en TEXT NOT NULL DEFAULT '',
    desc_fr TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL DEFAULT '',
    video_url TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS personas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    persona_key TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL DEFAULT '',
    title_fr TEXT NOT NULL DEFAULT '',
    desc_en TEXT NOT NULL DEFAULT '',
    desc_fr TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL DEFAULT '',
    features TEXT NOT NULL DEFAULT '[]',
    plans TEXT NOT NULL DEFAULT '[]',
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    context TEXT NOT NULL DEFAULT '',
    url TEXT NOT NULL DEFAULT '',
    type TEXT NOT NULL DEFAULT 'image'
  );
`);

// ─── SEED ADMIN ──────────────────────────────────────────────────
const adminExists = db.prepare('SELECT id FROM admins WHERE username = ?').get('admin');
if (!adminExists) {
    const hash = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', hash);
    console.log('✅ Default admin created (admin / admin123)');
}

// ─── SEED HELPER ─────────────────────────────────────────────────
function seedContent(page, section, key, en, fr) {
    const exists = db.prepare('SELECT id FROM site_content WHERE page = ? AND section = ? AND content_key = ?').get(page, section, key);
    if (!exists) {
        db.prepare('INSERT INTO site_content (page, section, content_key, value_en, value_fr) VALUES (?, ?, ?, ?, ?)').run(page, section, key, en, fr);
    }
}

// ─── SEED SITE CONTENT ───────────────────────────────────────────
const contentCount = db.prepare('SELECT COUNT(*) as c FROM site_content').get();
if (contentCount.c === 0) {
    // Home page
    seedContent('home', 'hero', 'title', 'Connect with people who dance like you.', 'Connectez-vous avec des gens qui dansent comme vous.');
    seedContent('home', 'hero', 'cta', 'Come join us!', 'Rejoignez-nous !');
    seedContent('home', 'app', 'heading', 'Our innovation to connect the dancing community in all ways possible', 'Notre innovation pour connecter la communauté de danse');
    seedContent('home', 'app', 'description', 'Discover a community of dancers, explore new routines, and elevate your passion for movement. Our app brings everything together — classes, events, playlists, and a community that moves with you.', 'Découvrez une communauté de danseurs, explorez de nouvelles routines et élevez votre passion pour le mouvement.');
    seedContent('home', 'app', 'cta', 'Explore the app', "Explorer l'application");
    seedContent('home', 'app', 'appLink', 'https://loadly.io/1dapWESq', 'https://loadly.io/1dapWESq');
    seedContent('home', 'app', 'phonePlaceholder', 'App Screenshot Preview', "Aperçu de l'application");
    seedContent('home', 'events', 'heading', 'Events taking place near you', 'Événements près de chez vous');
    seedContent('home', 'events', 'subheading', 'Discover exciting dance events happening in your area. Click on any event to learn more.', 'Découvrez des événements de danse passionnants. Cliquez pour en savoir plus.');
    seedContent('home', 'events', 'viewAll', 'View All Events', 'Voir tous les événements');
    seedContent('home', 'events', 'learnMore', 'Learn More', 'En savoir plus');
    seedContent('home', 'studios', 'heading', 'Dance Studios Near You', 'Studios de danse près de chez vous');
    seedContent('home', 'studios', 'subheading', 'Find the perfect studio to practice, learn, and perform.', 'Trouvez le studio parfait pour pratiquer et performer.');
    seedContent('home', 'studios', 'viewAll', 'View All Studios →', 'Voir tous les studios →');
    seedContent('home', 'studios', 'styles', 'Styles', 'Styles');
    seedContent('home', 'whyUs', 'heading', 'Why Choose Us?', 'Pourquoi nous choisir ?');
    seedContent('home', 'whyUs', 'subheading', 'We provide a safe, inclusive space for the entire dance community — event organisers, artists, DJs, fans, and learners of every genre — to connect, grow, and thrive together.', 'Nous offrons un espace sûr et inclusif pour toute la communauté de danse.');
    seedContent('home', 'whyUs', 'safe', 'Safe Community', 'Communauté sûre');
    seedContent('home', 'whyUs', 'safeDesc', 'A trusted, moderated environment where every dancer, organiser, and fan feels welcome and respected.', 'Un environnement de confiance où chaque danseur, organisateur et fan se sent bienvenu.');
    seedContent('home', 'whyUs', 'community', 'All Under One Roof', 'Tout sous un même toit');
    seedContent('home', 'whyUs', 'communityDesc', "Whether you're an event organiser, a professional artist, a DJ, a fan, or a learner — everyone belongs here.", "Que vous soyez organisateur, artiste, DJ, fan ou apprenant — tout le monde a sa place ici.");
    seedContent('home', 'whyUs', 'allInOne', 'Complete Platform', 'Plateforme complète');
    seedContent('home', 'whyUs', 'allInOneDesc', 'Classes, events, playlists, challenges, chat, and discovery — everything you need in one app.', 'Cours, événements, playlists, défis, chat et découverte — tout dans une seule application.');
    seedContent('home', 'whyUs', 'passion', 'Built for Passion', 'Construit par passion');
    seedContent('home', 'whyUs', 'passionDesc', 'Created by people who love dance, for people who live to dance. Every feature is designed with the community in mind.', 'Créé par des passionnés de danse, pour ceux qui vivent pour danser.');
    seedContent('home', 'plans', 'heading', 'Plans we provide to offer you the best community experience', 'Nos abonnements pour la meilleure expérience communautaire');
    seedContent('home', 'plans', 'subheading', 'Choose the perfect plan for your dance journey.', "Choisissez l'abonnement parfait pour votre parcours de danse.");
    seedContent('home', 'plans', 'viewAll', 'View All Plans →', 'Voir tous les abonnements →');
    seedContent('home', 'plans', 'selectPlan', 'Select', 'Choisir');
    seedContent('home', 'plans', 'perMonth', '/mo', '/mois');

    // Nav
    seedContent('nav', 'main', 'home', 'Home', 'Accueil');
    seedContent('nav', 'main', 'plans', 'Plans', 'Abonnements');
    seedContent('nav', 'main', 'product', 'Product', 'Produit');
    seedContent('nav', 'main', 'personas', 'Personas', 'Personas');
    seedContent('nav', 'main', 'faq', 'FAQ', 'FAQ');
    seedContent('nav', 'main', 'events', 'Events & Studios', 'Événements & Studios');
    seedContent('nav', 'main', 'productFeatures', 'Product Features', 'Fonctionnalités');

    // Product page
    seedContent('product', 'hero', 'title', 'Explore the App', "Explorez l'application");
    seedContent('product', 'hero', 'subtitle', 'Everything you need to dance, connect, and grow — all in one platform.', "Tout ce dont vous avez besoin pour danser, connecter et grandir — sur une seule plateforme.");
    seedContent('product', 'hero', 'readyTitle', 'Ready to move?', 'Prêt à bouger ?');
    seedContent('product', 'hero', 'downloadCta', 'Download the App Now', "Télécharger l'application");
    seedContent('product', 'hero', 'exploreFeatures', 'Explore Our Features', 'Découvrez nos fonctionnalités');
    seedContent('product', 'hero', 'exploreSubtitle', 'Discover everything that makes Trillion Dancers the ultimate platform for the dance community.', 'Découvrez tout ce qui fait de Trillion Dancers la plateforme ultime pour la communauté de danse.');

    // Plans page
    seedContent('plans', 'page', 'title', 'Check our plans', 'Découvrez nos abonnements');
    seedContent('plans', 'page', 'subtitle', 'Choose the perfect plan for your dance journey.', "Choisissez l'abonnement parfait.");
    seedContent('plans', 'page', 'perMonth', '/mo', '/mois');
    seedContent('plans', 'page', 'selectPrefix', 'Select', 'Choisir');
    seedContent('plans', 'page', 'perfectFor', 'Perfect For', 'Idéal pour');
    seedContent('plans', 'page', 'availableOn', 'Available On', 'Disponible sur');
    seedContent('plans', 'page', 'favoriteFeatures', 'Favorite Features', 'Fonctionnalités favorites');
    seedContent('plans', 'page', 'mostPopular', 'Most Popular', 'Plus populaire');

    // Personas page
    seedContent('personas', 'page', 'title', 'Personas', 'Personas');
    seedContent('personas', 'page', 'subtitle', 'Who are you in the dance community?', 'Qui êtes-vous dans la communauté ?');
    seedContent('personas', 'page', 'joinCta', 'Join as an artist', "Rejoindre en tant qu'artiste");

    // FAQ page
    seedContent('faq', 'page', 'title', 'FAQ', 'FAQ');
    seedContent('faq', 'page', 'subtitle', 'Frequently asked questions', 'Questions fréquemment posées');

    // Footer
    seedContent('footer', 'main', 'subscribe', 'Subscribe for unstoppable moves!', 'Abonnez-vous pour des mouvements imparables !');
    seedContent('footer', 'main', 'emailPlaceholder', 'Enter your email', 'Entrez votre email');
    seedContent('footer', 'main', 'subscribeCta', 'Subscribe', "S'abonner");
    seedContent('footer', 'main', 'explore', 'Explore', 'Explorer');
    seedContent('footer', 'main', 'connect', 'Connect', 'Connecter');
    seedContent('footer', 'main', 'terms', 'Terms and conditions', 'Conditions générales');
    seedContent('footer', 'main', 'privacy', 'Privacy policy', 'Politique de confidentialité');
    seedContent('footer', 'main', 'copyright', '© 2025 Trillion Dancers. All rights reserved.', '© 2025 Trillion Dancers. Tous droits réservés.');

    // Events page
    seedContent('eventsPage', 'hero', 'tag', 'EVENTS & STUDIOS', 'ÉVÉNEMENTS & STUDIOS');
    seedContent('eventsPage', 'hero', 'title', 'Dance Events & Studios for Our Community', 'Événements de danse & Studios');
    seedContent('eventsPage', 'hero', 'subtitle', 'Workshops, competitions, social nights, and studio sessions designed for dancers of every style and level.', 'Ateliers, compétitions et soirées pour danseurs de tous niveaux.');
    seedContent('eventsPage', 'hero', 'browseCta', 'Browse Events', 'Parcourir les événements');
    seedContent('eventsPage', 'hero', 'studiosCta', 'Find Studios', 'Trouver des studios');

    console.log('✅ Site content seeded');
}

// ─── SEED EVENTS ─────────────────────────────────────────────────
const eventsCount = db.prepare('SELECT COUNT(*) as c FROM events').get();
if (eventsCount.c === 0) {
    const insertEvent = db.prepare(`INSERT INTO events (title_en, title_fr, date, time, location_en, location_fr, category, event_type, description_en, description_fr, full_description_en, full_description_fr, tags, attendees, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    insertEvent.run('Paris Dance Festival 2026', 'Festival de Danse de Paris 2026', 'March 15, 2026', '6:00 PM – 11:00 PM', 'Le Centquatre-Paris, 5 Rue Curial', 'Le Centquatre-Paris', 'Festival', 'organiser', 'A spectacular evening celebrating all dance forms — from hip-hop to contemporary, salsa to afrobeat.', 'Une soirée spectaculaire célébrant toutes les formes de danse.', 'Join us for the biggest dance celebration in Paris!', 'Rejoignez-nous pour la plus grande célébration de danse à Paris !', '["Hip-Hop","Contemporary","Salsa"]', '500+', 1, 1);
    insertEvent.run('Urban Groove Workshop', 'Atelier Urban Groove', 'March 22, 2026', '2:00 PM – 5:00 PM', 'Studio Bleu, 7 Rue des Petites Écuries', 'Studio Bleu, Paris', 'Workshop', 'dj', 'Master urban choreography with top Paris-based instructors.', 'Maîtrisez la chorégraphie urbaine avec les meilleurs instructeurs.', 'An intensive 3-hour workshop led by renowned choreographers.', 'Un atelier intensif dirigé par des chorégraphes renommés.', '["Popping","Locking"]', '30', 1, 2);
    insertEvent.run('Salsa Social Night', 'Soirée Sociale Salsa', 'April 5, 2026', '8:00 PM – 1:00 AM', 'Café de la Danse, 5 Passage Louis Philippe', 'Café de la Danse', 'Social', 'organiser', 'A vibrant social dance evening dedicated to salsa, bachata, and kizomba.', 'Soirée vibrante dédiée à la salsa, bachata et kizomba.', 'The monthly Salsa Social Night returns!', 'La Soirée Sociale Salsa mensuelle est de retour !', '["Salsa","Bachata"]', '150+', 0, 3);
    insertEvent.run('DJ Rhythmz Live Set', 'DJ Rhythmz Live', 'April 10, 2026', '9:00 PM – 2:00 AM', 'Le Bataclan, Paris', 'Le Bataclan', 'Performance', 'dj', 'An electrifying live DJ set with curated dance beats.', 'Set DJ live avec beats de danse exclusifs.', '', '', '["Electronic","House","Dance"]', '300+', 1, 4);
    insertEvent.run('Breaking Battle Royale', 'Bataille Breaking', 'April 12, 2026', '3:00 PM – 8:00 PM', 'La Place Hip-Hop', 'La Place Hip-Hop', 'Competition', 'organiser', 'The ultimate breaking competition — crews and solo breakers.', 'Compétition ultime de breaking.', '', '', '["Breaking","Battle"]', '200+', 0, 5);
    insertEvent.run('Beats & Moves Session', 'Beats & Moves', 'April 18, 2026', '7:00 PM – 10:00 PM', 'La Bellevilloise', 'La Bellevilloise', 'Social', 'dj', 'A collaborative session where DJs spin and dancers freestyle.', 'Session collaborative DJs et danseurs freestyle.', '', '', '["Freestyle","Collab","Live"]', '100+', 0, 6);
    insertEvent.run('Contemporary Showcase', 'Vitrine Contemporaine', 'April 20, 2026', '7:00 PM – 9:30 PM', 'Théâtre de la Ville', 'Théâtre de la Ville', 'Performance', 'organiser', 'Stunning contemporary dance performances by emerging choreographers.', 'Performances contemporaines époustouflantes.', '', '', '["Contemporary","Art"]', '300+', 0, 7);
    insertEvent.run('Sunset Groove Mix', 'Sunset Groove Mix', 'May 1, 2026', '5:00 PM – 9:00 PM', 'Rooftop Molitor, Paris', 'Rooftop Molitor', 'Festival', 'dj', 'A rooftop sunset DJ session with panoramic views and dance vibes.', 'Session DJ en rooftop au coucher du soleil.', '', '', '["Sunset","Chill","Groove"]', '80+', 0, 8);

    console.log('✅ Events seeded');
}

// ─── SEED STUDIOS ────────────────────────────────────────────────
const studiosCount = db.prepare('SELECT COUNT(*) as c FROM studios').get();
if (studiosCount.c === 0) {
    const insertStudio = db.prepare('INSERT INTO studios (name, address_en, address_fr, styles, rating, reviews, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)');
    insertStudio.run('Studio Harmonic', '15 Rue de la Fontaine au Roi, 75011 Paris', '15 Rue de la Fontaine au Roi, 75011 Paris', '["Contemporary","Jazz","Ballet"]', 4.8, 124, 1);
    insertStudio.run('Danse Avenue', '42 Boulevard de Magenta, 75010 Paris', '42 Boulevard de Magenta, 75010 Paris', '["Hip-Hop","Breaking","Popping"]', 4.6, 89, 2);
    insertStudio.run('Le Labo Danse', '8 Rue de Charonne, 75011 Paris', '8 Rue de Charonne, 75011 Paris', '["Salsa","Bachata","Kizomba"]', 4.9, 156, 3);
    insertStudio.run('Centre de Danse du Marais', '41 Rue du Temple, 75004 Paris', '41 Rue du Temple, 75004 Paris', '["Classical","Modern","Jazz"]', 4.7, 203, 4);
    insertStudio.run('Urban Move Studio', '23 Rue des Taillandiers, 75011 Paris', '23 Rue des Taillandiers, 75011 Paris', '["Street Dance","Waacking","Voguing"]', 4.5, 67, 5);
    insertStudio.run('Salle Pleyel Dance', '252 Rue du Faubourg Saint-Honoré, 75008 Paris', '252 Rue du Faubourg Saint-Honoré, 75008 Paris', '["Ballroom","Tango","Waltz"]', 4.8, 142, 6);
    console.log('✅ Studios seeded');
}

// ─── SEED PLANS ──────────────────────────────────────────────────
const plansCount = db.prepare('SELECT COUNT(*) as c FROM plans').get();
if (plansCount.c === 0) {
    const insertPlan = db.prepare('INSERT INTO plans (name, price, perfect_for_en, perfect_for_fr, available_on, features_en, features_fr, is_popular, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    insertPlan.run('Stage', '0,99€', 'Beginners, curious movers, and anyone who wants to start dancing for fun', 'Débutants et curieux du mouvement', 'iPhone · Android', 'Introductory · Accessible · Essential', 'Introductif · Accessible · Essentiel', 0, 1);
    insertPlan.run('Spotlight', '14,99€', 'Dancers who want to go beyond the basics, experiment with different styles in more depth', 'Danseurs qui veulent aller au-delà des bases', 'iPhone · Android', 'Enhanced · Challenging · Progress', 'Amélioré · Stimulant · Progression', 0, 2);
    insertPlan.run('Star', '24,99€', 'Those who want the complete dance experience and the freedom to practice without limits', "L'expérience de danse complète sans limites", 'iPhone · Android', 'Unlimited · Exclusive · Advanced · Personalized', 'Illimité · Exclusif · Avancé · Personnalisé', 1, 3);
    console.log('✅ Plans seeded');
}

// ─── SEED FAQS ───────────────────────────────────────────────────
const faqsCount = db.prepare('SELECT COUNT(*) as c FROM faqs').get();
if (faqsCount.c === 0) {
    const insertFaq = db.prepare('INSERT INTO faqs (question_en, question_fr, answer_en, answer_fr, sort_order) VALUES (?, ?, ?, ?, ?)');
    insertFaq.run('What is Trillion Dancers?', "Qu'est-ce que Trillion Dancers ?", 'We are a global community connecting dancers, artists, DJs, and organizers in one unified platform.', 'Une communauté mondiale connectant danseurs, artistes, DJs et organisateurs.', 1);
    insertFaq.run('Are there different plans available?', "Y a-t-il différents abonnements ?", 'Yes, we offer three plans: Stage, Spotlight, and Star. Visit our Plans page for details.', 'Oui : Stage, Spotlight et Star. Voir la page Abonnements.', 2);
    insertFaq.run('How do I become an Artist or DJ?', 'Comment devenir Artiste ou DJ ?', 'Sign up as a specific Persona. Artists conduct classes, DJs create playlists. Select your persona during sign up.', "Inscrivez-vous en tant que Persona. Sélectionnez votre rôle lors de l'inscription.", 3);
    insertFaq.run('How do I contact support?', 'Comment contacter le support ?', 'Reach out through our social media channels or the support section inside the app.', "Via nos réseaux sociaux ou la section support de l'application.", 4);
    console.log('✅ FAQs seeded');
}

// ─── SEED FEATURES ───────────────────────────────────────────────
const featuresCount = db.prepare('SELECT COUNT(*) as c FROM features').get();
if (featuresCount.c === 0) {
    const insertFeature = db.prepare('INSERT INTO features (feature_key, slug, title_en, title_fr, subtitle_en, subtitle_fr, desc_en, desc_fr, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    insertFeature.run('oneOnOne', 'one-on-one', '1:1 Class', 'Cours 1:1', 'Personal, one-on-one dance classes with your favourite instructor.', 'Cours de danse personnels avec votre instructeur préféré.', 'Book private sessions with professional dance instructors. Get personalized feedback, learn at your own pace, and master techniques with dedicated attention.', 'Réservez des sessions privées avec des instructeurs professionnels. Obtenez des retours personnalisés.', 1);
    insertFeature.run('oneToMany', 'one-to-many', '1:Many Classes', 'Cours collectifs', 'Group classes for collaborative learning and fun.', 'Cours de groupe pour un apprentissage collaboratif.', 'Join group sessions led by top instructors. Dance with peers, learn choreography together, and enjoy the energy of a group setting.', 'Rejoignez des sessions de groupe dirigées par les meilleurs instructeurs.', 2);
    insertFeature.run('videoProgram', 'video-program', 'Video Program', 'Programme vidéo', 'DJs and artists upload videos from their events and sessions.', 'Les DJs et artistes partagent leurs vidéos.', 'Watch and share dance videos from events. DJs can upload highlights from their sets, and artists can share performances and tutorials.', "Regardez et partagez des vidéos de danse d'événements.", 3);
    insertFeature.run('musicPlaylist', 'music-playlist', 'Music Playlist', 'Playlist musicale', 'Curated playlists by DJs for the community.', 'Playlists curées par les DJs.', 'DJs create and share playlists with songs from their sets and preferred tracks. Discover new music that matches your dance style.', 'Les DJs créent et partagent des playlists avec des morceaux de leurs sets.', 4);
    insertFeature.run('findConnection', 'find-connection', 'Find Your Connection', 'Trouvez votre connexion', 'Meet people who share your dance taste and genre.', 'Rencontrez des gens partageant vos goûts.', 'A matchmaking feature where you can discover people who share your music and dance preferences. Swipe through profiles and connect with like-minded dancers.', 'Découvrez des personnes partageant vos préférences musicales et de danse.', 5);
    insertFeature.run('badges', 'badges', 'Badges & Levels', 'Badges & Niveaux', 'Earn badges and level up across all personas.', 'Gagnez des badges et montez en niveau.', 'Every persona — Dancer, Artist, DJ, and Organiser — has 5 levels of badges. Level up through activity, reviews, and community engagement. Show off your achievements.', "Chaque persona a 5 niveaux de badges. Progressez grâce à l'activité et l'engagement.", 6);
    insertFeature.run('referral', 'referral', 'Referral Code', 'Code de parrainage', 'Invite friends and grow the community.', 'Invitez vos amis.', 'Share your unique referral code with friends. When they join, both of you earn rewards. Help the community grow one dancer at a time.', 'Partagez votre code de parrainage unique. Gagnez des récompenses ensemble.', 7);
    insertFeature.run('challenges', 'challenges', 'Dance Challenges', 'Défis de danse', 'Compete, perform, and showcase your skills.', 'Compétez et montrez vos compétences.', 'Participate in community dance challenges. Submit your entries, get votes, and compete with dancers worldwide. New challenges posted regularly.', 'Participez à des défis de danse communautaires.', 8);
    insertFeature.run('feed', 'feed', 'Scrolling Feed', "Fil d'actualité", 'An Instagram Reels-like experience for dance content.', 'Une expérience type Instagram Reels pour la danse.', 'Scroll through a personalized feed of dance videos tailored to your style and genre preferences. Discover, like, and share content from the community.', 'Parcourez un fil personnalisé de vidéos de danse.', 9);
    insertFeature.run('chat', 'chat', 'Community Chat', 'Chat communautaire', 'Stay connected with the dance community.', 'Restez connecté avec la communauté.', '', '', 10);
    console.log('✅ Features seeded');
}

// ─── SEED PERSONAS ───────────────────────────────────────────────
const personasCount = db.prepare('SELECT COUNT(*) as c FROM personas').get();
if (personasCount.c === 0) {
    const insertPersona = db.prepare('INSERT INTO personas (persona_key, title_en, title_fr, desc_en, desc_fr, image_url, features, plans, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    insertPersona.run('dancer', 'Dancer', 'Danseur', 'Learn, perform and participate in challenges.', 'Apprenez, performez et participez à des défis.', 'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg?auto=compress&cs=tinysrgb&w=600', '["1:1 Class","1:Many Classes","Dance Challenges","Scrolling Feed","Find Your Connection","Badges & Levels","Community Chat"]', '["Stage","Spotlight","Star"]', 1);
    insertPersona.run('artist', 'Artist', 'Artiste', 'Conduct live or recorded classes.', 'Donnez des cours en direct ou enregistrés.', 'https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=600', '["1:1 Class (Teach)","1:Many Classes (Host)","Video Program","Scrolling Feed","Badges & Levels","Community Chat","Referral Code"]', '["Spotlight","Star"]', 2);
    insertPersona.run('dj', 'DJ', 'DJ', 'Create and sell playlists to enhance performances.', 'Créez et vendez des playlists.', 'https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=600', '["Music Playlist","Video Program","Scrolling Feed","Badges & Levels","Community Chat","Referral Code","Find Your Connection"]', '["Spotlight","Star"]', 3);
    insertPersona.run('organiser', 'Organizer', 'Organisateur', 'Host and promote dance events.', 'Organisez et promouvez des événements.', 'https://images.pexels.com/photos/7520744/pexels-photo-7520744.jpeg?auto=compress&cs=tinysrgb&w=600', '["Events Management","Community Chat","Badges & Levels","Scrolling Feed","Referral Code","Find Your Connection"]', '["Star"]', 4);
    console.log('✅ Personas seeded');
}

// ─── SEED MEDIA ──────────────────────────────────────────────────
const mediaCount = db.prepare('SELECT COUNT(*) as c FROM media').get();
if (mediaCount.c === 0) {
    const insertMedia = db.prepare('INSERT INTO media (context, url, type) VALUES (?, ?, ?)');
    insertMedia.run('hero_video', 'https://videos.pexels.com/video-files/2795738/2795738-uhd_2560_1440_25fps.mp4', 'video');
    insertMedia.run('dance_video_1', 'https://videos.pexels.com/video-files/5973174/5973174-sd_506_960_25fps.mp4', 'video');
    insertMedia.run('dance_video_2', 'https://videos.pexels.com/video-files/4563407/4563407-sd_506_960_25fps.mp4', 'video');
    insertMedia.run('dance_video_3', 'https://videos.pexels.com/video-files/6394054/6394054-sd_506_960_25fps.mp4', 'video');
    insertMedia.run('studio_image_1', 'https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&w=600', 'image');
    insertMedia.run('studio_image_2', 'https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=600', 'image');
    insertMedia.run('studio_image_3', 'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg?auto=compress&cs=tinysrgb&w=600', 'image');
    console.log('✅ Media seeded');
}

export default db;
