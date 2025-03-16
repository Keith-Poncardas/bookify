
class SeoBuilder {

    constructor() {
        this.defaultMeta = {
            title: 'Discover & Browse Your Favorite Books - Bookify',
            description: 'Explore a vast collection of books, browse by genre, and discover your next great read. Find your favorite books and authors easily.',
            keywords: 'books, book browsing, favorite books, book collection, authors, reading, literature',
            url: 'https://bookifyph.vercel.app/',
            image: 'https://i.ibb.co/7dDktDc5/bookifyph-vercel-app.png',
            type: 'website',
            twitterCard: 'https://i.ibb.co/7dDktDc5/bookifyph-vercel-app.png',
            twitterCreator: '@mytwitterhandle',
            schema: {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Bookify",
                "url": "https://bookifyph.vercel.app/",
                "description": "Explore a vast collection of books, browse by genre, and discover your next great read.",
                "image": "https://i.ibb.co/7dDktDc5/bookifyph-vercel-app.png",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://bookifyph.vercel.app/book?search={search_term}",
                    "query-input": "required name=search_term"
                }
            }
        };
    };

    middleware() {
        return (req, res, next) => {
            res.locals.meta = { ...this.defaultMeta };
            res.locals.seo = this;
            next();
        };
    };

    add(res, customMeta) {
        Object.assign(res.locals.meta, customMeta); // ✅ Override per request
    };

};

module.exports = new SeoBuilder();