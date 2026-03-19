/**
 * KATCH Global Cart System
 * Shared across all pages via localStorage
 */
const KatchCart = (() => {
    const STORAGE_KEY = 'katch_cart';
    let listeners = [];

    function load() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
        catch { return []; }
    }
    function save(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        listeners.forEach(fn => fn(items));
        _updateBadge(items.length);
    }
    function getAll() { return load(); }
    function add(item) {
        // item: { id, title, type, price, thumb? }
        const items = load();
        if (!items.find(i => i.id === item.id)) {
            items.push({ ...item, addedAt: Date.now() });
            save(items);
            _flash();
            return true;
        }
        return false; // already in cart
    }
    function remove(id) {
        save(load().filter(i => i.id !== id));
    }
    function clear() { save([]); }
    function count() { return load().length; }
    function total() { return load().reduce((s, i) => s + (i.price || 0), 0); }
    function has(id) { return !!load().find(i => i.id === id); }
    function onChange(fn) { listeners.push(fn); }

    function _updateBadge(n) {
        document.querySelectorAll('.katch-cart-badge').forEach(el => {
            el.textContent = n;
            el.style.display = n > 0 ? 'flex' : 'none';
        });
    }
    function _flash() {
        document.querySelectorAll('.katch-cart-btn').forEach(el => {
            el.classList.add('cart-flash');
            setTimeout(() => el.classList.remove('cart-flash'), 600);
        });
    }

    // Init badge on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => _updateBadge(count()));
    } else { _updateBadge(count()); }

    return { getAll, add, remove, clear, count, total, has, onChange };
})();

/** Inject global cart panel HTML + styles into page */
function initCartPanel() {
    // Inject CSS
    if (!document.getElementById('katch-cart-style')) {
        const style = document.createElement('style');
        style.id = 'katch-cart-style';
        style.textContent = `
            .katch-cart-btn { position: relative; background: none; border: none; cursor: pointer; padding: 8px 12px; border-radius: 8px; font-size: 20px; color: #333; transition: 0.2s; }
            .katch-cart-btn:hover { background: #f0f4f8; color: #1A237E; }
            .katch-cart-btn.cart-flash { animation: cartBounce 0.5s ease; }
            @keyframes cartBounce { 0%,100%{transform:scale(1)} 30%{transform:scale(1.3)} 60%{transform:scale(0.9)} }
            .katch-cart-badge { position: absolute; top: 0; right: 0; background: #E91E63; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; font-weight: 900; display: flex; align-items: center; justify-content: center; pointer-events: none; }

            /* Slide Panel */
            #katch-cart-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 9998; backdrop-filter: blur(4px); }
            #katch-cart-overlay.open { display: block; }
            #katch-cart-panel { position: fixed; top: 0; right: -440px; width: 420px; max-width: 95vw; height: 100vh; background: white; z-index: 9999; display: flex; flex-direction: column; box-shadow: -8px 0 40px rgba(0,0,0,0.15); transition: right 0.35s cubic-bezier(0.4,0,0.2,1); }
            #katch-cart-panel.open { right: 0; }
            .cp-head { background: linear-gradient(135deg, #1A237E, #3949AB); color: white; padding: 20px 25px; display: flex; justify-content: space-between; align-items: center; }
            .cp-head h3 { font-size: 18px; font-weight: 900; margin: 0; }
            .cp-close { background: rgba(255,255,255,0.15); border: none; color: white; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
            .cp-close:hover { background: rgba(255,255,255,0.3); }
            .cp-body { flex: 1; overflow-y: auto; padding: 20px 25px; }
            .cp-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; color: #bbb; gap: 12px; text-align: center; }
            .cp-empty i { font-size: 50px; }
            .cp-item { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid #f0f0f0; }
            .cp-item-thumb { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
            .cp-item-info { flex: 1; min-width: 0; }
            .cp-item-info .cp-name { font-size: 14px; font-weight: 700; color: #111; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .cp-item-info .cp-type { font-size: 11px; color: #888; margin-top: 2px; }
            .cp-item-info .cp-price { font-size: 14px; font-weight: 900; color: #f57c00; margin-top: 4px; }
            .cp-remove { background: none; border: 1px solid #eee; color: #aaa; width: 28px; height: 28px; border-radius: 6px; cursor: pointer; font-size: 13px; transition: 0.2s; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
            .cp-remove:hover { background: #ffebee; border-color: #ffcdd2; color: #f44336; }
            .cp-footer { padding: 20px 25px; border-top: 2px solid #f0f0f0; background: #fafafa; }
            .cp-summary { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #555; }
            .cp-total { display: flex; justify-content: space-between; align-items: center; font-size: 20px; font-weight: 900; color: #111; margin-bottom: 18px; padding-top: 10px; border-top: 1px dashed #ddd; }
            .cp-total .val { color: #E91E63; }
            .cp-btn-checkout { width: 100%; padding: 16px; background: linear-gradient(135deg, #E91E63, #C21045); color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 4px 15px rgba(233,30,99,0.3); transition: 0.2s; }
            .cp-btn-checkout:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(233,30,99,0.4); }
            .cp-btn-clear { width: 100%; padding: 10px; background: none; border: 1px solid #ddd; border-radius: 8px; color: #888; font-size: 13px; cursor: pointer; margin-top: 8px; transition: 0.2s; }
            .cp-btn-clear:hover { border-color: #f44336; color: #f44336; }
            .cp-checkout-success { background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 15px; }
            .cp-checkout-success i { font-size: 32px; color: #4CAF50; margin-bottom: 8px; display: block; }
            .cp-checkout-success strong { font-size: 16px; color: #2e7d32; }
        `;
        document.head.appendChild(style);
    }

    // Inject HTML if not already there
    if (!document.getElementById('katch-cart-panel')) {
        const overlay = document.createElement('div');
        overlay.id = 'katch-cart-overlay';
        overlay.onclick = closeCart;

        const panel = document.createElement('div');
        panel.id = 'katch-cart-panel';
        panel.innerHTML = `
            <div class="cp-head">
                <h3><i class="fas fa-shopping-bag"></i> 장바구니 <span id="cp-count-head" style="font-size:13px; opacity:0.8; font-weight:400;"></span></h3>
                <button class="cp-close" onclick="closeCart()"><i class="fas fa-times"></i></button>
            </div>
            <div class="cp-body" id="cp-body"></div>
            <div class="cp-footer" id="cp-footer">
                <div class="cp-summary"><span>장바구니 총 금액</span><span id="cp-subtotal">0 P</span></div>
                <div class="cp-total"><span>총 결제 포인트</span><span class="val" id="cp-total-val">0 P</span></div>
                <button class="cp-btn-checkout" onclick="cartCheckout()"><i class="fas fa-bolt"></i> 포인트로 결제하기</button>
                <button class="cp-btn-clear" onclick="KatchCart.clear(); renderCartPanel();">전체 비우기</button>
            </div>
        `;
        document.body.appendChild(overlay);
        document.body.appendChild(panel);
    }

    // Listen for changes
    KatchCart.onChange(renderCartPanel);
    renderCartPanel();
}

function openCart() {
    document.getElementById('katch-cart-overlay').classList.add('open');
    document.getElementById('katch-cart-panel').classList.add('open');
}
function closeCart() {
    document.getElementById('katch-cart-overlay').classList.remove('open');
    document.getElementById('katch-cart-panel').classList.remove('open');
}

const CART_TYPE_ICONS = {
    vod:    { icon: 'fa-video',       bg: '#e8eaf6', color: '#5c6bc0' },
    exam:   { icon: 'fa-book-open',   bg: '#e8f5e9', color: '#388e3c' },
    pdf:    { icon: 'fa-file-pdf',    bg: '#ffebee', color: '#c62828' },
    lounge: { icon: 'fa-crown',       bg: '#fff8e1', color: '#f57c00' },
    q:      { icon: 'fa-question',    bg: '#f3e5f5', color: '#7b1fa2' },
};

function renderCartPanel() {
    const items = KatchCart.getAll();
    const body = document.getElementById('cp-body');
    const footer = document.getElementById('cp-footer');
    const countHead = document.getElementById('cp-count-head');
    if (!body) return;

    countHead.textContent = items.length > 0 ? `(${items.length}개)` : '';

    if (items.length === 0) {
        body.innerHTML = `<div class="cp-empty"><i class="fas fa-shopping-bag"></i><span>장바구니가 비어있습니다.<br>상품을 담아보세요!</span></div>`;
        footer.style.display = 'none';
        return;
    }
    footer.style.display = 'block';

    let html = '';
    items.forEach(item => {
        const t = CART_TYPE_ICONS[item.type] || CART_TYPE_ICONS['q'];
        const priceStr = item.price > 0 ? `${item.price.toLocaleString()} P` : '무료';
        html += `
        <div class="cp-item">
            <div class="cp-item-thumb" style="background:${t.bg}; color:${t.color};">
                <i class="fas ${t.icon}"></i>
            </div>
            <div class="cp-item-info">
                <div class="cp-name">${item.title}</div>
                <div class="cp-type">${item.type === 'vod' ? 'VOD 강의' : item.type === 'exam' ? '교재/시험' : item.type === 'lounge' ? 'VIP 자료' : '문항 팩'}</div>
                <div class="cp-price">${priceStr}</div>
            </div>
            <button class="cp-remove" onclick="KatchCart.remove('${item.id}'); renderCartPanel();" title="삭제"><i class="fas fa-times"></i></button>
        </div>`;
    });
    body.innerHTML = html;

    const tot = KatchCart.total();
    document.getElementById('cp-subtotal').textContent = tot.toLocaleString() + ' P';
    document.getElementById('cp-total-val').textContent = tot.toLocaleString() + ' P';
}

function cartCheckout() {
    const total = KatchCart.total();
    const items = KatchCart.getAll();
    if (items.length === 0) return;

    // Simulate payment
    const body = document.getElementById('cp-body');
    const footer = document.getElementById('cp-footer');
    body.innerHTML = `
        <div class="cp-checkout-success" style="margin-top:40px;">
            <i class="fas fa-check-circle"></i>
            <strong>결제 완료!</strong>
            <p style="font-size:14px; color:#555; margin-top:8px;">${total.toLocaleString()} P 차감됨<br>MY 학습진단에서 이용하실 수 있습니다.</p>
        </div>
    `;
    footer.innerHTML = `
        <a href="my_learning.html" style="display:flex; align-items:center; justify-content:center; gap:8px; padding:16px; background:#1A237E; color:white; border-radius:10px; font-weight:900; text-decoration:none; font-size:15px;"><i class="fas fa-graduation-cap"></i> MY 학습진단으로 이동</a>
        <button class="cp-btn-clear" onclick="KatchCart.clear(); closeCart(); location.reload();" style="margin-top:8px;">계속 쇼핑하기</button>
    `;
    KatchCart.clear();
}

/** Helper: add to cart from any product card */
function addToCartBtn(id, title, type, price, btnEl) {
    if (KatchCart.has(id)) {
        openCart();
        return;
    }
    const added = KatchCart.add({ id, title, type, price });
    if (added && btnEl) {
        btnEl.innerHTML = '<i class="fas fa-check"></i> 담음';
        btnEl.style.background = '#4CAF50';
        setTimeout(() => {
            btnEl.innerHTML = '<i class="fas fa-shopping-bag"></i> 장바구니';
            btnEl.style.background = '';
        }, 1800);
    }
    renderCartPanel();
}
