// Global JS for UPSC History Notes
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle setup
    const savedTheme = localStorage.getItem('upsc_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('upsc_theme', nextTheme);
            updateThemeIcon(nextTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        themeToggleBtn.innerHTML = theme === 'dark' 
            ? '<span>☀️</span><span>Light</span>' 
            : '<span>🌙</span><span>Dark</span>';
    }

    // Print button setup
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Interactive checklist saving with localStorage
    const checklistItems = document.querySelectorAll('.checklist li');
    if (checklistItems.length > 0) {
        const pageKey = 'upsc_chk_' + window.location.pathname.replace(/[^a-zA-Z0-9]/g, '_');
        let savedState = {};
        try {
            savedState = JSON.parse(localStorage.getItem(pageKey)) || {};
        } catch (e) {
            savedState = {};
        }

        checklistItems.forEach((item, index) => {
            if (savedState[index]) {
                item.classList.add('checked');
            }

            item.addEventListener('click', () => {
                item.classList.toggle('checked');
                savedState[index] = item.classList.contains('checked');
                localStorage.setItem(pageKey, JSON.stringify(savedState));
            });
        });
    }

    // Responsive table auto-wrapper (ensures wide tables never bleed out of card containers)
    const tables = document.querySelectorAll('.chapter-container table, .section table, table.upsc-table');
    tables.forEach(table => {
        const parent = table.parentElement;
        if (!parent.classList.contains('table-container') && !parent.classList.contains('table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-container';
            parent.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
});
