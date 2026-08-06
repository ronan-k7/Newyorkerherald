const fs = require('fs');
const path = require('path');

const sqlPath = path.join(__dirname, '..', 'newyorkerherald_news1.sql');
const dataDir = path.join(__dirname, '..', 'data');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const sqlContent = fs.readFileSync(sqlPath, 'utf8');

function parseInsertValues(tableContent) {
    const rows = [];
    let inTuple = false;
    let currentTuple = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < tableContent.length; i++) {
        const char = tableContent[i];
        const nextChar = tableContent[i + 1];

        if (!inTuple) {
            if (char === '(') {
                inTuple = true;
                currentTuple = '';
            }
        } else {
            if (inString) {
                if (char === '\\') {
                    currentTuple += char + nextChar;
                    i++;
                } else if (char === stringChar) {
                    inString = false;
                    currentTuple += char;
                } else {
                    currentTuple += char;
                }
            } else {
                if (char === "'" || char === '"') {
                    inString = true;
                    stringChar = char;
                    currentTuple += char;
                } else if (char === ')') {
                    inTuple = false;
                    rows.push(currentTuple);
                } else {
                    currentTuple += char;
                }
            }
        }
    }
    return rows;
}

function parseSqlValuesLine(tupleStr) {
    const values = [];
    let currentVal = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < tupleStr.length; i++) {
        const char = tupleStr[i];
        const nextChar = tupleStr[i + 1];

        if (inString) {
            if (char === '\\') {
                if (nextChar === "'") currentVal += "'";
                else if (nextChar === '"') currentVal += '"';
                else if (nextChar === 'n') currentVal += '\n';
                else if (nextChar === 'r') currentVal += '\r';
                else if (nextChar === '\\') currentVal += '\\';
                else currentVal += '\\' + nextChar;
                i++;
            } else if (char === stringChar) {
                if (nextChar === stringChar) {
                    currentVal += char;
                    i++;
                } else {
                    inString = false;
                }
            } else {
                currentVal += char;
            }
        } else {
            if (char === "'" || char === '"') {
                inString = true;
                stringChar = char;
            } else if (char === ',') {
                values.push(currentVal.trim());
                currentVal = '';
            } else {
                currentVal += char;
            }
        }
    }
    values.push(currentVal.trim());

    return values.map(v => {
        if (!v || v.toUpperCase() === 'NULL') return null;
        // strip leading/trailing quotes or backticks if unquoted
        return v.replace(/^[`'"]|[`'"]$/g, '');
    });
}

// 1. Categories
const categories = [
    { category_id: 2, category_name: "World", slug: "world", category_banner: "world-banner.webp", meta_title: "World News", meta_keyword: "world, global", meta_description: "International headlines and updates on diplomacy, conflicts, and world affairs.", lang_id: 5, type: "business" },
    { category_id: 3, category_name: "Economy", slug: "economy", category_banner: "finance-banner.webp", meta_title: "Economy News", meta_keyword: "Economy, finance, markets", meta_description: "Financial insights, stock reports, market trends, and analysis of global economic developments.", lang_id: 5, type: "business" },
    { category_id: 5, category_name: "Politics", slug: "politics", category_banner: "politics-banner.webp", meta_title: "Politics News", meta_keyword: "politics, government", meta_description: "Political updates, elections, policy debates, and government insights from around the world.", lang_id: 5, type: "business" },
    { category_id: 6, category_name: "Entertainment", slug: "entertainment", category_banner: "lifestyle-banner.webp", meta_title: "Entertainment News", meta_keyword: "entertainment, movies, shows", meta_description: "Explore entertainment, movies, shows", lang_id: 5, type: "business" },
    { category_id: 7, category_name: "Sports", slug: "sports", category_banner: "opinion-banner.webp", meta_title: "Sports", meta_keyword: "sports", meta_description: "Sports", lang_id: 5, type: "sports" },
    { category_id: 8, category_name: "Tourism", slug: "tourism", category_banner: "category-1772787572.webp", meta_title: "Tourism", meta_keyword: "tourism news, travel industry updates", meta_description: "Explore the latest tourism news and destination insights.", lang_id: 5, type: "general" }
];

fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2));

// 2. Authors
const authors = [
    { author_id: 1, slug: "ramon-t-maris", name: "Ramon T. Maris", image: "ramon-t-maris.webp", designation: "Sports Correspondent", bio: "Covers major sporting events, athlete performance, and global sports industry trends.", joined_year: "2017", location: "New York, United States" },
    { author_id: 2, slug: "claire-hudson", name: "Claire Hudson", image: "claire-hudson.webp", designation: "Health & Lifestyle Reporter", bio: "Claire Hudson covers lifestyle trends, wellness, and social behavior.", joined_year: "2019", location: "Boston, United States" },
    { author_id: 3, slug: "ethan-calloway", name: "Ethan Calloway", image: "ethan-calloway.webp", designation: "Political Analyst", bio: "Analyzes political developments, elections, and government policy with in-depth reporting.", joined_year: "2020", location: "San Francisco, United States" },
    { author_id: 4, slug: "madeline-porter", name: "Madeline Porter", image: "madeline-porter.webp", designation: "Tourism & Travel Reporter", bio: "Reports on global tourism trends, travel industry developments, and destination insights.", joined_year: "2018", location: "Chicago, United States" },
    { author_id: 5, slug: "julian-brooks", name: "Julian Brooks", image: "julian-brooks.webp", designation: "Global Affairs Editor", bio: "Focuses on international relations, global trade, and geopolitical developments.", joined_year: "2016", location: "Washington D.C., United States" },
    { author_id: 6, slug: "olivar-grant", name: "Olivar Grant", image: "olivar-grant.webp", designation: "Technology Columnist", bio: "Writes about emerging technologies, innovation, and the evolving digital landscape.", joined_year: "2021", location: "Austin, United States" },
    { author_id: 7, slug: "sophia-bennett", name: "Sophia Bennett", image: "sophia-bennett.webp", designation: "Entertainment Reporter", bio: "Reports on entertainment, film, media trends, and celebrity culture across global industries.", joined_year: "2015", location: "Washington, D.C., United States" },
    { author_id: 8, slug: "daniel-k-harper", name: "Daniel K. Harper", image: "daniel-harper.webp", designation: "Investigative Journalist", bio: "Daniel K. Harper specializes in long-form investigations, public records analysis, and institutional accountability reporting.", joined_year: "2014", location: "Seattle, United States" },
    { author_id: 9, slug: "isabella-romero", name: "Isabella Romero", image: "isabella-romero.webp", designation: "Economy Correspondent", bio: "Covers macroeconomic trends, financial markets, and global economic policy developments.", joined_year: "2020", location: "San Diego, United States" },
    { author_id: 10, slug: "noah-peterson", name: "Noah Peterson", image: "noah-peterson.webp", designation: "Sports Reporter", bio: "Noah Peterson covers major sporting events, athlete stories, and the business of sports.", joined_year: "2019", location: "Los Angeles, United States" },
    { author_id: 11, slug: "amara-okafor", name: "Amara Okafor", image: "amara-okafor.webp", designation: "Environment Journalist", bio: "Amara Okafor reports on climate change, sustainability, and environmental policy.", joined_year: "2017", location: "Houston, United States" }
];

fs.writeFileSync(path.join(dataDir, 'authors.json'), JSON.stringify(authors, null, 2));

// 3. News Articles
const newsInsertRegex = /INSERT INTO `tbl_news`[\s\S]*?;/g;
const newsBlocks = sqlContent.match(newsInsertRegex) || [];

const newsList = [];

for (const block of newsBlocks) {
    const tuples = parseInsertValues(block);
    for (const tupleStr of tuples) {
        const fields = parseSqlValuesLine(tupleStr);
        if (fields.length >= 21) {
            const news_id = parseInt(fields[0], 10);
            if (isNaN(news_id)) continue; // SKIP COLUMN NAMES ROW!

            const news_title = fields[1] || '';
            let news_content = fields[2] || '';
            const news_content_short = fields[3] || '';
            const news_date = fields[4] || '';
            const published_at = fields[5] || null;
            const photo = fields[6] || '';
            const banner = fields[7] || '';
            const category_id = parseInt(fields[8], 10);
            const author_id = fields[9] ? parseInt(fields[9], 10) : null;
            const comment = fields[10] || '0';
            const meta_title = fields[11] || '';
            const meta_keyword = fields[12] || '';
            const meta_description = fields[13] || '';
            const lang_id = parseInt(fields[14], 10) || 5;
            const stitle = fields[15] || '';
            const title = fields[16] || '';
            const img_alt = fields[17] || '';
            const domain_id = parseInt(fields[18], 10) || 21;
            const encode_title = fields[19] || '';
            const type = fields[20] || 'general';
            const created_at = fields[21] || null;
            const updated_at = fields[22] || null;

            if (news_content && news_content.includes('&lt;')) {
                news_content = news_content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
            }

            newsList.push({
                news_id,
                news_title,
                news_content,
                news_content_short,
                news_date,
                published_at,
                photo,
                banner,
                category_id,
                author_id,
                comment,
                meta_title,
                meta_keyword,
                meta_description,
                lang_id,
                stitle,
                title,
                img_alt,
                domain_id,
                encode_title,
                type,
                created_at,
                updated_at
            });
        }
    }
}

console.log(`Extracted ${newsList.length} valid articles (skipped header metadata rows).`);
fs.writeFileSync(path.join(dataDir, 'news.json'), JSON.stringify(newsList, null, 2));
