//  function enterSite() {
//       document.body.style.opacity = '0';
//       setTimeout(() => {
//         window.location.href = 'https://myportfolio-psi-two-79.vercel.app/'; // change to your main portfolio page
//       }, 700);
//     }

    const $ = (q) => document.querySelector(q);
const themeBtn = $('#themeBtn');
const shareBtn = $('#shareBtn');
const toast = $('#toast');
const copyEmail = $('#copyEmail');
const emailLabel = $('#emailLabel');
const yearEl = $('#year');


// Year
yearEl.textContent = new Date().getFullYear();


// Theme
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const saved = localStorage.getItem('theme');
const startTheme = saved || (prefersLight ? 'light' : 'dark');
if (startTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');
themeBtn?.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
    ping(`Theme: ${isLight ? 'Dark' : 'Light'}`);
});


// Share
shareBtn?.addEventListener('click', async () => {
    const shareData = { title: document.title, text: 'Check out my links!', url: location.href };
    try {
        if (navigator.share) { await navigator.share(shareData); ping('Shared!'); }
        else { await navigator.clipboard.writeText(shareData.url); ping('URL copied to clipboard'); }
    } catch (e) { ping('Share canceled'); }
});


// Copy email
copyEmail?.addEventListener('click', async () => {
    const text = emailLabel?.textContent?.trim() || '';
    try {
        await navigator.clipboard.writeText(text);
        ping('Email copied');
    } catch (e) { ping('Copy failed'); }
});


// Tiny toast
let t;
function ping(msg) {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(t); t = setTimeout(() => toast.classList.remove('show'), 1600);
}