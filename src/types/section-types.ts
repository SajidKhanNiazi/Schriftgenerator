export interface FontItem {
    id: string;
    name: string;
    generator: (text: string) => string;
}

export interface FontSubCategory {
    id: string;
    title: string;
    href?: string;
    items: FontItem[];
}

export interface FontSection {
    id: string;
    title: string;
    description: string;
    href?: string;
    items: FontItem[];
    subCategories?: FontSubCategory[];
}
