function setDiscount(percent) {
    const paragraphs = document.querySelectorAll('.price p');

    paragraphs.forEach(p => {
        if (!p.dataset.originalPrice) {
            p.dataset.originalPrice = p.textContent.replace(/[^\d]/g, '');
        }

        let currentNumber = Number(p.dataset.originalPrice);
        let newPrice = currentNumber * (1 - percent / 100);

        p.textContent = Math.round(newPrice).toLocaleString('ru-RU') + ' ₽';
    });
}