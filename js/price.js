
function setDiscount(percent) {
    const paragraphs = document.querySelectorAll('.price p');

    paragraphs.forEach(p => {
        const li = p.closest('li');
        if (!p.dataset.originalPrice) {
            p.dataset.originalPrice = p.textContent.replace(/[^\d]/g, '');
        }
        const currentNumber = Number(p.dataset.originalPrice);
        if (!currentNumber || isNaN(currentNumber)) {
            li.style.display = 'none';
            return;
        }
        li.style.display = 'flex';
        const newPrice = currentNumber * (1 - percent / 100);
        p.textContent = Math.round(newPrice).toLocaleString('ru-RU') + ' ₽';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    setDiscount(0);
});
