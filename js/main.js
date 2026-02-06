// ============================================
// Schriftgenerator - Main JavaScript
// Unicode Font Transformation Engine
// ============================================

// Unicode character mappings for different font styles
const fontMaps = {
    normal: {
        map: (char) => char,
        name: 'Normal'
    },
    bold: {
        map: (char) => {
            const boldMap = {
                'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡',
                'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩',
                'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱',
                'y': '𝐲', 'z': '𝐳',
                'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇',
                'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏',
                'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗',
                'Y': '𝐘', 'Z': '𝐙',
                '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕',
                '8': '𝟖', '9': '𝟗',
                'ä': '𝐚', 'ö': '𝐨', 'ü': '𝐮', 'Ä': '𝐀', 'Ö': '𝐎', 'Ü': '𝐔', 'ß': '𝐬'
            };
            return boldMap[char] || char;
        },
        name: 'Fett'
    },
    italic: {
        map: (char) => {
            const italicMap = {
                'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ',
                'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝',
                'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥',
                'y': '𝑦', 'z': '𝑧',
                'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻',
                'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃',
                'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋',
                'Y': '𝑌', 'Z': '𝑍',
                'ä': '𝑎', 'ö': '𝑜', 'ü': '𝑢', 'Ä': '𝐴', 'Ö': '𝑂', 'Ü': '𝑈', 'ß': '𝑠'
            };
            return italicMap[char] || char;
        },
        name: 'Kursiv'
    },
    'bold-italic': {
        map: (char) => {
            const boldItalicMap = {
                'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉',
                'i': '𝒊', 'j': '𝒋', 'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑',
                'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕', 'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙',
                'y': '𝒚', 'z': '𝒛',
                'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯',
                'I': '𝑰', 'J': '𝑱', 'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷',
                'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻', 'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿',
                'Y': '𝒀', 'Z': '𝒁',
                'ä': '𝒂', 'ö': '𝒐', 'ü': '𝒖', 'Ä': '𝑨', 'Ö': '𝑶', 'Ü': '𝑼', 'ß': '𝒔'
            };
            return boldItalicMap[char] || char;
        },
        name: 'Fett & Kursiv'
    },
    script: {
        map: (char) => {
            const scriptMap = {
                'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': '𝑒', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽',
                'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅',
                'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍',
                'y': '𝓎', 'z': '𝓏',
                'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ',
                'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫',
                'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳',
                'Y': '𝒴', 'Z': '𝒵',
                'ä': '𝒶', 'ö': 'ℴ', 'ü': '𝓊', 'Ä': '𝒜', 'Ö': '𝒪', 'Ü': '𝒰', 'ß': '𝓈'
            };
            return scriptMap[char] || char;
        },
        name: 'Schreibschrift'
    },
    serif: {
        map: (char) => {
            const serifMap = {
                'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀', 'h': '𝗁',
                'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉',
                'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑',
                'y': '𝗒', 'z': '𝗓',
                'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧',
                'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯',
                'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷',
                'Y': '𝖸', 'Z': '𝖹',
                '0': '𝟢', '1': '𝟣', '2': '𝟤', '3': '𝟥', '4': '𝟦', '5': '𝟧', '6': '𝟨', '7': '𝟩',
                '8': '𝟪', '9': '𝟫',
                'ä': '𝖺', 'ö': '𝗈', 'ü': '𝗎', 'Ä': '𝖠', 'Ö': '𝖮', 'Ü': '𝖴', 'ß': '𝗌'
            };
            return serifMap[char] || char;
        },
        name: 'Serif'
    },
    sans: {
        map: (char) => {
            const sansMap = {
                'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀', 'h': '𝗁',
                'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉',
                'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑',
                'y': '𝗒', 'z': '𝗓',
                'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧',
                'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯',
                'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷',
                'Y': '𝖸', 'Z': '𝖹',
                'ä': '𝖺', 'ö': '𝗈', 'ü': '𝗎', 'Ä': '𝖠', 'Ö': '𝖮', 'Ü': '𝖴', 'ß': '𝗌'
            };
            return sansMap[char] || char;
        },
        name: 'Sans-Serif'
    },
    monospace: {
        map: (char) => {
            const monoMap = {
                'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑',
                'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙',
                'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡',
                'y': '𝚢', 'z': '𝚣',
                'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷',
                'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿',
                'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇',
                'Y': '𝚈', 'Z': '𝚉',
                '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽',
                '8': '𝟾', '9': '𝟿',
                'ä': '𝚊', 'ö': '𝚘', 'ü': '𝚞', 'Ä': '𝙰', 'Ö': '𝙾', 'Ü': '𝚄', 'ß': '𝚜'
            };
            return monoMap[char] || char;
        },
        name: 'Monospace'
    },
    bubble: {
        map: (char) => {
            const bubbleMap = {
                'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ',
                'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ',
                'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ',
                'y': 'ⓨ', 'z': 'ⓩ',
                'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ',
                'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ',
                'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ',
                'Y': 'Ⓨ', 'Z': 'Ⓩ',
                '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦',
                '8': '⑧', '9': '⑨',
                'ä': 'ⓐ', 'ö': 'ⓞ', 'ü': 'ⓤ', 'Ä': 'Ⓐ', 'Ö': 'Ⓞ', 'Ü': 'Ⓤ', 'ß': 'ⓢ'
            };
            return bubbleMap[char] || char;
        },
        name: 'Blase'
    },
    fancy: {
        map: (char) => {
            const fancyMap = {
                'a': 'α', 'b': 'в', 'c': 'c', 'd': '∂', 'e': 'є', 'f': 'ƒ', 'g': 'g', 'h': 'н',
                'i': 'ι', 'j': 'נ', 'k': 'к', 'l': 'ℓ', 'm': 'м', 'n': 'η', 'o': 'σ', 'p': 'ρ',
                'q': 'q', 'r': 'я', 's': 'ѕ', 't': 'т', 'u': 'υ', 'v': 'ν', 'w': 'ω', 'x': 'χ',
                'y': 'у', 'z': 'z',
                'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H',
                'I': 'I', 'J': 'J', 'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P',
                'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X',
                'Y': 'Y', 'Z': 'Z',
                'ä': 'α', 'ö': 'σ', 'ü': 'υ', 'Ä': 'A', 'Ö': 'O', 'Ü': 'U', 'ß': 'ѕ'
            };
            return fancyMap[char] || char;
        },
        name: 'Fancy'
    },
    gothic: {
        map: (char) => {
            const gothicMap = {
                'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥',
                'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭',
                'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵',
                'y': '𝔶', 'z': '𝔷',
                'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ',
                'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓',
                'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛',
                'Y': '𝔜', 'Z': 'ℨ',
                'ä': '𝔞', 'ö': '𝔬', 'ü': '𝔲', 'Ä': '𝔄', 'Ö': '𝔒', 'Ü': '𝔘', 'ß': '𝔰'
            };
            return gothicMap[char] || char;
        },
        name: 'Gothic'
    },
    'double-struck': {
        map: (char) => {
            const doubleMap = {
                'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙',
                'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡',
                'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩',
                'y': '𝕪', 'z': '𝕫',
                'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ',
                'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ',
                'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏',
                'Y': '𝕐', 'Z': 'ℤ',
                '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟',
                '8': '𝟠', '9': '𝟡',
                'ä': '𝕒', 'ö': '𝕠', 'ü': '𝕦', 'Ä': '𝔸', 'Ö': '𝕆', 'Ü': '𝕌', 'ß': '𝕤'
            };
            return doubleMap[char] || char;
        },
        name: 'Doppelt'
    },
    fraktur: {
        map: (char) => {
            const frakturMap = {
                'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥',
                'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭',
                'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵',
                'y': '𝔶', 'z': '𝔷',
                'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ',
                'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓',
                'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛',
                'Y': '𝔜', 'Z': 'ℨ',
                'ä': '𝔞', 'ö': '𝔬', 'ü': '𝔲', 'Ä': '𝔄', 'Ö': '𝔒', 'Ü': '𝔘', 'ß': '𝔰'
            };
            return frakturMap[char] || char;
        },
        name: 'Fraktur'
    },
    'small-caps': {
        map: (char) => {
            const smallCapsMap = {
                'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ',
                'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ',
                'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
                'y': 'ʏ', 'z': 'ᴢ',
                'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H',
                'I': 'I', 'J': 'J', 'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P',
                'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X',
                'Y': 'Y', 'Z': 'Z',
                'ä': 'ᴀ', 'ö': 'ᴏ', 'ü': 'ᴜ', 'Ä': 'A', 'Ö': 'O', 'Ü': 'U', 'ß': 's'
            };
            return smallCapsMap[char] || char;
        },
        name: 'Kleinbuchstaben'
    },
    'bold-sans': {
        map: (char) => {
            const boldSansMap = {
                'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵',
                'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽',
                'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅',
                'y': '𝘆', 'z': '𝘇',
                'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛',
                'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣',
                'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫',
                'Y': '𝗬', 'Z': '𝗭',
                '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳',
                '8': '𝟴', '9': '𝟵',
                'ä': '𝗮', 'ö': '𝗼', 'ü': '𝘂', 'Ä': '𝗔', 'Ö': '𝗢', 'Ü': '𝗨', 'ß': '𝘀'
            };
            return boldSansMap[char] || char;
        },
        name: 'Fett Sans'
    },
    'bold-serif': {
        map: (char) => {
            const boldSerifMap = {
                'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵',
                'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽',
                'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅',
                'y': '𝘆', 'z': '𝘇',
                'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛',
                'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣',
                'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫',
                'Y': '𝗬', 'Z': '𝗭',
                '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳',
                '8': '𝟴', '9': '𝟵',
                'ä': '𝗮', 'ö': '𝗼', 'ü': '𝘂', 'Ä': '𝗔', 'Ö': '𝗢', 'Ü': '𝗨', 'ß': '𝘀'
            };
            return boldSerifMap[char] || char;
        },
        name: 'Fett Serif'
    },
    'italic-sans': {
        map: (char) => {
            const italicSansMap = {
                'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩',
                'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱',
                'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹',
                'y': '𝘺', 'z': '𝘻',
                'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏',
                'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗',
                'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟',
                'Y': '𝘠', 'Z': '𝘡',
                'ä': '𝘢', 'ö': '𝘰', 'ü': '𝘶', 'Ä': '𝘈', 'Ö': '𝘖', 'Ü': '𝘜', 'ß': '𝘴'
            };
            return italicSansMap[char] || char;
        },
        name: 'Kursiv Sans'
    },
    'italic-serif': {
        map: (char) => {
            const italicSerifMap = {
                'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩',
                'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱',
                'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹',
                'y': '𝘺', 'z': '𝘻',
                'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏',
                'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗',
                'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟',
                'Y': '𝘠', 'Z': '𝘡',
                'ä': '𝘢', 'ö': '𝘰', 'ü': '𝘶', 'Ä': '𝘈', 'Ö': '𝘖', 'Ü': '𝘜', 'ß': '𝘴'
            };
            return italicSerifMap[char] || char;
        },
        name: 'Kursiv Serif'
    },
    'bold-italic-sans': {
        map: (char) => {
            const boldItalicSansMap = {
                'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝',
                'i': '𝙞', 'j': '𝙟', 'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥',
                'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩', 'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭',
                'y': '𝙮', 'z': '𝙯',
                'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃',
                'I': '𝙄', 'J': '𝙅', 'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋',
                'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏', 'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓',
                'Y': '𝙔', 'Z': '𝙕',
                'ä': '𝙖', 'ö': '𝙤', 'ü': '𝙪', 'Ä': '𝘼', 'Ö': '𝙊', 'Ü': '𝙐', 'ß': '𝙨'
            };
            return boldItalicSansMap[char] || char;
        },
        name: 'Fett Kursiv Sans'
    },
    'bold-italic-serif': {
        map: (char) => {
            const boldItalicSerifMap = {
                'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝',
                'i': '𝙞', 'j': '𝙟', 'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥',
                'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩', 'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭',
                'y': '𝙮', 'z': '𝙯',
                'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃',
                'I': '𝙄', 'J': '𝙅', 'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋',
                'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏', 'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓',
                'Y': '𝙔', 'Z': '𝙕',
                'ä': '𝙖', 'ö': '𝙤', 'ü': '𝙪', 'Ä': '𝘼', 'Ö': '𝙊', 'Ü': '𝙐', 'ß': '𝙨'
            };
            return boldItalicSerifMap[char] || char;
        },
        name: 'Fett Kursiv Serif'
    },
    'squared': {
        map: (char) => {
            const squaredMap = {
                'a': '🅰', 'b': '🅱', 'c': '🅲', 'd': '🅳', 'e': '🅴', 'f': '🅵', 'g': '🅶', 'h': '🅷',
                'i': '🅸', 'j': '🅹', 'k': '🅺', 'l': '🅻', 'm': '🅼', 'n': '🅽', 'o': '🅾', 'p': '🅿',
                'q': '🆀', 'r': '🆁', 's': '🆂', 't': '🆃', 'u': '🆄', 'v': '🆅', 'w': '🆆', 'x': '🆇',
                'y': '🆈', 'z': '🆉',
                'A': '🅰', 'B': '🅱', 'C': '🅲', 'D': '🅳', 'E': '🅴', 'F': '🅵', 'G': '🅶', 'H': '🅷',
                'I': '🅸', 'J': '🅹', 'K': '🅺', 'L': '🅻', 'M': '🅼', 'N': '🅽', 'O': '🅾', 'P': '🅿',
                'Q': '🆀', 'R': '🆁', 'S': '🆂', 'T': '🆃', 'U': '🆄', 'V': '🆅', 'W': '🆆', 'X': '🆇',
                'Y': '🆈', 'Z': '🆉',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7',
                '8': '8', '9': '9',
                'ä': '🅰', 'ö': '🅾', 'ü': '🆄', 'Ä': '🅰', 'Ö': '🅾', 'Ü': '🆄', 'ß': '🆂'
            };
            return squaredMap[char] || char;
        },
        name: 'Quadratisch'
    },
    'circled': {
        map: (char) => {
            const circledMap = {
                'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ',
                'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ',
                'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ',
                'y': 'ⓨ', 'z': 'ⓩ',
                'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ',
                'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ',
                'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ',
                'Y': 'Ⓨ', 'Z': 'Ⓩ',
                '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦',
                '8': '⑧', '9': '⑨',
                'ä': 'ⓐ', 'ö': 'ⓞ', 'ü': 'ⓤ', 'Ä': 'Ⓐ', 'Ö': 'Ⓞ', 'Ü': 'Ⓤ', 'ß': 'ⓢ'
            };
            return circledMap[char] || char;
        },
        name: 'Umkreist'
    },
    'fullwidth': {
        map: (char) => {
            const fullwidthMap = {
                'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ',
                'i': 'ｉ', 'j': 'ｊ', 'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ',
                'q': 'ｑ', 'r': 'ｒ', 's': 'ｓ', 't': 'ｔ', 'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ',
                'y': 'ｙ', 'z': 'ｚ',
                'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ',
                'I': 'Ｉ', 'J': 'Ｊ', 'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ', 'P': 'Ｐ',
                'Q': 'Ｑ', 'R': 'Ｒ', 'S': 'Ｓ', 'T': 'Ｔ', 'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ',
                'Y': 'Ｙ', 'Z': 'Ｚ',
                '0': '０', '1': '１', '2': '２', '3': '３', '4': '４', '5': '５', '6': '６', '7': '７',
                '8': '８', '9': '９',
                'ä': 'ａ', 'ö': 'ｏ', 'ü': 'ｕ', 'Ä': 'Ａ', 'Ö': 'Ｏ', 'Ü': 'Ｕ', 'ß': 'ｓ'
            };
            return fullwidthMap[char] || char;
        },
        name: 'Vollbreite'
    },
    'outline': {
        map: (char) => {
            const outlineMap = {
                'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙',
                'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡',
                'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩',
                'y': '𝕪', 'z': '𝕫',
                'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ',
                'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ',
                'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏',
                'Y': '𝕐', 'Z': 'ℤ',
                '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟',
                '8': '𝟠', '9': '𝟡',
                'ä': '𝕒', 'ö': '𝕠', 'ü': '𝕦', 'Ä': '𝔸', 'Ö': '𝕆', 'Ü': '𝕌', 'ß': '𝕤'
            };
            return outlineMap[char] || char;
        },
        name: 'Umriss'
    },
    'narrow': {
        map: (char) => {
            const narrowMap = {
                'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g', 'h': 'h',
                'i': 'i', 'j': 'j', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p',
                'q': 'q', 'r': 'r', 's': 's', 't': 't', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
                'y': 'y', 'z': 'z',
                'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H',
                'I': 'I', 'J': 'J', 'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P',
                'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X',
                'Y': 'Y', 'Z': 'Z',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7',
                '8': '8', '9': '9',
                'ä': 'a', 'ö': 'o', 'ü': 'u', 'Ä': 'A', 'Ö': 'O', 'Ü': 'U', 'ß': 's'
            };
            return narrowMap[char] || char;
        },
        name: 'Schmal'
    },
    'strikethrough': {
        map: (char) => {
            // Use combining strikethrough for letters, keep numbers/symbols as is
            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === 'ä' || char === 'ö' || char === 'ü' || char === 'Ä' || char === 'Ö' || char === 'Ü' || char === 'ß') {
                return char + '\u0336';
            }
            return char;
        },
        name: 'Durchgestrichen'
    },
    'underline': {
        map: (char) => {
            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === 'ä' || char === 'ö' || char === 'ü' || char === 'Ä' || char === 'Ö' || char === 'Ü' || char === 'ß') {
                return char + '\u0332';
            }
            return char;
        },
        name: 'Unterstrichen'
    },
    'overline': {
        map: (char) => {
            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === 'ä' || char === 'ö' || char === 'ü' || char === 'Ä' || char === 'Ö' || char === 'Ü' || char === 'ß') {
                return char + '\u0305';
            }
            return char;
        },
        name: 'Überstrichen'
    },
    'wavy': {
        map: (char) => {
            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === 'ä' || char === 'ö' || char === 'ü' || char === 'Ä' || char === 'Ö' || char === 'Ü' || char === 'ß') {
                return char + '\u0303';
            }
            return char;
        },
        name: 'Wellig'
    },
    'dot-above': {
        map: (char) => {
            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === 'ä' || char === 'ö' || char === 'ü' || char === 'Ä' || char === 'Ö' || char === 'Ü' || char === 'ß') {
                return char + '\u0307';
            }
            return char;
        },
        name: 'Punkt Oben'
    },
    'dot-below': {
        map: (char) => {
            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === 'ä' || char === 'ö' || char === 'ü' || char === 'Ä' || char === 'Ö' || char === 'Ü' || char === 'ß') {
                return char + '\u0323';
            }
            return char;
        },
        name: 'Punkt Unten'
    },
    'ring-above': {
        map: (char) => {
            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === 'ä' || char === 'ö' || char === 'ü' || char === 'Ä' || char === 'Ö' || char === 'Ü' || char === 'ß') {
                return char + '\u030A';
            }
            return char;
        },
        name: 'Ring Oben'
    },
    'cursive-bold': {
        map: (char) => {
            const cursiveBoldMap = {
                'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱',
                'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹',
                'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁',
                'y': '𝔂', 'z': '𝔃',
                'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗',
                'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟',
                'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧',
                'Y': '𝓨', 'Z': '𝓩',
                'ä': '𝓪', 'ö': '𝓸', 'ü': '𝓾', 'Ä': '𝓐', 'Ö': '𝓞', 'Ü': '𝓤', 'ß': '𝓼'
            };
            return cursiveBoldMap[char] || char;
        },
        name: 'Fette Schreibschrift'
    },
    'blackboard': {
        map: (char) => {
            const blackboardMap = {
                'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙',
                'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡',
                'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩',
                'y': '𝕪', 'z': '𝕫',
                'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ',
                'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ',
                'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏',
                'Y': '𝕐', 'Z': 'ℤ',
                '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟',
                '8': '𝟠', '9': '𝟡',
                'ä': '𝕒', 'ö': '𝕠', 'ü': '𝕦', 'Ä': '𝔸', 'Ö': '𝕆', 'Ü': '𝕌', 'ß': '𝕤'
            };
            return blackboardMap[char] || char;
        },
        name: 'Tafel'
    },
    'parenthesized': {
        map: (char) => {
            const parenMap = {
                'a': '⒜', 'b': '⒝', 'c': '⒞', 'd': '⒟', 'e': '⒠', 'f': '⒡', 'g': '⒢', 'h': '⒣',
                'i': '⒤', 'j': '⒥', 'k': '⒦', 'l': '⒧', 'm': '⒨', 'n': '⒩', 'o': '⒪', 'p': '⒫',
                'q': '⒬', 'r': '⒭', 's': '⒮', 't': '⒯', 'u': '⒰', 'v': '⒱', 'w': '⒲', 'x': '⒳',
                'y': '⒴', 'z': '⒵',
                'A': '⒜', 'B': '⒝', 'C': '⒞', 'D': '⒟', 'E': '⒠', 'F': '⒡', 'G': '⒢', 'H': '⒣',
                'I': '⒤', 'J': '⒥', 'K': '⒦', 'L': '⒧', 'M': '⒨', 'N': '⒩', 'O': '⒪', 'P': '⒫',
                'Q': '⒬', 'R': '⒭', 'S': '⒮', 'T': '⒯', 'U': '⒰', 'V': '⒱', 'W': '⒲', 'X': '⒳',
                'Y': '⒴', 'Z': '⒵',
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7',
                '8': '8', '9': '9',
                'ä': '⒜', 'ö': '⒪', 'ü': '⒰', 'Ä': '⒜', 'Ö': '⒪', 'Ü': '⒰', 'ß': '⒮'
            };
            return parenMap[char] || char;
        },
        name: 'Geklammert'
    }
};

// Transform text using a font map
function transformText(text, fontType) {
    if (!text) {
        return '';
    }
    
    if (!fontMaps[fontType] || typeof fontMaps[fontType].map !== 'function') {
        console.warn('Font type not found or invalid:', fontType);
        return text;
    }
    
    const mapper = fontMaps[fontType].map;
    try {
        return text.split('').map(char => {
            // Directly map the character (mapper handles both upper and lower case)
            const mapped = mapper(char);
            // If mapping exists, return it; otherwise return original character
            return (mapped !== undefined && mapped !== null && mapped !== '') ? mapped : char;
        }).join('');
    } catch (error) {
        console.error('Error transforming text:', error, 'for font type:', fontType);
        return text;
    }
}

// Generate font preview for a section
function generateFontPreview(text, fontTypes) {
    if (!text) {
        return fontTypes.map(type => ({
            type: type,
            name: fontMaps[type]?.name || type,
            output: ''
        }));
    }
    
    return fontTypes.map(type => ({
        type: type,
        name: fontMaps[type]?.name || type,
        output: transformText(text, type)
    }));
}

// Render font grid in a section
function renderFontGrid(containerId, fontTypes, sampleText = 'Schriftgenerator') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn('Container not found:', containerId);
        return;
    }
    
    const textInput = document.getElementById('textInput');
    const currentText = textInput ? textInput.value.trim() : '';
    const displayText = currentText || sampleText;
    
    if (!displayText) {
        console.warn('No text to display for:', containerId);
        return;
    }
    
    container.innerHTML = '';
    
    const fonts = generateFontPreview(displayText, fontTypes);
    
    if (!fonts || fonts.length === 0) {
        console.warn('No fonts generated for:', containerId);
        return;
    }
    
    fonts.forEach(font => {
        const fontItem = document.createElement('div');
        fontItem.className = 'font-item';
        
        const label = document.createElement('div');
        label.className = 'font-label';
        label.textContent = font.name || 'Unnamed';
        
        const output = document.createElement('div');
        output.className = 'font-output';
        const outputText = font.output || displayText;
        output.textContent = outputText;
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'font-copy-btn';
        copyBtn.textContent = 'Kopieren';
        copyBtn.onclick = () => copyFontText(outputText, copyBtn);
        
        fontItem.appendChild(label);
        fontItem.appendChild(output);
        fontItem.appendChild(copyBtn);
        
        container.appendChild(fontItem);
    });
}

// Copy font text to clipboard
function copyFontText(text, button) {
    if (!text) return;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(button);
        }).catch(() => {
            fallbackCopy(text, button);
        });
    } else {
        fallbackCopy(text, button);
    }
}

// Fallback copy method
function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(button);
    } catch (err) {
        alert('Kopieren fehlgeschlagen. Bitte manuell kopieren.');
    }
    
    document.body.removeChild(textarea);
}

// Show copy feedback
function showCopyFeedback(button) {
    const originalText = button.textContent;
    button.textContent = '✓ Kopiert!';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Update all font sections with readable, practical fonts - NO REPETITION WITHIN CATEGORIES
function updateAllSections() {
    // Bold Font - All bold variations, NO DUPLICATES (12 unique fonts)
    renderFontGrid('boldFonts', ['bold', 'bold-sans', 'bold-serif', 'bold-italic', 'bold-italic-sans', 'bold-italic-serif', 'double-struck', 'outline', 'blackboard', 'cursive-bold', 'fullwidth', 'monospace']);
    
    // Italic Font - All italic variations, NO DUPLICATES (12 unique fonts)
    renderFontGrid('italicFonts', ['italic', 'italic-sans', 'italic-serif', 'bold-italic', 'bold-italic-sans', 'bold-italic-serif', 'script', 'cursive-bold', 'wavy', 'dot-above', 'ring-above', 'overline']);
    
    // Instagram Schrift - Instagram-optimized, NO DUPLICATES (15 unique fonts)
    renderFontGrid('instagramFonts', ['serif', 'sans', 'small-caps', 'monospace', 'fullwidth', 'circled', 'squared', 'bubble', 'parenthesized', 'underline', 'dot-below', 'strikethrough', 'bold-sans', 'italic-sans', 'outline']);
    
    // WhatsApp Schrift - WhatsApp-optimized, NO DUPLICATES (15 unique fonts)
    renderFontGrid('whatsappFonts', ['serif', 'sans', 'monospace', 'small-caps', 'fullwidth', 'circled', 'squared', 'outline', 'parenthesized', 'underline', 'dot-above', 'ring-above', 'bold-serif', 'italic-serif', 'blackboard']);
    
    // TikTok Schrift - TikTok-optimized, NO DUPLICATES (15 unique fonts)
    renderFontGrid('tiktokFonts', ['double-struck', 'bubble', 'circled', 'squared', 'fullwidth', 'outline', 'gothic', 'fancy', 'parenthesized', 'blackboard', 'cursive-bold', 'wavy', 'dot-above', 'ring-above', 'bold-sans']);
    
    // Schöne Schrift - Beautiful, NO DUPLICATES (12 unique fonts)
    renderFontGrid('schoeneFonts', ['serif', 'script', 'italic-serif', 'bold-serif', 'gothic', 'fraktur', 'cursive-bold', 'bold-italic-serif', 'wavy', 'ring-above', 'dot-above', 'overline']);
    
    // Coole Schrift - Cool, NO DUPLICATES (12 unique fonts)
    renderFontGrid('cooleFonts', ['double-struck', 'bubble', 'circled', 'squared', 'outline', 'fullwidth', 'parenthesized', 'blackboard', 'cursive-bold', 'gothic', 'fancy', 'bold-sans']);
    
    // Moderne Schrift - Modern, NO DUPLICATES (12 unique fonts)
    renderFontGrid('moderneFonts', ['sans', 'monospace', 'small-caps', 'fullwidth', 'bold-sans', 'italic-sans', 'underline', 'dot-below', 'strikethrough', 'overline', 'narrow', 'outline']);
    
    // Klassische Schrift - Classic, NO DUPLICATES (10 unique fonts)
    renderFontGrid('klassischeFonts', ['serif', 'fraktur', 'gothic', 'script', 'italic-serif', 'bold-serif', 'cursive-bold', 'bold-italic-serif', 'wavy', 'ring-above']);
    
    // Ästhetische Schrift - Aesthetic, NO DUPLICATES (10 unique fonts)
    renderFontGrid('aesthetischeFonts', ['script', 'italic-serif', 'bold-italic-serif', 'gothic', 'fraktur', 'cursive-bold', 'serif', 'wavy', 'dot-above', 'ring-above']);
    
    // Herz Schrift - Romantic fonts, NO DUPLICATES (10 unique fonts)
    renderFontGrid('herzFonts', ['script', 'italic-serif', 'bold-italic-serif', 'serif', 'italic', 'cursive-bold', 'wavy', 'ring-above', 'dot-above', 'overline']);
    
    // Symbol Schrift - Symbol-based fonts, NO DUPLICATES (10 unique fonts)
    renderFontGrid('symbolFonts', ['bubble', 'circled', 'squared', 'fullwidth', 'parenthesized', 'blackboard', 'double-struck', 'outline', 'gothic', 'fancy']);
}

// Mobile navigation toggle
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded, initializing...');
    
    // Initialize navigation
    initNavigation();
    
    // Set up text input listener
    const textInput = document.getElementById('textInput');
    
    if (textInput) {
        textInput.addEventListener('input', () => {
            updateAllSections();
        });
    } else {
        console.error('Text input not found!');
    }
    
    // Initial render with default sample text
    console.log('Calling updateAllSections...');
    updateAllSections();
    console.log('Initialization complete');
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; // Account for sticky nav
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
