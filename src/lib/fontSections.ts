import { fontStyles } from '@/lib/fonts';
import { FontSection } from '@/types/section-types';

// Helper to safely get a generator or fallback to plain text if missing
const getGen = (key: string) => fontStyles[key] || ((t: string) => t);

export const fontSections: FontSection[] = [
    {
        id: 'social-media',
        title: '📱 Social Media Schriftarten',
        description: 'Perfekt für Instagram, WhatsApp, TikTok, Discord - Bio, Namen, Profile und Beiträge.',
        items: [],
        subCategories: [
            {
                id: 'instagram',
                title: 'Instagram Schrift',
                items: [
                    { id: 'bold-sans', name: 'Bold Sans-Serif', generator: getGen('bold-sans') },
                    { id: 'italic-serif', name: 'Italic Serif', generator: getGen('italic-serif') },
                    { id: 'monospace', name: 'Monospace', generator: getGen('monospace') },
                    { id: 'cursive-bold', name: 'Cursive Script', generator: getGen('cursive-bold') },
                    { id: 'double-struck', name: 'Double Struck', generator: getGen('double-struck') },
                    { id: 'fraktur', name: 'Fraktur', generator: getGen('fraktur') },
                    { id: 'circled', name: 'Circle', generator: getGen('circled') },
                    { id: 'squared', name: 'Square', generator: getGen('squared') },
                    { id: 'bubble', name: 'Bubble', generator: getGen('bubble') },
                ]
            },
            {
                id: 'whatsapp',
                title: 'WhatsApp Schrift',
                items: [
                    { id: 'bold', name: 'Bold', generator: getGen('bold') },
                    { id: 'italic', name: 'Italic', generator: getGen('italic') },
                    { id: 'monospace', name: 'Monospace', generator: getGen('monospace') },
                    { id: 'strikethrough', name: 'Strikethrough', generator: getGen('strikethrough') },
                ]
            },
            {
                id: 'tiktok',
                title: 'TikTok Schrift',
                items: [
                    { id: 'bold-italic', name: 'Bold Italic', generator: getGen('bold-italic') },
                    { id: 'fancy', name: 'Fancy', generator: getGen('fancy') },
                    { id: 'cool', name: 'Cool', generator: getGen('cool') },
                    { id: 'bubble-filled', name: 'Bubble Filled', generator: getGen('bubble-filled') },
                ]
            },
            {
                id: 'discord',
                title: 'Discord Schrift',
                items: [
                    { id: 'monospace', name: 'Monospace', generator: getGen('monospace') },
                    { id: 'fullwidth', name: 'Code Style', generator: getGen('fullwidth') },
                ]
            },
        ]
    },
    {
        id: 'aesthetic',
        title: '✨ Ästhetische & Trendige Schriftarten',
        description: 'Moderne und ästhetische Schriftarten für stilvolle Texte, Bios und Captions.',
        items: [
            { id: 'small-caps', name: 'Small Caps', generator: getGen('small-caps') },
            { id: 'wide', name: 'Wide Text', generator: getGen('wide') },
            { id: 'strikethrough', name: 'Strikethrough', generator: getGen('strikethrough') },
            { id: 'underline', name: 'Underline', generator: getGen('underline') },
            { id: 'wavy', name: 'Wavy', generator: getGen('wavy') },
            { id: 'stars', name: 'Stars', generator: getGen('stars') },
            { id: 'slash', name: 'Slash', generator: getGen('slash') },
            { id: 'hearts', name: 'Hearts', generator: getGen('hearts') },
            { id: 'elegant', name: 'Elegant', generator: getGen('elegant') },
            { id: 'sans-bold', name: 'Minimal', generator: getGen('sans-bold') },
            { id: 'wavy', name: 'Soft', generator: getGen('wavy') },
            { id: 'small-caps', name: 'Clean', generator: getGen('small-caps') },
            { id: 'bold-sans', name: 'Modern', generator: getGen('bold-sans') },
            { id: 'serif-bold', name: 'Luxury', generator: getGen('serif-bold') },
            { id: 'cursive-bold', name: 'Premium', generator: getGen('cursive-bold') },
            { id: 'bubble', name: 'Cute', generator: getGen('bubble') },
            { id: 'hearts-border', name: 'Pretty', generator: getGen('hearts-border') },
            { id: 'vaporwave', name: 'Vaporwave', generator: getGen('vaporwave') },
            { id: 'katakana', name: 'Katakana Style', generator: getGen('katakana') },
            { id: 'overline', name: 'Overline', generator: getGen('overline') },
            { id: 'narrow', name: 'Narrow', generator: getGen('narrow') },
            { id: 'dot-below', name: 'Dot Below', generator: getGen('dot-below') },
            { id: 'parenthesized', name: 'Parenthesized', generator: getGen('parenthesized') },
            { id: 'bold-italic-serif', name: 'Bold Italic Serif', generator: getGen('bold-italic-serif') },
        ]
    },
    {
        id: 'lustige',
        title: '😄 Lustige & Besondere',
        description: 'Spielerische und besondere Effekte.',
        items: [
            { id: 'mirror', name: 'Spiegelschrift', generator: getGen('mirror') },
            { id: 'upside-down', name: 'Kopfüber', generator: getGen('upside-down') },
            { id: 'zalgo', name: 'Zalgo / Glitchy', generator: getGen('zalgo') },
            { id: 'regenbogen', name: 'Regenbogen', generator: getGen('regenbogen') },
            { id: 'negativ', name: 'Negativ', generator: getGen('negativ') },
        ]
    },
    {
        id: 'wissenschaft',
        title: '🔬 Wissenschaft & Technik',
        description: 'Hochgestellt, tiefgestellt und Symbol-Schriften.',
        items: [
            { id: 'superscript', name: 'Hochgestellt', generator: getGen('superscript') },
            { id: 'subscript', name: 'Tiefgestellt', generator: getGen('subscript') },
            { id: 'wingdings', name: 'Wingdings', generator: getGen('wingdings') },
        ]
    },
    {
        id: 'classic',
        title: '🏛️ Klassische & Historische Schriftarten',
        description: 'Traditionelle und historische Schriftarten mit klassischem und mittelalterlichem Stil.',
        items: [
            { id: 'fraktur', name: 'Altdeutsche Schrift', generator: getGen('fraktur') },
            { id: 'gothic', name: 'Mittelalter Schrift', generator: getGen('gothic') },
            { id: 'blackboard', name: 'Mittelalterlich', generator: getGen('blackboard') },
            { id: 'bold-serif', name: 'Historische Schrift', generator: getGen('bold-serif') },
            { id: 'double-struck', name: 'Antike Schrift', generator: getGen('double-struck') },
            { id: 'serif-italic', name: 'Klassische Schrift', generator: getGen('serif-italic') },
        ]
    },
    {
        id: 'historische',
        title: '📜 Historische Schriften',
        description: 'Sütterlin, Old English und Deutsche Kurrent.',
        items: [
            { id: 'suetterlin', name: 'Sütterlin', generator: getGen('suetterlin') },
            { id: 'old-english', name: 'Old English / Celtic', generator: getGen('old-english') },
            { id: 'deutsche-kurrent', name: 'Deutsche Kurrent', generator: getGen('deutsche-kurrent') },
        ]
    },
    {
        id: 'business',
        title: '💼 Business & Professionell',
        description: 'Sachliche Schriften für Geschäft und Bewerbung.',
        items: [
            { id: 'clean-sans', name: 'Clean Sans', generator: getGen('clean-sans') },
            { id: 'professional-serif', name: 'Professional Serif', generator: getGen('professional-serif') },
            { id: 'formal', name: 'Formal', generator: getGen('formal') },
        ]
    },
    {
        id: 'feiern',
        title: '🎉 Feiern & Anlässe',
        description: 'Geburtstag, Party und besondere Anlässe.',
        items: [
            { id: 'geburtstag', name: 'Geburtstag 🎂', generator: getGen('geburtstag') },
            { id: 'feier', name: 'Feier 🎊', generator: getGen('feier') },
            { id: 'natur-blaetter', name: 'Natur Blätter 🍃', generator: getGen('natur-blaetter') },
            { id: 'wellen', name: 'Wellen 〰️', generator: getGen('wellen') },
            { id: 'sonne', name: 'Sonne ☀️', generator: getGen('sonne') },
        ]
    },
    {
        id: 'gaming',
        title: '🎮 Gaming & Hacker Schriftarten',
        description: 'Perfekt für Gamer, Tech-Fans und futuristische Designs.',
        items: [
            { id: 'fullwidth', name: 'Gaming Schrift', generator: getGen('fullwidth') },
            { id: 'monospace', name: 'Hacker Schrift', generator: getGen('monospace') },
            { id: 'strikethrough', name: 'Matrix Schrift', generator: getGen('strikethrough') },
            { id: 'outline', name: 'Glitch Schrift', generator: getGen('outline') },
            { id: 'bold-italic-sans', name: 'Cyber Schrift', generator: getGen('bold-italic-sans') },
            { id: 'squared', name: 'Tech Schrift', generator: getGen('squared') },
            { id: 'cool', name: 'Futuristische Schrift', generator: getGen('cool') },
        ]
    },
    {
        id: 'calligraphy',
        title: '✍️ Kalligrafie & Handschrift Schriftarten',
        description: 'Elegante Handschrift- und Kalligrafie-Schriften für Namen, Zitate und Hochzeiten.',
        items: [
            { id: 'script', name: 'Kalligrafie Schrift', generator: getGen('script') },
            { id: 'cursive-bold', name: 'Handgeschriebene Schrift', generator: getGen('cursive-bold') },
            { id: 'italic-serif', name: 'Handschrift Stil', generator: getGen('italic-serif') },
            { id: 'bold-italic', name: 'Brush Schrift', generator: getGen('bold-italic') },
            { id: 'elegant', name: 'Signature Schrift', generator: getGen('elegant') },
            { id: 'fancy-border-4', name: 'Hochzeit Schrift', generator: getGen('fancy-border-4') },
        ]
    },
    {
        id: 'symbols',
        title: '🔣 Symbol & Dekorative Schriftarten',
        description: 'Schriftarten mit Symbolen und Zeichen für besondere Textgestaltung.',
        items: [
            { id: 'fancy-border-8', name: 'Pfeil Schrift', generator: getGen('fancy-border-8') },
            { id: 'emoji-hearts', name: 'Herz Text', generator: getGen('emoji-hearts') },
            { id: 'emoji-stars', name: 'Stern Text', generator: getGen('emoji-stars') },
            { id: 'fancy-border-1', name: 'Linien Schrift', generator: getGen('fancy-border-1') },
            { id: 'fancy-border-9', name: 'Trennzeichen', generator: getGen('fancy-border-9') },
            { id: 'fancy-border-2', name: 'Symbole Schrift', generator: getGen('fancy-border-2') },
            { id: 'fancy-border-3', name: 'Blume Rahmen ❀', generator: getGen('fancy-border-3') },
            { id: 'fancy-border-5', name: 'Eckige Klammer 【】', generator: getGen('fancy-border-5') },
            { id: 'fancy-border-6', name: 'Japan Klammer 『』', generator: getGen('fancy-border-6') },
            { id: 'fancy-border-7', name: 'Box Klammer 〖〗', generator: getGen('fancy-border-7') },
            { id: 'fancy-border-10', name: 'Ornament ꧁꧂', generator: getGen('fancy-border-10') },
            { id: 'emoji-fire', name: 'Feuer Text 🔥', generator: getGen('emoji-fire') },
            { id: 'emoji-flowers', name: 'Blumen Text 🌸', generator: getGen('emoji-flowers') },
            { id: 'emoji-sparkles', name: 'Glitzer Text ✨', generator: getGen('emoji-sparkles') },
            { id: 'emoji-butterfly', name: 'Schmetterling Text 🦋', generator: getGen('emoji-butterfly') },
            { id: 'fire-border', name: 'Feuer Rahmen 🔥', generator: getGen('fire-border') },
            { id: 'crown-border', name: 'Krone Rahmen 👑', generator: getGen('crown-border') },
            { id: 'diamond-border', name: 'Diamant Rahmen 💎', generator: getGen('diamond-border') },
            { id: 'rose-border', name: 'Rose Rahmen 🌹', generator: getGen('rose-border') },
            { id: 'lightning-border', name: 'Blitz Rahmen ⚡', generator: getGen('lightning-border') },
            { id: 'moon-border', name: 'Mond Rahmen 🌙', generator: getGen('moon-border') },
            { id: 'sun-border', name: 'Sonne Rahmen ☀️', generator: getGen('sun-border') },
            { id: 'rainbow-border', name: 'Regenbogen Rahmen 🌈', generator: getGen('rainbow-border') },
            { id: 'music-border', name: 'Musik Rahmen 🎵', generator: getGen('music-border') },
            { id: 'camera-border', name: 'Kamera Rahmen 📸', generator: getGen('camera-border') },
            { id: 'regional-flags', name: 'Regional Flags 🇩🇪', generator: getGen('regional-flags') },
            { id: 'emoji-mix', name: 'Emoji Mix', generator: getGen('emoji-mix') },
        ]
    }
];
